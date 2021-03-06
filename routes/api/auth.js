const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { usersLogger, transactionLogger } = require("../../logger/logger");

// User Model
const User = require("../../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const captchaKey = process.env.CAPTCHA_SECRET_KEY;
const fetch = require("node-fetch");

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      throw (
        (Error("User Does not exist"),
        usersLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - ${user.email} - ${user.uid}`
        ))
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw (
        (Error("Invalid credentials"),
        usersLogger.error(
          `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Invalid credentials - ${user.email} - ${user.uid}`
        ))
      );
    }

    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    // if (!token) throw Error('Couldnt sign the token');
    res.status(200).json({
      user: {
        uid: user.uid,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
    usersLogger.error(
      `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - ${user.email} - ${user.uid}`
    );
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post("/", async (req, res) => {
  const auth = req.currentUser;
  const name = req.currentUser.name;
  const email = req.currentUser.email;
  // console.log(`backend username: ${name}`)

  if (auth && name) {
    const uid = req.currentUser.uid;
    try {
      const user = await User.findOne({ uid });
      if (user) {
        throw (
          (Error("User already exists"),
          usersLogger.error(
            `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - User already exists - ${user.email} - ${user.uid}`
          ))
        );
      }

      const newUser = new User({
        uid,
        name: req.currentUser.name,
        email: req.currentUser.email,
      });

      const savedUser = await newUser.save();
      if (!savedUser) {
        throw (
          (Error("Something went wrong saving the user"),
          usersLogger.error(`Register: Something went wrong saving ${email}`))
        );
      }

      res.status(200).json({
        user: {
          uid: savedUser.uid,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
      usersLogger.info(
        `User created - ${req.originalUrl} - ${req.method} - ${user.email} - ${user.uid}`
      );
    } catch (e) {
      res.status(400).json(e);
      usersLogger.error(
        `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - ${auth.email} - ${auth.uid}`
      );
    }
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get("/user", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const user = await User.findOne({ uid: req.currentUser.uid });
      if (!user) {
        const newUser = new User({
          uid: req.currentUser.uid,
          name: req.currentUser.name,
          email: req.currentUser.email,
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
        // throw Error('User Does not exist'),
        // usersLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - User does not exist - ${auth.email} - ${auth.uid}`);
      }
      res.json(user);
    } catch (e) {
      res.status(400).json(e);
      usersLogger.error(
        `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - ${auth.email} - ${auth.uid}`
      );
    }
  }
});

router.put("/addStripeId", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { uid: req.currentUser.uid },
        { stripe_id: req.body.stripe_customer.id },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (e) {
      res.status(400).json({ msg: e.message });
      transactionLogger.error(
        `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - ${auth.email} - ${auth.uid}`
      );
    }
  }
});

router.put("/addStripeCC", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { uid: req.currentUser.uid },
        { stripe_cc: req.body.stripe_cc },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (e) {
      res.status(400).json({ msg: e.message });
      transactionLogger.error(
        `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message} - ${auth.email} - ${auth.uid}`
      );
    }
  }
});

//captcha submit
router.post("/captcha", async (req, res) => {
  const humanKey = req.body.captcha;
  // Validate Human
  try {
    const isHuman = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `secret=${captchaKey}&response=${humanKey}`,
      }
    )
      .then((res) => res.json())
      .then((json) => json.success)
      .catch((err) => {
        throw (
          (new Error(`Error in Google Siteverify API. ${err.message}`),
          usersLogger.error(
            `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message}`
          ))
        );
      });

    if (humanKey === null || !isHuman) throw new Error(`YOU ARE NOT A HUMAN.`);
    // The code below will run only after the reCAPTCHA is succesfully validated.
    // console.log("SUCCESS!")
    res.status(200).json("success");
  } catch (e) {
    res.status(400).json({ msg: e.message });
    usersLogger.error(
      `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e.message}`
    );
  }
});

//Your webhooks payload endpoint
router.post("/webhook/growsurf", async (req, res) => {
  const body = req.body;
  let result;

  //find user in our database
  const user = await User.findOne({ email: body.data.participant.email });
  console.log(user);

  // For double-sided rewards, two events will be sent for both referrer and referee. To discern between the two, use the data.reward.isReferrer property (the referrer will have isReferrer as true).

  //Referrer
  body.data.reward.isReferrer;
  //Referred (friend that got invited)
  body.data.reward.isReferrer === false;

  try {
    if (body.event === "PARTICIPANT_REACHED_A_GOAL") {
      // Write code here to do something when a participant wins a reward
      result = `${body.data.participant.email} just won this reward: ${body.data.reward.description}`;

      //Add reward to user
    } else if (body.event === "NEW_PARTICIPANT_ADDED") {
      // Write code here to do something when a new participant is added
      result = `${body.data.email} just joined via source: ${body.data.referralSource}.`;
    } else if (body.event === "CAMPAIGN_ENDED") {
      // Write code here to do something when a campaign ends
      result = `${body.data.name} just ended with ${body.data.referralCount} total referrals!`;
    }
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

// router.post('/test', async (req, res) =>{
//   const auth = req.currentUser;
//   if(auth){
//   const newBid = {
//     auction_id: req.body._id,
//     bid: req.body.bid,
//     name: req.currentUser.name,
//     user_uid: req.currentUser.uid
//   };
//   if (newBid.bid && newBid.auction_id){
//     res.status(200).json(newBid)
//     usersLogger.info(`Bid Successful - ${req.originalUrl} - ${req.method} - Bid: ${newBid.bid} - Auction_ID: ${newBid.auction_id} - ${auth.email} - ${auth.uid}`)
//   } else {
//     res.status(400).json('Something went wrong');
//     usersLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Bid: ${newBid.bid} - Auction_ID: ${newBid.auction_id} - ${auth.email} - ${auth.uid}`)
//   }
// }
// });

module.exports = router;
