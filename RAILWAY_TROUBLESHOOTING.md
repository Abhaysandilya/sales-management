# Railway Troubleshooting Guide

## Frontend "Application failed to respond" Error

### Issue: Frontend not starting properly

### Solution 1: Check Railway Service Configuration

1. **Go to Railway Dashboard**
   - Click on `retail-sales-frontend` service
   - Go to **"Settings"** tab

2. **Verify Service Settings:**
   - **Root Directory**: Should be `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start` (or `npm run preview`)
   - **Watch Paths**: Leave empty or set to `frontend/**`

3. **Check Environment Variables:**
   - Go to **"Variables"** tab
   - Verify `VITE_API_URL` is set to: `https://retail-sales-backend-production-24bc.up.railway.app/api`

### Solution 2: Update Start Command

Railway needs a proper start command. Update your service:

1. Go to `retail-sales-frontend` → **Settings**
2. Under **"Deploy"** section, set:
   - **Start Command**: `npm start`
   
   Or if that doesn't work, try:
   - **Start Command**: `npx vite preview --host 0.0.0.0 --port $PORT`

### Solution 3: Use Static File Serving

For production, you might need to serve static files. Update `frontend/package.json`:

```json
{
  "scripts": {
    "start": "vite preview --host 0.0.0.0 --port $PORT"
  },
  "dependencies": {
    "serve": "^14.2.1"
  }
}
```

Then set start command to: `npm start`

### Solution 4: Check Deployment Logs

1. Go to `retail-sales-frontend` → **"Deployments"** tab
2. Click on the latest deployment
3. Click **"View logs"**
4. Look for errors like:
   - Port binding issues
   - Missing dependencies
   - Build failures
   - Environment variable issues

### Solution 5: Verify Build Output

1. Check if `dist` folder is being created
2. Railway should run `npm run build` first
3. Then serve the built files

## Backend Issues

### Issue: Backend not responding

### Check Backend Logs:
1. Go to `retail-sales-backend` → **"Deployments"**
2. Click **"View logs"**
3. Look for:
   - Port binding errors
   - Missing `sales_data.json` file
   - Module not found errors

### Verify Backend Configuration:
1. **Root Directory**: `backend`
2. **Start Command**: `npm start`
3. **Build Command**: `npm install` (or leave empty)

### Check Environment Variables:
- `NODE_ENV`: `production`
- `PORT`: Railway provides this automatically

## Common Errors and Fixes

### Error: "Cannot find module"
**Fix**: Make sure all dependencies are in `package.json` and `npm install` runs during build

### Error: "Port already in use"
**Fix**: Railway provides `$PORT` environment variable - use it in your start command

### Error: "EADDRINUSE"
**Fix**: Make sure your app listens on `process.env.PORT || 3000` (for frontend) or `process.env.PORT || 3001` (for backend)

### Error: "File not found: sales_data.json"
**Fix**: 
1. Verify file is in `backend/data/sales_data.json`
2. Check file was committed to Git
3. Check Railway deployment logs to see if file exists

### Error: CORS issues
**Fix**: 
1. Add `FRONTEND_URL` to backend environment variables
2. Update CORS configuration in `backend/src/index.js`

## Quick Fix Checklist

- [ ] Frontend root directory: `frontend`
- [ ] Frontend build command: `npm install && npm run build`
- [ ] Frontend start command: `npm start` or `npx vite preview --host 0.0.0.0 --port $PORT`
- [ ] Backend root directory: `backend`
- [ ] Backend start command: `npm start`
- [ ] `VITE_API_URL` set in frontend variables
- [ ] `FRONTEND_URL` set in backend variables (optional)
- [ ] Both services are "Online" (green dot)
- [ ] Check deployment logs for errors

## Still Not Working?

1. **Check Railway Status**: [status.railway.app](https://status.railway.app)
2. **View Detailed Logs**: Service → Deployments → View logs
3. **Restart Service**: Service → Settings → Restart
4. **Redeploy**: Service → Deployments → Redeploy

## Alternative: Use Different Start Command

If Vite preview doesn't work, try using a static file server:

1. Add to `frontend/package.json`:
```json
"dependencies": {
  "serve": "^14.2.1"
},
"scripts": {
  "start": "serve -s dist -l $PORT"
}
```

2. Update Railway start command to: `npm start`

