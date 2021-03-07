import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  USER_POINTS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_SUCCESS,
  RESET_ERROR
} from './types';
import firebase from '../../firebase';
import { config } from 'process';

export var accessToken = '';
// Check token & load user
export const loadUser = () => async(dispatch, getState) => {
  // User loading
  try{
    dispatch({ type: USER_LOADING });
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user) {
        dispatch({
                type: USER_LOADED,
                payload: user
              });
        
        // let accessToken = user
        // console.log(accessToken)
        
        // Get mongodb userID and set as user
        const header = await tokenConfig();
        try{
        axios
        .get('/api/auth/user', header)
        .then(res =>
          dispatch({
            type: USER_LOADED,
            payload: res.data
          })
        )}
        catch(err) {
          dispatch((err.response.data, err.response.status));
          dispatch({
            type: AUTH_ERROR
          });
        };
          }
      else {
        accessToken = 'five'
      }
    });
} catch (err) {
  dispatch({
          type: AUTH_ERROR
        });
  console.log(err);
}};



// Log points to user profile
export const logPoints = (user) => async (dispatch) => {

  const header = await tokenConfig();
  try{
    axios
    .put('/api/auth/points', user, header)
    .then(res=>
      dispatch({
        type: USER_POINTS,
        payload: res.data
      }))
  }
  catch(err) {
    dispatch({
      type: AUTH_ERROR
      });
    };
}; 

// Register User
export const register = ({email, password }) => async(
  dispatch
) => {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(dataBeforeEmail => {
        firebase.auth().onAuthStateChanged(function(user) {
          user.sendEmailVerification();
        });
          })
      .then(dataAfterEmail => {
        firebase.auth().onAuthStateChanged(async function(user) {
          if (user) {
            // Sign up successful
            dispatch({
              type: REGISTER_SUCCESS,
              payload:user
            });

            const header = await tokenConfig();
            // const uid = firebase.auth().currentUser!.uid
              // Request body
              // const body = JSON.stringify(_id);
            try{
              axios
              .post('/api/auth/',{}, header)
              .then(res=>
                dispatch({
                  type: REGISTER_SUCCESS,
                  payload: res.data
                }))
            }
            catch(err) {
              dispatch({
                type: REGISTER_FAIL,
                payload:
                    "Something went wrong, we couldn't create your account. Please try again."
                });
              };

          } else {
            // Signup failed
            dispatch({
              type: REGISTER_FAIL,
              payload:
                "Something went wrong, we couldn't create your account. Please try again."
            });
          }
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FAIL,
          payload:
            "Something went wrong, we couldn't create your account. Please try again."
        });
      });
  } catch(err) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        "Something went wrong, we couldn't create your account. Please try again."
    });
  }
}

// Login User
export const login = ( {email, password}) => async(
  dispatch
) => {
  try{
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
          if (data.user.emailVerified) {
            console.log("IF", data.user.emailVerified);
            dispatch({ type: LOGIN_SUCCESS });
          } else {
            console.log("ELSE", data.user.emailVerified);
            dispatch({
              type: REGISTER_FAIL,
              payload: "You haven't verified your e-mail address."
            });
          }
        })
    .catch(err =>{
      // dispatch(
        // returnErrors(err.message, err.code, 'LOGIN_FAIL')
    
      dispatch({
        type: LOGIN_FAIL,
        payload: "Invalid login credentials"
      })
    })
  } catch(err) {
        dispatch({
        type: LOGIN_FAIL,
        payload: "Invalid login credentials"
          // returnErrors(err.message, err.code, 'LOGIN_FAIL')
        });
        // dispatch({
        //   type: LOGIN_FAIL
        // });
      }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        dispatch({
          type: RESET_SUCCESS,
          payload:
            "Check your inbox. We've sent you a secured reset link by e-mail."
        })
      )
      .catch(() => {
        dispatch({
          type: RESET_ERROR,
          payload:
            "Oops, something went wrong we couldn't send you the e-mail. Try again and if the error persists, contact admin."
        });
      });
  } catch (err) {
    dispatch({ type: RESET_ERROR, payload: err });
  }
};

// Logout User
export const logout = () => async (dispatch) =>{
  try {
    await firebase.auth().signOut();
    dispatch({
      type: LOGOUT_SUCCESS
    });
  } catch (err) {
    console.log(err);
  }
};

// Setup config/headers and token
export const tokenConfig = async () => {
  const user = firebase.auth().currentUser;
  const token = user && (await user.getIdToken());

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

