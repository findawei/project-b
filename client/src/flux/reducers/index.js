import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer";
import stripeReducer from "./stripeReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  item: itemReducer,
  stripeRedux: stripeReducer,
  error: errorReducer,
});
