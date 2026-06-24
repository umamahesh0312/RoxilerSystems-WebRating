# Store Rating Platform - Developer Quick Reference

## 🚀 Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Login with mock credentials
# Email: admin@example.com
# Password: Admin@123
```

## 📁 Key File Locations

| What | Where |
|------|-------|
| Authentication Logic | `src/context/AuthContext.tsx` |
| API Services | `src/services/*.ts` |
| Page Components | `src/pages/{admin,user,owner}/*.tsx` |
| Reusable Components | `src/components/*.tsx` |
| Type Definitions | `src/types/index.ts` |
| Validation Schemas | `src/utils/validation.ts` |
| Mock Data | `src/constants/mockData.ts` |
| Routes Config | `src/routes/AppRoutes.tsx` |
| Theme Config | `src/theme/theme.tsx` |

## 🔐 User Roles & Access

```
ADMIN: /admin/dashboard → /admin/users → /admin/stores
USER: /user/dashboard → /user/stores → /user/profile
OWNER: /owner/dashboard → /owner/profile
```

## 💾 Adding a New Page

### Step 1: Create Page Component
```typescript
// src/pages/new/NewPage.tsx
import React from 'react';
import { UserLayout } from '@/layouts/UserLayout';

export const NewPage: React.FC = () => {
  return (
    <UserLayout>
      <div>Your content here</div>
    </UserLayout>
  );
};
```

### Step 2: Add Route
```typescript
// src/routes/AppRoutes.tsx
<Route path="/user/new" element={<ProtectedRoute><NewPage /></ProtectedRoute>} />
```

### Step 3: Add Menu Item
```typescript
// src/components/Sidebar.tsx
{ icon: <Icon />, label: 'New', path: '/user/new', roles: [UserRole.NORMAL_USER] }
```

## 🔗 Adding API Integration

### Step 1: Create Service
```typescript
// src/services/newService.ts
class NewService {
  async getData() {
    const response = await apiClient.get('/endpoint');
    return response.data;
  }
}
export default new NewService();
```

### Step 2: Use in Component
```typescript
import newService from '@/services/newService';

useEffect(() => {
  newService.getData().then(data => setData(data));
}, []);
```

## ✅ Form Validation Pattern

### Step 1: Create Schema
```typescript
// src/utils/validation.ts
export const mySchema = z.object({
  field: z.string().min(1, 'Required'),
});
```

### Step 2: Use in Form
```typescript
import { mySchema } from '@/utils/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { control, handleSubmit } = useForm({
  resolver: zodResolver(mySchema),
});
```

## 🧩 Using Context & Hooks

```typescript
// Get auth user
import { useAuth } from '@/hooks/useAuth';
const { user, isAuthenticated, login, logout } = useAuth();

// Use custom hook for local state
const { toasts, showToast } = useToast();
showToast('Success!', 'success');
```

## 📊 Common Component Patterns

### DataTable
```typescript
<DataTable
  columns={columns}
  data={items}
  actions={[
    { label: 'Edit', onClick: (item) => {} },
    { label: 'Delete', onClick: (item) => {} }
  ]}
  loading={loading}
/>
```

### RatingStars
```typescript
<RatingStars
  value={rating}
  onChange={setRating}
  readOnly={false}
  showValue={true}
/>
```

### Pagination
```typescript
<PaginationComponent
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

## 🎨 Theme Colors

```
Primary:    #2563eb (Blue)
Secondary:  #7c3aed (Purple)
Success:    #10b981 (Green)
Warning:    #f59e0b (Amber)
Error:      #ef4444 (Red)
```

## 🐛 Common Issues & Solutions

### Issue: Token not persisting
**Solution**: Check localStorage in DevTools
```javascript
localStorage.getItem('storeRatingToken')
```

### Issue: API 401 errors
**Solution**: Check token expiration, manually clear localStorage

### Issue: TypeScript errors
**Solution**: Run type check
```bash
npm run type-check
```

### Issue: Route not working
**Solution**: Verify route in AppRoutes.tsx and component import

### Issue: Component not updating
**Solution**: Check useEffect dependencies, useState updates

## 📝 Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Pages | PascalCase with Page | `AdminDashboard.tsx` |
| Hooks | camelCase with 'use' | `useAuth.ts` |
| Services | camelCase with Service | `authService.ts` |
| Types | PascalCase | `User`, `Store` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Variables | camelCase | `userName`, `storeId` |

## 🔄 Import Shortcuts (Path Aliases)

```typescript
// Instead of:
import { User } from '../../../types';

// Use:
import { User } from '@/types';

// Available aliases:
@/components  → src/components
@/pages       → src/pages
@/services    → src/services
@/context     → src/context
@/types       → src/types
@/hooks       → src/hooks
@/utils       → src/utils
@/theme       → src/theme
@/layouts     → src/layouts
```

## 📦 Dependency Management

### Add new package
```bash
npm install package-name
```

### Current Main Dependencies
- react, react-dom: UI
- react-router-dom: Routing
- @mui/material: Components
- axios: HTTP
- react-hook-form: Forms
- zod: Validation
- recharts: Charts

## 🧪 Running Commands

```bash
npm run dev          # Start dev server on :3000
npm run build        # Build production (dist/)
npm run preview      # Preview build locally
npm run type-check   # TypeScript validation
```

## 💡 Pro Tips

1. **Use path aliases** for cleaner imports
2. **Extract components** when they get too large
3. **Use hooks** for reusable logic
4. **Keep services** for API/business logic
5. **Test with all 3 roles** during development
6. **Check console** for warnings and errors
7. **Use React DevTools** to debug state
8. **Format code** with Prettier before commit

## 🎯 Development Checklist

- [ ] Feature is responsive (mobile/tablet/desktop)
- [ ] TypeScript types are correct
- [ ] Form validation works (if applicable)
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Works with all applicable user roles
- [ ] No console errors/warnings
- [ ] Component is documented
- [ ] API integration is ready for backend

## 🔒 Security Notes

- JWT tokens stored in localStorage (use sessionStorage for sensitive)
- API requests include token in Authorization header
- Forms validate input before submission
- Role-based access control enforced
- Never expose sensitive data in console/logs

## 📞 Need Help?

1. Check PROJECT_DOCS.md for detailed info
2. Review SETUP_GUIDE.md for setup help
3. Look at existing components for patterns
4. Check mock data in src/constants/mockData.ts
5. Review type definitions in src/types/index.ts

---

**Happy Coding!** 🚀
