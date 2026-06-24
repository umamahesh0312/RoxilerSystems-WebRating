# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123",
  "address": "123 Main St, City"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "NORMAL_USER",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Validation Rules:**
- Name: 3-60 characters
- Email: Valid email format
- Password: 8-16 chars, 1 uppercase, 1 special char (@, #, $, %, etc.)
- Address: max 400 characters (optional)

---

### Login User
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "NORMAL_USER",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

### Change Password
**PUT** `/auth/change-password`

Change user password (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "SecurePass@123",
  "newPassword": "NewSecurePass@456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Admin Endpoints

All admin endpoints require `ADMIN` role authorization.

### Get Dashboard
**GET** `/admin/dashboard`

Get admin dashboard statistics.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard data retrieved",
  "data": {
    "totalUsers": 25,
    "totalStores": 10,
    "totalRatings": 150
  }
}
```

---

### Create User
**POST** `/admin/users`

Create a new user (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "SecurePass@123",
  "address": "456 Oak St, City",
  "role": "STORE_OWNER"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "name": "New User",
    "email": "newuser@example.com",
    "role": "STORE_OWNER",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get All Users
**GET** `/admin/users`

Get paginated list of users with filtering options.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `pageSize` (number, default: 10, max: 100) - Items per page
- `search` (string) - Search by name or email
- `sortBy` (string, default: createdAt) - Sort field
- `sortOrder` (string, default: asc) - asc or desc

**Example:**
```
GET /admin/users?page=1&pageSize=10&search=john&sortBy=createdAt&sortOrder=desc
```

**Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "NORMAL_USER",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

### Get User by ID
**GET** `/admin/users/:id`

Get detailed information for a specific user.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City",
    "role": "NORMAL_USER",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Update User
**PUT** `/admin/users/:id`

Update user information.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "address": "789 New St, City",
  "role": "STORE_OWNER"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "uuid",
    "name": "Updated Name",
    "email": "john@example.com",
    "address": "789 New St, City",
    "role": "STORE_OWNER",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

### Delete User
**DELETE** `/admin/users/:id`

Delete a user.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### Create Store
**POST** `/admin/stores`

Create a new store.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Premium Electronics",
  "email": "store@example.com",
  "address": "123 Market St, City",
  "storeOwnerId": "owner-uuid"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Store created successfully",
  "data": {
    "id": "uuid",
    "name": "Premium Electronics",
    "email": "store@example.com",
    "address": "123 Market St, City",
    "ownerId": "owner-uuid",
    "averageRating": 0,
    "totalRatings": 0,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get All Stores
**GET** `/admin/stores`

Get paginated list of stores with filtering.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (number, default: 1)
- `pageSize` (number, default: 10, max: 100)
- `search` (string) - Search by name, email, or address
- `sortBy` (string, default: createdAt)
- `sortOrder` (string, default: asc)

**Response (200):**
```json
{
  "success": true,
  "message": "Stores retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Premium Electronics",
      "email": "store@example.com",
      "address": "123 Market St, City",
      "ownerId": "owner-uuid",
      "averageRating": 4.5,
      "totalRatings": 50,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

---

### Get Store by ID
**GET** `/admin/stores/:id`

Get detailed information for a specific store.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Store retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "Premium Electronics",
    "email": "store@example.com",
    "address": "123 Market St, City",
    "ownerId": "owner-uuid",
    "averageRating": 4.5,
    "totalRatings": 50,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Update Store
**PUT** `/admin/stores/:id`

Update store information.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Store Name",
  "address": "456 New Market St, City"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Store updated successfully",
  "data": {
    "id": "uuid",
    "name": "Updated Store Name",
    "address": "456 New Market St, City",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

### Delete Store
**DELETE** `/admin/stores/:id`

Delete a store.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Store deleted successfully"
}
```

---

## User Endpoints

All user endpoints require `NORMAL_USER` role authorization.

### Get All Stores
**GET** `/stores`

Get list of all stores with user's ratings included.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Query Parameters:**
- `page` (number, default: 1)
- `pageSize` (number, default: 10, max: 100)
- `search` (string) - Search by name or address
- `sortBy` (string, default: createdAt)
- `sortOrder` (string, default: asc)

**Response (200):**
```json
{
  "success": true,
  "message": "Stores retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Premium Electronics",
      "email": "store@example.com",
      "address": "123 Market St, City",
      "averageRating": 4.5,
      "totalRatings": 50,
      "userRating": 5
    },
    {
      "id": "uuid2",
      "name": "Fashion Hub",
      "email": "fashion@example.com",
      "address": "456 Fashion Ave, City",
      "averageRating": 4.2,
      "totalRatings": 30,
      "userRating": null
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 20,
    "totalPages": 2
  }
}
```

---

### Submit Rating
**POST** `/ratings`

Submit a rating for a store.

**Headers:**
```
Authorization: Bearer <user_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "storeId": "store-uuid",
  "rating": 5
}
```

**Validation:**
- Rating must be between 1 and 5
- User can only rate each store once

**Response (201):**
```json
{
  "success": true,
  "message": "Rating submitted successfully",
  "data": {
    "id": "uuid",
    "userId": "user-uuid",
    "storeId": "store-uuid",
    "rating": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Update Rating
**PUT** `/ratings/:storeId`

Update user's rating for a store.

**Headers:**
```
Authorization: Bearer <user_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "rating": 4
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Rating updated successfully",
  "data": {
    "id": "uuid",
    "userId": "user-uuid",
    "storeId": "store-uuid",
    "rating": 4,
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

### Get User's Rating for Store
**GET** `/ratings/:storeId`

Get user's rating for a specific store.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Rating retrieved successfully",
  "data": {
    "id": "uuid",
    "userId": "user-uuid",
    "storeId": "store-uuid",
    "rating": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

Or if no rating exists:
```json
{
  "success": true,
  "message": "Rating retrieved successfully",
  "data": null
}
```

---

### Get User's All Ratings
**GET** `/user/ratings`

Get all ratings submitted by the user.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Query Parameters:**
- `page` (number, default: 1)
- `pageSize` (number, default: 10, max: 100)

**Response (200):**
```json
{
  "success": true,
  "message": "User ratings retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "storeId": "store-uuid-1",
      "rating": 5,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "uuid2",
      "userId": "user-uuid",
      "storeId": "store-uuid-2",
      "rating": 4,
      "createdAt": "2024-01-14T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

## Store Owner Endpoints

All store owner endpoints require `STORE_OWNER` role authorization.

### Get Owner Dashboard
**GET** `/owner/dashboard`

Get dashboard statistics for store owner's stores.

**Headers:**
```
Authorization: Bearer <owner_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard data retrieved",
  "data": {
    "averageRating": 4.35,
    "totalRatings": 80,
    "storeCount": 2
  }
}
```

---

### Get Owner's Stores
**GET** `/owner/stores`

Get all stores owned by the current owner.

**Headers:**
```
Authorization: Bearer <owner_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Stores retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Premium Electronics",
      "email": "store@example.com",
      "address": "123 Market St, City",
      "averageRating": 4.5,
      "totalRatings": 50,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Owner's Ratings
**GET** `/owner/ratings`

Get all ratings for owner's stores.

**Headers:**
```
Authorization: Bearer <owner_token>
```

**Query Parameters:**
- `page` (number, default: 1)
- `pageSize` (number, default: 10, max: 100)
- `storeId` (string, required) - Filter by store

**Example:**
```
GET /owner/ratings?storeId=store-uuid&page=1&pageSize=10
```

**Response (200):**
```json
{
  "success": true,
  "message": "Ratings retrieved successfully",
  "data": [
    {
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "rating": 5,
      "submittedAt": "2024-01-15T10:30:00Z"
    },
    {
      "userName": "Jane Smith",
      "userEmail": "jane@example.com",
      "rating": 4,
      "submittedAt": "2024-01-14T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed: [{\"field\":\"email\",\"message\":\"Invalid email format\"}]",
  "error": "..."
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Unauthorized: Invalid token",
  "error": "Unauthorized: Invalid token"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Forbidden: Insufficient permissions",
  "error": "Forbidden: Insufficient permissions"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "User not found",
  "error": "User not found"
}
```

### Conflict (409)
```json
{
  "success": false,
  "message": "Email already exists",
  "error": "Email already exists"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently, the API does not have rate limiting. For production deployment, consider implementing rate limiting using packages like `express-rate-limit`.

## CORS

CORS is enabled for the frontend domain specified in the `.env` file (`CORS_ORIGIN`).

## Testing with cURL

### Login Example
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@roxsys.com",
    "password": "Admin@123"
  }'
```

### Get Stores Example
```bash
curl -X GET http://localhost:3001/api/stores \
  -H "Authorization: Bearer <your_token>"
```

### Submit Rating Example
```bash
curl -X POST http://localhost:3001/api/ratings \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": "store-uuid",
    "rating": 5
  }'
```

---

**API Documentation Generated**: January 2024
**Version**: 1.0.0
