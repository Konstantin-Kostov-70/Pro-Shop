import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,

  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,

  LIST_ORDERS_REQUEST,
  LIST_ORDERS_SUCCESS,
  LIST_ORDERS_FAIL,

  LIST_MY_ORDERS_REQUEST,
  LIST_MY_ORDERS_SUCCESS,
  LIST_MY_ORDERS_FAIL,

  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
   
    const { data } = await axios.post("/api/orders/add/", order, config);
   
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, config);
    
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
   
    const { data } = await axios.put(
      `/api/orders/${id}/pay/`, 
      paymentResult,
      config,
    );
    
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const deliverOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
   
    const { data } = await axios.put(
      `/api/orders/deliver/${order._id}/`, 
      {},
      config,
    );
    
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listOrdersActions = (keyword = '') => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_ORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${keyword}`, config);
    
    dispatch({
      type: LIST_ORDERS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: LIST_ORDERS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const listMyOrders = (keyword = '') => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_MY_ORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get(`/api/orders/myorders/${keyword}`, config);
    
    dispatch({
      type: LIST_MY_ORDERS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: LIST_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
