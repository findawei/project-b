const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const user = require('../../models/User');
const Item = require('../../models/item');
const config =require( '../../config');
const sgMail = require('@sendgrid/mail')
const {usersLogger, transactionLogger, auctionsLogger} = require('../../logger/logger');
const { SENDGRID_API_KEY } = config;
sgMail.setApiKey(SENDGRID_API_KEY)

const { formatDistance, subDays, format } = require ('date-fns')

// @route   GET api/items/
// @desc    Get all items for a specific user
// @access  Private
router.get('/', async (req, res) => {
  try {
  const items = await Item.find({$or:[{status: "active"},{status:"completed"}]}).sort({
    endDate: 1,});
  if (!items) throw Error('No items');
    res.status(200).json(items);
    } catch (e) {
        res.status(400).json({ msg: e.message });
        auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message}`);
    }
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
      templates = {
        Watch_submission: "d-b739df9df01445b5bbca796bf0b1b37d"
      };
    const msg = {
      to:'alex@nowaitlist.co',
      cc: `${req.currentUser.email}`, // Change to your recipient
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
        auctionsLogger.info(`Submitted successfully - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${auth.email} - ${auth.uid}`);
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
return(res.status(403).send('Not authorized'),
auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Not authorized`))
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

  
// @route    POST api/items/bid/:id
// @desc     Bid history on an auction
// @access   Private
router.post('/bid/:id', async (req, res) => {
    const auth = req.currentUser;
    if(auth){
      try {
        const item = await Item.findById({_id: req.params.id});

        const newBid = {
          bid: req.body.bid,
          name: req.currentUser.name,
          user: req.currentUser.uid
        };

        item.bidHistory.unshift(newBid);

        await item.save();

        res.json(item.bidHistory);

        auctionsLogger.info(`Bid successfully - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Bid: ${newBid.bid} - Auction_ID: ${req.params.id} - ${user.email} - ${user.uid}`);

      } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
        auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message} - Bid: ${newBid.bid} - Auction_ID: ${req.params.id} - ${user.email} - ${user.uid}`);
      }
      return
    }
    return (res.status(403).send('Not authorized'),
    auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Not authorized`)
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
      auctionsLogger.info(`Comment successfully - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Comment: ${newComment.text} - Auction_ID: ${req.params.id} - ${user.email} - ${user.uid}`);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server Error');
      auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message} - Comment: ${newComment.text} - Auction_ID: ${req.params.id} - ${user.email} - ${user.uid}`);
    }
    return
  }
  return (res.status(403).send('Not authorized'),
  auctionsLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Not authorized`))
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
