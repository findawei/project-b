const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth')
// const User = require('../../models/User');
const Item = require('../../models/item');

// @route   GET api/items/
// @desc    Get all items for a specific user
// @access  Private
router.get('/', async (req, res) => {
  try {
  const items = await Item.find().sort({
    date: -1,});
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
      brand: req.body.brand,
      model: req.body.model,
      img: req.body.img,
      reference_number: req.body.reference_number,
      movement: req.body.movement,
      year: req.body.year,   
      case_diameter: req.body.case_diameter,
      lug_width: req.body.lug_width,    description: req.body.description
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

// @route   PUT api/items/:id
// @desc    Update specific item
// @access  Private
router.put('/:id', async (req, res) => {
  try{ 
    const updateItem = await 
  Item.findOneAndUpdate({_id: req.params.id}, {
    brand: req.body.brand,
    model: req.body.model,
    img: req.body.img,
    reference_number: req.body.reference_number,
    movement: req.body.movement,
    year: req.body.year,   
    case_diameter: req.body.case_diameter,
    lug_width: req.body.lug_width,
    description: req.body.description
    },{new: true});
    return res.status(200).json(updateItem);
  } catch(e){
    res.status(400).json({ msg: e.message, success: false })
    }
  });
  
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

module.exports = router;
