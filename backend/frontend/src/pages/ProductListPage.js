import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  listProduct,
  createProductAction,
  deleteProductAction,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = '/admin/product-list/'

  const keyword = location.search

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {

    if (!userInfo || !userInfo.is_admin) {
      navigate("/login");
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProduct(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure want to delete this product?")) {
      dispatch(deleteProductAction(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProductAction());
  };

  return (
    <div>
      <Row id="products-wrapper" className="align-items-center">
        <Col>
          <h2 className="heading product">Products</h2>
        </Col>
        <Col className="text-right d-flex justify-content-end">
          <Button className="my-3 btn-create" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered responsive hover className="table-sm">
            <thead className="th-res">
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
              {products.map((product) => (
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
                    <Button
                      className="btn-sm edit"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate 
            page={page}
            pages={pages}
            isAdmin={true}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
