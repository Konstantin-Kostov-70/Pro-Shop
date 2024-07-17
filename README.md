E-commerce API README
Introduction
This API provides endpoints for managing users, products, and orders in an e-commerce platform. It includes functionality for user registration, authentication, product listing, and order processing. The API is built using Django and Django REST Framework (DRF) with JWT for authentication.

Table of Contents
  1.Authentication
  2.User Endpoints
  3.Product Endpoints
  4.Order Endpoints
  5.Pagination
  6.Installation and Setup
  7.Running the Server
  8.Environment Variables
Authentication
Authentication is handled using JWT (JSON Web Tokens). Users must obtain a token to access endpoints that require authentication.

Obtain Token
Endpoint: /api/users/login/
Method: POST
Body:

json
Copy code
{
    "email": "user@example.com",
    "password": "password123"
}
Response:

json
Copy code
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1...",
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "first_name": "First",
    "is_admin": false
}
User Endpoints
Register User
Endpoint: /api/users/register/
Method: POST
Body:

json
Copy code
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}
Response:

json
Copy code
{
    "id": 1,
    "username": "johndoe@example.com",
    "email": "johndoe@example.com",
    "first_name": "John",
    "is_admin": false,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1..."
}
Get All Users
Endpoint: /api/users/
Method: GET
Permission: Admin

Response:

json
Copy code
[
    {
        "id": 1,
        "username": "johndoe@example.com",
        "email": "johndoe@example.com",
        "first_name": "John",
        "is_admin": false
    }
]
Get User Profile
Endpoint: /api/users/profile/
Method: GET
Permission: Authenticated

Response:

json
Copy code
{
    "id": 1,
    "username": "johndoe@example.com",
    "email": "johndoe@example.com",
    "first_name": "John",
    "is_admin": false
}
Update User Profile
Endpoint: /api/users/profile/update/
Method: PUT
Permission: Authenticated
Body:

json
Copy code
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "newpassword123"
}
Response:

json
Copy code
{
    "id": 1,
    "username": "johndoe@example.com",
    "email": "johndoe@example.com",
    "first_name": "John",
    "is_admin": false,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1..."
}
Delete User
Endpoint: /api/users/delete/<str:pk>/
Method: DELETE
Permission: Authenticated

Response:

json
Copy code
{
    "detail": "User was deleted"
}
Get User by ID
Endpoint: /api/users/<str:pk>/
Method: GET
Permission: Admin

Response:

json
Copy code
{
    "id": 1,
    "username": "johndoe@example.com",
    "email": "johndoe@example.com",
    "first_name": "John",
    "is_admin": false
}
Update User
Endpoint: /api/users/update/<str:pk>/
Method: PUT
Permission: Admin
Body:

json
Copy code
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "is_admin": true
}
Response:

json
Copy code
{
    "id": 1,
    "username": "johndoe@example.com",
    "email": "johndoe@example.com",
    "first_name": "John",
    "is_admin": true
}
Product Endpoints
Get Products
Endpoint: /api/products/
Method: GET

Query Params:

keyword: search term to filter products
page: page number for pagination
Response:

json
Copy code
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
            "rating": 4,
            "numReviews": 10
        }
    ],
    "page": 1,
    "pages": 1
}
Get Top Products
Endpoint: /api/products/top/
Method: GET

Response:

json
Copy code
[
    {
        "_id": "1",
        "name": "Product 1",
        "price": 100.00,
        "brand": "Brand",
        "countInStock": 10,
        "category": "Category",
        "description": "Description",
        "rating": 4,
        "numReviews": 10
    }
]
Get Product by ID
Endpoint: /api/products/<str:pk>/
Method: GET

Response:

json
Copy code
{
    "_id": "1",
    "name": "Product 1",
    "price": 100.00,
    "brand": "Brand",
    "countInStock": 10,
    "category": "Category",
    "description": "Description",
    "rating": 4,
    "numReviews": 10
}
Create Product
Endpoint: /api/products/create/
Method: POST
Permission: Admin

Response:

json
Copy code
{
    "_id": "1",
    "name": "Sample name",
    "price": 0,
    "brand": "Sample brand",
    "countInStock": 0,
    "category": "Sample Category",
    "description": "",
    "rating": 0,
    "numReviews": 0
}
Update Product
Endpoint: /api/products/update/<str:pk>/
Method: PUT
Permission: Admin
Body:

json
Copy code
{
    "name": "Product 1",
    "price": 100.00,
    "brand": "Brand",
    "countInStock": 10,
    "category": "Category",
    "description": "Description"
}
Response:

json
Copy code
{
    "_id": "1",
    "name": "Product 1",
    "price": 100.00,
    "brand": "Brand",
    "countInStock": 10,
    "category": "Category",
    "description": "Description",
    "rating": 4,
    "numReviews": 10
}
Delete Product
Endpoint: /api/products/delete/<str:pk>/
Method: DELETE
Permission: Admin

Response:

json
Copy code
{
    "detail": "Product was deleted"
}
Upload Product Image
Endpoint: /api/products/upload/
Method: POST
Permission: Admin
Body:

json
Copy code
{
    "product_id": "1",
    "image": <file>
}
Response:

json
Copy code
{
    "detail": "Image was uploaded"
}
Create Product Review
Endpoint: /api/products/reviews/<str:pk>/
Method: POST
Permission: Authenticated
Body:

json
Copy code
{
    "rating": 4,
    "comment": "Great product!"
}
Response:

json
Copy code
{
    "detail": "Review Added"
}
Order Endpoints
Add Order Items
Endpoint: /api/orders/add/
Method: POST
Permission: Authenticated
Body:

json
Copy code
{
    "orderItems": [
        {
            "product": "1",
            "qty": 2,
            "price": 100.00
        }
    ],
    "shippingAddress": {
        "address