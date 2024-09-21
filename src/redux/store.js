import {  configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
 });

const store = configureStore(
  { reducer: rootReducer }, 
  applyMiddleware(thunk)
);

export default store;