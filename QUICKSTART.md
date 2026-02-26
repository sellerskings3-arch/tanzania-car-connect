# Kings Sellers - Quick Start Guide

Get your car marketplace running in 15 minutes!

## Step 1: Supabase Setup (5 minutes)

### Create Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Name: `kings-sellers`
4. Choose a strong database password
5. Select region closest to you
6. Click "Create new project"

### Run Database Setup
1. Open SQL Editor in Supabase Dashboard
2. Copy the entire SQL from `SUPABASE_SETUP.md` sections 2 & 3
3. Paste and click "Run"

### Create Storage Bucket
1. Go to Storage
2. Click "Create bucket"
3. Name: `car-images`
4. Make it public ✓
5. Click "Create"
6. Go to Policies tab
7. Run storage policies SQL from `SUPABASE_SETUP.md` section 4

### Create Admin User
1. Go to Authentication > Users
2. Click "Add user"
3. Email: `admin@kingssellers.com` (or your email)
4. Password: Create a strong password
5. Click "Create user"

### Get API Keys
1. Go to Project Settings > API
2. Copy "Project URL"
3. Copy "anon public" key

## Step 2: Local Setup (5 minutes)

### Install & Configure
```bash
# Clone and install
git clone <your-repo>
cd kings-sellers
npm install

# Create environment file
cp .env.example .env.local
```

### Add Your Credentials
Edit `.env.local`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Start Development
```bash
npm run dev
```

Visit: `http://localhost:8080`

## Step 3: Test Everything (5 minutes)

### Test Admin Login
1. Go to `http://localhost:8080/admin/login`
2. Login with your admin credentials
3. You should see the dashboard

### Add Your First Car
1. Click "Add New Car"
2. Fill in details:
   - Title: "Toyota Corolla 2020"
   - Brand: Toyota
   - Model: Corolla
   - Year: 2020
   - Mileage: 50000
   - Price: 25000000
   - Fuel Type: Petrol
   - Transmission: Automatic
   - Condition: Used
   - Status: Available
3. Click "Save Car"

### Upload Images
1. You'll be redirected to edit page
2. Click "Upload Images"
3. Select 2-3 car images
4. Wait for upload to complete

### View Public Site
1. Go to `http://localhost:8080/cars`
2. You should see your car listed
3. Click on it to view details

## Step 4: Deploy (Optional)

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables when prompted
```

Or use Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Add environment variables
4. Deploy!

## Troubleshooting

### Can't login?
- Check Supabase project is active
- Verify environment variables are correct
- Check admin user was created

### Images not uploading?
- Verify storage bucket is public
- Check storage policies were applied
- Look for errors in browser console

### Cars not showing?
- Check car status is "available"
- Verify RLS policies were applied
- Check browser console for errors

## Next Steps

1. Customize branding and colors
2. Add more cars to your inventory
3. Update contact information
4. Deploy to production
5. Share with your team!

## Need Help?

- Check `SUPABASE_SETUP.md` for detailed database setup
- Check `DEPLOYMENT.md` for deployment options
- Check `README.md` for full documentation
- Review Supabase Dashboard logs for errors

## Success Checklist

- [ ] Supabase project created
- [ ] Database tables created
- [ ] RLS policies applied
- [ ] Storage bucket created
- [ ] Admin user created
- [ ] Environment variables configured
- [ ] Development server running
- [ ] Admin login works
- [ ] Can add cars
- [ ] Can upload images
- [ ] Cars appear on public site

Congratulations! Your car marketplace is ready! 🎉
