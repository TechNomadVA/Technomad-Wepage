# Setting Up a New GitHub Account

## Step 1: Create a New GitHub Account

1. Go to https://github.com/signup
2. Enter your email address
3. Create a password (strong password recommended)
4. Choose a username (this will be part of your repository URLs)
5. Verify your email address when prompted
6. Complete any additional setup steps

## Step 2: Create a New Repository

1. After logging in, go to https://github.com/new
2. **Repository name**: Choose a name (e.g., "technomad-website", "technomad", "my-website")
3. **Description**: (Optional) Add a description
4. **Visibility**: Choose **Public** or **Private**
   - Public: Anyone can see your code
   - Private: Only you (and collaborators) can see it
5. **Important**: Do NOT check any of these boxes:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
   (We already have these files in your project)
6. Click **Create repository**

## Step 3: Get Your Repository URL

After creating the repository, GitHub will show you a page with setup instructions. You'll see a URL like:
- `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`

**Copy this URL** - you'll need it in the next step!

## Step 4: Connect Your Local Repository

Once you have your new repository URL, come back here and I'll help you connect it.

---

## Quick Reference Commands

After you have your repository URL, we'll run:

```bash
# Add the new remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify connection
git remote -v

# Push your code (choose your branch)
git push -u origin LandingPageUpdate
# OR
git push -u origin main
```

## Notes

- Your local repository is already set up with Git
- All your code and history will be preserved
- You can push to the new account without losing anything
- Make sure to commit any uncommitted changes first

