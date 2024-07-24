import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import QuantityAdjuster from "../components/QuantityAdjuster"; 

function CartPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get("qty") || 1;
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const increaseQty = (item) => {
    if (item.qty < item.countInStock) {
      dispatch(addToCart(item.product, Number(item.qty) + 1));
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  }

  const backToShopHandler = () => {
    navigate('/');
  }

  const decreaseQty = (item) => {
    if (item.qty > 1) {
      dispatch(addToCart(item.product, Number(item.qty) - 1));
    }
  };

  return (
    <Row id="cart-items-wrapper">
      <Col md={8} className="cart-items">
        <h1 className="heading">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link className="underline" to="/">Go to Shop</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row className="items-container">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}  className="cart-btn-wrapper">
                    <QuantityAdjuster
                      className='qty'
                      qty={item.qty}
                      countInStock={item.countInStock}
                      onIncrease={() => increaseQty(item)}
                      onDecrease={() => decreaseQty(item)}
                    />
                      <Button
                      className="rm-btn"
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                    
                  </Col>
                  <Col md={1}>
                    <Button
                      id='rm-button-responsive'
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="checkout-wrapper">
        <Card className="checkout">
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items
              </h4>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
          </ListGroup>
            <ListGroupItem className="py-2 px-3">
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroupItem>
            <ListGroupItem className="py-2 px-3">
              <Button
                type="button"
                className="btn-block"
                onClick={backToShopHandler}
              >
                Continue with Shopping
              </Button>
            </ListGroupItem>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
