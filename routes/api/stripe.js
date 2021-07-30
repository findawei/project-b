const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Item = require('../../models/item');
const config =require( '../../config');
const {usersLogger, transactionLogger} = require('../../logger/logger');



router.get("/public-key", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

router.get('/secret', async (req, res) => {
  try{
  res.json({client_secret: intent.client_secret});
  }
  catch(e){
    console.log(e)
    transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e}`);

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
    transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e} - ${auth.email} - ${auth.uid}`);
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
    transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e} - ${auth.email} - ${auth.uid}`);
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
          if (!user.stripe_id) {
            throw Error("User doesn't have a stripe id"),
            transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - User doesn't have a stripe id - ${auth.email} - ${auth.uid}`);
          };
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
        transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e} - ${auth.email} - ${auth.uid}`);
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
    transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${e} - ${auth.email} - ${auth.uid}`);
  }
  }
});

//Coming from outside API -> MongoDB
router.post('/processPayment', async (req, res) =>{
  try {
    const auction = {
      auction_id: req.body.result._id.$oid,
      status: req.body.result.status,
      bid: req.body.result.bidHistory[0].bid.$numberInt,
      name: req.body.result.bidHistory[0].name,
      user_id: req.body.result.bidHistory[0].user
    };
          // //Perform charge here
        if(typeof(auction) != "undefined"){
          try {
            //Get stripe_id
            const user = await User.findOne({uid: auction.user_id})
              if (user && !user.stripe_id) {
                throw Error("User doesn't have a stripe id"),
                transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - User doesn't have a stripe id - Bid: ${auction.bid} - Auction_ID: ${auction.auction_id} - ${user.email} - ${auction.user_id}`);

              } else if(user && user.stripe_id){    

                const paymentIntents = await stripe.paymentIntents.list({
                  customer: user.stripe_id
                });
                //Get the intent  
                const foundIntent = paymentIntents.data.find(({status}) => status === 'requires_capture')
                // if(!foundIntent) {
                //   res.status(400).json('No payment intent found.')
                //   transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - No payment intent found - Bid: ${auction.bid} - Auction_ID: ${auction.auction_id} - ${user.email} - ${user.uid}`);
                // }
                //Charge the intent
                const paymentIntent = await stripe.paymentIntents.capture(`${foundIntent.id}`);

                //Update item status
                if(paymentIntent.status === 'succeeded'){
                  //Find auction
                  const updateItem = await Item.findOneAndUpdate({_id: auction.auction_id}, {status: "completed"},{ new: true});
                  console.log("*** Item Updated ***")
                  transactionLogger.info(`Payment Successful - ${req.originalUrl} - ${req.method} - Fee(/100): ${paymentIntent.amount_received} - Auction_ID: ${auction.auction_id} - ${user.email} - ${user.uid}`)
                  //Send email to buyer
                const auctionSeller = await User.findOne({uid: updateItem.user})

                templates = {
                  Auction_Won: "d-e5d27a992b014284aa678ea222d843de"
              };
                const msg = {
                  to: `${user.email}`, // Change to your recipient
                  from: 'alex@nowaitlist.co', // Change to your verified sender
                  name: "Alex from No Wait List",
                  
                  template_id:"d-e5d27a992b014284aa678ea222d843de",
        
                  dynamic_template_data: {
                    subject: `Hey ${user.name}, you won the ${updateItem.brand} ${updateItem.reference_number} - ${updateItem.year} 🎉`,
                    name: user.name,
                    email: user.email,
                    brand: updateItem.brand,
                    model: updateItem.model,
                    item_image: updateItem.img[0].url,
                    reference: updateItem.reference_number,
                    year: updateItem.year,
                    endDate: updateItem.endDate.toISOString().substring(0, 10),
                    fee: `$${auction.bid*0.05}`,
                    receipt_id: auction.auction_id.substring(0,8),
                    auction_id: auction.auction_id,
                    amount_due: `$${auction.bid}`,
                    seller_username: auctionSeller.name,
                    seller_email: auctionSeller.email,
                    seller_phone: auctionSeller.phone,
                    receipt_details: [{
                      description: `${updateItem.brand} ${updateItem.reference_number} ${updateItem.reference_number} - ${updateItem.year}`,
                      amount: `$${auction.bid}`,
                    }]

                   }
                }
                sgMail
                  .send(msg)
                  .then(() => {
                    console.log('Email sent')
                    // res.status(200).json('Email sent')
                  })
                  .catch((error) => {
                    console.error(error)
                    res.status(400).json('Something went wrong.')
                    transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${error} - Bid: ${auction.bid} - Auction_ID: ${auction.auction_id} - ${user.email} - ${user.uid}`)
                  })
                }
                res.status(200).json(paymentIntent);
            } else {
              res.status(400).json('Something went wrong.')
              transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${error} - Bid: ${auction.bid} - Auction_ID: ${auction.auction_id} - ${user.email} - ${user.uid}`);
            }
          } catch (err) {
            // Error code will be authentication_required if authentication is needed
            console.log('Error code is: ', err);        
            // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
            // console.log('PI retrieved: ', paymentIntentRetrieved.id);
            res.status(400).json(err);
            transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err} - Bid: ${auction.bid} - Auction_ID: ${auction.auction_id} - ${user.email} - ${user.uid}`);
          }  
        } 
  } catch (err) {        
    res.status(400).json(err);
    transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err}`);
  }  
})

//Place hold on cc with bid amount
router.post('/bid', async (req, res) =>{
  const auth = req.currentUser;
  if(auth){
  const newBid = {
    auction_id: req.body._id,
    bid: req.body.bid,
    name: req.currentUser.name,
    user_uid: req.currentUser.uid
  };
    try{
      //  res.status(200).json(newBid)
       const user = await User.findOne({uid: newBid.user_uid})
              if (user && !user.stripe_id) {
                throw Error("User doesn't have a stripe id");
              } else if(user && user.stripe_id){              
                const paymentIntent = await stripe.paymentIntents.create({
                  //max $5000, min $250
                  // amount: (newBid.bid >= 100000? 100000 : (newBid.bid <= 5000? 5000 : newBid.bid))*100*0.05,
                  //max $5000, no min
                  amount: ((newBid.bid >= 100000? 100000 : newBid.bid)*100*0.05),
                  currency: 'usd',
                  customer: (user.stripe_id),
                  payment_method: (user.stripe_cc),
                  off_session: true,
                  confirm: true,
                  capture_method: 'manual',
                });
                if(paymentIntent.status === 'requires_capture'){
                  res.status(200).json(paymentIntent);
                  transactionLogger.info(`Bid Successful - ${req.originalUrl} - ${req.method} - Bid: ${newBid.bid} - Auction_ID: ${newBid.auction_id} - ${auth.email} - ${auth.uid}`)
                } 
              }         
      } catch (err) {
        // Error code will be authentication_required if authentication is needed
        console.log('Error code is: ', err.code);        
        const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
        console.log('PI retrieved: ', paymentIntentRetrieved.id);
        res.status(400).json(paymentIntentRetrieved.id);
        transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err} - Bid: ${newBid.bid} - Auction_ID: ${newBid.auction_id} - ${auth.email} - ${auth.uid}`)
      }
}})

//Place hold on cc with bid amount
router.post('/test', async (req, res) =>{
  // const auth = req.currentUser;
  // if(auth){
  const newBid = {
    auction_id: req.body.result._id.$oid,
    bid: req.body.result.bidHistory[0].bid.$numberInt,
    name: req.body.result.bidHistory[0].name,
    user_uid: req.body.result.bidHistory[0].user
  };
  if (newBid){
    res.status(200).json(newBid)
    transactionLogger.info(`Bid Successful - ${req.originalUrl} - ${req.method} - Bid: ${newBid.bid} - Auction_ID: ${newBid.auction_id} - ${newBid.name} - ${newBid.user_uid}`)
  } else {
    res.status(400).json('Something went wrong');
    transactionLogger.error(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} - Bid: ${newBid.bid} - Auction_ID: ${newBid.auction_id} - ${auth.email} - ${auth.uid}`)
  }
//}
});

module.exports = router;
