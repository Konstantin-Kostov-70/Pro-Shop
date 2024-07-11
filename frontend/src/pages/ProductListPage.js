import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";

function ProductListPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
        dispatch(listProduct());
    } else {
       navigate('/login');
    }
  }, [dispatch, userInfo, navigate]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure want to delete this product?')) {
    //  delete logic
    }
  }

  const createProductHandler = (product) => {
    // create product
  }

  return (
    <div>
      <Row id="products-wrapper" className="align-items-center">
        <Col>
           <h2>Products</h2>
        </Col>
        <Col className="text-right d-flex justify-content-end">
           <Button className="my-3" onClick={createProductHandler}>
             <i className="fas fa-plus"></i> Create Product
           </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                      
                        <td>
                            <Link to={`/admin/product/${product._id}/edit`}>
                                <Button className="btn-sm edit">
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </Link>
                            <Button className="btn-sm edit" onClick={() => deleteHandler(product._id)}>
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

export default ProductListPage;
