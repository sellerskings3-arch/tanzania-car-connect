# Kings Sellers - Application Routes

## Public Routes (No Authentication Required)

### Home Page
```
Route: /
Component: Index.tsx
Features:
  - Hero section
  - Featured cars (first 6 available)
  - Why choose us section
  - Region grid
  - Call-to-action section
```

### Cars Listing Page
```
Route: /cars
Component: CarsPage.tsx
Features:
  - All available cars
  - Filters sidebar:
    - Brand filter
    - Transmission filter
    - Price range filter
    - Year range filter
  - Car cards with images
  - Responsive grid layout
```

### Car Detail Page
```
Route: /cars/:id
Component: CarDetailPage.tsx
Features:
  - Image carousel
  - Full car specifications
  - Description
  - Price
  - Contact buttons (call/email)
  - Back to cars button
```

### About Page
```
Route: /about
Component: AboutPage.tsx
Features:
  - Company information
  - Mission and values
  - Team information
```

### Contact Page
```
Route: /contact
Component: ContactPage.tsx
Features:
  - Contact form
  - Contact information
  - Location/map
  - Social media links
```

## Admin Routes (Authentication Required)

### Admin Login
```
Route: /admin/login
Component: LoginPage.tsx
Access: Public (redirects to dashboard if already logged in)
Features:
  - Email/password login form
  - Form validation
  - Error handling
  - Redirects to dashboard on success
```

### Admin Dashboard
```
Route: /admin/dashboard
Component: DashboardPage.tsx
Access: Protected (requires authentication)
Features:
  - Statistics cards:
    - Total cars
    - Available cars
    - Sold cars
    - Total inventory value
  - Cars table with:
    - Car image thumbnail
    - Title, brand, year
    - Price
    - Status badge (clickable to toggle)
    - Action buttons (view, edit, delete)
  - Add new car button
  - Logout button in header
```

### Add New Car
```
Route: /admin/cars/new
Component: AddCarPage.tsx
Access: Protected (requires authentication)
Features:
  - Comprehensive car form:
    - Title
    - Brand (dropdown)
    - Model
    - Year
    - Mileage
    - Price
    - Fuel type (dropdown)
    - Transmission (dropdown)
    - Condition (New/Used)
    - Status (Available/Sold)
    - Description (textarea)
  - Form validation
  - Save button
  - Redirects to dashboard on success
```

### Edit Car
```
Route: /admin/cars/:id/edit
Component: EditCarPage.tsx
Access: Protected (requires authentication)
Features:
  - Image upload section:
    - Upload multiple images
    - View uploaded images
    - Delete individual images
  - Car form (pre-filled with existing data)
  - Save button
  - Redirects to dashboard on success
```

## Route Protection

### Public Routes
- Accessible to everyone
- No authentication required
- Can view available cars only

### Protected Routes
- Require authentication
- Redirect to /admin/login if not authenticated
- Show loading spinner while checking auth
- Full access to all features

## Navigation Structure

### Public Navigation (Header)
```
Home (/)
├── Cars (/cars)
│   └── Car Detail (/cars/:id)
├── About (/about)
└── Contact (/contact)
```

### Admin Navigation (Admin Layout)
```
Admin Login (/admin/login)
└── Dashboard (/admin/dashboard)
    ├── Add Car (/admin/cars/new)
    └── Edit Car (/admin/cars/:id/edit)
```

## URL Parameters

### Dynamic Routes
```
/cars/:id
  - :id = Car UUID
  - Example: /cars/123e4567-e89b-12d3-a456-426614174000

/admin/cars/:id/edit
  - :id = Car UUID
  - Example: /admin/cars/123e4567-e89b-12d3-a456-426614174000
```

### Query Parameters (Future Enhancement)
```
/cars?brand=Toyota&minPrice=10000000&maxPrice=50000000
  - Currently handled via state
  - Can be enhanced to use URL params
```

## Route Redirects

### Authentication Redirects
```
Not Authenticated + Protected Route
  → Redirect to /admin/login

Authenticated + /admin/login
  → Redirect to /admin/dashboard

After Login Success
  → Redirect to /admin/dashboard

After Car Create
  → Redirect to /admin/dashboard

After Car Update
  → Redirect to /admin/dashboard
```

## 404 Not Found

