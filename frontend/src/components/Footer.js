import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default footer