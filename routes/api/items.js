const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const user = require('../../models/User');
const Item = require('../../models/item');
const config =require( '../../config');
var nodemailer = require('nodemailer');

const {usersLogger, transactionLogger, auctionsLogger} = require('../../logger/logger');
const { formatDistance, subDays, format, isPast, isFuture } = require ('date-fns')

const { EMAIL_PW } = config;

var transport = nodemailer.createTransport({
  host: "mail.nowaitlist.co",
  port: 465,
  secure: true,
  auth: {
    user: "alex@nowaitlist.co",
    pass: `${EMAIL_PW}`
  }
});

// @route   GET api/items/
// @desc    Get all items that are live and completed
// @access  Private
router.get('/', async (req, res) => {
  try {
  const items = await Item.find({$or:[{status: "active"},{status:"completed"},{status:"reserve_not_met"}]}).sort({
    endDate: 1,});
  if (!items) throw Error('No items');
    res.status(200).json(items);
    } catch (e) {
        res.status(400).json({ msg: e.message });
        auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message}`);
    }
});

// @route   GET api/items/
// @desc    Get all items for review for a specific user
// @access  Private
router.get('/for_review', async (req, res) => {
  const auth = req.currentUser;
    if(auth){
      try {
      const items = await Item.find({user: req.currentUser.uid, status: "for_review"}).sort({
        endDate: 1,});
      if (!items) throw Error('No items');
        res.status(200).json(items);
        } catch (e) {
            res.status(400).json({ msg: e.message });
            auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message}`);
        }
    } else return (
      res.status(403).send('Not authorized'),
      auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`))
});

// @route   GET api/item/_id
// @desc    Get 1 item
// @access  Private
router.get('/:id', async (req, res) => {
  try {
  const item = await Item.findById(req.params.id);
  if (!item) throw Error('No item');
    res.status(200).json(item);
    } catch (e) {
        res.status(400).json({ msg: e.message });
        auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message}`);
    }
});

// // @route   POST api/items/
// // @desc    POST item
// // @access  Private
// router.post('/', async (req, res) => {
//   const newItem = new Item({
//       name: req.currentUser.name,
//       user: req.currentUser.uid,
//       brand: req.body.brand,
//       model: req.body.model,
//       img: req.body.img,
//       reference_number: req.body.reference_number,
//       movement: req.body.movement,
//       year: req.body.year,   
//       case_diameter: req.body.case_diameter,
//       lug_width: req.body.lug_width,
//       thickness: req.body.thickness,    
//       description: req.body.description,
//       bid: req.body.bid,
//       reserve: req.body.reserve,
//       endDate: req.body.endDate,
//       location: req.body.location,
//       service: req.body.service,
//       material: req.body.material,
//       boxpapers: req.body.boxpapers,
//       crystal: req.body.crystal,
//       crown: req.body.crown,
//       bezel: req.body.bezel,
//       wr: req.body.wr,
//       tested: req.body.tested,
//   });
//   try{ 
//     const item = await newItem.save();
//     if (!item) throw Error('Something went wrong saving the item');
//     res.status(200).json(item);
//     } 
//   catch (e) {
//   res.status(400).json({ msg: e.message, success: false });
// }
// });

