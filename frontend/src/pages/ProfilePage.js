import React, { useEffect, useState } from "react";
import {Link ,useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions'

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

    const MyOrders = useSelector(state => state.listMyOrders);
    const {loading: loadingOrders, error: errorOrders ,orders} = MyOrders
  
    useEffect(() => {
      if(!userInfo) {
         navigate('/login');
      } else {
            if(!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
      }
    },[dispatch, navigate, userInfo, user, success,])
  
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
    <Row className="profile-container">
        <Col md={3}>
            <h2 className="heading">User Profile</h2>
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
                <Button className="my-4 btn-up" type="submit" variant="primary">Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2 className="heading">My Orders</h2>
            {loadingOrders ? (
                <Loader />
            ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : (
                <Table striped responsive className="table-sm table-res">
                    <thead className="th-res">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 19) : (
                                    <i className="fas fa-times"></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 19) : (
                                    <i className="fas fa-times"></i>
                                )}</td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <Button className="btn-sm btn-res">
                                            Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfilePage
