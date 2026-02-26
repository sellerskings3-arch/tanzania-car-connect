# Kings Sellers - Car Marketplace Platform

A production-ready car marketplace web application built with React, TypeScript, Supabase, and shadcn/ui.

## Features

### Phase 1 (Current)

#### Admin Features
- Secure authentication with Supabase Auth
- Full CRUD operations for car inventory
- Multi-image upload with Supabase Storage
- Car status management (Available/Sold)
- Real-time dashboard with statistics
- Responsive admin panel

#### Public Features
- Browse available cars
- Advanced filtering (brand, price, year, transmission)
- Detailed car pages with image galleries
- Responsive design for all devices
- Contact information for inquiries

## Tech Stack

- **Frontend**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **State Management**: TanStack Query
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

## Project Structure

```
kings-sellers/
├── src/
│   ├── components/
│   │   ├── admin/           # Admin-specific components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── CarForm.tsx
│   │   │   └── ImageUpload.tsx
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── CarCard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication context
│   ├── hooks/
│   │   ├── useCars.ts       # Car data hooks
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client & types
│   │   └── utils.ts
│   ├── pages/
│   │   ├── admin/           # Admin pages
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AddCarPage.tsx
│   │   │   └── EditCarPage.tsx
│   │   ├── Index.tsx        # Home page
│   │   ├── CarsPage.tsx     # Car listing
│   │   ├── CarDetailPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── App.tsx
│   └── main.tsx
├── SUPABASE_SETUP.md        # Database setup guide
├── DEPLOYMENT.md            # Deployment instructions
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kings-sellers
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Follow instructions in `SUPABASE_SETUP.md`
   - Create a Supabase project
   - Run the SQL migrations
   - Create storage bucket
   - Create admin user

4. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start development server:
```bash
npm run dev
```

Visit `http://localhost:8080`

## Usage

### Admin Access

1. Navigate to `/admin/login`
2. Login with your admin credentials
3. Access the dashboard at `/admin/dashboard`

### Managing Cars

#### Add a Car
1. Click "Add New Car" in the dashboard
2. Fill in car details
3. Click "Save Car"
4. Upload images on the edit page

#### Edit a Car
1. Click the edit icon on any car in the dashboard
2. Update details or manage images
3. Click "Save Car"

#### Delete a Car
1. Click the delete icon on any car
2. Confirm deletion

#### Change Status
1. Click the status badge in the dashboard
2. Status toggles between Available/Sold

### Public Browsing

- Visit `/cars` to browse all available cars
- Use filters to narrow down results
- Click on any car to view details

## Database Schema

### Cars Table
- id (UUID, Primary Key)
- title (Text)
- brand (Text)
- model (Text)
- year (Integer)
- mileage (Integer)
- fuel_type (Text)
- transmission (Text)
- condition (Enum: New/Used)
- price (Decimal)
- description (Text)
- status (Enum: available/sold)
- created_at (Timestamp)
- created_by (UUID, Foreign Key)
- updated_at (Timestamp)

### Car Images Table
- id (UUID, Primary Key)
- car_id (UUID, Foreign Key)
- image_url (Text)
- display_order (Integer)
- created_at (Timestamp)

## Security

- Row Level Security (RLS) enabled on all tables
- Public users can only view available cars
- Only authenticated admins can modify data
- Secure image storage with proper policies
- Environment variables for sensitive data

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Run tests
npm run test
```

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

Quick deploy options:
- Vercel (Recommended)
- Netlify
- Custom server

## Future Enhancements (Phase 2+)

- Branch/location management
- Sales tracking system
- Customer management
- Advanced analytics
- Payment integration
- Booking system
- Email notifications
- Advanced search with Elasticsearch
- Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions:
- Check `SUPABASE_SETUP.md` for database setup
- Check `DEPLOYMENT.md` for deployment issues
- Review Supabase Dashboard logs
- Check browser console for errors

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons from [Lucide](https://lucide.dev/)
