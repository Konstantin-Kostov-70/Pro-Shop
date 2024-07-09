import React, { useEffect, useState } from "react";
import { PayPalButton } from 'react-paypal-button-v2'
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from '../constants/orderConstants'


function OrderPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const [sdkReady, setSdkReady] = useState(false);

  let itemPrice = 0;
  
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.paypal.com/sdk/js?client-id=ARWp_XU9-J8EAm2qBZGCfvHKkuh0uEy7NLC-xD3bC8RLBCFfJUOKmiGAviA82TZsdOMU5QB9ABYSDury";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    
    script.onerror = (error) => {
      console.error("PayPal SDK could not be loaded.", error);
    }

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || order._id !== Number(id)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  if (!loading && !error) {
    itemPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }


  return loading ? (
      <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
        ) : (
      <div>
        <Row id="place-order-container" className="justify-content-between">
          <h3 className="heading">Order: {order._id}</h3>
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroupItem className="payment px-1 py-3">
                <h4 className="heading-xs">Shipping</h4>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                  {"  "}
                  {order.shippingAddress.postalCode},{"  "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on: {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="warning">Not Delivered</Message>
                )}
              </ListGroupItem>

              <ListGroupItem className="payment px-1 py-3">
                <h4 className="heading-xs">Payment Method</h4>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on: {order.payAt}</Message>
                ) : (
                  <Message variant="warning">Not Paid</Message>
                )}
              </ListGroupItem>
              <ListGroupItem className="payment px-1 py-3">
                <h4 className="heading-xs">Order Items</h4>
                {order.orderItems.length === 0 ? (
                  <Message variant="success">Your order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroupItem className="order-items" key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid />
                          </Col>
                          <Col md={5}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={5}>
                            {item.qty} x ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="h-100">
              <ListGroup
                className="h-100 justify-content-between"
                variant="flush"
              >
                <ListGroupItem>
                  <h4 className="heading-xs">Order Summary</h4>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Items: </Col>
                    <Col>${itemPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Shipping: </Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Tax: </Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Total: </Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
                {!order.isPaid && (
                  <ListGroupItem>
                    {loadingPay && <Loader />}

                    {!sdkReady ? (
                      <Loader />
                    ) : (
                    
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div> 
  );
}

export default OrderPage;
