const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Item = require('../../models/item');
const config =require( '../../config');
const sgMail = require('@sendgrid/mail')
const {usersLogger, transactionLogger} = require('../../logger/user_logger');

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
    transactionLogger.info('Stripe', { error: `${e}`}, {uid: `${res.currentUser.uid}`});

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

//Coming from outside API -> MongoDB
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

                const paymentIntents = await stripe.paymentIntents.list({
                  customer: user.stripe_id
                });
                //Get the intent  
                const foundIntent = paymentIntents.data.find(({status}) => status === 'requires_capture')
                //Charge the intent
                const paymentIntent = await stripe.paymentIntents.capture(`${foundIntent.id}`);
                //Update item status
                if(paymentIntent.status === 'succeeded'){
                  //Find auction
                  const updateItem = await 
                  Item.findOneAndUpdate({_id: single.auction_id}, {
                    status: "completed",
                    },{ new: true});
                  console.log("*** Item Updated ***")
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
                    reference: updateItem.reference_number,
                    year: updateItem.year,
                    endDate: updateItem.endDate.toISOString().substring(0, 10),
                    fee: `$${auction.bid*0.05}`,
                    receipt_id: auction._id.substring(0,8),
                    auction_id: auction._id,
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
                    res.status(200).json('Email sent')
                  })
                  .catch((error) => {
                    console.error(error)
                    res.status(400).json('Something went wrong.')
                  })
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

//Place hold on cc with bid amount
router.post('/bid', async (req, res) =>{
  const auth = req.currentUser;
  if(auth){
  const newBid = {
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
                  amount: (newBid.bid >= 100000? 100000 : (newBid.bid <= 5000? 5000 : newBid.bid))*100*0.05,
                  currency: 'usd',
                  customer: (user.stripe_id),
                  payment_method: (user.stripe_cc),
                  off_session: true,
                  confirm: true,
                  capture_method: 'manual',
                });
                if(paymentIntent.status === 'requires_capture'){
                  res.status(200).json(paymentIntent);
                } 
              }         
      } catch (err) {
        // Error code will be authentication_required if authentication is needed
        console.log('Error code is: ', err.code);        
        const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
        console.log('PI retrieved: ', paymentIntentRetrieved.id);
        res.status(400).json(paymentIntentRetrieved.id);
        console.log(err)
    }
}})

// //Retrieve paymentIntent & charge -> used for auction winner
// router.post('/test', async (req, res) =>{
//   const auth = req.currentUser;
//     if(auth){
//       try{
//         //Get stripe_id
//         const user = await User.findOne({uid: req.currentUser.uid})
//           if (!user.stripe_id) throw Error("User doesn't have a stripe id");
//         //Customer Exists, check if paymentIntent Exists
//         const paymentIntents = await stripe.paymentIntents.list({
//             customer: user.stripe_id
//           });
       
//           //Get the intent  
//           const foundIntent = paymentIntents.data.find(({status}) => status === 'requires_capture')
//           //Charge the intent
//           const paymentIntent = await stripe.paymentIntents.capture(`${foundIntent.id}`);
//           //Update item status
//           if(paymentIntent.status === 'succeeded'){
//           res.status(200).json(paymentIntent)
//           }
//         }
//         catch (err) {
//           // Error code will be authentication_required if authentication is needed
          
//           res.status(400).json(err);
//           console.log(err)
//       }
//     }
// })

        

module.exports = router;
