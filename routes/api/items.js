const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const user = require('../../models/User');
const Item = require('../../models/item');

// @route   GET api/items/
// @desc    Get all items for a specific user
// @access  Private
router.get('/', async (req, res) => {
  try {
  const items = await Item.find().sort({
    endDate: 1,});
  if (!items) throw Error('No items');
    res.status(200).json(items);
    } catch (e) {
        res.status(400).json({ msg: e.message });
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
    }
});

// @route   POST api/items/
// @desc    POST item
// @access  Private
router.post('/', async (req, res) => {
  const newItem = new Item({
      name: req.currentUser.name,
      user: req.currentUser.uid,
      brand: req.body.brand,
      model: req.body.model,
      img: req.body.img,
      reference_number: req.body.reference_number,
      movement: req.body.movement,
      year: req.body.year,   
      case_diameter: req.body.case_diameter,
      lug_width: req.body.lug_width,
      thickness: req.body.thickness,    
      description: req.body.description,
      bid: req.body.bid,
      reserve: req.body.reserve,
      endDate: req.body.endDate,
      location: req.body.location,
      service: req.body.service,
      material: req.body.material,
      boxpapers: req.body.boxpapers,
      crystal: req.body.crystal,
      crown: req.body.crown,
      bezel: req.body.bezel,
      wr: req.body.wr,
      tested: req.body.tested,
  });
  try{ 
    const item = await newItem.save();
    if (!item) throw Error('Something went wrong saving the item');
    res.status(200).json(item);
    } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}
});

// @route   POST api/items/
// @desc    POST item
// @access  Private
router.post('/submit', async (req, res) => {

  const auth = req.currentUser;
    if(auth){

  const newItem = new Item({
      name: req.currentUser.name,
      user: req.currentUser.uid,
      brand: req.body.brand,
      model: req.body.model,
      // img: req.body.img,
      reference_number: req.body.reference_number,
      year: req.body.year,   
      reserve: req.body.reserve,
      location: req.body.location,
      service: req.body.service,
      phone: req.body.phone,
      referral: req.body.referral,
      // approved: false
  });
  try{ 
    const item = await newItem.save();
    if (!item) throw Error('Something went wrong saving the item');
    res.status(200).json(item);
    } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}
}}
);

// @route   PUT api/items/:id
// @desc    Update specific item
// @access  Private
router.put('/update/:id', async (req, res) => {
  try{ 
    const updateItem = await 
  Item.findOneAndUpdate({_id: req.params.id}, {
    name: req.body.name,
    user: req.body.uid,
    brand: req.body.brand,
    model: req.body.model,
    img: req.body.img,
    reference_number: req.body.reference_number,
    movement: req.body.movement,
    year: req.body.year,   
    case_diameter: req.body.case_diameter,
    lug_width: req.body.lug_width,
    thickness: req.body.thickness,
    description: req.body.description,
    bid: req.body.bid,
    reserve: req.body.reserve,
    endDate: req.body.endDate,
    location: req.body.location,
    service: req.body.service,
    material: req.body.material,
    boxpapers: req.body.boxpapers,
    crystal: req.body.crystal,
    crown: req.body.crown,
    bezel: req.body.bezel,
    wr: req.body.wr,
    tested: req.body.tested
    },{new: true});
    return res.status(200).json(updateItem);
  } catch(e){
    res.status(400).json({ msg: e.message, success: false })
    }
  });

// @route   PUT api/items/:id
// @desc    Update item bid price
// @access  Private
router.put('/:id', async (req, res) => {
  try{ 
    const updateItemBid = await 
  Item.findOneAndUpdate({_id: req.params.id}, {
    $set:{
    bid: req.body.bid,
    }
    },{upsert: true, new: true});
    return res.status(200).json(updateItemBid);
  } catch(e){
    res.status(400).json({ msg: e.message, success: false })
    }
  });

// @route   PUT api/items/:id
// @desc    Update item endTime
// @access  Private
router.put('/endDate/:id', async (req, res) => {
  try{ 
    const updateItemEndDate = await 
  Item.findOneAndUpdate({_id: req.params.id}, {
    $set:{
    endDate: req.body.endDate,
    }
    },{upsert: true, new: true});
    return res.status(200).json(updateItemEndDate);
  } catch(e){
    res.status(400).json({ msg: e.message, success: false })
    }
  });
  
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
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
      return
    }
    return res.status(403).send('Not authorized');
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    return
  }
  return res.status(403).send('Not authorized');
}
);

// @route   DELETE api/items/:id
// @desc    DELETE items
// @access  Private
router.delete('/:id', async (req, res) => {
  try {  
  const item = await Item.findById(req.params.id);
  if (!item) throw Error('No item found');

  const removed = await item.remove();
  if (!removed)
    throw Error('Something went wrong while trying to delete the item');
  res.status(200).json({ success: true });
} catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}
});



// router.put('/test/:id', async (req, res) => {
//   try{ 
//     const updateItem = await 
//   Item.findOneAndUpdate({_id: req.params.id}, {
    
//     status: "active",
    
//     },{ new: true});
//     return res.status(200).json(updateItem);
//   } catch(e){
//     res.status(400).json({ msg: e.message, success: false })
//     }
//   });

module.exports = router;
