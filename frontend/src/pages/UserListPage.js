import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";

function UserListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
        dispatch(listUsers());
    } else {
       navigate('/login');
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  }

  return (
    <div>
      <h2 className="heading">Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
            <thead className="th-res">
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="tb-res">
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.is_admin ? (
                            <i className="fas fa-check"></i>
                        ) : (
                            <i className="fas fa-times"></i>
                        )}</td>
                        <td>
                            <Link to={`/admin/user/${user._id}/edit`}>
                                <Button className="btn-sm edit">
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </Link>
                            <Button className="btn-sm edit" onClick={() => deleteHandler(user._id)}>
                                <i className="fas fa-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListPage;
