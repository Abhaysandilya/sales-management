# Railway Final Fix - Force Dockerfile Usage

## The Problem
Railway is still using Railpack/Nixpacks and detecting the workspace, even though we have a Dockerfile. This means Railway settings need to be configured.

## Solution: Configure Railway Settings

### Step 1: Set Root Directory (MOST IMPORTANT)

1. Go to Railway Dashboard
2. Click on `retail-sales-frontend` service
3. Go to **Settings** tab
4. Scroll to **"Deploy"** section
5. Find **"Root Directory"**
6. **Set it to: `frontend`**
7. Click **"Save"**

### Step 2: Force Dockerfile Builder

1. In the same Settings page
2. Look for **"Builder"** or **"Build Method"** option
3. If available, select **"Dockerfile"** (not "Nixpacks" or "Railpack")
4. If not visible, Railway should auto-detect Dockerfile when Root Directory is set

### Step 3: Clear Build/Start Commands

1. In Settings → Deploy section
2. **Build Command**: Leave EMPTY (Dockerfile handles this)
3. **Start Command**: Leave EMPTY (Dockerfile CMD handles this)

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"** button
3. Or wait for auto-deploy from the latest push

## What Should Happen

After setting Root Directory to `frontend`:
- Railway should detect `frontend/Dockerfile`
- Build logs should show: "Building Docker image..."
- NOT: "Detected workspace" or "Railpack"
- Build should succeed

## If Railway Still Uses Railpack

### Option A: Create railway.toml at Root

Create `railway.toml` in project root:

```toml
[build]
builder = "dockerfile"
dockerfilePath = "frontend/Dockerfile"
```

### Option B: Rename Root package.json Temporarily

If Railway keeps detecting workspace:
1. Temporarily rename root `package.json` to `package.json.bak`
2. Push to GitHub
3. Railway won't detect workspace
4. After deployment, rename back

### Option C: Use Railway CLI

```bash
railway link
railway variables set RAILWAY_DOCKERFILE_PATH=frontend/Dockerfile
```

## Verification Checklist

After setting Root Directory:
- [ ] Root Directory = `frontend`
- [ ] Build Command = (empty)
- [ ] Start Command = (empty)
- [ ] Builder = Dockerfile (or auto-detected)
- [ ] Latest deployment uses Dockerfile
- [ ] Build logs show Docker build steps
- [ ] No "workspace" or "Railpack" in logs

## Current Status

✅ Code updated (package-lock.json synced)
✅ Dockerfile created
✅ railway.json configured
⏭️ **YOU NEED TO: Set Root Directory in Railway UI**

The code is ready. The missing piece is the Railway configuration in the dashboard.

