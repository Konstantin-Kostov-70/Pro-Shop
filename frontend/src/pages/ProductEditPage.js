import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  updateProductAction,
} from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditPage() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [specification, setSpecification] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/product-list");
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, id, navigate, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProductAction({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        specification,
      })
    );
  };

  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", id);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setUploading(false);
      setImage(data);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to={"/admin/product-list"}>&lt;&lt; Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

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

            <FormGroup controlId="price-product">
              <FormLabel>Price</FormLabel>
              <FormControl
                className="mb-3 login-input"
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="image">
              <FormLabel>Image</FormLabel>
              <FormControl
                className="mb-3 login-input"
                type="text"
                placeholder="Chose image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></FormControl>

              <FormControl
                className="mb-3 login-input"
                type="file"
                placeholder="Chose image"
                onChange={uploadFileHandler}
              ></FormControl>
              {uploading && <Loader />}
            </FormGroup>

            <FormGroup controlId="brand">
              <FormLabel>Brand</FormLabel>
              <FormControl
                className="mb-3 login-input"
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="category">
              <FormLabel>Category</FormLabel>
              <FormControl
                className="mb-3 login-input"
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="count-in-stock">
              <FormLabel>Stock</FormLabel>
              <FormControl
                className="mb-3 login-input"
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="description">
              <FormLabel>Description</FormLabel>
              <FormControl
                as="textarea"
                className="mb-3 login-input"
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></FormControl>
              <FormLabel>Specification</FormLabel>
              <FormControl
                as="textarea"
                className="mb-3 login-input"
                type="text"
                placeholder="Enter Specification"
                value={specification}
                onChange={(event) => setSpecification(event.target.value)}
              ></FormControl>
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

export default ProductEditPage;
