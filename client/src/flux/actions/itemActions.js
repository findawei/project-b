import axios from 'axios';
import {ITEM_ERROR, GET_ITEMS, GET_ITEM, SET_CURRENTITEM, UPDATE_ITEM, CLEAR_CURRENTITEM, ITEMS_LOADING, ADD_ITEM, DELETE_ITEM, BID_ITEM, COMMENT_ITEM, SUBMIT_ITEM 
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import ReactGA from 'react-ga';

export const getItems = () => async (
  dispatch, getState
  ) => {

    const header = await tokenConfig();

    dispatch(setItemsLoading());
    axios
        .get('/api/items', header)
        .then(res=>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
          dispatch({
            type: ITEM_ERROR
          });
        });
};

export const getItemById = (id) => async (
  dispatch, getState
  ) => {

    const header = await tokenConfig();

    dispatch(setItemsLoading());
    axios
        .get(`/api/items/${id}`, header)
        .then(res=>
            dispatch({
                type: GET_ITEM,
                payload: res.data
            })
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
          dispatch({
            type: ITEM_ERROR
          });
        });
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

export const submitItem = (item) => async (
  dispatch,
  getState
  ) => {
    const header = await tokenConfig();
    axios
    .post('/api/items/submit', item, header)
    .then(res=>
        dispatch({
            type: SUBMIT_ITEM,
            payload: res.data
        }),
        ReactGA.event({
          category: "Auction",
          action: "User submitted a watch",
        })
        )
        .catch(err => {
          dispatch(
            returnErrors(err.response.data, err.response.status, 'ITEM_ERROR')
            );
          dispatch({
            type: ITEM_ERROR
          });
        });
};

export const updateItemEndDate = (item) => async(
  dispatch,
  getState
  ) => {

  const header = await tokenConfig();

  axios
  .put(`/api/items/endDate/${item._id}`, item, header)
  .then(res=>
    dispatch({
      type: UPDATE_ITEM,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
      dispatch({
        type: ITEM_ERROR
      });
    });
}; 

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


  export const bidOnItem = (item) => async(
    dispatch,
    getState
    ) => {

    const header = await tokenConfig();

    axios
    .post(`/api/items/bid/${item._id}`, item, header)
    .then(res=>{
        let stripe_bid = item;
        axios
        .post('/api/stripe/bid', stripe_bid, header)
          dispatch({
            type: BID_ITEM,
            payload: res.data
          })
          ReactGA.event({
            category: "Auction",
            action: "User placed a bid",
          })
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
        dispatch({
          type: ITEM_ERROR
        });
      });
  };
  
  export const commentItem = (item) => async(
    dispatch,
    getState
    ) => {

    const header = await tokenConfig();

    axios
    .post(`/api/items/comment/${item._id}`, item, header)
    .then(res=>
      dispatch({
        type: COMMENT_ITEM,
        payload: res.data
      }),
      ReactGA.event({
        category: "Auction",
        action: "User commented on auction",
      })
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
        dispatch({
          type: ITEM_ERROR
        });
      });
  }; 

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
  
  export const setCurrentItem = (item) => {
    return {
      type: SET_CURRENTITEM,
      payload: item
    }
  }

  // clear current log
  export const clearCurrentItem = () => {
    return {
      type: CLEAR_CURRENTITEM
    }
  }
  
  export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};


