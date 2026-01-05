# Getting Your D1 Database ID

Since you've already created the database, you need to get its ID to update `wrangler.jsonc`.

## Method 1: From Cloudflare Dashboard

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **D1**
3. Click on your database: `technomad-db`
4. The Database ID is shown at the top of the page (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
5. Copy this ID

## Method 2: From Wrangler (if you have the name)

If you know the database name, you can also find it in the Cloudflare dashboard under the database settings.

## Next Steps

Once you have the Database ID:
1. Update `wrangler.jsonc` - replace `YOUR_DATABASE_ID_HERE` with your actual ID
2. Run the migration to create the table



