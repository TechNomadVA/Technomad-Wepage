# TechNomad - Cloudflare Build

This is a clean copy of the TechNomad website codebase, synced from Cloudflare.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment

Deploy to Cloudflare Pages:
```bash
npm run deploy
```

## Project Structure

- `src/` - React source code
- `public/` - Static assets
- `functions/` - Cloudflare Pages Functions (API endpoints)
- `migrations/` - Database migrations

## Notes

- Service worker is disabled in development mode
- All routes should work correctly in dev mode
- This folder contains the latest version from Cloudflare