```
Route: * (catch-all)
Component: NotFound.tsx
Features:
  - 404 error message
  - Back to home button
```

## Route Components Hierarchy

```
App.tsx
├── AuthProvider
│   ├── Public Routes
│   │   ├── Index (/)
│   │   ├── CarsPage (/cars)
│   │   ├── CarDetailPage (/cars/:id)
│   │   ├── AboutPage (/about)
│   │   ├── ContactPage (/contact)
│   │   └── NotFound (*)
│   │
│   └── Admin Routes
│       ├── LoginPage (/admin/login)
│       └── ProtectedRoute
│           ├── DashboardPage (/admin/dashboard)
│           ├── AddCarPage (/admin/cars/new)
│           └── EditCarPage (/admin/cars/:id/edit)
```

## Layout Components

### Public Layout
```
Used by: All public pages
Components:
  - Header (navigation)
  - Main content
  - Footer
```

### Admin Layout
```
Used by: All admin pages (except login)
Components:
  - Admin header (with logout)
  - Admin navigation
  - Main content
  - No footer
```

## Route Guards

### ProtectedRoute Component
```typescript
Location: src/components/ProtectedRoute.tsx

Functionality:
  - Checks authentication state
  - Shows loading spinner while checking
  - Redirects to login if not authenticated
  - Renders children if authenticated
```

## Navigation Links

### Public Header Links
```
- Home → /
- Cars → /cars
- About → /about
- Contact → /contact
- Browse Cars (CTA) → /cars
```

### Admin Header Links
```
- Dashboard → /admin/dashboard
- Add Car → /admin/cars/new
- Sign Out → (triggers logout)
```

### Footer Links
```
- Home → /
- Cars → /cars
- About → /about
- Contact → /contact
```

## Breadcrumbs (Future Enhancement)

Potential breadcrumb structure:
```
Home > Cars > Toyota Corolla 2020
Admin > Dashboard > Edit Car
```

## Deep Linking

All routes support deep linking:
```
✅ Can bookmark any page
✅ Can share car detail URLs
✅ Can refresh on any page
✅ Browser back/forward works
```

## Route Performance

### Code Splitting
```
- Public routes: Loaded together
- Admin routes: Lazy loaded
- Reduces initial bundle size
```

### Prefetching
```
- TanStack Query prefetches data
- Images lazy loaded
- Smooth navigation
```

## Testing Routes

### Manual Testing
```bash
# Start dev server
npm run dev

# Test public routes
http://localhost:8080/
http://localhost:8080/cars
http://localhost:8080/cars/[any-id]
http://localhost:8080/about
http://localhost:8080/contact

# Test admin routes
http://localhost:8080/admin/login
http://localhost:8080/admin/dashboard (requires auth)
http://localhost:8080/admin/cars/new (requires auth)
http://localhost:8080/admin/cars/[any-id]/edit (requires auth)

# Test 404
http://localhost:8080/nonexistent
```

## Route Security

### Public Routes
- ✅ No authentication required
- ✅ Can only view available cars
- ✅ RLS policies enforce data access

### Admin Routes
- ✅ Authentication required
- ✅ Protected by ProtectedRoute component
- ✅ Session validated on each request
- ✅ Automatic redirect if session expires

## Future Route Enhancements

### Phase 2 Potential Routes
```
/admin/sales - Sales management
/admin/customers - Customer management
/admin/branches - Branch management
/admin/analytics - Analytics dashboard
/admin/settings - Settings page
/profile - User profile (for customers)
/favorites - Saved cars (for customers)
/compare - Car comparison tool
```

## Route Configuration

Routes are configured in:
```
src/App.tsx

Using:
- react-router-dom v6
- BrowserRouter
- Routes and Route components
```

## Scroll Behavior

```
Component: ScrollToTop.tsx

Functionality:
- Scrolls to top on route change
- Smooth scroll behavior
- Works on all routes
```

---

## Quick Reference

### Public Access
- `/` - Home
- `/cars` - Browse cars
- `/cars/:id` - Car details
- `/about` - About us
- `/contact` - Contact

### Admin Access (Login Required)
- `/admin/login` - Login
- `/admin/dashboard` - Dashboard
- `/admin/cars/new` - Add car
- `/admin/cars/:id/edit` - Edit car

### Special
- `*` - 404 Not Found

---

**All routes are production-ready and fully functional!**
