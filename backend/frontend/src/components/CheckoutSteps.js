import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { Link } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (

    <Nav className="stepper-wrapper my-5">
      {step1 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">1</NavItem>
            <Link to={'/login'} className="step-name">Login</Link>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">1</NavItem>
          <Link to={'/login'} className="step-name" disabled>Login</Link>
      </NavItem>
      )}

      {step2 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">2</NavItem>
            <Link to={'/shipping'} className="step-name">Shipping</Link>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">2</NavItem>
          <Link to={'/shipping'} className="step-name" disabled>Shipping</Link>
      </NavItem>
      )}

       {step3 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">3</NavItem>
            <Link to={'/payment'} className="step-name">Payment</Link>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">3</NavItem>
          <Link to={'/payment'} className="step-name" disabled>Payment</Link>
      </NavItem>
      )}

       {step4 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">4</NavItem>
            <Link to={'/placeorder'} className="step-name">Place Order</Link>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">4</NavItem>
          <Link to={'/placeorder'} className="step-name" disabled>Place Order</Link>
      </NavItem>
      )}
    </Nav>
  );
}

export default CheckoutSteps;
