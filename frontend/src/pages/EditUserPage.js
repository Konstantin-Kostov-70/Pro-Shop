import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from '../constants/userConstants'

function EditUserPage() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [is_admin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: USER_UPDATE_RESET})
      navigate('/admin/users-list')
    } else {
      if (!user.name || user._id !== Number(id)) {
        dispatch(getUserDetails(id));
      } else {
       setName(user.name);
       setEmail(user.email);
       setIsAdmin(user.is_admin)
      }
    }
  }, [dispatch, user, id, navigate, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser({
      _id: user._id,
      name,
      email,
      is_admin,
    }));
  };

  return (
    <div>
      <Link to={"/admin/users-list"}>&lt;&lt; Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader /> }
        {errorUpdate && <Message variant='message'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                className="mb-3 login-input"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
              <FormControl
                className="mb-3 login-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="is-admin">
            <FormLabel>Is Admin</FormLabel>
              <FormCheck
                className="mb-3 login-input check-box"
                type="checkbox"
                label="Check off"
                checked={is_admin}
                onChange={(event) => setIsAdmin(event.target.checked)}
              ></FormCheck>
            </FormGroup>
            <Button className="my-4" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default EditUserPage;
