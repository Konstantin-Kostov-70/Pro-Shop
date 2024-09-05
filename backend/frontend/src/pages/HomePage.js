import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProduct } from "../actions/productActions";
import { useLocation } from "react-router-dom";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from '../components/ProductCarousel'

function HomePage() {
  const location = useLocation();
  const keyword = location.search;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <h1 className="heading">Top Products</h1>
      <ProductCarousel />
      <h1 className="lp-heading heading">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row className="card-non-responsive">
            {products.map((product) => (
              <Col key={product._id} sm="12" md="6" lg="4" xl="3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row className="card-responsive">
            {products.map((product) => (
              <Col key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword}
           />
        </div>
      )}
    </div>
  );
}

export default HomePage;
