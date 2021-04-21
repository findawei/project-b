import React, {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {connect} from 'react-redux';
import CardSection from './CardSection';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Collapse, Button} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import {createIntent} from "../../flux/actions/stripeActions"

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


const CardSetupForm = ({createIntent, getPublicStripeKey, stripeRedux}) => {
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

  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false)
    if(!stripe || !elements) {
      return;
    }
      // console.log(stripeRedux.intent)
      if (error) {
        elements.getElement("card").focus();
        return;
      }
      if(!stripeRedux.intent){
        createIntent()
      }
      if (cardComplete) {
        setProcessing(true);
      }

      if(stripeRedux.intent && stripeRedux.intent.client_secret){
        const result = await stripe.confirmCardSetup(stripeRedux.intent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }})
        if (result.error) {
          setOpen(true)
          setSeverity("error")
        } else { 
          // console.log("Stripe 23 | token generated!");
          setOpen(true)
          setSeverity("success")
          setAlertMsg("Card added!")
          setPaymentMethod(result.paymentMethod);
          console.log(result)
        }
      }
      setProcessing(false);
    
  }

  return paymentMethod ? (
      <div className="Result">
        <div className="ResultTitle" role="alert">
          Payment successful
        </div>
        <div className="ResultMessage">
          Thanks for trying Stripe Elements. No money was charged, but we
          generated a PaymentMethod: {paymentMethod.id}
        </div>
      </div>
    )
    :
    (
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
          {error && <div>{error.message}</div>}
        </Alert>
        </Collapse>
        </div>
        
      <SubmitButton 
        processing={processing} 
        error={error} 
        disabled={!stripe}
      >
        Submit Card
      </SubmitButton>
    </form>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  stripeRedux: state.stripeRedux
});

export default connect(mapStateToProps, {createIntent})(CardSetupForm);