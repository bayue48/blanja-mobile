import { combineReducers } from "redux";
import authReducer from './auth'
import cartReducer from './cart'
import addressReducer from './address'

const reducers = combineReducers({
  auth : authReducer,
  cart : cartReducer,
  address : addressReducer,
});

export default reducers;