import axios from "axios";
import {
  CREATE_SETUP_INTENT,
  STRIPE_ERROR,
  GET_CARD,
  STRIPE_LOADING,
  CREATE_NEW_CUSTOMER,
  USER_UPDATE,
  PAYMENT_INTENT,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const createIntent = () => async (dispatch, getState) => {
  const responseToken = await tokenConfig();
  dispatch(setStripeLoading());
  try {
    axios
      .post("/api/stripe/createIntent/", {}, responseToken.config)
      .then((res) =>
        dispatch({
          type: CREATE_SETUP_INTENT,
          payload: res.data,
        })
      );
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "STRIPE_ERROR")
    );
    dispatch({
      type: STRIPE_ERROR,
    });
  }
};

export const paymentIntent = (intent) => async (dispatch, getState) => {
  const responseToken = await tokenConfig();
  dispatch(setStripeLoading());
  try {
    axios
      .post("/api/stripe/paymentIntent/", intent, responseToken.config)
      .then((res) =>
        dispatch({
          type: PAYMENT_INTENT,
          payload: res.data,
        })
      );
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "STRIPE_ERROR")
    );
    dispatch({
      type: STRIPE_ERROR,
    });
  }
};

export const createCustomer = () => async (dispatch, getState) => {
  const responseToken = await tokenConfig();
  dispatch(setStripeLoading());
  try {
    axios
      .post("/api/stripe/newCustomer/", {}, responseToken.config)
      .then((res) => {
        //  dispatch({
        //   type: CREATE_NEW_CUSTOMER,
        //   payload: res.data
        // })
        let stripe_customer = res.data;
        axios
          .put(
            "/api/auth/addStripeId",
            { stripe_customer },
            responseToken.config
          )
          .then((res) =>
            dispatch({
              type: USER_UPDATE,
              payload: res.data,
            })
          );
      });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "STRIPE_ERROR")
    );
    dispatch({
      type: STRIPE_ERROR,
    });
  }
};

export const setStripeLoading = () => {
  return {
    type: STRIPE_LOADING,
  };
};

export const getPublicStripeKey = () => async () => {
  // const header = await tokenConfig();

  axios
    .get(`/public-key`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json("Stripe Connected <->");
      } else {
        return null;
      }
    })
    .then((data) => {
      if (!data || data.error) {
        console.log("API error:", { data });
        throw Error("API Error");
      } else {
        return data.publicKey;
      }
    });
};

export const getCard = () => async (dispatch, getState) => {
  const responseToken = await tokenConfig();
  dispatch(setStripeLoading());
  axios
    .get("/api/stripe/card", responseToken.config)
    .then((res) => {
      try {
        dispatch({
          type: GET_CARD,
          payload: res.data,
        });
      } catch (e) {
        console.log(res, e);
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "STRIPE_ERROR")
      );
      dispatch({
        type: STRIPE_ERROR,
      });
    });
};
