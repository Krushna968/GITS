# 🚀 Swaasthyam Deployment Guide

Complete guide to deploy the Swaasthyam application to production.

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## 🌟 Overview

We'll deploy:
- **Frontend**: Vercel (Free, Automatic deployments from GitHub)
- **Backend**: Render (Free tier, Auto-deploy from GitHub)
- **Database**: MongoDB Atlas (Free tier, 512MB)

**Total Cost**: **$0/month** (using free tiers)

---

## ✅ Prerequisites

Before deploying, ensure you have:
- [x] GitHub account
- [x] Vercel account (sign up at https://vercel.com)
- [x] Render account (sign up at https://render.com)
- [x] MongoDB Atlas account (sign up at https://www.mongodb.com/cloud/atlas)
- [x] Groq API key (get free at https://console.groq.com/keys)

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Cluster

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Create a New Project**:
   - Click "New Project"
   - Name: `Swaasthyam`
   - Click "Create Project"

3. **Create a Cluster**:
   - Click "Build a Database"
   - Choose **FREE** tier (M0 Sandbox)
   - Provider: **AWS** (recommended)
   - Region: Choose closest to your users (e.g., Mumbai for India)
   - Cluster Name: `swaasthyam-cluster`
   - Click "Create"

### Step 2: Configure Database Access

1. **Create Database User**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Authentication Method: **Password**
   - Username: `swaasthyam-admin`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: **Read and write to any database**
   - Click "Add User"

2. **Configure Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ **Note**: For production, restrict to your backend server IP
   - Click "Confirm"

### Step 3: Get Connection String

1. **Click "Connect"** on your cluster
2. **Choose "Connect your application"**
3. **Driver**: Node.js
4. **Version**: 4.1 or later
5. **Copy the connection string**:
   ```
   mongodb+srv://swaasthyam-admin:<password>@swaasthyam-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>` with your actual password**
7. **Save this connection string** - you'll need it for backend deployment

---

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Update backend for production**:

Create `backend/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'swaasthyam-backend',
    script: './server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
    }
  }]
}
```

2. **Ensure backend/package.json has correct start script**:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 2: Create Render Web Service

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect GitHub**:
   - Click "Connect account"
   - Authorize Render to access your GitHub
   - Select your repository: `Krushna968/GITS`

4. **Configure Service**:
   ```
   Name: swaasthyam-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: Swaasthyam/backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variables** (click "Advanced"):
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = mongodb+srv://swaasthyam-admin:YOUR_PASSWORD@swaasthyam-cluster.xxxxx.mongodb.net/swaasthyam?retryWrites=true&w=majority
   JWT_SECRET = your-super-secret-jwt-key-change-this-123456789
   JWT_EXPIRE = 7d
   GROQ_API_KEY = your_groq_api_key_here
   ```

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes)
   - You'll get a URL like: `https://swaasthyam-backend.onrender.com`

### Step 3: Verify Backend

Test your backend:
```bash
curl https://swaasthyam-backend.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Swaasthyam API is running"
}
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Create `vercel.json` in project root**:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

2. **Update `vite.config.js`**:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
```

3. **Create `.env.production` in project root**:

```env
# Replace with your actual backend URL from Render
VITE_API_URL=https://swaasthyam-backend.onrender.com/api
```

4. **Update API calls to use environment variable**:

Check if you have a constants file, or update fetch calls:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Use API_URL in all fetch calls
fetch(`${API_URL}/auth/send-otp`, {...})
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: swaasthyam
# - Directory: ./
# - Override settings: No
```

4. **Set environment variables**:
```bash
vercel env add VITE_API_URL production
# Enter: https://swaasthyam-backend.onrender.com/api
```

5. **Deploy to production**:
```bash
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New..." → "Project"**
3. **Import Git Repository**:
   - Connect GitHub
   - Select `Krushna968/GITS`
4. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: Swaasthyam
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://swaasthyam-backend.onrender.com/api`
6. **Click "Deploy"**

7. **Wait for deployment** (3-5 minutes)
   - You'll get a URL like: `https://swaasthyam.vercel.app`

---

## 🔐 Environment Variables

### Backend (Render)

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | ✅ |
| `PORT` | `5000` | ✅ |
| `MONGODB_URI` | Your MongoDB Atlas connection string | ✅ |
| `JWT_SECRET` | Random 32+ character string | ✅ |
| `JWT_EXPIRE` | `7d` | ✅ |
| `GROQ_API_KEY` | Your Groq API key | ✅ |
| `GEMINI_API_KEY` | Your Gemini API key | ❌ (Optional) |

### Frontend (Vercel)

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://swaasthyam-backend.onrender.com/api` | ✅ |

---

## ✅ Post-Deployment

### 1. Seed Database

After backend is deployed, seed the database:

```bash
# Connect to your backend and run seed script
# Option 1: Using Render Shell
# - Go to Render Dashboard
# - Select your service
# - Click "Shell" tab
# - Run: node scripts/seedData.js

# Option 2: Run locally pointing to production DB
# Update your local .env with production MONGODB_URI
node backend/scripts/seedData.js
```

### 2. Test Application

1. **Visit your frontend URL**: `https://swaasthyam.vercel.app`
2. **Test Login**:
   - Use test account: `9876543210`
   - Request OTP
   - Check backend logs on Render for OTP
3. **Test Chatbot**:
   - Click chatbot icon
   - Send a test message
4. **Test Dark Mode**:
   - Toggle dark mode switch

### 3. Configure Custom Domain (Optional)

**For Frontend (Vercel)**:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

**For Backend (Render)**:
1. Go to Service Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

### 4. Set Up Monitoring

**Backend Monitoring (Render)**:
- Render provides built-in logs and metrics
- Check: Dashboard → Your Service → Logs

**Frontend Monitoring (Vercel)**:
- Vercel provides analytics
- Check: Dashboard → Your Project → Analytics

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
```bash
# Solution:
1. Check Render logs: Dashboard → Service → Logs
2. Verify environment variables are set
3. Check MongoDB connection string is correct
4. Ensure PORT is set to 5000
```

**Problem**: Database connection error
```bash
# Solution:
1. Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
2. Check connection string format
3. Ensure password doesn't contain special characters (or URL encode them)
4. Test connection string locally first
```

**Problem**: Groq AI not working
```bash
# Solution:
1. Verify GROQ_API_KEY is set correctly
2. Check API key hasn't expired
3. Test API key locally first
```

### Frontend Issues

**Problem**: API calls failing
```bash
# Solution:
1. Check VITE_API_URL is set correctly
2. Verify backend is running (visit backend URL)
3. Check browser console for CORS errors
4. Ensure backend has CORS enabled
```

**Problem**: Build fails
```bash
# Solution:
1. Check Vercel build logs
2. Verify all dependencies are in package.json
3. Test build locally: npm run build
4. Check for missing environment variables
```

**Problem**: Routing not working
```bash
# Solution:
1. Ensure vercel.json has correct rewrites
2. Check HashRouter is being used (already configured)
3. Clear Vercel cache and redeploy
```

### Common Issues

**CORS Errors**:
```javascript
// Ensure backend has CORS configured
// In backend/server.js:
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://swaasthyam.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

**MongoDB Connection Timeout**:
```javascript
// Update connection string with longer timeout:
mongodb+srv://...?retryWrites=true&w=majority&connectTimeoutMS=10000
```

---

## 📊 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string saved
- [ ] Backend deployed to Render
- [ ] Backend environment variables set
- [ ] Backend health endpoint working
- [ ] Frontend environment variables set
- [ ] Frontend deployed to Vercel
- [ ] Frontend can access backend API
- [ ] Database seeded with test data
- [ ] Test login working
- [ ] Chatbot working
- [ ] Dark mode working
- [ ] Mobile responsive
- [ ] All features tested

---

## 🎉 Success!

Your Swaasthyam application is now live!

**URLs**:
- 🎨 **Frontend**: https://swaasthyam.vercel.app
- 🔧 **Backend**: https://swaasthyam-backend.onrender.com
- 🗄️ **Database**: MongoDB Atlas (managed)

**Test Accounts**:
```
Migrant Worker: 9876543210
Health Officer: 9876543211
Government Official: 9876543212
OTP: Check backend logs on Render
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Groq AI Documentation](https://console.groq.com/docs)

---

## 💡 Tips

1. **Free Tier Limitations**:
   - Render: 750 hours/month, sleeps after 15 min inactivity
   - Vercel: 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage

2. **Cold Starts**:
   - Backend may take 30-60 seconds to wake up from sleep
   - First request after inactivity will be slow

3. **Monitoring**:
   - Set up UptimeRobot (free) to ping backend every 5 minutes
   - This keeps backend awake during business hours

4. **Backups**:
   - MongoDB Atlas has automatic backups
   - Export important data regularly

---

**Need Help?** 
- 📧 Email: support@swaasthyam.gov.in
- 🐛 Issues: [GitHub Issues](https://github.com/Krushna968/GITS/issues)

