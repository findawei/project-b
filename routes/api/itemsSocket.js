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
  // @route    POST api/items/bid/:id
  // @desc     Bid history on an auction
  // @access   Private
  socket.on("bidOnItem", async (itemSocket) => {
    // console.log(itemSocket);
    if (authUser) {
      try {
        const item = await Item.findById({ _id: itemSocket._id });
        if (isFuture(item.endDate) && itemSocket.bid > item.bidHistory[0].bid) {
          const newBid = {
            bid: itemSocket.bid,
            name: authUser.name,
            user: authUser.uid,
            date: new Date(),
          };
          item.bidHistory.unshift(newBid);
          await item.save();

          io.emit("updateBid", newBid);

          // email previous highest bidder let them know they've been outbid
          if (item.bidHistory[1]) {
            //get previous bidder email
            const previousBidder = await user.findOne({
              uid: item.bidHistory[1].user,
            });
            if (previousBidder.uid === authUser.uid) {
              console.log("You outbid yourself");
            } else {
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
                  // res.status(400).json("Something went wrong.");
                  auctionsLogger.error(
                    `${socket.statusMessage} - ${socket.originalUrl} - ${socket.method} - ${socket.ip} - ${error} - ${authUser.email} - ${authUser.uid}`
                  );
                }
              });
            }
          }
          auctionsLogger.info(
            `${socket.statusMessage} - ${socket.originalUrl} - ${socket.method} - ${socket.ip} - Bid successfully - Bid: ${newBid.bid} - Auction_ID: ${itemSocket._id} - ${authUser.email} - ${authUser.uid}`
          );
        } else {
          console.log("Cannot bid on auction.");
          res.status(400).send("Cannot bid on closed auction.");
          auctionsLogger.error(
            `${socket.statusMessage} - ${socket.originalUrl} - ${socket.method} - ${socket.ip} - Cannot bid on closed auction - Auction_ID: ${itemSocket._id} - ${authUser.email} - ${authUser.uid}`
          );
        }
      } catch (e) {
        console.log(e);
        // res.status(400).send("Server Error");
        auctionsLogger.error(
          `${socket.statusMessage} - ${socket.originalUrl} - ${socket.method} - ${socket.ip} - ${err.message} - Auction_ID: ${itemSocket._id} - ${authUser.email} - ${authUser.uid}`
        );
      }
    } else
      return (
        // res.status(403).send("Not authorized"),
        auctionsLogger.error(
          `${socket.statusMessage} - ${socket.originalUrl} - ${socket.method} - ${socket.ip}`
        )
      );
  });

  socket.on("commentItem", async (itemSocket) => {
    if (authUser) {
      try {
        const item = await Item.findById({ _id: itemSocket._id });

        const newComment = {
          text: itemSocket.text,
          name: authUser.name,
          user: authUser.uid,
          date: new Date(),
        };

        item.comments.unshift(newComment);
        await item.save();

        io.emit("updateComment", newComment);

        auctionsLogger.info(
          `${socket.statusMessage} - ${socket.originalUrl} - ${socket.method} - ${socket.ip} - Comment successfully - Comment: ${itemSocket.text} - Auction_ID: ${itemSocket._id} - ${authUser.email} - ${authUser.uid}`
        );
      } catch (err) {
        console.error(err.message);
        // auctionsLogger.error(
        //   `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message} - Comment: ${newComment.text} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`
        // );
      }
      return;
    } else return;
    // auctionsLogger.error(
    //   `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    // );
  });

  return router;
};
