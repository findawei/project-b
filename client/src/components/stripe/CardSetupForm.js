import React, {useEffect, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {connect} from 'react-redux';
import CardSection from './CardSection';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Collapse, Button, Grid, Box, TextField} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import {createIntent, createCustomer} from "../../flux/actions/stripeActions"
import {addStripeCC} from "../../flux/actions/authActions"


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CardField = ({ onChange }) => (
<div className="FormRow">
    <CardElement options={CARD_ELEMENT_OPTIONS} onChange={onChange} />
</div>
)

const CardSetupForm = ({createIntent, getPublicStripeKey, stripeRedux, auth, createCustomer, addStripeCC}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [severity, setSeverity] = useState('')
  const [buttonMsg, setButtonMsg] = useState('Submit Card')

  const [cardComplete, setCardComplete] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

// useEffect(()=>{
//   if(paymentMethod){
//       console.log(paymentMethod)
//   }
// },[paymentMethod])

useEffect(()=>{
  if(auth.user && auth.user.stripe_id){
    console.log('stripe id exists')
    if(stripeRedux && stripeRedux.intent === null){
      createIntent()
    } 
  } else {
    createCustomer(); 
    if(stripeRedux && stripeRedux.intent === null){
      createIntent()
    } 
    console.log('create stripeid')
  }
},[auth])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false)
    if(!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    // if(stripeRedux && stripeRedux.intent === null){
    //   createIntent()
    // }  
    
    if (cardComplete) {
      setProcessing(true);
      setButtonMsg('Processing...')
    }

      if(stripeRedux && stripeRedux.intent && stripeRedux.intent.client_secret){
        const result = await stripe.confirmCardSetup(stripeRedux.intent.client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
          }})
        if (result.error) {
          setOpen(true)
          setSeverity("error")
          setAlertMsg(result.error.message)
        } else { 
            setOpen(true)
            setSeverity("success")
            setAlertMsg("Card added!")
            setPaymentMethod(true);

            //Save card result
            let stripeCC = {
              stripe_cc: result.setupIntent.payment_method
            }
            addStripeCC(stripeCC)
        }
      }
      setProcessing(false);
  }

  const SubmitButton = ({ processing, error, children, disabled }) => (
    <Button
      variant="contained"
      color="primary"
      // disabled={!stripe}
      className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
      type="submit"
      disabled={processing || disabled}
    >
      {processing ? "Processing..." : children}
    </Button>
  );

  return (
    <div>
    {paymentMethod ? 
      <div className="Result">
        <div className="ResultTitle" role="alert">
          Payment successful
        </div>
        <div className="ResultMessage">
          Thanks for trying Stripe Elements. No money was charged, but we
          generated a PaymentMethod: {paymentMethod.id}
        </div>
      </div>
    :
    <form className="Form" onSubmit={handleSubmit}>
      <CardField
          onChange={(e) => {
            setCardComplete(e.complete);
            setError(e.error);
            if(e.error){
              setOpen(true)
              setSeverity("error")
            }
          }}
        />
      <div 
      className={classes.root}
      >
      <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
            >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        >
          {alertMsg}
          {error && <div>{error.message}</div>}
        </Alert>
        </Collapse>
        </div>
        <SubmitButton
        processing={processing} 
        error={error} 
        disabled={!stripe || error}
      >
        {/* {buttonMsg} */}
        Submit Card
      </SubmitButton>      
    </form>
    }
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  stripeRedux: state.stripeRedux
});

export default connect(mapStateToProps, {createIntent, createCustomer, addStripeCC})(CardSetupForm);