import {combineReducers} from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import stripeReducer from './stripeReducer';
import ReduxStore from '@uppy/store-redux'


export default combineReducers({
    auth: authReducer,
    item: itemReducer,
    stripeRedux: stripeReducer,
    uppy: ReduxStore.reducer
});

