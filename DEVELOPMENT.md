# Kings Sellers - Development Guide

## For Developers

This guide helps developers understand the codebase and contribute effectively.

## Architecture Overview

### Frontend Stack
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router v6**: Client-side routing
- **TanStack Query**: Server state management
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library
- **Framer Motion**: Animations

### Backend Stack
- **Supabase**: Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Storage
  - Auto-generated REST API

## Project Structure Explained

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── ui/             # shadcn/ui base components
│   └── *.tsx           # Shared components
├── contexts/           # React contexts for global state
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configs
├── pages/              # Route components
│   ├── admin/         # Admin panel pages
│   └── *.tsx          # Public pages
└── main.tsx           # App entry point
```

## Key Concepts

### 1. Authentication Flow

```typescript
// AuthContext provides auth state globally
const { user, signIn, signOut } = useAuth();

// ProtectedRoute wraps admin routes
<ProtectedRoute>
  <AdminPage />
</ProtectedRoute>
```

### 2. Data Fetching Pattern

```typescript
// Use TanStack Query hooks
const { data, isLoading, error } = usePublicCars(filters);

// Mutations for updates
const createMutation = useCreateCar();
await createMutation.mutateAsync(carData);
```

### 3. Type Safety

```typescript
// All database types are defined in lib/supabase.ts
import { Car, CarWithImages } from '@/lib/supabase';

// Use these types throughout the app
const car: Car = { ... };
```

## Common Development Tasks

### Adding a New Car Field

1. **Update Database**
```sql
ALTER TABLE cars ADD COLUMN new_field TEXT;
```

2. **Update Type Definition**
```typescript
// src/lib/supabase.ts
export type Car = {
  // ... existing fields
  new_field: string;
};
```

3. **Update Form**
```typescript
// src/components/admin/CarForm.tsx
// Add field to schema
const carSchema = z.object({
  // ... existing fields
  new_field: z.string(),
});

// Add input to form
<Input {...register('new_field')} />
```

### Adding a New Filter

1. **Update CarsPage State**
```typescript
const [newFilter, setNewFilter] = useState('');
```

2. **Add to Filters Object**
```typescript
const filters = {
  // ... existing filters
  newFilter: newFilter || undefined,
};
```

3. **Update Query Hook**
```typescript
// src/hooks/useCars.ts
if (filters?.newFilter) {
  query = query.eq('new_field', filters.newFilter);
}
```

### Adding a New Admin Page

1. **Create Page Component**
```typescript
// src/pages/admin/NewPage.tsx
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function NewPage() {
  return (
    <AdminLayout>
      <h1>New Page</h1>
    </AdminLayout>
  );
}
```

2. **Add Route**
```typescript
// src/App.tsx
<Route
  path="/admin/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

3. **Add Navigation Link**
```typescript
// src/components/admin/AdminLayout.tsx
<Link to="/admin/new-page">
  <Button>New Page</Button>
</Link>
```

## Database Queries

### Direct Supabase Queries

```typescript
// Select with filters
const { data, error } = await supabase
  .from('cars')
  .select('*')
  .eq('status', 'available')
  .order('created_at', { ascending: false });

// Insert
const { data, error } = await supabase
  .from('cars')
  .insert([carData])
  .select()
  .single();

// Update
const { data, error } = await supabase
  .from('cars')
  .update({ status: 'sold' })
  .eq('id', carId);

// Delete
const { error } = await supabase
  .from('cars')
  .delete()
  .eq('id', carId);
```

### Using Query Hooks

```typescript
// Always prefer using hooks over direct queries
const { data: cars } = usePublicCars();
const createMutation = useCreateCar();
```

## Styling Guidelines

### Tailwind CSS Classes

```typescript
// Use semantic class names
<div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold mb-4">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

### shadcn/ui Components

```typescript
// Import from @/components/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Use with variants
<Button variant="outline" size="sm">Click</Button>
```

## Error Handling

### Query Errors

```typescript
const { data, error, isLoading } = usePublicCars();

if (isLoading) return <Loader />;
if (error) return <ErrorMessage error={error} />;
return <CarList cars={data} />;
```

### Mutation Errors

```typescript
const mutation = useCreateCar();

try {
  await mutation.mutateAsync(data);
  toast({ title: 'Success' });
} catch (error) {
  toast({ 
    title: 'Error', 
    description: error.message,
    variant: 'destructive' 
  });
}
```

## Testing

### Manual Testing Checklist

Before committing:
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Forms validate correctly
- [ ] Loading states work
- [ ] Error states work

### Build Test

```bash
npm run build
```

Should complete without errors.

## Performance Tips

### 1. Optimize Images
```typescript
// Use lazy loading
<img loading="lazy" src={url} alt={alt} />
```

### 2. Memoize Expensive Calculations
```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### 3. Debounce Search Inputs
```typescript
const debouncedSearch = useMemo(
  () => debounce((value) => setSearch(value), 300),
  []
);
```

## Debugging

### Common Issues

**Issue**: Images not loading
```typescript
// Check storage URL is correct
console.log(supabase.storage.from('car-images').getPublicUrl('path'));
```

**Issue**: RLS blocking queries
```typescript
// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user);
```

**Issue**: Query not updating
```typescript
// Invalidate query cache
queryClient.invalidateQueries({ queryKey: ['cars'] });
```

### DevTools

1. **React DevTools**: Inspect component tree
2. **Network Tab**: Check API requests
3. **Console**: Check for errors
4. **Supabase Dashboard**: Check database and logs

## Code Style

### TypeScript

```typescript
// Use explicit types for function parameters
function createCar(data: CarFormData): Promise<Car> {
  // ...
}

// Use type inference for variables
const cars = await fetchCars(); // Type inferred
```

### React Components

```typescript
// Use function components
export default function CarCard({ car }: { car: Car }) {
  return <div>{car.title}</div>;
}

// Extract complex logic to hooks
function useCarFilters() {
  const [filters, setFilters] = useState({});
  return { filters, setFilters };
}
```

### Naming Conventions

- Components: PascalCase (`CarCard.tsx`)
- Hooks: camelCase with 'use' prefix (`useCars.ts`)
- Utilities: camelCase (`formatPrice.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

## Git Workflow

### Branch Naming
- Feature: `feature/add-car-comparison`
- Bug fix: `fix/image-upload-error`
- Hotfix: `hotfix/security-patch`

### Commit Messages
```
feat: add car comparison feature
fix: resolve image upload error
docs: update deployment guide
refactor: simplify car form validation
```

## Environment Variables

### Development
```env
# .env.local
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=local-dev-key
```

### Production
```env
# Set in hosting platform
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=production-key
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Lint code

# Database
# Run in Supabase SQL Editor
SELECT * FROM cars;
SELECT * FROM car_images;

# Clear cache
rm -rf node_modules .vite
npm install
```

## Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Supabase Docs](https://supabase.com/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [shadcn/ui Docs](https://ui.shadcn.com)

### Tools
- [Supabase Studio](https://supabase.com/dashboard)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## Getting Help

1. Check existing documentation
2. Review Supabase Dashboard logs
3. Check browser console
4. Search GitHub issues
5. Ask in team chat

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit pull request
6. Wait for code review

---

Happy coding! 🚀
