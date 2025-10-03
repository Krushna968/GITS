# 🚀 SWAASTHYAM DEPLOYMENT GUIDE

## ✅ Current Status
- ✅ Code pushed to GitHub: `https://github.com/Krushna968/GITS`
- ✅ Frontend built successfully
- ✅ Vercel CLI installed and logged in as `krushna968`
- ✅ Test users created with seed script
- ✅ Groq AI chatbot integrated

---

## 📦 Quick Deployment Commands

### **Step 1: Deploy Backend to Render**

1. Go to: **https://render.com**
2. Click: **"New +"** → **"Web Service"**
3. Connect GitHub: Select **`Krushna968/GITS`** repository
4. Configure:
   ```
   Name: swaasthyam-backend
   Root Directory: Swaasthyam/backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=swaasthyam_jwt_secret_key_2025_hackathon
   JWT_REFRESH_SECRET=swaasthyam_refresh_secret_key_2025_hackathon
   GROQ_API_KEY=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
   ```

6. Click **"Create Web Service"**
7. **Copy backend URL** (e.g., `https://swaasthyam-backend-xxxx.onrender.com`)

---

### **Step 2: Deploy Frontend to Vercel**

Run these commands in PowerShell:

```powershell
# Update backend URL (replace with your Render URL)
$backendUrl = "https://swaasthyam-backend-xxxx.onrender.com"
Set-Content -Path ".env.production" -Value "VITE_API_URL=$backendUrl/api"

# Deploy to Vercel production
vercel --prod
```

**Follow prompts:**
- Set up and deploy? → **Yes**
- Project name? → **swaasthyam**
- Directory? → **./**
- Override settings? → **No**

---

## 🧪 Test Deployment

### Login Credentials:
```
Worker:    9876543210
Officer:   9876543211
Official:  9876543212
```

### Check OTP:
Go to Render dashboard → Your service → **Logs** tab → Search for "OTP"

---

## 🔗 Important Links

- **Render:** https://render.com
- **Vercel:** https://vercel.com
- **MongoDB Atlas:** https://cloud.mongodb.com (Setup free cluster)

---

**Status:** ✅ Ready to Deploy!

