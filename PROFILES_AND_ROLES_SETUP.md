# ✅ Profiles Table & Role System Complete!

## Overview

A complete user profile and role management system has been added to your Kings Sellers application with two roles: **admin** and **user**.

## 🎯 What Was Created

### 1. User Role Enum
```sql
CREATE TYPE user_role AS ENUM ('admin', 'user');
```

Two roles available:
- **admin** - Full access to manage cars, images, and users
- **user** - Can view their own profile (future: save favorites, inquiries)

### 2. Profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,              -- References auth.users(id)
  email TEXT,                       -- User email
  full_name TEXT,                   -- User's full name
  role user_role DEFAULT 'user',    -- User role (admin/user)
  avatar_url TEXT,                  -- Profile picture URL
  phone TEXT,                       -- Phone number
  created_at TIMESTAMPTZ,           -- Account creation date
  updated_at TIMESTAMPTZ            -- Last update date
);
```

### 3. Automatic Profile Creation

When a new user signs up, a profile is automatically created with:
- Default role: **user**
- Email from auth
- Full name from metadata (if provided)

### 4. Row Level Security (RLS) Policies

#### Profiles Table Policies
1. ✅ **Users can view own profile** - Users can see their own data
2. ✅ **Users can update own profile** - Users can edit their own data
3. ✅ **Admins can view all profiles** - Admins see all users
4. ✅ **Admins can update all profiles** - Admins can edit any user
5. ✅ **Admins can delete profiles** - Admins can remove users

#### Cars Table Policies (Updated)
1. ✅ **Public can view available cars** - Anyone can see available cars
2. ✅ **Admins can view all cars** - Admins see all cars (including sold)
3. ✅ **Admins can insert cars** - Only admins can add cars
4. ✅ **Admins can update cars** - Only admins can edit cars
5. ✅ **Admins can delete cars** - Only admins can delete cars

#### Car Images Table Policies (Updated)
1. ✅ **Public can view car images** - Anyone can see images of available cars
2. ✅ **Admins can view all car images** - Admins see all images
3. ✅ **Admins can insert car images** - Only admins can upload images
4. ✅ **Admins can update car images** - Only admins can edit images
5. ✅ **Admins can delete car images** - Only admins can delete images

## 🔐 Security Model

### Role-Based Access Control (RBAC)

**Admin Role:**
- ✅ Full CRUD on cars
- ✅ Full CRUD on car images
- ✅ View all profiles
- ✅ Update any profile
- ✅ Delete profiles
- ✅ View sold cars

**User Role:**
- ✅ View own profile
- ✅ Update own profile
- ✅ View available cars (public)
- ❌ Cannot manage cars
- ❌ Cannot manage images
- ❌ Cannot view other profiles

**Public (Not Logged In):**
- ✅ View available cars
- ✅ View images of available cars
- ❌ No access to admin features
- ❌ No access to profiles

## 📊 Database Schema

### Tables Summary
```
profiles (NEW)
├── id (UUID, PK, FK to auth.users)
├── email (TEXT)
├── full_name (TEXT)
├── role (user_role ENUM: 'admin' | 'user')
├── avatar_url (TEXT)
├── phone (TEXT)
├── created_at (TIMESTAMPTZ)
└── updated_at (TIMESTAMPTZ)

cars (UPDATED RLS)
├── All existing columns
└── RLS now checks profiles.role = 'admin'

car_images (UPDATED RLS)
├── All existing columns
└── RLS now checks profiles.role = 'admin'
```

## 🚀 How to Create Admin User

### Method 1: Via Supabase Dashboard (Recommended)

1. **Create User in Auth**
   - Go to Supabase Dashboard
   - Navigate to **Authentication** > **Users**
   - Click **"Add user"** > **"Create new user"**
   - Enter:
     - Email: `admin@kingssellers.com`
     - Password: (strong password)
   - Click **"Create user"**
   - Copy the user ID

2. **Update Profile to Admin**
   - Go to **Table Editor** > **profiles**
   - Find the user's profile (auto-created)
   - Edit the **role** field
   - Change from `user` to `admin`
   - Save

### Method 2: Via SQL (Quick)

```sql
-- Step 1: Create auth user (do this in Supabase Dashboard)
-- Then get the user ID and run:

