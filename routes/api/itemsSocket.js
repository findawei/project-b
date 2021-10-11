const express = require("express");
const router = express.Router();
const { decodeSocketToken } = require("../../middleware/auth");
const user = require("../../models/User");
const Item = require("../../models/item");
const mailer = require("../../email/mailer");
const path = require("path");
const handlebars = require("handlebars");
const fs = require("fs");
const fetch = require("node-fetch");
const {
  usersLogger,
  transactionLogger,
  auctionsLogger,
} = require("../../logger/logger");
const {
  formatDistance,
  subDays,
  format,
  isPast,
  isFuture,
} = require("date-fns");
const { AsyncLocalStorage } = require("async_hooks");

module.exports = function (io, socket, authUser) {
  // @route   GET api/items/
  // @desc    Get all items for review for a specific user
  // @access  Private
  router.get("/for_review", async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
      try {
        const items = await Item.find({
          user: req.currentUser.uid,
          status: "for_review",
        }).sort({
          endDate: 1,
        });
        if (!items) throw Error("No items");
        res.status(200).json(items);
      } catch (e) {
        res.status(400).json({ msg: e.message });
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message}`
        );
      }
    } else
      return (
        res.status(403).send("Not authorized"),
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        )
      );
  });

  // @route   GET api/item/_id
  // @desc    Get 1 item
  // @access  Private
  router.get("/:id", async (req, res) => {
    try {
      var item = await Item.findById(req.params.id);
      if (!item) throw Error("No item");

      //Scenario 1
      //Watch chart exists
      if (item.chart) {
        const fetchdata = await fetch(`${item.chart.url}`);
        const data = await fetchdata.json();
        // console.log(data);
        if (!data) throw Error("No chart data");

        item.chart.data = data.data;
      }

      //Scenario 2
      //Watch chart doesn't exist
      //Provide own data

      res.status(200).json(item);
    } catch (e) {
      res.status(400).json({ msg: e.message });
      auctionsLogger.error(
        `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message}`
      );
    }
  });

  // // @route   PUT api/items/:id
  // // @desc    Update specific item
  // // @access  Private
  // router.put('/update/:id', async (req, res) => {
  //   try{
  //     const updateItem = await
  //   Item.findOneAndUpdate({_id: req.params.id}, {
  //     name: req.body.name,
  //     user: req.body.uid,
  //     brand: req.body.brand,
  //     model: req.body.model,
  //     img: req.body.img,
  //     reference_number: req.body.reference_number,
  //     movement: req.body.movement,
  //     year: req.body.year,
  //     case_diameter: req.body.case_diameter,
  //     lug_width: req.body.lug_width,
  //     thickness: req.body.thickness,
  //     description: req.body.description,
  //     bid: req.body.bid,
  //     reserve: req.body.reserve,
  //     endDate: req.body.endDate,
  //     location: req.body.location,
  //     service: req.body.service,
  //     material: req.body.material,
  //     boxpapers: req.body.boxpapers,
  //     crystal: req.body.crystal,
  //     crown: req.body.crown,
  //     bezel: req.body.bezel,
  //     wr: req.body.wr,
  //     tested: req.body.tested
  //     },{new: true});
  //     return res.status(200).json(updateItem);
  //   } catch(e){
  //     res.status(400).json({ msg: e.message, success: false })
  //     }
  //   });

  // // @route   PUT api/items/:id
  // // @desc    Update item bid price
  // // @access  Private
  // router.put('/:id', async (req, res) => {
  //   try{
  //     const updateItemBid = await
  //   Item.findOneAndUpdate({_id: req.params.id}, {
  //     $set:{
  //     bid: req.body.bid,
  //     }
  //     },{upsert: true, new: true});
  //     return res.status(200).json(updateItemBid);
  //   } catch(e){
  //     res.status(400).json({ msg: e.message, success: false })
  //     }
  //   });

  // @route   PUT api/items/:id
  // @desc    Update item endTime
  // @access  Private
  router.put("/endDate/:id", async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
      try {
        const updateItemEndDate = await Item.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              endDate: req.body.endDate,
            },
          },
          { upsert: true, new: true }
        );
        return (
          res.status(200).json(updateItemEndDate),
          auctionsLogger.info(
            `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Extended Auction - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
          )
        );
      } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
        );
      }
    } else
      return (
        res.status(403).send("Not authorized"),
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        )
      );
  });

  // @route    POST api/items/bid/:id
  // @desc     Bid history on an auction
  // @access   Private
  router.post("/bid/:id", async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
      const item = await Item.findById({ _id: req.params.id });

      try {
        if (isFuture(item.endDate)) {
          const newBid = {
            bid: req.body.bid,
            name: req.currentUser.name,
            user: req.currentUser.uid,
          };
          item.bidHistory.unshift(newBid);

          await item.save();

          res.json(item.bidHistory);

          // email previous highest bidder let them know they've been outbid
          if (item.bidHistory[1]) {
            //get previous bidder email
            const previousBidder = await user.findOne({
              uid: item.bidHistory[1].user,
            });
            //Send email to site admin
            const filePath = path.join(
              __dirname,
              "../../email/template_outbid.html"
            );
            const source = fs.readFileSync(filePath, "utf-8").toString();
            const template = handlebars.compile(source);
            const replacements = {
              name: previousBidder.name,
              brand: item.brand,
              model: item.model,
              item_image: item.img[0].url,
              amount: item.bidHistory[0].bid,
              reference: item.reference_number,
              year: item.year,
              endDate: item.endDate.toISOString().substring(0, 10),
              // receipt_id: item._id.substring(0,8),
              auction_id: item._id,
              description: `${item.brand} ${item.model} ${item.reference_number} - ${item.year}`,
            };
            const htmlToSend = template(replacements);

            mailOptions = {
              from: '"No Wait List" <info@nowaitlist.co>',
              to: previousBidder.email,
              subject: `Outbid notice: Bid again on the ${replacements.brand} ${replacements.model}`,
              html: htmlToSend,
            };
            mailer.transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.status(400).json("Something went wrong.");
                auctionsLogger.error(
                  `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${error} - ${auth.email} - ${auth.uid}`
                );
              }
            });
          }
          auctionsLogger.info(
            `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Bid successfully - Bid: ${newBid.bid} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
          );
        } else {
          console.log("Cannot bid on closed auction.");
          res.status(400).send("Cannot bid on closed auction.");
          auctionsLogger.error(
            `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Cannot bid on closed auction - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
          );
        }
      } catch (err) {
        console.error(err.message);
        res.status(400).send("Server Error");
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
        );
      }
      return;
    } else
      return (
        res.status(403).send("Not authorized"),
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        )
      );
  });

  // @route    POST api/items/comment/:id
  // @desc     Bid history on an auction
  // @access   Private

  socket.on("commentItem", (item) => {
    console.log(item);
    console.log(authUser.uid);
  });

  socket.on("commentItemSSSS", async (req, res) => {
    const auth = req.currentUser;
    if (auth) {
      try {
        const item = await Item.findById({ _id: req.params.id });

        const newComment = {
          text: req.body.text,
          name: req.currentUser.name,
          user: req.currentUser.uid,
        };
        item.comments.unshift(newComment);
        await item.save();

        //Added this
        socket.emit("commentItem_Emit", newComment);

        res.json(item.comments);
        auctionsLogger.info(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Comment successfully - Comment: ${newComment.text} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
        );
      } catch (err) {
        console.error(err.message);
        res.status(400).send("Server Error");
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message} - Comment: ${newComment.text} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
        );
      }
      return;
    } else
      return (
        res.status(403).send("Not authorized"),
        auctionsLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        )
      );
  });

  // router.post('/email-test', async (req, res) => {
  //   const auth = req.currentUser;
  //   if(auth){
  //     try{
  //       const filePath = path.join(__dirname, '../../email/template_submit.html');
  //       const source = fs.readFileSync(filePath, 'utf-8').toString();
  //       const template = handlebars.compile(source);
  //       const replacements = {
  //         //Test data
  //         name: "Tira",
  //         email: "tira@gmail.com",
  //         dealership: "MM Watch Dealers",
  //         dealerwebsite: "www.mmwatchdealers.com",
  //         link: "www.mmwatchdealers.com/seiko6105",
  //         date: "2019-11-20",
  //         description: " Seiko 6105-8110 - 1977",
  //         amount: "500",
  //         brand:"Seiko",
  //         model:"Willard",
  //         reference_number: "6105-8110",
  //         year:"1977",
  //         fee: "$115",
  //         location: "California, US",
  //         service: "June 2018",
  //         phone: "614-234-2346",
  //         referral: "JonB",
  //         reserve: "6600",
  //         receipt_details:[{
  //               description: "Seiko 6105-8110 - 1977",
  //               reserve: "6600"
  //           }]
  //         // date: format(new Date(), 'PP - ppp'),
  //         // name: newItem.name,
  //         // email: req.currentUser.email,
  //         // dealership: newItem.dealership,
  //         // dealerwebsite: newItem.dealerwebsite,
  //         // fees: newItem.fees,
  //         // link: newItem.link,
  //         // brand: newItem.brand,
  //         // model: newItem.model,
  //         // reference_number: newItem.reference_number,
  //         // year: newItem.year,
  //         // reserve: (newItem.reserve === null? 0 : newItem.reserve),
  //         // location: newItem.location,
  //         // service: format(new Date(newItem.service), 'yyyy/MM/dd'),
  //         // phone: newItem.phone,
  //         // referral: newItem.referral,
  //       };
  //       const htmlToSend = template(replacements);

  //       mailOptions = {
  //         from: '"No Wait List" <alex@nowaitlist.co>',
  //         to: auth.email,
  //         cc: 'alex@nowaitlist.co',
  //         subject: `${replacements.name} submitted a ${replacements.brand} ${replacements.model} for review`,
  //         html: htmlToSend
  //       }
  //       mailer.transport.sendMail(mailOptions, (error, info) => {
  //         if (error) {
  //           return console.log(error);
  //         }
  //         res.status(200).send(`Email sent to ${auth.email}`)
  //         console.log('Message sent: %s', info.messageId);
  //       });
  //     }catch (err){
  //       res.status(403).send(err)
  //     }
  //   } else {
  //     return res.status(403).send("Email didn't send")
  //   }
  // })

  // // @route   DELETE api/items/:id
  // // @desc    DELETE items
  // // @access  Private
  // router.delete('/:id', async (req, res) => {
  //   try {
  //   const item = await Item.findById(req.params.id);
  //   if (!item) throw Error('No item found');

  //   const removed = await item.remove();
  //   if (!removed)
  //     throw Error('Something went wrong while trying to delete the item');
  //   res.status(200).json({ success: true });
  // } catch (e) {
  //   res.status(400).json({ msg: e.message, success: false });
  // }
  // });

  return router;
};
