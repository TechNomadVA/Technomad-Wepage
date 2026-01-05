# Setting Up a New GitHub Repository

## Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Choose a repository name (e.g., "technomad-website" or "technomad-new")
3. Choose if it should be **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

## Step 2: Connect Your Local Repository

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the new remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Verify it's connected
git remote -v

# Push your code to the new repository
git branch -M main
git push -u origin main
```

## Step 3: Update Cloudflare Pages (if needed)

If you're using Cloudflare Pages with Git integration:
1. Go to Cloudflare Dashboard → Pages
2. Click on your project
3. Go to Settings → Builds & deployments
4. Update the Git repository connection to point to your new repository

