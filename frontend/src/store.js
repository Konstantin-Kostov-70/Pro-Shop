import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { productListReducer, productDetailReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer } from './reducers/userReducers'

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
   JSON.parse(localStorage.getItem('cartItems')) : []

   const userInfoFromStorage = localStorage.getItem('userInfo') ?
   JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage
  },
  userLogin: { 
     userInfo: userInfoFromStorage
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
