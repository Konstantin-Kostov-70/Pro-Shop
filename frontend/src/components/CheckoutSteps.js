import React from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (

    <Nav className="stepper-wrapper my-5">
      {step1 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">1</NavItem>
          <LinkContainer to={'/login'}>
            <NavLink className="step-name">Login</NavLink>
          </LinkContainer>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">1</NavItem>
        <LinkContainer to={'/login'}>
          <NavLink className="step-name" disabled>Login</NavLink>
        </LinkContainer>
      </NavItem>
      )}

      {step2 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">2</NavItem>
          <LinkContainer to={'/shipping'}>
            <NavLink className="step-name">Shipping</NavLink>
          </LinkContainer>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">2</NavItem>
        <LinkContainer to={'/shipping'}>
          <NavLink className="step-name" disabled>Shipping</NavLink>
        </LinkContainer>
      </NavItem>
      )}

       {step3 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">3</NavItem>
          <LinkContainer to={'/payment'}>
            <NavLink className="step-name">Payment</NavLink>
          </LinkContainer>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">3</NavItem>
        <LinkContainer to={'/payment'}>
          <NavLink className="step-name" disabled>Payment</NavLink>
        </LinkContainer>
      </NavItem>
      )}

       {step4 ? (
          <NavItem className="stepper-item completed">
          <NavItem className="step-counter">4</NavItem>
          <LinkContainer to={'/placeorder'}>
            <NavLink className="step-name">Place Order</NavLink>
          </LinkContainer>
        </NavItem>

      ) : (
        <NavItem className="stepper-item">
        <NavItem className="step-counter">4</NavItem>
        <LinkContainer to={'/placeorder'}>
          <NavLink className="step-name" disabled>Place Order</NavLink>
        </LinkContainer>
      </NavItem>
      )}
    </Nav>
  );
}

export default CheckoutSteps;
