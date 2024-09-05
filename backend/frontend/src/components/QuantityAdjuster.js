import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';


const QuantityAdjuster = ({className, qty, countInStock, onIncrease, onDecrease }) => {
  
  return (
    <Row className={`qty-ad ${className} `}>
      <Col xs="auto" className="my-1 d-flex align-items-center">
        Qty 
        <Button
          id="minus-btn"
          className='cart-btn'
          variant="outline-secondary"
          onClick={onDecrease}
          disabled={qty === 1}
        >
          -
        </Button>
        <span style={{ margin: '0 10px' }}>{qty}</span>
        <Button
          id="plus-btn"
          className='cart-btn'
          variant="outline-secondary"
          onClick={onIncrease}
          disabled={qty === countInStock}
        >
          +
        </Button>
      </Col>
    </Row>
  );
};

export default QuantityAdjuster;
