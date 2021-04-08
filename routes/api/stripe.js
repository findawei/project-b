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

router.get('/stripe', async (req, res) => {
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
    //Customer doesn't Exists, create one & SetupIntents  
    if(customer.data.length === 0){
    //Create new Stripe Customer
    const customer = await stripe.customers.create({
      email: auth.email
    });

    const intent = await stripe.setupIntents.create({
      customer: customer.id,
    })
    res.status(200).json(intent);
    } 
    //Customer Exists, check if setupIntents Exists
    else {
      const setupIntents = await stripe.setupIntents.list({
        customer: customer.data[0].id
      });
      //No Setupintents found, create one
      if(setupIntents.data.length === 0){
        const intent = await stripe.setupIntents.create({
          customer: customer.data[0].id
        })
        res.status(200).json(intent);
        //Use 1st one in list and pass along client secret
      } else {
        res.status(200).json(setupIntents.data[0]);
      }
    }
  }catch(e){
    console.log(e)
  }
  }
  return;
})


router.get('/card', async (req, res) => {
  const auth = req.currentUser;
  if(auth){
    try{
    const customer = await stripe.customers.list({
      email: auth.email,
    });
    
    const card = await stripe.customers.listSources(
      customer.data[0].id,
    );

    res.json({card, customer})
    // console.log(auth)
  }catch(e){
    console.log(e)
  }
  }
});
  


// router.post("/create-setup-intent", async (req, res) => {
//   try {// Create or use an existing Customer to associate with the SetupIntent.
//   // The PaymentMethod will be stored to this Customer for later use.
//   const customer = await stripe.customers.create();

//   res.send(await stripe.setupIntents.create({
//     customer: customer.id
//   }));
// }
//   catch (error) {
//     console.log(error);
//     res.status(500).json({ statusCode: 500, message: error.message });
//   }
// });

module.exports = router;
