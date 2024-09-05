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
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(() => {
    if(userInfo) {
       navigate(redirect);
    }
  },[navigate, userInfo, redirect])

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password))
  };

  return (
    <FormContainer className="form-shipping">
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="email">
                <FormControl
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
                    className="login-input"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                >
                </FormControl>
            </FormGroup>
            <Button className="my-4" type="submit" variant="primary">Sign In</Button>
        </Form>
        <Row className="py-3">
            <Col>
                New Customer?
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>

            </Col>
        </Row>
    </FormContainer>
  );
}

export default LoginPage;
