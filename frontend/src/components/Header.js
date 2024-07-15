import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header() {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
   dispatch(logout());
  }

  return (
    <header>
     <Navbar bg="dark" data-bs-theme="dark">
        <Container className='nav-menu'>
          <Link to="/" className='navbar-brand'>
            ProShop
          </Link>
          <SearchBox />
          <Nav className="mr-auto">
            <Link to="/cart" className='nav-link'>
              <i className='fas fa-shopping-cart'></i><span className='nav-span'>Cart</span>
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <Link to={'/profile'} className='dropdown-item'>
                   Profile
                </Link>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login" className='nav-link'>
                <i className='fas fa-user'></i><span className='nav-span'>Login</span>
              </Link>
            )}
            {userInfo && userInfo.is_admin && (
              <NavDropdown title='Admin' id='admin-menu'>
                <Link to={'/admin/users-list'} className='dropdown-item'>
                  Users
                </Link>
                <Link to={'/admin/product-list'} className='dropdown-item'>
                  Products
                </Link>
                <Link to={'/admin/order-list'} className='dropdown-item'>
                  Orders
                </Link>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
