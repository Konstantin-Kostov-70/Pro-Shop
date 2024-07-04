import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Image, ListGroup, ListGroupItem, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

function PlaceOrderPage() {

  const cart = useSelector(state => state.cart);

  const itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  const shippingPrice = (itemPrice > 500 ? 0 : 12).toFixed(2);
  const taxPrice = Number(itemPrice * 0.082).toFixed(2);
  const totalPrice = (Number(itemPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  const placeOrder = () => {
    console.log('placed order');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row id='place-order-container' className='justify-content-between'>
      <h2 className='heading'>Place Order</h2>
        <Col md={7}>
          <ListGroup variant='flush'>
            <ListGroupItem className='payment px-1 py-3'>
              <h4 className='heading-xs'>Shipping</h4>
              <p>
                <strong>Address: </strong>
                { cart.shippingAddress.address }, { cart.shippingAddress.city }
                { '  ' }
                { cart.shippingAddress.postalCode },
                { '  ' }
                { cart.shippingAddress.country }
              </p>
            </ListGroupItem>

            <ListGroupItem className='payment px-1 py-3'>
              <h4 className='heading-xs'>Payment Method</h4>
              <p>
                <strong>Method: </strong>
                { cart.paymentMethod }
              </p>
            </ListGroupItem>
            <ListGroupItem className='payment px-1 py-3' >
              <h4 className='heading-xs'>Order Items</h4>
              {cart.cartItems.length === 0 ? <Message variant='success'>Your Cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem className='order-items' key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image}  alt={item.name} fluid/>
                        </Col>
                        <Col md={5}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
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
          <Card className='h-100'>
            <ListGroup className='h-100 justify-content-between' variant='flush'>
              <ListGroupItem>
                <h4 className='heading-xs'>Order Summary</h4>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Item: </Col>
                  <Col>${itemPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total: </Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button 
                  className='btn-block'
                  type='button'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderPage
