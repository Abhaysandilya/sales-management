# Deployment Guide

This guide will help you deploy the Retail Sales Management System to production.

## Deployment Architecture

- **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
- **Backend**: Deploy to Railway, Render, or Heroku

## Step 1: Prepare for Deployment

### 1.1 Update Environment Variables

Create `.env` files for production:

**Backend** (`backend/.env`):
```
PORT=3001
NODE_ENV=production
```

**Frontend** (`frontend/.env.production`):
```
VITE_API_URL=https://your-backend-url.com/api
```

### 1.2 Update Frontend API URL

Update `frontend/src/services/api.js` to use environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

## Step 2: Deploy Backend

### Option A: Railway (Recommended - Free Tier Available)

1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js
6. Set root directory to `backend`
7. Add environment variables:
   - `PORT=3001`
   - `NODE_ENV=production`
8. Add your `sales_data.json` file:
   - Go to project settings
   - Add a volume or use Railway's file system
   - Upload `sales_data.json` to `backend/data/`
9. Deploy!

**Railway will give you a URL like**: `https://your-app.railway.app`

### Option B: Render (Free Tier Available)

1. Go to [render.com](https://render.com)
2. Sign up/login
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: retail-sales-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables:
   - `NODE_ENV=production`
7. Upload `sales_data.json` via Render's file system or use a database
8. Deploy!

### Option C: Heroku

1. Install Heroku CLI: `npm install -g heroku`
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set buildpack: `heroku buildpacks:set heroku/nodejs`
5. Deploy: `git push heroku main`
6. Add config vars in Heroku dashboard
7. Upload data file using Heroku file system or add-on

## Step 3: Deploy Frontend

### Option A: Vercel (Recommended - Free & Easy)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project" → Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.railway.app/api`)
6. Deploy!

**Vercel will give you a URL like**: `https://your-app.vercel.app`

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "New site from Git" → Select your repository
4. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist
5. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL
6. Deploy!

### Option C: GitHub Pages

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

2. Build: `npm run build`
3. Push `dist` folder to `gh-pages` branch
4. Enable GitHub Pages in repository settings

## Step 4: Update CORS Settings

After deploying backend, update CORS in `backend/src/index.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

Or for production:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

## Step 5: Data File Upload

### For Railway:
- Use Railway's file system or volume
- Or use a cloud storage service (AWS S3, Google Cloud Storage)
- Update `dataLoader.js` to fetch from cloud storage

### For Render:
- Use Render's persistent disk
- Or integrate with a database (MongoDB, PostgreSQL)

### Alternative: Use a Database
Consider migrating to a database for production:
- MongoDB Atlas (Free tier)
- PostgreSQL (via Railway/Render)
- Supabase (Free tier)

## Quick Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed with correct API URL
- [ ] CORS configured correctly
- [ ] Data file uploaded to backend
- [ ] Environment variables set
- [ ] Test all features (search, filter, sort, pagination)
- [ ] Check mobile responsiveness

## Post-Deployment

1. Test the live application
2. Monitor logs for errors
3. Set up error tracking (Sentry, LogRocket)
4. Configure custom domain (optional)
5. Set up CI/CD for automatic deployments

## Troubleshooting

### Backend not accessible
- Check CORS settings
- Verify environment variables
- Check backend logs

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS configuration
- Ensure backend is running

### Data not loading
- Verify `sales_data.json` is in correct location
- Check file permissions
- Review backend logs

## Support

For deployment issues, check:
- Railway: [docs.railway.app](https://docs.railway.app)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Render: [render.com/docs](https://render.com/docs)

