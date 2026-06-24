# StoreRating Platform - Frontend

A production-ready React + TypeScript frontend application for a Store Rating Platform.

## Features

- **Role-Based Access Control**: Support for System Admin, Normal User, and Store Owner roles
- **Authentication**: JWT-based authentication with localStorage persistence
- **Admin Dashboard**: View statistics and manage users/stores
- **User Features**: Browse stores and submit ratings
- **Store Owner Dashboard**: View store ratings and analytics
- **Responsive Design**: Mobile, tablet, and desktop layouts
- **Material UI Components**: Professional and modern UI
- **Form Validation**: Zod schema validation with React Hook Form

## Tech Stack

- **React 19**: Latest React version
- **TypeScript**: Strong typing for all code
- **React Router DOM**: Client-side routing
- **Material UI (MUI)**: Component library
- **Axios**: HTTP client
- **React Hook Form**: Efficient form management
- **Zod**: Schema validation
- **Recharts**: Data visualization
- **Vite**: Fast build tool

## Project Structure

```
src/
├── components/          # Reusable components (Header, Sidebar, etc.)
├── pages/              # Page components (Auth, Admin, User, Owner)
├── layouts/            # Layout wrappers (AdminLayout, UserLayout, etc.)
├── routes/             # Routing configuration
├── services/           # API services (Auth, Admin, Store, Rating)
├── hooks/              # Custom hooks (useAuth, useToast)
├── context/            # Context API (AuthContext)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (validation, storage)
├── theme/              # Material UI theme configuration
├── constants/          # Constants and mock data
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

## Development

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Build

Build for production:

```bash
npm run build
```

## Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

## Mock Credentials

The application includes mock data for testing:

- **Admin**: admin@example.com / Admin@123
- **User**: user@example.com / User@1234
- **Store Owner**: owner@example.com / Owner@123

## API Integration

The application is structured to be easily integrated with a backend API:

1. All API calls are centralized in the `services/` directory
2. Mock API responses are currently implemented
3. Simply replace mock calls with real API endpoints when the backend is ready
4. The API client (`apiClient.ts`) includes JWT token injection and error handling

## Key Features

### Authentication
- Login and signup pages with form validation
- JWT token storage in localStorage
- Protected routes with role-based access control

### Admin Module
- Dashboard with statistics and charts
- User management (CRUD operations)
- Store management
- View detailed user and store information

### User Module
- Dashboard with activity overview
- Browse and search stores
- Submit and edit store ratings
- Profile management with password change

### Store Owner Module
- Dashboard with store statistics
- View all ratings for their stores
- Store profile with average ratings
- Password management

## UI Components

- **Header**: Navigation and user profile menu
- **Sidebar**: Role-based navigation menu
- **DataTable**: Reusable table component with sorting and filtering
- **RatingStars**: 5-star rating component
- **SearchBar**: Search input with icon
- **LoadingSpinner**: Loading indicator
- **ConfirmDialog**: Confirmation dialog
- **EmptyState**: Empty state display
- **PaginationComponent**: Pagination controls

## Styling

- Modern and clean Material UI design
- Responsive layout using CSS Grid and Flexbox
- Consistent color scheme and typography
- Dark-friendly colors with high contrast

## Performance Optimization

- Component memoization with React.memo
- Lazy loading routes where applicable
- Efficient re-renders with proper dependency management

## Future Enhancements

- Implement real backend API integration
- Add dark mode toggle
- Real-time notifications with WebSockets
- Image upload for stores
- Advanced search and filtering
- Export data to CSV/PDF
- User activity logs

## Support

For issues or questions, please refer to the documentation or contact the development team.
