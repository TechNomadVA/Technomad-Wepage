# Setting Up Cloudflare D1 Database

## Step 1: Create D1 Database

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **D1** (in the left sidebar)
3. Click **Create database**
4. Name it: `technomad-db`
5. Click **Create**
6. **Copy the Database ID** - you'll need this!

## Step 2: Update wrangler.jsonc

1. Open `wrangler.jsonc`
2. Replace `YOUR_DATABASE_ID_HERE` with your actual Database ID from Step 1

## Step 3: Run Database Migration

Run this command to create the database tables:

```bash
npx wrangler d1 execute technomad-db --file=./migrations/0001_initial_schema.sql
```

Or if you need to create the database binding first:

```bash
# Create the database (if not already created in dashboard)
npx wrangler d1 create technomad-db

# Then run the migration
npx wrangler d1 execute technomad-db --file=./migrations/0001_initial_schema.sql
```

## Step 4: Deploy to Cloudflare Pages

The API functions are in the `functions/` directory and will automatically be deployed with your Pages site.

### For Local Development:

```bash
# Start local dev server with D1
npx wrangler pages dev dist --d1=DB=technomad-db
```

## Step 5: Verify It Works

1. Submit an email through the signup form on your site
2. Check the database:
   ```bash
   npx wrangler d1 execute technomad-db --command="SELECT * FROM subscribers"
   ```

## API Endpoints

- **POST /api/subscribe** - Submit email subscription
- **GET /api/subscribers** - Get all subscribers (for admin/market research)
  - Query params: `?page=1&limit=100`

## Database Schema

The `subscribers` table stores:
- `id` - Auto-incrementing ID
- `email` - Subscriber email (unique)
- `subscribed_at` - Timestamp of subscription
- `source` - Where the subscription came from (default: 'website')
- `notes` - Optional notes
- `created_at` - Auto timestamp

## Troubleshooting

**Issue**: Database not found
- Make sure you've created the database in Cloudflare Dashboard
- Verify the database ID in `wrangler.jsonc` is correct

**Issue**: Functions not working
- Make sure `functions/` directory is in your project root
- Cloudflare Pages automatically detects and deploys functions

**Issue**: CORS errors
- The API endpoints include CORS headers
- Make sure you're testing from the same domain



