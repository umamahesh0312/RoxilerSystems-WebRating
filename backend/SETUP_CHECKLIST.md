# Backend Setup Checklist

Complete checklist to verify the backend is properly set up and ready to run.

## ✅ Pre-Installation Checklist

### System Requirements
- [ ] Node.js v16 or higher installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] MySQL Server installed and running
- [ ] MySQL running on port 3306 (default)
- [ ] MySQL root user access
- [ ] 500MB+ free disk space

### Verify Installation
```bash
node --version      # Should be v16+
npm --version       # Should be v8+
mysql --version     # Should be present
```

---

## ✅ File Structure Verification

### Backend Folder Structure
```
backend/
├── src/
│   ├── config/              [ ] Exists
│   │   ├── env.ts          [ ] Contains environment loader
│   │   └── database.ts     [ ] Contains Prisma client
│   ├── controllers/         [ ] Exists (4 files)
│   ├── services/            [ ] Exists (4 files)
│   ├── repositories/        [ ] Exists (3 files)
│   ├── middleware/          [ ] Exists (4 files)
│   ├── routes/              [ ] Exists (4 files)
│   ├── validators/          [ ] Exists (1 file)
│   ├── types/               [ ] Exists (2 files)
│   ├── utils/               [ ] Exists (4 files)
│   ├── docs/                [ ] Exists (1 file)
│   ├── app.ts              [ ] Express app configuration
│   └── server.ts           [ ] Server startup
├── prisma/
│   ├── schema.prisma       [ ] Database schema
│   └── seed.ts             [ ] Seed data script
├── package.json            [ ] Dependencies file
├── tsconfig.json           [ ] TypeScript config
├── .env.example            [ ] Environment template
├── .gitignore              [ ] Git ignore rules
├── README.md               [ ] Full documentation
├── QUICK_START.md          [ ] Quick start guide
├── PROJECT_MANIFEST.md     [ ] File inventory
├── INTEGRATION_GUIDE.md    [ ] Frontend integration
└── COMPLETION_SUMMARY.md   [ ] Summary
```

---

## ✅ Installation Checklist

### Step 1: Install Dependencies
```bash
[ ] cd backend
[ ] npm install
[ ] npm install --save-dev ts-node typescript
[ ] Verify package.json has all dependencies
```

### Step 2: Environment Setup
```bash
[ ] cp .env.example .env
[ ] Edit .env file
    [ ] DATABASE_URL is set
    [ ] PORT is set (default 3001)
    [ ] JWT_SECRET is set
    [ ] CORS_ORIGIN is set
[ ] Save .env file
```

### Step 3: Database Setup
```bash
[ ] MySQL Server is running
[ ] Create database: CREATE DATABASE roxsys;
[ ] Verify database created: SHOW DATABASES;
[ ] DATABASE_URL in .env matches connection
```

### Step 4: Run Migrations
```bash
[ ] npm run prisma:generate
[ ] npm run prisma:migrate
[ ] Check console for success messages
[ ] Verify tables created in MySQL
```

### Step 5: Seed Database (Optional but Recommended)
```bash
[ ] npm run prisma:seed
[ ] Check console for seed success message
[ ] Verify test data in database
```

---

## ✅ Pre-Launch Verification

### TypeScript Compilation
```bash
[ ] npm run build
[ ] dist/ folder created
[ ] Check for TypeScript errors
```

### Dependencies Verification
```bash
[ ] express installed
[ ] prisma installed
[ ] jwt installed
[ ] bcryptjs installed
[ ] zod installed
[ ] cors installed
[ ] helmet installed
[ ] morgan installed
[ ] swagger-jsdoc installed
[ ] swagger-ui-express installed
```

### Configuration Verification
```bash
[ ] .env file exists
[ ] .env contains all required variables
[ ] tsconfig.json is valid
[ ] package.json has all scripts
```

### Database Verification
```bash
[ ] MySQL connection works
[ ] Database roxsys exists
[ ] Tables created (User, Store, Rating)
[ ] Prisma client generates without errors
```

---

## ✅ Startup Checklist

### Development Start
```bash
[ ] npm run dev
[ ] Server starts without errors
[ ] Console shows "Server is running on port 3001"
[ ] No error messages in console
```

### Health Check
```bash
[ ] Open browser: http://localhost:3001/health
[ ] Response shows: { success: true, message: "Server is running" }
[ ] HTTP 200 status code received
```

### Swagger Documentation
```bash
[ ] Open browser: http://localhost:3001/api/docs
[ ] Swagger UI loads
[ ] All endpoints visible
[ ] Can expand endpoints to see details
```

---

## ✅ API Functionality Verification

### Authentication Test
```bash
[ ] Test POST /api/auth/login with admin credentials
[ ] Receives token in response
[ ] Token can be copied
[ ] Token is valid JWT format
```

### Authorization Test
```bash
[ ] Test GET /api/admin/users with admin token
[ ] Receives data with pagination
[ ] Test with wrong role token fails
[ ] Returns 403 Forbidden for unauthorized role
```

### Validation Test
```bash
[ ] Test POST /api/auth/register with invalid email
[ ] Returns 400 Bad Request
[ ] Error message describes validation error
[ ] Test with invalid password format
[ ] Test with short name
```

### Database Test
```bash
[ ] Test creating user (POST /api/admin/users)
[ ] Data appears in database
[ ] Test updating user (PUT /api/admin/users/:id)
[ ] Changes appear in database
[ ] Test deleting user (DELETE /api/admin/users/:id)
[ ] Data removed from database
```

---

## ✅ Test Data Verification

### Check Seeded Data
```bash
[ ] Admin user exists: admin@roxsys.com
[ ] Owner user exists: owner1@roxsys.com
[ ] Regular user exists: user1@roxsys.com
[ ] 4 stores created
[ ] 6 ratings created
[ ] Store ratings are calculated
```

### Test with Seeded Credentials
```bash
[ ] Login as admin@roxsys.com / Admin@123
[ ] Login as owner1@roxsys.com / Owner1@123
[ ] Login as user1@roxsys.com / User1@123
[ ] Each role can access appropriate endpoints
```

---

## ✅ Frontend Integration Checklist

### Frontend Configuration
```bash
[ ] Frontend .env has VITE_API_BASE_URL set
[ ] VITE_API_BASE_URL=http://localhost:3001/api
[ ] Frontend can reach backend at this URL
```

### CORS Configuration
```bash
[ ] Backend CORS_ORIGIN matches frontend URL
[ ] Frontend running on http://localhost:5173
[ ] CORS error not appearing in browser console
```

### API Integration
```bash
[ ] Frontend can call /api/auth/login
[ ] Frontend receives token
[ ] Frontend stores token in localStorage
[ ] Frontend can use token for subsequent requests
[ ] Frontend can display data from /api/stores
```

---

## ✅ Production Readiness Checklist

### Code Quality
```bash
[ ] No TypeScript errors
[ ] No console.log statements left
[ ] Error messages don't leak sensitive info
[ ] All endpoints documented in Swagger
```

### Security
```bash
[ ] JWT_SECRET is strong random string
[ ] Passwords are hashed (not stored as plain text)
[ ] CORS configured for frontend domain
[ ] Helmet security headers enabled
[ ] No SQL injection vulnerabilities
[ ] No exposed credentials in code
```

### Performance
```bash
[ ] Database has indexes on key fields
[ ] Pagination works correctly
[ ] Queries are optimized
[ ] Response times are acceptable (<500ms)
```

### Documentation
```bash
[ ] README.md is complete
[ ] QUICK_START.md is accurate
[ ] API_DOCUMENTATION.md is complete
[ ] Swagger UI is working
[ ] All endpoints are documented
```

---

## ✅ Troubleshooting Checklist

### If Backend Won't Start
- [ ] Check MySQL is running: `mysql -u root -p -e "SELECT 1"`
- [ ] Check port 3001 is not in use: `lsof -i :3001`
- [ ] Check DATABASE_URL is correct in .env
- [ ] Check JWT_SECRET is set in .env
- [ ] Check NODE_ENV is development or production

### If Database Connection Fails
- [ ] Verify MySQL server is running
- [ ] Verify DATABASE_URL format: `mysql://user:password@localhost:3306/roxsys`
- [ ] Verify database exists: `SHOW DATABASES;`
- [ ] Verify credentials are correct
- [ ] Check port 3306 is accessible

### If Migrations Fail
- [ ] Ensure MySQL database exists
- [ ] Run `npm run prisma:generate` first
- [ ] Check schema.prisma for syntax errors
- [ ] Try `npx prisma migrate reset` (deletes all data)
- [ ] Check .env DATABASE_URL is correct

### If API Endpoints Return 401
- [ ] Check JWT_SECRET matches in .env
- [ ] Check token is in Authorization header
- [ ] Check Authorization header format: `Bearer <token>`
- [ ] Check token hasn't expired
- [ ] Try logging in again to get new token

### If CORS Errors Appear
- [ ] Check CORS_ORIGIN in .env matches frontend URL
- [ ] Frontend should be: http://localhost:5173
- [ ] Restart backend after changing CORS_ORIGIN
- [ ] Clear browser cache and cookies
- [ ] Check browser console for exact CORS error

---

## ✅ Performance Verification

### Response Time Check
```bash
[ ] GET /stores < 500ms
[ ] GET /admin/users < 500ms
[ ] POST /ratings < 300ms
[ ] Login response < 300ms
```

### Database Query Check
```bash
[ ] Indexes present on: email, userId, storeId
[ ] Query plans are efficient
[ ] No full table scans for common queries
[ ] Pagination reduces result set
```

---

## ✅ Security Verification

### Authentication
```bash
[ ] Passwords are hashed (bcrypt with 10 rounds)
[ ] Tokens are JWT format
[ ] Token expiration is set (7 days)
[ ] Expired tokens are rejected
```

### Authorization
```bash
[ ] Admin endpoints require ADMIN role
[ ] User endpoints require NORMAL_USER role
[ ] Owner endpoints require STORE_OWNER role
[ ] Mixed roles work correctly
```

### Input Validation
```bash
[ ] Email validation works
[ ] Password requirements enforced
[ ] Name length validated (3-60 chars)
[ ] Rating validation (1-5 only)
[ ] SQL injection prevented (Prisma)
```

---

## ✅ Deployment Checklist

### Production Environment
```bash
[ ] NODE_ENV=production
[ ] JWT_SECRET is strong (32+ chars)
[ ] CORS_ORIGIN set to production frontend URL
[ ] LOG_LEVEL set to error or warn
[ ] DATABASE_URL uses production database
```

### Database Backup
```bash
[ ] Production database has backups
[ ] Backup tested and verified
[ ] Backup schedule set up
[ ] Recovery procedure documented
```

### Monitoring
```bash
[ ] Error logging configured
[ ] Performance monitoring enabled
[ ] Health check endpoint accessible
[ ] Alerts set up for critical errors
```

---

## ✅ Final Sign-Off

### Backend Validation
- [ ] All files present and accounted for
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Database created and migrated
- [ ] Server starts without errors
- [ ] Health check passes
- [ ] API endpoints respond correctly
- [ ] Authentication works
- [ ] Authorization works
- [ ] Validation works
- [ ] Error handling works
- [ ] Documentation is complete
- [ ] Swagger UI works
- [ ] Ready for frontend integration
- [ ] Ready for production deployment

---

## 📋 Pre-Launch Summary

| Item | Status |
|------|--------|
| Node.js installed | [ ] |
| MySQL installed | [ ] |
| Dependencies installed | [ ] |
| Environment configured | [ ] |
| Database created | [ ] |
| Migrations run | [ ] |
| Seed data loaded | [ ] |
| Compilation successful | [ ] |
| Server starts | [ ] |
| Health check passes | [ ] |
| API endpoints work | [ ] |
| Authentication works | [ ] |
| Authorization works | [ ] |
| Swagger docs work | [ ] |
| Frontend can connect | [ ] |
| Ready to launch | [ ] |

---

## Quick Verification Commands

```bash
# Check Node.js
node --version

# Check MySQL
mysql -u root -p -e "SELECT 1"

# Check backend
cd backend

# Install
npm install

# Setup database
mysql -u root -p -e "CREATE DATABASE roxsys"

# Run migrations
npm run prisma:migrate

# Seed data (optional)
npm run prisma:seed

# Build
npm run build

# Start
npm run dev

# Health check (in another terminal)
curl http://localhost:3001/health

# View docs
# Open browser: http://localhost:3001/api/docs
```

---

## Support

If any items fail:
1. Check the relevant documentation file
2. Review error messages carefully
3. Check troubleshooting section above
4. Verify all prerequisites are met
5. Try restarting the service

---

**Date Completed:** _____________  
**Verified By:** _____________  
**Status:** ⏱️ Ready to Launch 🚀

---

This checklist ensures the backend is properly set up and ready for development and deployment.