// @route   POST api/items/
// @desc    POST item
// @access  Private
router.post('/submit', async (req, res) => {

  const auth = req.currentUser;
    if(auth){
  const newItem = new Item({
      name: req.currentUser.name,
      user: req.currentUser.uid,
      dealership: req.body.dealership,
      dealerwebsite: req.body.dealerwebsite,
      fees: req.body.fees,
      link: req.body.link,
      brand: req.body.brand,
      model: req.body.model,
      reference_number: req.body.reference_number,
      year: req.body.year,   
      reserve: req.body.reserve,
      location: req.body.location,
      service: req.body.service,
      phone: req.body.phone,
      referral: req.body.referral,
      status: 'for_review'
  });
  //  console.log(newItem)
  try{ 
    const item = await newItem.save();
    if(!item) {
      res.status(400).json('Something went wrong saving the item');
      auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Something went wrong saving the item - ${auth.email} - ${auth.uid}`);
    }
    //Send email to site admin

    var mailOptions = {
      from: '"No Wait List" <alex@nowaitlist.co>',
      to: `${req.currentUser.email}`,
      cc: "alex@nowaitlist.co",
      subject: 'Nice Nodemailer test',
      text: 'Hey there, it’s our first message sent with Nodemailer ',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
    };
    
    // transport.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log('Message sent: %s', info.messageId);
    // });

    //remove sendgrid code

      templates = {
        Watch_submission: "d-b739df9df01445b5bbca796bf0b1b37d"
      };
    const msg = {
      to:`${req.currentUser.email}`, // Change to your recipient
      cc: 'alex@nowaitlist.co',
      from: 'alex@nowaitlist.co', // Change to your verified sender
      name: "Alex from No Wait List",
      
      template_id:"d-b739df9df01445b5bbca796bf0b1b37d",

      dynamic_template_data: {
        date: format(new Date(), 'PP - ppp'),
        name: newItem.name,
        email: req.currentUser.email,
        dealership: newItem.dealership,
        dealerwebsite: newItem.dealerwebsite,
        fees: newItem.fees,
        link: newItem.link,
        brand: newItem.brand,
        model: newItem.model,
        reference_number: newItem.reference_number,
        year: newItem.year,   
        reserve: (newItem.reserve === null? 0 : newItem.reserve),
        location: newItem.location,
        service: format(new Date(newItem.service), 'yyyy/MM/dd'),
        phone: newItem.phone,
        referral: newItem.referral,
       }
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.status(200).json(item)
        auctionsLogger.info(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Submitted successfully - ${auth.email} - ${auth.uid}`);
      })
      .catch((error) => {
        console.error(error)
        res.status(400).json('Something went wrong.')
        auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${error} - ${auth.email} - ${auth.uid}`);
      })
    
    return
    } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
  auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - ${auth.email} - ${auth.uid}`);
}
}
else return(res.status(403).send('Not authorized'),
auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`))
}
);

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
router.put('/endDate/:id', async (req, res) => {
  const auth = req.currentUser;

  if(auth){
    try{ 
    const updateItemEndDate = await 
  Item.findOneAndUpdate({_id: req.params.id}, {
    $set:{
    endDate: req.body.endDate,
    }
    },{upsert: true, new: true});
    return (
      res.status(200).json(updateItemEndDate), 
      auctionsLogger.info(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Extended Auction - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`));
    } catch(e){
    res.status(400).json({ msg: e.message, success: false })
    auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`);
    }
  }
  else return (
    res.status(403).send('Not authorized'),
    auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`))
  });
  
// @route    POST api/items/bid/:id
// @desc     Bid history on an auction
// @access   Private
router.post('/bid/:id', async (req, res) => {
    const auth = req.currentUser;

    if(auth){
      const item = await Item.findById({_id: req.params.id});
      
      try {
        if (isFuture(item.endDate)){
         
        const newBid = {
          bid: req.body.bid,
          name: req.currentUser.name,
          user: req.currentUser.uid
        };

        item.bidHistory.unshift(newBid);
        
        await item.save();

        res.json(item.bidHistory);

        auctionsLogger.info(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Bid successfully - Bid: ${newBid.bid} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`);
      } else {
        console.log('Cannot bid on closed auction.')
        res.status(400).send('Cannot bid on closed auction.')
        auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Cannot bid on closed auction - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`);
      }
      } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
        auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`);
      }
      return
    }
    else return (res.status(403).send('Not authorized'),
    auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    )
  }
);

// @route    POST api/items/comment/:id
// @desc     Bid history on an auction
// @access   Private
router.post('/comment/:id', async (req, res) => {
  const auth = req.currentUser;
  if(auth){
    try {
      const item = await Item.findById({_id: req.params.id});

      const newComment = {
        text: req.body.text,
        name: req.currentUser.name,
        user: req.currentUser.uid
      };

      item.comments.unshift(newComment);
      await item.save();
      res.json(item.comments);
      auctionsLogger.info(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Comment successfully - Comment: ${newComment.text} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server Error');
      auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message} - Comment: ${newComment.text} - Auction_ID: ${req.params.id} - ${auth.email} - ${auth.uid}`);
    }
    return
  }
  else return (res.status(403).send('Not authorized'),
  auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`))
}
);

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

module.exports = router;
