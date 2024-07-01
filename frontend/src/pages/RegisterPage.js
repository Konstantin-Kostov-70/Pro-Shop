import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function RegisterPage() {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
  
    useEffect(() => {
      if(userInfo) {
         navigate(redirect);
      }
    },[navigate, userInfo, redirect])
  
    const submitHandler = (event) => {
      event.preventDefault();

      if(password !== confirmPassword) {
        setMessage('Passwords do not match!')
      } else {
        dispatch(register(name, email, password))
      }
    };
  
  return (
    <FormContainer>
         <h1>Register</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
                <FormControl
                    required
                    className="mb-3 login-input"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="email">
                <FormControl
                    required
                    className="mb-3 login-input"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="password">
                <FormControl
                    required
                    className="mb-3 login-input"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId="confirm-password">
                <FormControl
                    required
                    className="login-input"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <Button className="my-4" type="submit" variant="primary">Register</Button>
            <Row className="py-3">
              <Col>
                Have an account?
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
              </Col>
           </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterPage
