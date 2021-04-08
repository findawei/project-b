import {combineReducers} from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import stripeReducer from './stripeReducer';

export default combineReducers({
    auth: authReducer,
    item: itemReducer,
    stripeRedux: stripeReducer
});