# Deployment Information - TechNomad Website

## Deployment URL
**Production URL**: https://8fd1ac40.technomad-0-1-1.pages.dev

## Deployment Details

### Platform
- **Platform**: Cloudflare Pages
- **Project Name**: `technomad-0-1-1` (based on deployment URL)
- **Deployment Hash**: `8fd1ac40`

### Features Deployed
1. **Main Landing Page** (`/`)
   - TechNomad branding and messaging
   - "Almost live" pre-launch promotion
   - Enter button to access the site

2. **Admin Page** (`/admin`)
   - Protected by Cloudflare Pages Access
   - Login required at `/login`
   - Subscriber management dashboard
   - Features:
     - View all email subscribers
     - Export subscribers to CSV
     - Pagination support (100 per page)
     - Real-time subscriber count
     - Refresh functionality

3. **Backend API Endpoints**
   - **POST** `/api/subscribe` - Email subscription endpoint
     - Accepts: `{ "email": "user@example.com" }`
     - Returns: Success message or error
     - Checks for duplicate emails
   
   - **GET** `/api/subscribers` - Admin endpoint
     - Query params: `?page=1&limit=100`
     - Returns: Subscribers array with pagination info
     - Protected by Cloudflare Pages Access (via `/admin` route)

### Database
- **Database Type**: Cloudflare D1
- **Database Name**: `technomad-db`
- **Binding**: `DB`
- **Schema**: `subscribers` table
  - `id` - Auto-incrementing ID
  - `email` - Subscriber email (unique)
  - `subscribed_at` - Timestamp of subscription
  - `source` - Source of subscription (default: 'website')
  - `notes` - Optional notes
  - `created_at` - Auto timestamp

### API Functions Location
- `functions/api/subscribe.js` - POST handler for subscriptions
- `functions/api/subscribers.js` - GET handler for admin view

### Build Configuration
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Framework**: Vite + React
- **Node Version**: 18+

### Authentication
- **Admin Route Protection**: Cloudflare Pages Access
- **Login Route**: `/login` (automatically redirects from `/admin`)
- **Login Method**: Cloudflare Access authentication

### Routes Available
- `/` - Home/Landing page
- `/services` - Services page
- `/portfolio` - Portfolio page
- `/contact` - Contact page
- `/admin` - Admin dashboard (protected)
- `/login` - Admin login (Cloudflare Access)

### Project Structure
```
Webpage Demo best/
├── src/
│   ├── pages/
│   │   ├── Admin.jsx          # Admin dashboard component
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   └── Contact.jsx
│   ├── components/
│   └── App.jsx                # Router configuration
├── functions/
│   └── api/
│       ├── subscribe.js       # POST /api/subscribe
│       └── subscribers.js     # GET /api/subscribers
├── migrations/
│   └── 0001_initial_schema.sql
├── wrangler.jsonc             # Cloudflare configuration
└── package.json
```

### Deployment Methods Available

#### Method 1: Wrangler CLI
```bash
npm run build
npx wrangler pages deploy dist --project-name=technomad-0-1-1
```

#### Method 2: Cloudflare Dashboard
1. Go to Cloudflare Dashboard → Pages
2. Select project: `technomad-0-1-1`
3. Upload `dist` folder or connect to Git

#### Method 3: Git Integration (Auto-deploy)
- Push to connected Git repository
- Cloudflare Pages auto-deploys on push

### Environment Variables (if any)
- Check Cloudflare Pages dashboard → Settings → Environment variables
- D1 Database binding: `DB` → `technomad-db`

### Next Steps to Re-deploy

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy via Wrangler:**
   ```bash
   npx wrangler pages deploy dist --project-name=technomad-0-1-1
   ```

3. **Or deploy via Dashboard:**
   - Go to https://dash.cloudflare.com/
   - Navigate to Pages → `technomad-0-1-1`
   - Upload new `dist` folder

### Important Notes
- The deployment URL structure suggests this is a Cloudflare Pages preview or production deployment
- Admin access is protected by Cloudflare Pages Access
- Database must be connected in Cloudflare Dashboard
- API functions in `functions/` directory are automatically deployed with Pages
- All source code is in this repository

### Last Verified
- Deployment URL is live and accessible
- Admin page redirects to login (Cloudflare Access)
- Main landing page displays correctly

