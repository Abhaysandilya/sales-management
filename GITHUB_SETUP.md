# GitHub Repository Setup Guide

Follow these steps to upload your project to GitHub and prepare for deployment.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `retail-sales-management-system` (or your preferred name)
   - **Description**: "Retail Sales Management System - TruEstate Assignment"
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Initialize Git and Push to GitHub

Run these commands in your project directory:

### 2.1 Initialize Git Repository

```bash
# Make sure you're in the project root directory
cd C:\Users\abhay sharma\Desktop\trustate

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Retail Sales Management System"
```

### 2.2 Connect to GitHub and Push

```bash
# Add GitHub remote (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: You'll be prompted for your GitHub username and password/token.

### 2.3 If You Need a Personal Access Token

If GitHub asks for authentication:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use the token as your password when pushing

## Step 3: Verify Upload

1. Go to your GitHub repository page
2. You should see all your files:
   - `backend/` folder
   - `frontend/` folder
   - `docs/` folder
   - `README.md`
   - etc.

## Step 4: Update README with Repository Info

After pushing, update the README.md to include:
- Repository URL
- Live application URL (after deployment)
- Any additional setup instructions

## Quick Command Reference

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

## Next Steps

After uploading to GitHub:

1. ✅ **Repository is on GitHub**
2. ⏭️ **Deploy Backend** (Railway/Render/Heroku)
3. ⏭️ **Deploy Frontend** (Vercel/Netlify)
4. ⏭️ **Update README** with live URLs

See `DEPLOYMENT.md` for detailed deployment instructions.

## Troubleshooting

### "Repository not found" error
- Check repository name and username
- Verify you have access to the repository

### "Authentication failed" error
- Use Personal Access Token instead of password
- Check token has `repo` scope

### Large file upload issues
- Make sure `sales_data.json` is in `.gitignore`
- Use Git LFS for large files if needed

