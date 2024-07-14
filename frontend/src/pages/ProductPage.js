import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import QuantityAdjuster from "../components/QuantityAdjuster";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReviewAction,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductPage() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productCreateReview;

  useEffect(() => {
    
    if (successProductReview) {
       setRating(0);
       setComment('')
       dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const increaseQty = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createProductReviewAction(
      id, {
        rating,
        comment
      }
      
    ))
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        &lt;&lt; Back to shop
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>

                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroupItem>

                <ListGroupItem>Price: ${product.price}</ListGroupItem>

                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem id="price">
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem id="status">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <QuantityAdjuster
                        qty={qty}
                        countInStock={product.countInStock}
                        onIncrease={increaseQty}
                        onDecrease={decreaseQty}
                      />
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <h4>
                Reviews
              </h4>
              {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
              <ListGroup>
                {product.reviews.map(review => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#f8e825' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem className="py-2">
                  <h4>Write a Review</h4>
                  {loadingProductReview && <Loader />}
                  {successProductReview && <Message variant='success'>Review Submitted</Message>}
                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating" className="my-4">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as='select'
                          value={rating}
                          onChange={(event) => setRating(event.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment" className="mb-4">
                        <FormLabel>Comment</FormLabel>
                        <FormControl 
                          as="textarea"
                          row='10'
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                        >

                        </FormControl>
                      </FormGroup>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='info'>Please <Link to={'/login'}>Login</Link> to write a review</Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
