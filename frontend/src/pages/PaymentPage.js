import React, { useState } from "react";
import { Row, Form, Button, FormGroup, FormLabel, FormCheck } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentPage() {

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
      <h1 className="heading">Payment</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <FormLabel className="mb-4">Select Method</FormLabel>
              <FormCheck 
                className="mb-2"
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                checked={paymentMethod === "PayPal"}
                onChange={(event) => setPaymentMethod(event.target.id)}
              >
              </FormCheck>
              <FormCheck 
                className="mb-4"
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                checked={paymentMethod === 'Stripe'}
                onChange={(event) => setPaymentMethod(event.target.id)}
              >
              </FormCheck>
          </FormGroup>
          <Button type="submit" variant="primary">Continue</Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default PaymentPage
