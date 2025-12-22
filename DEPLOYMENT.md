# Cloudflare Pages Deployment Guide

## Method 1: Deploy via Cloudflare Dashboard (Easiest)

### Step 1: Build Your Project
First, make sure your project builds successfully:

```bash
npm install
npm run build
```

This will create a `dist` folder with your production files.

### Step 2: Create a Cloudflare Account
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign up or log in to your account

### Step 3: Deploy to Cloudflare Pages
1. In the Cloudflare Dashboard, go to **Pages** (in the left sidebar)
2. Click **Create a project**
3. Select **Upload assets** (direct upload)
4. Give your project a name (e.g., "technomad")
5. **Build output directory**: `dist`
6. **Root directory**: `/` (leave as default)
7. Click **Upload** and select your `dist` folder
8. Click **Deploy site**

### Step 4: Configure Custom Domain (Optional)
1. After deployment, click on your project
2. Go to **Custom domains**
3. Add your domain and follow DNS setup instructions

---

## Method 2: Deploy via Git Integration (Recommended for Updates)

### Step 1: Push to GitHub/GitLab
1. Create a repository on GitHub or GitLab
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Connect to Cloudflare Pages
1. Go to Cloudflare Dashboard → **Pages**
2. Click **Create a project**
3. Select **Connect to Git**
4. Authorize Cloudflare to access your repository
5. Select your repository

### Step 3: Configure Build Settings
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave as default)
- **Node version**: 18 or higher (auto-detected)

### Step 4: Environment Variables (if needed)
If you have any environment variables, add them in the **Environment variables** section.

### Step 5: Deploy
Click **Save and Deploy**. Cloudflare will automatically:
- Install dependencies
- Run your build command
- Deploy your site
- Set up automatic deployments on every push

---

## Method 3: Deploy via Wrangler CLI

### Step 1: Install Wrangler
```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```bash
wrangler login
```

### Step 3: Build Your Project
```bash
npm run build
```

### Step 4: Deploy
```bash
wrangler pages deploy dist --project-name=technomad
```

---

## Important Notes

### Build Configuration
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 18+ (Cloudflare will auto-detect)

### Asset Sync
Your build script includes `npm run sync-assets` which copies assets from `public/` to `dist/`. This is already handled in your build process.

### Performance Tips
1. Enable **Auto Minify** in Cloudflare Dashboard → Speed → Optimization
2. Enable **Brotli** compression
3. Set up **Cache Rules** for static assets

### Troubleshooting

**Issue**: Assets not loading
- **Solution**: Make sure all assets in `public/` are being copied to `dist/` during build

**Issue**: 404 errors on routes
- **Solution**: Add a `_redirects` file in `public/` with:
  ```
  /*    /index.html   200
  ```

**Issue**: Build fails
- **Solution**: Check Node version (use 18+) and ensure all dependencies are in `package.json`

---

## Quick Deploy Checklist

- [ ] Project builds successfully (`npm run build`)
- [ ] `dist` folder contains all files
- [ ] All assets are in `dist` folder
- [ ] No console errors in build output
- [ ] Test locally with `npm run preview`

---

## After Deployment

1. Your site will be available at: `https://your-project-name.pages.dev`
2. You can add a custom domain in the Pages dashboard
3. Every Git push will trigger a new deployment (if using Git integration)
4. Check deployment logs in the Cloudflare Dashboard if issues occur

