import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';


const QuantityAdjuster = ({ qty, countInStock, onIncrease, onDecrease }) => {
  
  return (
    <Row>
      {/* <Col>Qty</Col> */}
      <Col xs="auto" className="my-1 d-flex align-items-center">
        Qty 
        <Button
          id="minus-btn"
          variant="outline-secondary"
          onClick={onDecrease}
          disabled={qty === 1}
          style={{ minWidth: '40px' }}
        >
          -
        </Button>
        <span style={{ margin: '0 10px' }}>{qty}</span>
        <Button
          id="plus-btn"
          variant="outline-secondary"
          onClick={onIncrease}
          disabled={qty === countInStock}
          style={{ minWidth: '40px' }}
        >
          +
        </Button>
      </Col>
    </Row>
  );
};

export default QuantityAdjuster;
