import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfilePage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const userDetails = useSelector(state => state.userDetails);
    const {error, loading, user} = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;
  
    useEffect(() => {
      if(!userInfo) {
         navigate('/login');
      } else {
            if(!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
      }
    },[dispatch, navigate, userInfo, user, success])
  
    const submitHandler = (event) => {
      event.preventDefault();

      if(password !== confirmPassword) {
        setMessage('Passwords do not match!');
      } else {
        dispatch(updateUserProfile({
            'id': user._id,
            name,
            email,
            password
        }))
        setMessage('');
      }
    };
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
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
                        className="login-input"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    >
                    </FormControl>
                </FormGroup>
                <Button className="my-4" type="submit" variant="primary">Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfilePage
