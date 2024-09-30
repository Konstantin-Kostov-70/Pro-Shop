# E-commerce Website

This project is a full-featured e-commerce website built using React, Redux and Django REST Framework (DRF). It provides a seamless shopping experience with robust user authentication, product management, and order processing functionalities.

## Key Features
- **User Authentication**: JWT-based authentication for secure login and registration.
- **Product Management**: Admin capabilities to add, update, and delete products, along with product search and pagination.
- **Order Processing**: Comprehensive order management, including order creation, payment processing, and order tracking.
- **Responsive Design**: A user-friendly, responsive interface built with React and Redux.
- **RESTful API**: A RESTful backend API built with Django and DRF to handle all data operations.

## Technologies Used
- **Frontend**: React, Redux
- **Backend**: Django, Django REST Framework
- **Authentication**: JWT (JSON Web Tokens)

# E-commerce API README

## Introduction
This API provides endpoints for managing users, products, and orders in an e-commerce platform. It includes functionality for user registration, authentication, product listing, and order processing. The API is built using Django and Django REST Framework (DRF) with JWT for authentication.

## Table of Contents
1. [Authentication](#authentication)
2. [User Endpoints](#user-endpoints)
3. [Product Endpoints](#product-endpoints)
4. [Order Endpoints](#order-endpoints)
5. [Pagination](#pagination)
6. [Installation and Setup](#installation-and-setup)
7. [Running the Server](#running-the-server)
8. [Environment Variables](#environment-variables)

## Authentication
Authentication is handled using JWT (JSON Web Tokens). Users must obtain a token to access endpoints that require authentication.

### Obtain Token
- **Endpoint:** `/api/users/login/`
- **Method:** POST
- **Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1...",
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1...",
        "id": 1,
        "username": "user@example.com",
        "email": "user@example.com",
        "first_name": "First",
        "is_admin": false
    }
    ```
## User Endpoints

### Register User
- **Endpoint:** `/api/users/register/`
- **Method:** POST
- **Body:**
    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "id": 1,
        "username": "johndoe@example.com",
        "email": "johndoe@example.com",
        "first_name": "John",
        "is_admin": false,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1..."
    }
    ```

### Get All Users
- **Endpoint:** `/api/users/`
- **Method:** GET
- **Permission:** Admin
- **Response:**
    ```json
    {
        "users": [
            {
                "id": 1,
                "username": "johndoe@example.com",
                "email": "johndoe@example.com",
                "first_name": "John",
                "is_admin": false
            }
        ],
        "page": 1,
        "pages": 1
    }
    ```

### Get User Profile
- **Endpoint:** `/api/users/profile/`
- **Method:** GET
- **Permission:** Authenticated
- **Response:**
    ```json
    {
        "id": 1,
        "username": "johndoe@example.com",
        "email": "johndoe@example.com",
        "first_name": "John",
        "is_admin": false
    }
    ```

### Update User Profile
- **Endpoint:** `/api/users/profile/update/`
- **Method:** PUT
- **Permission:** Authenticated
- **Body:**
    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "newpassword123"
    }
    ```
- **Response:**
    ```json
    {
        "id": 1,
        "username": "johndoe@example.com",
        "email": "johndoe@example.com",
        "first_name": "John",
        "is_admin": false,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1..."
    }
    ```

### Delete User
- **Endpoint:** `/api/users/delete/<str:pk>/`
- **Method:** DELETE
- **Permission:** Authenticated
- **Response:**
    ```json
    {
        "detail": "User was deleted"
    }
    ```

### Get User by ID
- **Endpoint:** `/api/users/<str:pk>/`
- **Method:** GET
- **Permission:** Admin
- **Response:**
    ```json
    {
        "id": 1,
        "username": "johndoe@example.com",
        "email": "johndoe@example.com",
        "first_name": "John",
        "is_admin": false
    }
    ```

### Update User
- **Endpoint:** `/api/users/update/<str:pk>/`
- **Method:** PUT
- **Permission:** Admin
- **Body:**
    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "is_admin": true
    }
    ```
- **Response:**
    ```json
    {
        "id": 1,
        "username": "johndoe@example.com",
        "email": "johndoe@example.com",
        "first_name": "John",
        "is_admin": true
    }
    ```

## Product Endpoints

### Get Products
- **Endpoint:** `/api/products/`
- **Method:** GET
- **Query Params:**
    - `keyword`: search term to filter products
    - `page`: page number for pagination
- **Response:**
    ```json
    {
        "products": [
            {
                "_id": "1",
                "name": "Product 1",
                "price": 100.00,
                "brand": "Brand",
                "countInStock": 10,
                "category": "Category",
                "description": "Description",
                "specifications": "Specifications",
                "rating": 4,
                "numReviews": 10
            }
        ],
        "page": 1,
        "pages": 1
    }
    ```

### Get Top Products
- **Endpoint:** `/api/products/top/`
- **Method:** GET
- **Response:**
    ```json
    [
        {
            "_id": "1",
            "name": "Product 1",
            "price": 100.00,
            "brand": "Brand",
            "countInStock": 10,
            "category": "Category",
            "description": "Description",
            "specifications": "Specifications",
            "rating": 4,
            "numReviews": 10
        }
    ]
    ```

### Get Product by ID
- **Endpoint:** `/api/products/<str:pk>/`
- **Method:** GET
- **Response:**
    ```json
    {
        "_id": "1",
        "name": "Product 1",
        "price": 100.00,
        "brand": "Brand",
        "countInStock": 10,
        "category": "Category",
        "description": "Description",
        "specifications": "Specifications",
        "rating": 4,
        "numReviews": 10
    }
    ```

### Create Product
- **Endpoint:** `/api/products/create/`
- **Method:** POST
- **Permission:** Admin
- **Response:**
    ```json
    {
        "_id": "1",
        "name": "Sample name",
        "price": 0,
        "brand": "Sample brand",
        "countInStock": 0,
        "category": "Sample Category",
        "description": "",
        "specifications": "",
        "rating": 0,
        "numReviews": 0
    }
    ```

### Update Product
- **Endpoint:** `/api/products/update/<str:pk>/`
- **Method:** PUT
- **Permission:** Admin
- **Body:**
    ```json
    {
        "name": "Product 1",
        "price": 100.00,
        "brand": "Brand",
        "countInStock": 10,
        "category": "Category",
        "description": "Description",
        "specifications": "Specifications"
    }
    ```
- **Response:**
    ```json
    {
        "_id": "1",
        "name": "Product 1",
        "price": 100.00,
        "brand": "Brand",
        "countInStock": 10,
        "category": "Category",
        "description": "Description",
        "specifications": "Specifications",
        "rating": 4,
        "numReviews": 10
    }
    ```

### Delete Product
- **Endpoint:** `/api/products/delete/<str:pk>/`
- **Method:** DELETE
- **Permission:** Admin
- **Response:**
    ```json
    {
        "detail": "Product was deleted"
    }
    ```

### Upload Product Image
- **Endpoint:** `/api/products/upload/`
- **Method:** POST
- **Permission:** Admin
- **Body:**
    ```json
    {
        "product_id": "1",
        "image": <file>
    }
    ```
- **Response:**
    ```json
    {
        "detail": "Image was uploaded"
    }
    ```

### Create Product Review
- **Endpoint:** `/api/products/reviews/<str:pk>/`
- **Method:** POST
- **Permission:** Authenticated
- **Body:**
    ```json
    {
        "rating": 4,
        "comment": "Great product!"
    }
    ```
- **Response:**
    ```json
    {
        "detail": "Review Added"
    }
    ```

## Order Endpoints

### Add Order Items
- **Endpoint:** `/api/orders/add/`
- **Method:** POST
- **Permission:** Authenticated
- **Body:**
    ```json
    {
        "orderItems": [
            {
                "product": "1",
                "qty": 2,
                "price": 100.00
            }
        ],
        "shippingAddress": {
            "address": "123 Main St",
            "city": "Anytown",
            "postalCode": "12345",
            "country": "USA"
        },
        "paymentMethod": "PayPal",
        "taxPrice": 10.00,
        "shippingPrice": 5.00,
        "totalPrice": 215.00
    }
    ```
- **Response:**
    ```json
    {
        "_id": "1",
        "orderItems": [
            {
                "product": "1",
                "name": "Product 1",
                "qty": 2,
                "price": 100.00,
                "image": "/images/sample.jpg"
            }
        ],
        "shippingAddress": {
            "address": "123 Main St",
            "city": "Anytown",
            "postalCode": "12345",
            "country": "USA"
        },
        "paymentMethod": "PayPal",
        "taxPrice": 10.00,
        "shippingPrice": 5.00,
        "totalPrice": 215.00,
        "isPaid": false,
        "isDelivered": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
    ```

### Get Order by ID
- **Endpoint:** `/api/orders/{id}/`
- **Method:** GET
- **Permission:** Authenticated
- **Response:**
    ```json
    {
        "_id": "1",
        "orderItems": [
            {
                "product": "1",
                "name": "Product 1",
                "qty": 2,
                "price": 100.00,
                "image": "/images/sample.jpg"
            }
        ],
        "shippingAddress": {
            "address": "123 Main St",
            "city": "Anytown",
            "postalCode": "12345",
            "country": "USA"
        },
        "paymentMethod": "PayPal",
        "taxPrice": 10.00,
        "shippingPrice": 5.00,
        "totalPrice": 215.00,
        "isPaid": false,
        "isDelivered": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
    ```

### Update Order to Paid
- **Endpoint:** `/api/orders/{id}/pay/`
- **Method:** PUT
- **Permission:** Authenticated
- **Response:**
    ```json
    {
        "detail": "Order is paid"
    }
    ```

### Update Order to Delivered
- **Endpoint:** `/api/orders/{id}/deliver/`
- **Method:** PUT
- **Permission:** Admin
- **Response:**
    ```json
    {
        "detail": "Order is delivered"
    }
    ```

### Get All Orders
- **Endpoint:** `/api/orders/`
- **Method:** GET
- **Permission:** Admin
- **Response:**
    ```json
    {
        "orders": [
            {
                "_id": "1",
                "user": {
                    "_id": "1",
                    "name": "John Doe"
                },
                "orderItems": [
                    {
                        "product": "1",
                        "name": "Product 1",
                        "qty": 2,
                        "price": 100.00,
                        "image": "/images/sample.jpg"
                    }
                ],
                "shippingAddress": {
                    "address": "123 Main St",
                    "city": "Anytown",
                    "postalCode": "12345",
                    "country": "USA"
                },
                "paymentMethod": "PayPal",
                "taxPrice": 10.00,
                "shippingPrice": 5.00,
                "totalPrice": 215.00,
                "isPaid": false,
                "isDelivered": false,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
            }
        ],
        "page": 1,
        "pages": 1
    }
    ```

### Get My Orders
- **Endpoint:** `/api/orders/myorders/`
- **Method:** GET
- **Permission:** Authenticated
- **Response:**
    ```json
    {
        "orders": [
            {
                "_id": "1",
                "orderItems": [
                    {
                        "product": "1",
                        "name": "Product 1",
                        "qty": 2,
                        "price": 100.00,
                        "image": "/images/sample.jpg"
                    }
                ],
                "shippingAddress": {
                    "address": "123 Main St",
                    "city": "Anytown",
                    "postalCode": "12345",
                    "country": "USA"
                },
                "paymentMethod": "PayPal",
                "taxPrice": 10.00,
                "shippingPrice": 5.00,
                "totalPrice": 215.00,
                "isPaid": false,
                "isDelivered": false,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
            }
        ],
        "page": 1,
        "pages": 1
    }
    ```

## Pagination
- The API supports pagination for endpoints that return a list of items. Use the `page` query parameter to navigate through pages.

## Installation and Setup
1. Clone the repository:
    ```sh
    git clone <repository_url>
    ```
2. Change to the project directory:
    ```sh
    cd project_directory
    ```
3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4. Set up the database:
    ```sh
    python manage.py migrate
    ```
5. Create a superuser:
    ```sh
    python manage.py createsuperuser
    ```
6. Run the development server:
    ```sh
    python manage.py runserver
    ```

## Running the Server
To run the server, use the following command:
```sh
python manage.py runserver
