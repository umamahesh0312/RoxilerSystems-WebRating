# RoxSys Store Rating Platform - Backend

Production-ready Node.js/Express TypeScript backend for the Store Rating Platform.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Morgan + Custom Logger
- **Security**: Helmet, CORS

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── repositories/     # Database access layer
│   ├── middleware/       # Custom middleware
│   ├── routes/           # API route definitions
│   ├── validators/       # Zod validation schemas
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
├── package.json
├── tsconfig.json
└── .env.example
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL Server (running on port 3306)

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/roxsys"

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### 3. Database Setup

#### Create MySQL Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE roxsys;
```

#### Run Prisma Migrations

```bash
npm run prisma:migrate
```

This will:
- Create all database tables according to the schema
- Run migrations

#### Seed Database (Optional)

```bash
npm run prisma:seed
```

This creates test data including:
- Admin user: `admin@roxsys.com` / `Admin@123`
- Store owners: `owner1@roxsys.com` / `Owner1@123`
- Regular users: `user1@roxsys.com` / `User1@123`
- Sample stores and ratings

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## API Documentation

Once the server is running, access the Swagger documentation at:

```
http://localhost:3001/api/docs
```

## Health Check

```bash
curl http://localhost:3001/health
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/change-password` - Change password (requires auth)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard statistics
- `POST /api/admin/users` - Create user
- `GET /api/admin/users` - List users with pagination
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `POST /api/admin/stores` - Create store
- `GET /api/admin/stores` - List stores with pagination
- `GET /api/admin/stores/:id` - Get store details
- `PUT /api/admin/stores/:id` - Update store
- `DELETE /api/admin/stores/:id` - Delete store

### Users
- `GET /api/stores` - Get all stores with user ratings
- `POST /api/ratings` - Submit rating
- `PUT /api/ratings/:storeId` - Update rating
- `GET /api/ratings/:storeId` - Get user's rating for store
- `GET /api/user/ratings` - Get user's all ratings

### Store Owners
- `GET /api/owner/dashboard` - Owner dashboard statistics
- `GET /api/owner/stores` - Get owner's stores
- `GET /api/owner/ratings` - Get ratings for owner's stores

## Authentication

The API uses JWT (Bearer Token) authentication. After login, include the token in request headers:

```
Authorization: Bearer <your_jwt_token>
```

## Validation Rules

### User Fields
- **Name**: 3-60 characters
- **Email**: Valid email format
- **Password**: 8-16 characters, minimum 1 uppercase letter, minimum 1 special character
- **Address**: Maximum 400 characters

### Store Fields
- **Name**: 3-60 characters
- **Email**: Valid email format
- **Address**: 1-400 characters

### Rating Fields
- **Rating**: Integer between 1-5
- **Constraint**: One user can rate a store only once

## Database Schema

### User
- `id` (UUID) - Primary key
- `name` (String)
- `email` (String, unique)
- `password` (String, hashed)
- `address` (String, optional)
- `role` (Enum: ADMIN, STORE_OWNER, NORMAL_USER)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Store
- `id` (UUID) - Primary key
- `name` (String)
- `email` (String)
- `address` (String)
- `ownerId` (UUID) - Foreign key to User
- `averageRating` (Float)
- `totalRatings` (Int)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Rating
- `id` (UUID) - Primary key
- `userId` (UUID) - Foreign key to User
- `storeId` (UUID) - Foreign key to Store
- `rating` (Int, 1-5)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- **Unique**: (userId, storeId) - One rating per user per store

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation Error)
- `401` - Unauthorized
- `403` - Forbidden (Insufficient Permissions)
- `404` - Not Found
- `409` - Conflict (Unique Constraint Violation)
- `500` - Internal Server Error

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT**: Secure token-based authentication
- **bcrypt**: Password hashing with salt
- **Zod**: Input validation and sanitization
- **Role-Based Access Control (RBAC)**: Authorization middleware
- **Error Handling**: Secure error messages without leaking sensitive info

## Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Build & Deploy
npm run build            # Compile TypeScript to JavaScript
npm start                # Run production build

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:migrate:prod # Run migrations in production
npm run prisma:seed      # Seed database with test data
npm run prisma:studio    # Open Prisma Studio (GUI)

# Code Quality
npm run format           # Format code with Prettier
npm run lint             # Lint with ESLint
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | - | MySQL connection string (required) |
| `PORT` | 3001 | Server port |
| `NODE_ENV` | development | Environment (development/production) |
| `JWT_SECRET` | - | JWT signing secret (required) |
| `JWT_EXPIRATION` | 7d | JWT token expiration |
| `CORS_ORIGIN` | http://localhost:5173 | Allowed CORS origin |
| `LOG_LEVEL` | debug | Logging level |

## Troubleshooting

### Database Connection Failed
- Ensure MySQL is running on port 3306
- Check `DATABASE_URL` in `.env` file
- Verify database credentials

### Migration Errors
```bash
# Reset database (caution: deletes all data)
npx prisma migrate reset
```

### JWT Errors
- Check `JWT_SECRET` is set in `.env`
- Verify token format: `Bearer <token>`
- Ensure token hasn't expired

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3002
```

## Frontend Integration

The frontend should connect to:
```
http://localhost:3001/api
```

Configure the API base URL in the frontend environment:
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Deployment

### Build for Production

```bash
npm run build
```

### Environment for Production

Update `.env` file:
```env
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
```

### Start Production Server

```bash
npm start
```

## Support & Debugging

### View Logs
- Check console output during development
- Logs are automatically written with timestamps
- Adjust `LOG_LEVEL` in `.env` for more/less verbosity

### Debug Mode
```bash
NODE_ENV=development npm run dev
```

### Prisma Studio
```bash
npm run prisma:studio
```

Opens GUI to browse and edit database records.

## License

ISC

## Author

RoxSys Development Team

---

**Note**: This is a production-ready backend. Ensure you:
- Change `JWT_SECRET` before production deployment
- Use strong database passwords
- Set `CORS_ORIGIN` to your frontend domain
- Enable HTTPS for production
- Set `NODE_ENV=production` in production
