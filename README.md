
# MERN E-Commerce Backend

RESTful backend developed using Node.js, Express.js, MongoDB, and JWT Authentication for the MERN E-Commerce Application.

---

## Features

- JWT Authentication
- Password Encryption using bcrypt
- Role-Based Authorization
- Product CRUD APIs
- User Profile APIs
- Shopping Cart APIs
- Order APIs
- Search Products
- Filter Products
- Sort Products
- MongoDB Database
- Import Products from FakeStore API

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Axios
- dotenv
- CORS

---

## Folder Structure

```
Backend
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
├── server.js
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Raniya-dev/E_commerce_backend_assignment.git
```

### Install Packages

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

---

## Run Server

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /user/signup | Register User |
| POST | /user/login | Login User |

---

### User Profile

| Method | Endpoint |
|---------|----------|
| GET | /user/getprofile |
| PUT | /user/updateprofile |

---

### Products

| Method | Endpoint |
|---------|----------|
| GET | /api/getstoredproducts |
| GET | /api/getstoredproducts/:id |
| POST | /api/importproducts |

---

### Cart

| Method | Endpoint |
|---------|----------|
| POST | /cart/add |
| GET | /cart |
| DELETE | /cart/:id |

---

### Orders

| Method | Endpoint |
|---------|----------|
| POST | /orders |
| GET | /orders/myorders |
| GET | /orders/all |
| PUT | /orders/:id |

---

## Authentication

JWT Token is required for:

- Profile
- Cart
- Orders

Authorization Header

```
Bearer <token>
```

---

## Database

MongoDB Collections

- Users
- Products
- Orders
- Cart

---

## Main Features

### Authentication

- Signup
- Login
- Password Hashing
- JWT Authentication

### Products

- Store Products from FakeStore API
- Get All Products
- Get Single Product
- Search
- Filter
- Sort

### Cart

- Add Product
- Remove Product
- User-specific Cart

### Orders

- Place Order
- View Orders
- Update Order Status

---

## Future Enhancements

- Product Reviews
- Wishlist
- Payment Integration
- Email Notifications
- Recommendation System using RapidMiner

---

## Author

**Raniya Naser**

MERN Stack Developer
