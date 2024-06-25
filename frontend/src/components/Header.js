import React from 'react'
import { Container, Navbar, Nav, } from 'react-bootstrap'

function header() {
  return (
    <header>
     <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ProShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default header
