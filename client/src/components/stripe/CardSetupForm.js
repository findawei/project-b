import React, {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {connect} from 'react-redux';
import CardSection from './CardSection';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Collapse, Button} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import {createIntent} from "../../flux/actions/stripeActions"


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const CardSetupForm = ({createIntent, getPublicStripeKey, stripeRedux}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [severity, setSeverity] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false)
    if(!stripe || !elements) {
      return;
    }
      // console.log(stripeRedux.intent)
      if(!stripeRedux.intent){
        createIntent()
      }
      else if(stripeRedux.intent && stripeRedux.intent.client_secret){
        const result = await stripe.confirmCardSetup(stripeRedux.intent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }})
      

    if (result.error) {
      setOpen(true)
      setSeverity("error")
      setAlertMsg(result.error.message)
    } else { 
      // console.log("Stripe 23 | token generated!");
      setOpen(true)
      setSeverity("success")
      setAlertMsg('Card added!')
      console.log(result)
    }
      }
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <div className={classes.root}>
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
        </Alert>
        </Collapse>
        </div>
      <Button 
        variant="contained"
        color="primary"
        type='submit'
        disabled={!stripe}
      >
      Save Card
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  stripeRedux: state.stripeRedux
});

export default connect(mapStateToProps, {createIntent})(CardSetupForm);

// const CheckoutForm = ({createIntent, stripeRedux, getItems}) => {


// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       color: "#32325d",
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#aab7c4",
//       },
//     },
//     invalid: {
//       color: "#fa755a",
//       iconColor: "#fa755a",
//     },
//   },
// };

// const CardField = ({ onChange }) => (
//   <div className="FormRow">
//     <CardElement options={CARD_OPTIONS} onChange={onChange} />
//   </div>
// );
// const SubmitButton = ({ processing, error, children, disabled }) => (
//   <Button
//     variant="contained"
//     color="primary"
//     className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
//     type="submit"
//     disabled={processing || disabled}
//   >
//     {processing ? "Processing..." : children}
//   </Button>
// );

// const ErrorMessage = ({ children }) => (
//   <div className="ErrorMessage" role="alert">
//     {children}
//   </div>
// );

// const ResetButton = ({ onClick }) => (
//   <button type="button" className="ResetButton" onClick={onClick}>
//     <svg width="32px" height="32px" viewBox="0 0 32 32">
//       <path
//         fill="#FFF"
//         d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
//       />
//     </svg>
//   </button>
// );

//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [cardComplete, setCardComplete] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }
//     if (error) {
//       elements.getElement("card").focus();
//       return;
//     }

//     if (cardComplete) {
//       setProcessing(true);
//     }

//     // const client_secret = await createIntent()
//     // console.log(client_secret)
//     // if(!client_secret === null){
//     //   const payload = await stripe.confirmCardSetup(client_secret, {
//     //   payment_method: {
        
//     //     card: elements.getElement(CardElement),
//     //   }})

//     const payload = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//       // billing_details: billingDetails
//     });

//     setProcessing(false);

//     if (payload.error) {
//       setError(payload.error);
//     } else {
//       setPaymentMethod(payload.paymentMethod);
//     }
//     }
    
  

//   const reset = () => {
//     setError(null);
//     setProcessing(false);
//     setPaymentMethod(null);
//     // setBillingDetails({
//     //   email: "",
//     //   phone: "",
//     //   name: ""
//     // });
//   };

//   return paymentMethod ? (
//     <div className="Result">
//       <div className="ResultTitle" role="alert">
//         Payment successful
//       </div>
//       <div className="ResultMessage">
//         Thanks for trying Stripe Elements. No money was charged, but we
//         generated a PaymentMethod: {paymentMethod.id}
//       </div>
//       <ResetButton onClick={reset} />
//     </div>
//   ) : (
//     <form className="Form" onSubmit={handleSubmit}>
//       <div className="FormGroup">
//         <CardField
//           onChange={(e) => {
//             setError(e.error);
//             setCardComplete(e.complete);
//           }}
//         />
//       </div>
//       {error && <ErrorMessage>{error.message}</ErrorMessage>}
//       <SubmitButton processing={processing} error={error} disabled={!stripe}>
//         Add Card
//       </SubmitButton>
//     </form>
//   );
// };

// const CardSetupForm = () => {
//   return (
//         <CheckoutForm />
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   stripeRedux: state.stripeRedux
// });

// export default connect(mapStateToProps, {createIntent})(CardSetupForm);