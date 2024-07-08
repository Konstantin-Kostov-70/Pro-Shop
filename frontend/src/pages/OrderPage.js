import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, ListGroupItem, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

function OrderPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, error, loading} = orderDetails

    let itemPrice = 0
   

    useEffect(() => {

        if (!order || order._id !== Number(id)) {
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, id, order]);
    
    if (!loading && !error) {
         itemPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }

    const shippingPrice = (itemPrice > 500 ? 0 : 12).toFixed(2);
    const taxPrice = Number(itemPrice * 0.082).toFixed(2);
    const totalPrice = (Number(itemPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : ( 
        <div>
          <Row id='place-order-container' className='justify-content-between'>
          <h2 className='heading'>Order: {order._id}</h2>
            <Col md={7}>
              <ListGroup variant='flush'>
                <ListGroupItem className='payment px-1 py-3'>
                  <h4 className='heading-xs'>Shipping</h4>
                  <p><strong>Name: </strong>{order.user.name}</p>
                  <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                  <p>
                    <strong>Address: </strong>
                    { order.shippingAddress.address }, { order.shippingAddress.city }
                    { '  ' }
                    { order.shippingAddress.postalCode },
                    { '  ' }
                    { order.shippingAddress.country }
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>Delivered on: {order.deliveredAt}</Message>
                  ) : (
                    <Message variant='warning'>Not Delivered</Message>
                  )}
                </ListGroupItem>
    
                <ListGroupItem className='payment px-1 py-3'>
                  <h4 className='heading-xs'>Payment Method</h4>
                  <p>
                    <strong>Method: </strong>
                    { order.paymentMethod }
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on: {order.paidAt}</Message>
                  ) : (
                    <Message variant='warning'>Not Paid</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem className='payment px-1 py-3' >
                  <h4 className='heading-xs'>Order Items</h4>
                  {order.orderItems.length === 0 ? <Message variant='success'>Your order is empty</Message> : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
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
                      <Col>Items: </Col>
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
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )
}

export default OrderPage


  