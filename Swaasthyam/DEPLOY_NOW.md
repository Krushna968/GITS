# 🚀 Deploy Swaasthyam NOW - Quick Start

**Time Required**: 30 minutes  
**Cost**: $0/month (Free tiers)

---

## 📋 What You'll Deploy

| Component | Platform | Time | Cost |
|-----------|----------|------|------|
| Database | MongoDB Atlas | 5 min | Free |
| Backend API | Render | 10 min | Free |
| Frontend | Vercel | 5 min | Free |
| Testing | - | 10 min | - |

---

## 🎯 Step 1: Database (5 minutes)

### MongoDB Atlas Setup

1. **Go to**: https://cloud.mongodb.com
2. **Sign Up / Login**
3. **Create New Project** → Name: `Swaasthyam`
4. **Build a Database** → Choose **FREE** tier (M0)
5. **Provider**: AWS, **Region**: Mumbai (Asia)
6. **Create Database User**:
   - Username: `swaasthyam-admin`
   - Password: (Generate & Save it!)
7. **Network Access** → **Add IP** → **Allow from Anywhere** (0.0.0.0/0)
8. **Get Connection String**:
   - Click **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your actual password
   - **SAVE THIS** - You'll need it!

**Example Connection String**:
```
mongodb+srv://swaasthyam-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/swaasthyam?retryWrites=true&w=majority
```

✅ **Done! Database is ready!**

---

## 🔧 Step 2: Backend (10 minutes)

### Render Setup

1. **Go to**: https://render.com
2. **Sign Up with GitHub**
3. **Dashboard** → **New +** → **Web Service**
4. **Connect Repository**: `Krushna968/GITS`
5. **Configure**:

```
Name: swaasthyam-backend
Region: Singapore
Branch: main
Root Directory: Swaasthyam/backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

6. **Environment Variables** (Click Advanced):

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = [Paste your MongoDB connection string from Step 1]
JWT_SECRET = swaasthyam-super-secret-key-change-this-12345
JWT_EXPIRE = 7d
GROQ_API_KEY = [Your Groq API key from https://console.groq.com/keys]
```

7. **Create Web Service**
8. **Wait for deployment** (5-10 minutes)
9. **Copy your backend URL**: `https://swaasthyam-backend-XXXX.onrender.com`

### Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

Should see:
```json
{
  "success": true,
  "message": "Swaasthyam API is running"
}
```

✅ **Done! Backend is live!**

---

## 🎨 Step 3: Frontend (5 minutes)

### Option A: Using PowerShell Script (Easiest)

```powershell
# Run deployment script
.\deploy.ps1

# Choose option 3 first (Login to Vercel)
# Then choose option 1 (Deploy to preview)
# Test it, then choose option 2 (Deploy to production)
```

### Option B: Manual Deployment

1. **Install Vercel CLI**:
```powershell
npm install -g vercel
```

2. **Login**:
```powershell
vercel login
```

3. **Deploy**:
```powershell
vercel
```

4. **Follow prompts**:
   - Set up and deploy: `Yes`
   - Project name: `swaasthyam`
   - Directory: `./`

5. **Set Environment Variable**:
```powershell
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.onrender.com/api
```

6. **Deploy to Production**:
```powershell
vercel --prod
```

7. **Copy your frontend URL**: `https://swaasthyam-XXXX.vercel.app`

✅ **Done! Frontend is live!**

---

## ✅ Step 4: Test Everything (10 minutes)

### 1. Visit Your App
Go to: `https://your-app.vercel.app`

### 2. Test Login
- Click "Login/Register"
- Enter phone: `9876543210`
- Click "Send OTP"
- Check Render logs for OTP:
  - Go to Render Dashboard
  - Click your service
  - Click "Logs"
  - Find the OTP (6 digits)
- Enter OTP and login

### 3. Test Features
- ✅ Dark mode toggle (top-right)
- ✅ Language selector (landing page)
- ✅ Chatbot (bottom-right icon)
- ✅ Dashboard navigation
- ✅ Mobile responsiveness

### 4. Seed Database
```powershell
# Update local .env with production MongoDB URI
# Then run:
node backend/scripts/seedData.js
```

---

## 🎉 SUCCESS!

**Your URLs**:
- 🎨 **Frontend**: https://your-app.vercel.app
- 🔧 **Backend**: https://your-backend.onrender.com
- 🗄️ **Database**: MongoDB Atlas (cloud)

**Test Accounts** (after seeding):
```
Migrant Worker:    9876543210
Health Officer:    9876543211
Official:          9876543212
OTP: Check Render logs
```

---

## 🐛 Quick Troubleshooting

### Backend not responding?
1. Check Render logs
2. Verify environment variables
3. Wait 30 seconds (cold start)

### Frontend can't connect?
1. Check VITE_API_URL is set
2. Verify backend is running
3. Check browser console

### Database connection error?
1. Verify MongoDB URI
2. Check IP whitelist (0.0.0.0/0)
3. Ensure password is correct

---

## 📊 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user & password saved
- [ ] Backend deployed to Render
- [ ] Backend environment variables set
- [ ] Backend health check passing
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable set
- [ ] Test login successful
- [ ] All features working
- [ ] Mobile responsive
- [ ] Dark mode working
- [ ] Chatbot responding

---

## 📚 Next Steps

1. **Custom Domain** (Optional):
   - Vercel: Settings → Domains
   - Render: Settings → Custom Domain

2. **Monitoring**:
   - Set up UptimeRobot to ping backend every 5 min
   - Check Vercel Analytics

3. **Backups**:
   - MongoDB Atlas has automatic backups
   - Export important data regularly

4. **Share**:
   - Share your app URL with team/users
   - Add to your portfolio/resume!

---

## 💡 Pro Tips

1. **First Request Slow?**
   - Render free tier sleeps after 15 min
   - First request wakes it up (30-60 sec)

2. **Keep Backend Awake**:
   - Use UptimeRobot (free) to ping every 5 min
   - Prevents sleeping during business hours

3. **Monitor Usage**:
   - Render: 750 hours/month (plenty!)
   - Vercel: 100GB bandwidth/month
   - MongoDB: 512MB storage

---

## 🆘 Need Help?

1. Read full guide: `DEPLOYMENT_GUIDE.md`
2. Check troubleshooting section
3. Open GitHub issue
4. Email: support@swaasthyam.gov.in

---

**Made with ❤️ by Cooked Coders**

🚀 **Happy Deploying!** 🚀

