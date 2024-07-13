import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { 
  productListReducer, 
  productDetailReducer, 
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer, 
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer, 
  userListReducer, 
  userDeleteReducer, 
  userUpdateReducer, 
} from './reducers/userReducers'

import { 
  orderCreateReducers, 
  orderDetailsReducers, 
  orderPayReducers, 
  listMyOrdersReducers, 
} from './reducers/orderReducers'

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducers,
  listMyOrders: listMyOrdersReducers,

});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
   JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
  JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
  JSON.parse(localStorage.getItem('paymentMethod')) : 'Stripe'
  
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
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
