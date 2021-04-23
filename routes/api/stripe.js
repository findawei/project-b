const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.get("/public-key", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

router.get('/secret', async (req, res) => {
  try{
  res.json({client_secret: intent.client_secret});
  }
  catch(e){
    console.log(e)
  }
});

router.get('/getCustomer', async (req, res) => {
  const auth = req.currentUser;
  if(auth){
    try{
    const customer = await stripe.customers.list({
      email: auth.email,
    });
    res.json(customer)
    // console.log(auth)
  }catch(e){
    console.log(e)
  }
  }
});

router.post('/newCustomer', async (req, res) =>{
  const auth = req.currentUser;
if(auth){
  try{
    const customer = await stripe.customers.list({
        email: auth.email
      })
    //Customer doesn't Exists, create one  
    if(customer.data.length === 0){
    //Create new Stripe Customer
      const customer = await stripe.customers.create({
        email: auth.email
      });
      res.status(200).json(customer);
    } else {
      //customer exists
      res.status(200).json(customer.data[0]);
    }
  }catch(e){
    console.log(e)
  }
  }
  return;
})

router.post('/createIntent', async (req, res) =>{
  const auth = req.currentUser;
    if(auth){
      try{
        //Get stripe_id
        const user = await User.findOne({uid: req.currentUser.uid})
          if (!user.stripe_id) throw Error("User doesn't have a stripe id");
        //Customer Exists, check if setupIntents Exists
        const setupIntents = await stripe.setupIntents.list({
            customer: user.stripe_id
          });
        
            // if no Setupintents found, create one
        if(setupIntents.data.length === 0){
          const intent = await stripe.setupIntents.create({
            customer: user.stripe_id
          })
          res.status(200).json(intent);
        } else {
          //Get the intent  
          const foundIntent =  setupIntents.data.find(({status}) => status === 'requires_payment_method')
          res.status(200).json(foundIntent)
        }
      }catch(e){
        console.log(e)
      }
    }
})


router.get('/card', async (req, res) => {
  const auth = req.currentUser;
  if(auth){
    try{
    const customer = await stripe.customers.list({
      email: auth.email,
    });

    if(customer.data.length === 0){
      res.json('no customer')
    } else {
      let card = await stripe.paymentMethods.list({
      customer: customer.data[0].id,
      type: 'card'
    });
      if(card.data.length === 0){
        res.json('no card')
      } else {
        res.json(card)
      }
    }   
  }catch(e){
    console.log(e)
  }
  }
});
  
// router.get('/customer', async (req, res) => {
//   const auth = req.currentUser;
//   if(auth){
//     try{
//     const customer = await stripe.customers.list({
//       email: auth.email,
//     });

//     if(customer.data.length === 0){
//       res.json('no customer')
//     } else {
//           res.json(customer)

//     }  
  
//   }catch(e){
//     console.log(e)
//   }
//   }
// });

module.exports = router;