-- Step 2: Update profile to admin
UPDATE profiles 
SET role = 'admin', full_name = 'Admin User'
WHERE email = 'admin@kingssellers.com';
```

### Method 3: Direct SQL Insert (If profile doesn't exist)

```sql
-- Get user ID first
SELECT id, email FROM auth.users WHERE email = 'admin@kingssellers.com';

-- Insert admin profile
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'user-id-here',
  'admin@kingssellers.com',
  'Admin User',
  'admin'
);
```

## 🔄 Automatic Profile Creation

When a new user signs up through your app:

1. User registers via Supabase Auth
2. Trigger automatically creates profile
3. Default role is set to **user**
4. Email is copied from auth
5. Full name from metadata (if provided)

**Trigger Function:**
```sql
CREATE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, 
          COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 
          'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## 🎯 Usage in Application

### Check User Role in Frontend

Update your `AuthContext.tsx` to include profile:

```typescript
import { supabase } from '@/lib/supabase';

type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  avatar_url?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;  // Add this
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;  // Add this helper
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// In AuthProvider, fetch profile after getting user
useEffect(() => {
  supabase.auth.getSession().then(async ({ data: { session } }) => {
    setSession(session);
    setUser(session?.user ?? null);
    
    if (session?.user) {
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      setProfile(profile);
    }
    setLoading(false);
  });
}, []);
```

### Protect Admin Routes

```typescript
// Update ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  if (!user || !profile) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user is admin
  if (profile.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
```

## 📝 Update Supabase Types

Update `src/lib/supabase.ts`:

```typescript
export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: 'admin' | 'user';
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

// Add to existing types
export type { Profile };
```

## 🧪 Testing Role System

### Test Admin Access

1. Create admin user (see above)
2. Login at `/admin/login`
3. Should see dashboard
4. Can add/edit/delete cars
5. Can upload/delete images

### Test User Access

1. Create regular user
2. Try to access `/admin/dashboard`
3. Should see "Access Denied"
4. Can view own profile
5. Cannot manage cars

### Test Public Access

1. Logout
2. Visit `/cars`
3. Can see available cars
4. Cannot access admin panel

## 🔍 Verify Setup

```sql
-- Check profiles table exists
SELECT * FROM profiles LIMIT 5;

-- Check role enum
SELECT enum_range(NULL::user_role);

-- Check RLS policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('profiles', 'cars', 'car_images')
ORDER BY tablename, policyname;

-- Check triggers
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

## 📊 Current Database State

```
Tables: 3
├── cars (20 rows)
├── car_images (20 rows)
└── profiles (0 rows) - Will populate when users sign up

Roles: 2
├── admin - Full access
└── user - Limited access

RLS Policies: 15
├── profiles: 5 policies
├── cars: 5 policies
└── car_images: 5 policies

Triggers: 3
├── update_cars_updated_at
├── update_profiles_updated_at
└── on_auth_user_created (auto-create profile)
```

## 🎯 Next Steps

1. ✅ Profiles table created
2. ✅ Role system implemented
3. ✅ RLS policies updated
4. ⏭️ Create admin user in Supabase Dashboard
5. ⏭️ Update AuthContext to fetch profile
6. ⏭️ Update ProtectedRoute to check role
7. ⏭️ Test admin and user access
8. ⏭️ Deploy to production

## 🚨 Important Notes

### Security
- ✅ All admin operations check `profiles.role = 'admin'`
- ✅ Users cannot escalate their own role
- ✅ Only admins can change user roles
- ✅ RLS enforced on all tables

### Default Behavior
- New signups get **user** role by default
- Admins must be manually promoted
- Profiles auto-created on signup
- Email synced from auth

### Future Enhancements
- Add more roles (manager, sales, etc.)
- Add permissions table for fine-grained control
- Add profile pictures upload
- Add user preferences
- Add activity logs

## 📚 Related Documentation

- `DATABASE_SETUP_COMPLETE.md` - Database setup
- `SEED_DATA_COMPLETE.md` - Sample data
- `READY_TO_USE.md` - Quick start guide

---

**Profiles table and role system successfully implemented!** 🎉

Your application now has proper role-based access control with admin and user roles!
