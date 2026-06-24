# Backend Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js (v16+)
- MySQL running on localhost:3306

### 1. Install & Setup
```bash
cd backend
npm install
cp .env.example .env
```

### 2. Update .env
Edit `.env` with your MySQL credentials:
```
DATABASE_URL="mysql://root:password@localhost:3306/roxsys"
JWT_SECRET=your_secret_key_here
```

### 3. Create Database
```bash
mysql -u root -p
CREATE DATABASE roxsys;
exit
```

### 4. Run Migrations & Seed
```bash
npm run prisma:migrate
npm run prisma:seed
```

### 5. Start Server
```bash
npm run dev
```

Server runs on `http://localhost:3001`

---

## Test Credentials

After seeding, use these to test:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@roxsys.com | Admin@123 |
| Store Owner | owner1@roxsys.com | Owner1@123 |
| User | user1@roxsys.com | User1@123 |

---

## Common Commands

```bash
# Development
npm run dev                    # Start with hot reload
npm run build                  # Build for production
npm start                      # Run production build

# Database
npm run prisma:migrate         # Create/update database
npm run prisma:seed            # Add test data
npm run prisma:studio          # Open Prisma GUI

# Code Quality
npm run format                 # Format code
npm run lint                   # Check for errors
```

---

## API Testing

### Login & Get Token
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@roxsys.com",
    "password": "Admin@123"
  }'
```

Copy the `token` from response.

### Use Token for Requests
```bash
curl -X GET http://localhost:3001/api/admin/dashboard \
  -H "Authorization: Bearer <paste_token_here>"
```

### View API Docs
Open browser: `http://localhost:3001/api/docs`

---

## Project Structure

```
src/
├── config/           # Database, environment setup
├── controllers/      # Request handlers
├── services/         # Business logic
├── repositories/     # Database queries
├── middleware/       # Auth, validation, error handling
├── routes/           # API endpoints
├── validators/       # Zod schemas
├── types/            # TypeScript interfaces
├── utils/            # Helpers (JWT, password, logger, response)
├── app.ts            # Express config
└── server.ts         # Start here
```

---

## Key Features

✅ **Authentication**: JWT-based with bcrypt hashing  
✅ **Authorization**: Role-based access control (RBAC)  
✅ **Validation**: Zod schemas for all inputs  
✅ **Error Handling**: Consistent API error responses  
✅ **Logging**: Morgan + custom logger  
✅ **Security**: Helmet, CORS, rate limiting ready  
✅ **Documentation**: Swagger/OpenAPI on `/api/docs`  
✅ **Database**: MySQL with Prisma ORM  

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| DB connection failed | Check MySQL is running, verify DATABASE_URL |
| Port 3001 in use | Change PORT in .env |
| Migration errors | Run `npx prisma migrate reset` |
| JWT errors | Ensure JWT_SECRET is set in .env |
| CORS errors | Update CORS_ORIGIN in .env |

---

## File Naming Conventions

- Controllers: `*.controller.ts`
- Services: `*.service.ts`
- Repositories: `*.repository.ts`
- Routes: `*.routes.ts`
- Types: `*.ts` in `/types` folder
- Utilities: `*.ts` in `/utils` folder

---

## Frontend Integration

Set frontend API base URL to:
```
http://localhost:3001/api
```

Example in frontend `.env`:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

---

## Environment Variables Reference

| Variable | Example | Description |
|----------|---------|-------------|
| DATABASE_URL | mysql://root:pass@localhost:3306/roxsys | MySQL connection |
| PORT | 3001 | Server port |
| NODE_ENV | development | dev or production |
| JWT_SECRET | your_secret_123 | For signing tokens |
| JWT_EXPIRATION | 7d | Token expiration time |
| CORS_ORIGIN | http://localhost:5173 | Frontend URL |
| LOG_LEVEL | debug | debug/info/warn/error |

---

## Database Schema Overview

**User**: Store login accounts (Admin, Store Owner, Normal User)  
**Store**: Retail stores with owner information  
**Rating**: 1-5 star ratings from users for stores  

One-to-many relationships:
- User → Stores (owner)
- User → Ratings  
- Store → Ratings  

Unique constraint: One rating per user per store

---

## API Response Format

All responses follow this format:

**Success (200):**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info"
}
```

**Paginated (200):**
```json
{
  "success": true,
  "message": "Data retrieved",
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## Validation Rules Quick Reference

- **Name**: 3-60 chars
- **Email**: Valid format
- **Password**: 8-16 chars, 1 uppercase, 1 special char
- **Address**: Max 400 chars
- **Rating**: Integer 1-5, unique per user-store pair

---

## Production Deployment Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Use production MySQL database
- [ ] Update CORS_ORIGIN to frontend domain
- [ ] Enable HTTPS
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure backups for database
- [ ] Review security headers in app.ts
- [ ] Test all API endpoints
- [ ] Document any custom configurations

---

## Support Resources

- **API Docs**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health
- **Main README**: See README.md in backend folder
- **API Documentation**: See src/docs/API_DOCUMENTATION.md
- **Prisma Docs**: https://www.prisma.io/docs/
- **Express Docs**: https://expressjs.com/

---

**Last Updated**: January 2024  
**Version**: 1.0.0
