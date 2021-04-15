import axios from 'axios';
import {CREATE_SETUP_INTENT, STRIPE_ERROR, GET_CARD, STRIPE_LOADING} from './types'
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import {
  useStripe,
  useElements,
  CardNumberElement
} from '@stripe/react-stripe-js';

export const createIntent = () => async (
    dispatch, getState
    ) => {
  
      const header = await tokenConfig();
    dispatch(setStripeLoading());
    try{
        axios
        .post('/api/stripe/newCustomer/',{}, header)
        .then(res=>
          dispatch({
            type: CREATE_SETUP_INTENT,
            payload: res.data
          }))
      }
    catch(err) {
      dispatch(returnErrors(err.response.data, err.response.status, 'STRIPE_ERROR'));
      dispatch({
        type: STRIPE_ERROR,
        });
      };
  };

export const setStripeLoading = () => {
    return {
        type: STRIPE_LOADING
    };
};


export const getPublicStripeKey = () => async() => {
  
  // const header = await tokenConfig();

    axios
      .get(`/public-key`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json("Stripe Connected <->");
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        console.log("API error:", { data });
        throw Error("API Error");
      } else {
        return data.publicKey;
      }
    });
};

export const getCard = () => async (
  dispatch, getState
  ) => {

    const header = await tokenConfig();

    dispatch(setStripeLoading());
    axios
        .get('/api/stripe/card', header)
        .then(res=>
            dispatch({
                type: GET_CARD,
                payload: res.data
            })
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'STRIPE_ERROR'));
          dispatch({
            type: STRIPE_ERROR
          });
        });
};