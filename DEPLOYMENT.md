# Kings Sellers - Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in project details:
   - Name: kings-sellers
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Wait for project to be created

### 1.2 Run Database Migrations

1. Go to SQL Editor in Supabase Dashboard
2. Copy and paste the SQL from `SUPABASE_SETUP.md` section 2 (Database Schema)
3. Click "Run" to execute
4. Copy and paste the SQL from section 3 (RLS Policies)
5. Click "Run" to execute

### 1.3 Setup Storage

1. Go to Storage in Supabase Dashboard
2. Click "Create a new bucket"
3. Name: `car-images`
4. Public bucket: Yes
5. Click "Create bucket"
6. Go to Policies tab for the bucket
7. Run the storage policies SQL from `SUPABASE_SETUP.md` section 4

### 1.4 Create Admin User

1. Go to Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email and password for admin
4. Click "Create user"
5. Save these credentials securely

### 1.5 Get API Credentials

1. Go to Project Settings > API
2. Copy:
   - Project URL
   - anon/public key

## Step 2: Local Development Setup

### 2.1 Clone and Install

```bash
git clone <your-repo-url>
cd kings-sellers
npm install
```

### 2.2 Configure Environment

Create `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2.3 Run Development Server

```bash
npm run dev
```

Visit `http://localhost:8080`

## Step 3: Production Deployment

### Option A: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Click "Deploy"

### Option B: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add Environment Variables in Site Settings
7. Click "Deploy site"

### Option C: Custom Server

```bash
# Build the project
npm run build

# The dist folder contains your production files
# Serve with any static file server
npx serve dist
```

## Step 4: Post-Deployment

### 4.1 Test Admin Access

1. Visit `https://your-domain.com/admin/login`
2. Login with admin credentials
3. Test adding a car
4. Upload images
5. Verify car appears on public site

### 4.2 Configure Custom Domain (Optional)

Follow your hosting provider's documentation for custom domains.

### 4.3 Setup SSL

Most hosting providers (Vercel, Netlify) provide automatic SSL.

## Step 5: Maintenance

### Database Backups

Supabase automatically backs up your database. Configure backup retention in Project Settings.

### Monitoring

1. Monitor Supabase Dashboard for:
   - Database usage
   - Storage usage
   - API requests
2. Set up alerts for quota limits

### Updates

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build and deploy
npm run build
```

## Troubleshooting

### Images not uploading

- Check storage bucket is public
- Verify storage policies are correct
- Check file size limits

### Authentication issues

- Verify environment variables are set
- Check Supabase project is active
- Verify admin user exists

### Cars not appearing

- Check RLS policies are enabled
- Verify car status is 'available'
- Check browser console for errors

## Security Checklist

- [ ] Environment variables are not committed to git
- [ ] RLS policies are enabled on all tables
- [ ] Storage bucket has proper policies
- [ ] Admin credentials are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured

## Support

For issues, check:
- Supabase Dashboard logs
- Browser console errors
- Network tab in DevTools
