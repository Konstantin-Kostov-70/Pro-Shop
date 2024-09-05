import React, { useState } from "react";
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingPage() {

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate('/payment');
  }

  return (
    <Row>
        <CheckoutSteps step1 step2 />
    <FormContainer className="form-shipping">
        <h1 className="heading">Shipping</h1>
        <Form onSubmit={submitHandler}>
        <FormGroup controlId="address">
                <FormControl
                    required
                    className="mb-3 login-input"
                    type="text"
                    placeholder="Enter address"
                    value={address ? address : ''}
                    onChange={(event) => setAddress(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="city">
                <FormControl
                    required
                    className="mb-3 login-input"
                    type="text"
                    placeholder="Enter city"
                    value={city ? city : ''}
                    onChange={(event) => setCity(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="postal-code">
                <FormControl
                    required
                    className="mb-3 login-input"
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode ? postalCode : ''}
                    onChange={(event) => setPostalCode(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="country">
                <FormControl
                    required
                    className="mb-3 login-input"
                    type="text"
                    placeholder="Enter country"
                    value={country ? country : ''}
                    onChange={(event) => setCountry(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
    </Row>
  )
}

export default ShippingPage
