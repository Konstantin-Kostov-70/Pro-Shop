import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div className='footer'>
      <footer>
        <Container>
          <Row>
            <Col className='footer text-center py-3'>Copyright &copy; ProShop</Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer