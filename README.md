# User Service - CRUD API

A RESTful API for user management built with Node.js, Express, and PostgreSQL using MVC architecture.

## 📋 Features

- ✅ Create, Read, Update, Delete (CRUD) operations for users
- ✅ Password hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ Pagination support
- ✅ UUID for primary keys
- ✅ PostgreSQL database
- ✅ ES6 modules (import/export)
- ✅ Error handling middleware
- ✅ Standardized API responses

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM/Query Builder:** pg (node-postgres)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

## 📁 Project Structure

```
user-service/
├── src/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection
│   ├── models/
│   │   └── userModel.js         # User database queries
│   ├── controllers/
│   │   └── userController.js    # Business logic
│   ├── routes/
│   │   └── userRoutes.js        # API endpoints
│   ├── middlewares/
│   │   ├── errorHandler.js      # Error handling
│   │   └── validator.js         # Input validation
│   ├── utils/
│   │   ├── bcrypt.js            # Password utilities
│   │   └── response.js          # Response helpers
│   └── app.js                   # Express app
├── .env                         # Environment variables
├── .gitignore
├── package.json
├── server.js                    # Entry point
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd user-service
```

2. **Install dependencies**

```bash
npm install
```

3. **Create PostgreSQL database**

```sql
CREATE DATABASE mobile_app2;
```

4. **Run the database schema**

```sql
-- Connect to database
\c mobile_app2

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK(role IN ('user', 'organizer')) DEFAULT 'user',
    phone VARCHAR(20),
    follow INT DEFAULT 0,
    verified BOOLEAN DEFAULT TRUE,
    image VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for auto-updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
```

5. **Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=mobile_app2
DB_USER=postgres
DB_PASSWORD=your_password_here

DB_MAX_CONNECTIONS=20
DB_IDLE_TIMEOUT=30000
```

6. **Start the server**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/users
```

### Endpoints

#### 1. Create User

**POST** `/api/users`

**Request Body:**

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user",
  "phone": "+1234567890",
  "image": "https://example.com/avatar.jpg"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+1234567890",
    "follow": 0,
    "verified": true,
    "image": "https://example.com/avatar.jpg",
    "created_at": "2024-01-20T10:00:00.000Z",
    "updated_at": "2024-01-20T10:00:00.000Z"
  }
}
```

#### 2. Get All Users (with pagination)

**GET** `/api/users?page=1&limit=10`

**Query Parameters:**

- `page` (optional, default: 1)
- `limit` (optional, default: 10)

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "full_name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "phone": "+1234567890",
      "follow": 0,
      "verified": true,
      "image": "https://example.com/avatar.jpg",
      "created_at": "2024-01-20T10:00:00.000Z",
      "updated_at": "2024-01-20T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### 3. Get User by ID

**GET** `/api/users/:id`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+1234567890",
    "follow": 0,
    "verified": true,
    "image": "https://example.com/avatar.jpg",
    "created_at": "2024-01-20T10:00:00.000Z",
    "updated_at": "2024-01-20T10:00:00.000Z"
  }
}
```

#### 4. Update User

**PUT** `/api/users/:id`

**Request Body:** (all fields optional)

```json
{
  "full_name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "+9876543210",
  "image": "https://example.com/new-avatar.jpg",
  "role": "organizer"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Updated",
    "email": "john.updated@example.com",
    "role": "organizer",
    "phone": "+9876543210",
    "follow": 0,
    "verified": true,
    "image": "https://example.com/new-avatar.jpg",
    "created_at": "2024-01-20T10:00:00.000Z",
    "updated_at": "2024-01-20T11:30:00.000Z"
  }
}
```

#### 5. Update Password

**PATCH** `/api/users/:id/password`

**Request Body:**

```json
{
  "password": "newPassword123"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Password updated successfully",
  "data": null
}
```

#### 6. Delete User

**DELETE** `/api/users/:id`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

### Error Responses

**400 Bad Request - Validation Error**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**404 Not Found**

```json
{
  "success": false,
  "message": "User not found"
}
```

**409 Conflict - Duplicate Email**

```json
{
  "success": false,
  "message": "Email already exists"
}
```

**500 Internal Server Error**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 🧪 Testing with cURL

```bash
# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'

# Get all users
curl http://localhost:3000/api/users?page=1&limit=10

# Get user by ID
curl http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000

# Update user
curl -X PUT http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Updated"
  }'

# Delete user
curl -X DELETE http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

## 📝 Notes

- Passwords are automatically hashed using bcrypt before storing
- The `updated_at` field is automatically updated via PostgreSQL trigger
- All IDs use UUID v4 format
- Email validation ensures proper format
- Phone validation checks for valid mobile phone format

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- SQL injection prevention (parameterized queries)
- Input validation and sanitization
- CORS enabled
- Environment variables for sensitive data

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License
