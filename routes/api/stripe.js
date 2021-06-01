const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Item = require('../../models/item');
const config =require( '../../config');
const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = config;
sgMail.setApiKey(SENDGRID_API_KEY)

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

router.post('/processPayment', async (req, res) =>{
  try {
    const newItem = req.body.results;
    const auctions = newItem
        .map(x =>({
          auction_id: x._id.$oid,
          status: x.status,
          bid: x.bidHistory.bid.$numberInt,
          name: x.bidHistory.name,
          user_id: x.bidHistory.user
        }))
    const single = auctions[0]
          // //Perform charge here
        if(single){
          try {
            //Get stripe_id
            const user = await User.findOne({uid: single.user_id})
              if (user && !user.stripe_id) {
                throw Error("User doesn't have a stripe id");
              } else if(user && user.stripe_id){              
                const paymentIntent = await stripe.paymentIntents.create({
                  amount: single.bid*100,
                  currency: 'usd',
                  customer: (user.stripe_id),
                  payment_method: (user.stripe_cc),
                  off_session: true,
                  confirm: true,
                });
                //Update item status
                if(paymentIntent.status === 'succeeded'){
                  //Find auction
                  const updateItem = await 
                  Item.findOneAndUpdate({_id: single.auction_id}, {
                    status: "completed",
                    },{ new: true});
                  console.log("*** Item Updated ***")
                  //Send email to buyer
                }
                res.status(200).json(paymentIntent);
            } else {
              res.status(400).json('Something went wrong.')
            }
          } catch (err) {
            // Error code will be authentication_required if authentication is needed
            console.log('Error code is: ', err.code);        
            const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
            console.log('PI retrieved: ', paymentIntentRetrieved.id);
            res.status(400).json(paymentIntentRetrieved.id);
            console.log(err)
          }  
        } 
  } catch (err) {        
    res.status(400).json(err);
  }  
})

router.post('/test2', async (req, res) =>{
  const auction = 
        ({
          _id: req.body._id,
          status: req.body.status,
          bid: req.body.bid,
          name: req.body.name,
          user_id: req.body.user_id
        })
        let fee = auction.bid*0.05
        res.status(200).json(fee)
})

router.post('/test', async (req, res) =>{
  const auction = 
        ({
          _id: req.body._id,
          status: req.body.status,
          bid: req.body.bid,
          name: req.body.name,
          user_id: req.body.user_id
        })
  try {  
          // //Perform charge here
        if(auction){
          try {
            //Get stripe_id
            const user = await User.findOne({uid: auction.user_id})
              if (user && !user.stripe_id) {
                throw Error("User doesn't have a stripe id");
              } else if(user && user.stripe_id){
                const auctionFound = await Item.findOne({_id: auction._id})

                templates = {
                  Auction_Won: "d-e5d27a992b014284aa678ea222d843de"
              };
                const msg = {
                  to: `${user.email}`, // Change to your recipient
                  from: 'alex@nowaitlist.co', // Change to your verified sender
                  name: "Alex from No Wait List",
                  
                  template_id:"d-e5d27a992b014284aa678ea222d843de",
        
                  dynamic_template_data: {
                    subject: `Hey ${user.name}, you won the ${auctionFound.brand} ${auctionFound.reference_number} - ${auctionFound.year} 🎉`,
                    name: user.name,
                    email: user.email,
                    brand: auctionFound.brand,
                    model: auctionFound.model,
                    year: auctionFound.year,
                    fee: `$${auction.bid*0.05}`,
                    auction_id: auction._id,
                    amount_due: `$${auction.bid}`,
                    receipt_details: [{
                      description: `${auctionFound.brand} ${auctionFound.reference_number} - ${auctionFound.year}`,
                      amount: `$${auction.bid}`,
                    }]

                   }
                }
                sgMail
                  .send(msg)
                  .then(() => {
                    console.log('Email sent')
                    res.status(200).json('Email sent')
                  })
                  .catch((error) => {
                    console.error(error)
                    res.status(400).json('Something went wrong.')
                  })
              
                // const paymentIntent = await stripe.paymentIntents.create({
                //   amount: single.bid*100,
                //   currency: 'usd',
                //   customer: (user.stripe_id),
                //   payment_method: (user.stripe_cc),
                //   off_session: true,
                //   confirm: true,
                // });
                // //Update item status
                // if(paymentIntent.status === 'succeeded'){
                //   //Find auction
                //   const updateItem = await 
                //   Item.findOneAndUpdate({_id: single.auction_id}, {
                //     status: "completed",
                //     },{ new: true});
                //   console.log("*** Item Updated ***")
                //   //Send email to buyer
                // }
                // res.status(200).json(paymentIntent);
            } else {
              res.status(400).json('Something went wrong.')
            }
          } catch (err) {
            // Error code will be authentication_required if authentication is needed
            console.log('Error code is: ', err.code);        
            const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
            console.log('PI retrieved: ', paymentIntentRetrieved.id);
            res.status(400).json(paymentIntentRetrieved.id);
            console.log(err)
          }  
        } 
  } catch (err) {        
    res.status(400).json(err);
  }  
})

module.exports = router;
