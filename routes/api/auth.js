const express = require('express');
const router = express.Router();

// const bcrypt = require('bcryptjs');
// const config = require('../../config');
// const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
// User Model
const User = require('../../models/User');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    // if (!token) throw Error('Couldnt sign the token');

    ITEM_ERROR;
    res.status(200).json({
      user: {
        uid: user.uid
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/', async (req, res) => {
  const auth = req.currentUser;
  const name = req.currentUser.name;
  const email = req.currentUser.email
  // console.log(`backend username: ${name}`)

if(auth && name){
  const uid  = req.currentUser.uid;
  try {
    const user = await User.findOne({uid});
    if (user) throw Error('User already exists');

    const newUser = new User({
      uid,
      name: req.currentUser.name,
      email: req.currentUser.email
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    res.status(200).json({
      user: {
        uid: savedUser.uid,
        name: savedUser.name,
        email: savedUser.email
      }
    });
    
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', async (req, res) => {
  const auth = req.currentUser;
if(auth){
  try {
    const user = await User.findOne({uid: req.currentUser.uid})
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}
});

/**
 * @route   PUT api/users
 * @desc    Update user points
 * @access  Public
 */

router.put('/addStripeId', async (req, res) => {
  const auth = req.currentUser;
if(auth){
  try {
    const updateUser = await User.findOneAndUpdate({uid:req.currentUser.uid},
    {stripe_id: req.body.stripe_customer.id}, {new:true}
    )
      res.status(200).json(updateUser)
  } catch (e) {
      res.status(400).json({ msg: e.message });
  }
}
});
  

module.exports = router;
