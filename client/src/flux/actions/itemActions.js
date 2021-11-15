import axios from "axios";
import {
  ITEM_ERROR,
  GET_ITEMS,
  GET_ITEM,
  SET_CURRENTITEM,
  UPDATE_ITEM,
  CLEAR_CURRENTITEM,
  ITEMS_LOADING,
  ADD_ITEM,
  DELETE_ITEM,
  BID_ITEM,
  SET_SEARCH,
  COMMENT_ITEM,
  SUBMIT_ITEM,
  GET_ITEMS_REVIEW,
  CLEAR_SEARCH,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import ReactGA from "react-ga";
import io from "socket.io-client";

let socket;

export const socketConnect = () => {
  socket = io({
    auth: async (b) => {
      const responseToken = await tokenConfig();
      b({ token: responseToken.token });
    },
  }).connect("/");
};

export { socket };

export const getItems = () => async (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
      );
      dispatch({
        type: ITEM_ERROR,
      });
    });
};

export const getItemsForReview = () => async (dispatch, getState) => {
  const responseToken = await tokenConfig();

  dispatch(setItemsLoading());
  axios
    .get("/api/items/for_review", responseToken.config)
    .then((res) =>
      dispatch({
        type: GET_ITEMS_REVIEW,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
      dispatch({
        type: ITEM_ERROR,
        payload: err.data,
      });
      console.log(err);
    });
};

export const getItemById = (id) => async (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/items/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
      dispatch({
        type: ITEM_ERROR,
        payload: err.data,
      });
    });
};

export const submitItem = (item) => async (dispatch, getState) => {
  const responseToken = await tokenConfig();
  axios
    .post("/api/items/submit", item, responseToken.config)
    .then(
      (res) =>
        dispatch({
          type: SUBMIT_ITEM,
          payload: res.data,
        }),
      ReactGA.event({
        category: "Auction",
        action: "User submitted a watch",
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
      );
      dispatch({
        type: ITEM_ERROR,
      });
    });
};

export const updateItemEndDate = (item) => async (dispatch, getState) => {
  const responseToken = await tokenConfig();
  axios
    .put(`/api/items/endDate/${item._id}`, item, responseToken.config)
    .then((res) =>
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
      );
      dispatch({
        type: ITEM_ERROR,
      });
    });
};

export const bidOnItem = (item, auth) => async (dispatch) => {
  socket.emit("bidOnItem", item);

  try {
    const responseToken = await tokenConfig();
    let stripe_bid = item;
    axios
      .post("/api/stripe/bid", stripe_bid, responseToken.config)
      .then((res) => {
        dispatch({
          type: BID_ITEM,
          payload: res.data,
        });
      });
    //Trigger growsurf referral
    if (window.growsurf) {
      window.growsurf.triggerReferral(auth.user.email);
    }

    ReactGA.event({
      category: "Auction",
      action: "User placed a bid",
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ITEM_ERROR")
    );
    dispatch({
      type: ITEM_ERROR,
    });
  }
};

export const commentItem = (item) => async () => {
  socket.emit("commentItem", item);
};

export const setCurrentItem = (item) => {
  return {
    type: SET_CURRENTITEM,
    payload: item,
  };
};

export const setSearchTerm = (searchTerm) => {
  return {
    type: SET_SEARCH,
    payload: searchTerm,
  };
};
// clear current search
export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
  };
};

// clear current log
export const clearCurrentItem = () => {
  return {
    type: CLEAR_CURRENTITEM,
  };
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

// export const addItem = (item) => (
//   dispatch,
//   getState
//   ) => {
//     axios
//     .post('/api/items', item, tokenConfig(getState))
//     .then(res=>
//         dispatch({
//             type: ADD_ITEM,
//             payload: res.data
//         })
//         )
//         .catch(err => {
//           dispatch(
//             returnErrors(err.response.data, err.response.status, 'ITEM_ERROR')
//             );
//           dispatch({
//             type: ITEM_ERROR
//           });
//         });
// };

//   export const deleteItem = (id) => (
//     dispatch,
//     getState
//     ) =>{
//     axios
//       .delete(`/api/items/${id}`, tokenConfig(getState))
//       .then(res =>
//         dispatch({
//         type: DELETE_ITEM,
//         payload: id
//     })
//     )
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
//       dispatch({
//         type: ITEM_ERROR
//       });
//     });
// };

// export const updateItemBid = (item) => async(
//     dispatch,
//     getState
//     ) => {

//     const header = await tokenConfig();

//     axios
//     .put(`/api/items/${item._id}`, item, header)
//     .then(res=>
//       dispatch({
//         type: BID_ITEM,
//         payload: res.data
//       }))
//       .catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
//         dispatch({
//           type: ITEM_ERROR
//         });
//       });
//   };
