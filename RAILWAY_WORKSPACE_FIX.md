# Railway Workspace Fix

## Problem
Railway is detecting the monorepo/workspace setup and trying to run `npm ci` at the root, which is failing.

## Solution: Set Root Directory in Railway

### For Frontend Service:

1. Go to Railway Dashboard
2. Click on `retail-sales-frontend` service
3. Go to **Settings** tab
4. Find **"Root Directory"** setting
5. Set it to: `frontend`
6. This tells Railway to treat `frontend/` as the root, ignoring the workspace setup

### For Backend Service:

1. Go to Railway Dashboard
2. Click on `retail-sales-backend` service
3. Go to **Settings** tab
4. Find **"Root Directory"** setting
5. Set it to: `backend`

## Alternative: Remove Workspace Detection

If setting root directory doesn't work, Railway might still detect the workspace. In that case:

### Option 1: Create .railwayignore (Recommended)

Create a file at the root: `.railwayignore`

```
backend/
package.json
package-lock.json
```

This tells Railway to ignore the root workspace when building frontend.

### Option 2: Use Railway's Build Settings

In Railway Settings for frontend:
- **Root Directory**: `frontend`
- **Build Command**: Leave empty (Railway will auto-detect)
- **Start Command**: `npm start`

Railway should then:
1. Only look at `frontend/` directory
2. Run `npm install` in that directory
3. Run `npm run build`
4. Run `npm start`

## Verify Settings

After setting root directory, check:

1. **Root Directory**: `frontend` (for frontend service)
2. **Root Directory**: `backend` (for backend service)
3. **Build Command**: Leave empty or set to `npm install && npm run build`
4. **Start Command**: `npm start`

## Redeploy

After changing settings:
1. Go to **Deployments** tab
2. Click **"Redeploy"** or push a new commit
3. Railway will rebuild with the new root directory setting

## Why This Works

By setting Root Directory to `frontend`, Railway:
- Changes working directory to `frontend/` before building
- Only sees `frontend/package.json`, not the root workspace
- Treats it as a standalone Node.js app
- Avoids workspace-related build issues

