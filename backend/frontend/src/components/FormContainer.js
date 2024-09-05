import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({className,children}) {
  return (
    <Container className={`form-container ${className}`}>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={5}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer
