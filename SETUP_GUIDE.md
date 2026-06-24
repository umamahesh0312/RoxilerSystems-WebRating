# Store Rating Platform - Frontend Setup Guide

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the API base URL if needed

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will start at `http://localhost:3000`

### Mock Credentials for Testing

The application comes with pre-configured mock credentials:

#### System Admin
- Email: `admin@example.com`
- Password: `Admin@123`
- Access: Full admin dashboard with user and store management

#### Normal User
- Email: `user@example.com`
- Password: `User@1234`
- Access: User dashboard and store browsing

#### Store Owner
- Email: `owner@example.com`
- Password: `Owner@123`
- Access: Store owner dashboard with ratings management

## Project Structure Overview

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Top navigation header
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── DataTable.tsx    # Reusable table component
│   ├── RatingStars.tsx  # 5-star rating component
│   └── ...
├── pages/               # Page components organized by feature
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── admin/           # Admin module pages
│   ├── user/            # Normal user module pages
│   └── owner/           # Store owner module pages
├── layouts/             # Layout wrappers
│   ├── AdminLayout.tsx  # Layout for admin pages
│   ├── UserLayout.tsx   # Layout for user pages
│   └── AuthLayout.tsx   # Layout for auth pages
├── services/            # API and business logic
│   ├── apiClient.ts     # Axios instance with interceptors
│   ├── authService.ts   # Authentication API calls
│   ├── adminService.ts  # Admin API calls
│   ├── storeService.ts  # Store API calls
│   └── ...
├── context/             # Global state management
│   └── AuthContext.tsx  # Authentication context
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Auth hook
│   └── useToast.ts      # Toast notification hook
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── theme/               # Material UI theme configuration
└── constants/           # Constants and mock data
```

## Key Features

### 1. Authentication
- **JWT-based authentication** with token storage in localStorage
- **Protected routes** that require authentication
- **Role-based access control** (RBAC)
- Automatic logout on token expiration (401)

### 2. Admin Module
- **Dashboard**: Statistics and charts
- **User Management**: Create, view, and delete users
- **Store Management**: Create, view stores
- **Analytics**: Charts for ratings overview and user distribution

### 3. User Module
- **Dashboard**: Quick activity overview
- **Store Browsing**: Search and filter stores
- **Rating Submission**: Submit and edit ratings
- **Profile**: View profile and change password

### 4. Store Owner Module
- **Dashboard**: View store statistics and recent ratings
- **Store Profile**: View store details and average ratings
- **Password Management**: Change password

## API Integration Guide

The application uses **mock APIs** initially. To integrate with a real backend:

### Step 1: Update Base URL
Edit `.env`:
```
VITE_API_BASE_URL=http://your-api-server.com/api
```

### Step 2: Replace Mock Implementations
All services are in `src/services/`. Replace mock implementations with real API calls:

**Before (Mock):**
```typescript
async login(credentials: LoginFormData): Promise<AuthResponse> {
  // Mock implementation
  return { token: 'mock-token', user: mockUser };
}
```

**After (Real API):**
```typescript
async login(credentials: LoginFormData): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
}
```

### Step 3: API Interceptors
The API client in `src/services/apiClient.ts` includes:
- **Request Interceptor**: Automatically adds JWT token to headers
- **Response Interceptor**: Handles 401 errors and redirects to login

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Preview production build
npm run preview
```

## Form Validation

The application uses **Zod** for schema validation and **React Hook Form** for form management.

### Validation Rules
- **Password**: 8-16 characters, uppercase letter, special character
- **Name**: 2-60 characters
- **Email**: Valid email format
- **Address**: Max 400 characters

### Adding New Form Validation

1. Define schema in `src/utils/validation.ts`:
```typescript
export const myFormSchema = z.object({
  field1: z.string().min(1, 'Required'),
  field2: z.number().min(0),
});
```

2. Use in component:
```typescript
const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(myFormSchema),
});
```

## Styling

- **Material UI**: Primary component library
- **Emotion**: CSS-in-JS styling
- **Custom CSS**: Global styles in `src/index.css`
- **Theme**: Customizable theme in `src/theme/theme.tsx`

### Theme Colors
- **Primary**: #2563eb (Blue)
- **Secondary**: #7c3aed (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)

## Performance Tips

1. **Code Splitting**: Use lazy loading for route components
2. **Memoization**: Use React.memo for expensive components
3. **State Management**: Keep state as low as possible
4. **API Caching**: Implement caching in services if needed

## Troubleshooting

### Issue: "Module not found" errors
- Ensure path aliases in `tsconfig.json` match `vite.config.ts`
- Restart dev server: `npm run dev`

### Issue: Login not working
- Check browser console for errors
- Verify mock credentials are correct
- Check localStorage is enabled

### Issue: TypeScript errors
- Run: `npm run type-check`
- Review error messages in terminal
- Check type definitions in `src/types/`

## Next Steps

1. **Integrate Backend API**: Update services to use real endpoints
2. **Add More Pages**: Follow existing patterns for new features
3. **Enhance Validation**: Add more specific validation rules
4. **Implement Real Notifications**: Replace console with toast notifications
5. **Add Testing**: Set up Jest and React Testing Library

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Material UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## Support

For issues or questions, check:
- README.md for project overview
- Component files for implementation examples
- Mock data in `src/constants/mockData.ts` for data structure reference
