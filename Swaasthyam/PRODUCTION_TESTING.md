# 🧪 PRODUCTION TESTING GUIDE

## ✅ Your Deployed URLs

**Frontend (Vercel):**
```
https://swaasthyam-9eqcyormk-krushna-rasals-projects.vercel.app
```

**Backend (Render):**
```
https://swaasthyam-backend.onrender.com
```

---

## 🔧 Recent Fix Applied

**Problem:** Frontend couldn't connect to backend (CORS error)

**Solution:** Updated `server.js` to allow all Vercel domains (*.vercel.app)

**Status:** ✅ Fixed and pushed to GitHub. Render will auto-deploy in 2-3 minutes.

---

## 🧪 Testing Steps

### **Step 1: Wait for Render Deployment**

1. Go to: https://dashboard.render.com
2. Click on your service: **swaasthyam-backend**
3. Check **"Events"** tab for latest deployment
4. Wait for status: **"Deploy live"** (green)

---

### **Step 2: Test Backend Health**

Open in browser:
```
https://swaasthyam-backend.onrender.com
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Swaasthyam Healthcare API is running",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "health": "/api/health",
    "alerts": "/api/alerts",
    "chatbot": "/api/chatbot"
  }
}
```

✅ If you see this, backend is working!

---

### **Step 3: Test Frontend**

1. Open: https://swaasthyam-9eqcyormk-krushna-rasals-projects.vercel.app
2. Check if:
   - ✅ Background image loads
   - ✅ Login form appears
   - ✅ Dropdown works (Migrant Worker, Officer, Official)
   - ✅ No console errors (F12 → Console)

---

### **Step 4: Test OTP Login**

#### **A. Send OTP**

1. Select: **"Migrant Worker"**
2. Enter phone: **9876543210**
3. Click: **"Send OTP"**
4. Wait for success message

#### **B. Get OTP from Render Logs**

1. Go to: https://dashboard.render.com
2. Click: **swaasthyam-backend**
3. Click: **"Logs"** tab
4. Search (Ctrl+F): **"OTP"** or **"9876543210"**
5. Find line like:
   ```
   📨 OTP for 9876543210: 123456
   ⏰ Valid for 10 minutes
   ```
6. Copy the 6-digit OTP (e.g., **123456**)

#### **C. Verify OTP**

1. Enter the OTP in frontend
2. Click: **"Verify & Login"**
3. Should redirect to Worker Dashboard

✅ **Success!** Login working!

---

### **Step 5: Test Chatbot**

1. Look for blue chatbot button (bottom-right corner)
2. Click on it
3. Type: **"hello"**
4. Should get fast response from Groq AI

**Expected Response:**
```
Hello! 👋 I'm your Swaasthyam Healthcare Assistant. 
How can I help you today?
```

✅ If response is fast (1-2 seconds), Groq AI is working!

---

## 📱 Test User Credentials

```
┌─────────────────────────────────────┐
│ MIGRANT WORKER                       │
│ Phone: 9876543210                    │
│ Name: Rajesh Kumar                   │
├─────────────────────────────────────┤
│ HEALTH OFFICER                       │
│ Phone: 9876543211                    │
│ Name: Priya Sharma                   │
├─────────────────────────────────────┤
│ GOVERNMENT OFFICIAL                  │
│ Phone: 9876543212                    │
│ Name: Dr. Amit Patel                 │
└─────────────────────────────────────┘
```

---

## 🚨 Troubleshooting

### **Issue: "Failed to send OTP"**

**Possible Causes:**
1. Backend not deployed yet (wait 2-3 min)
2. CORS issue (fixed in latest update)
3. User doesn't exist in database

**Solution:**
```
Option 1: Wait for Render deployment to complete
Option 2: Run seed script on Render
```

**Run Seed Script on Render:**
1. Go to Render dashboard
2. Click service → **"Shell"** tab
3. Run: `node createTestUser.js`
4. Wait for success message
5. Try login again

---

### **Issue: Chatbot says "couldn't connect"**

**Solution:**
1. Check backend is running
2. Visit: https://swaasthyam-backend.onrender.com
3. If it responds, backend is fine
4. Check browser console for errors (F12)
5. Make sure `GROQ_API_KEY` is set in Render environment variables

---

### **Issue: Images not loading**

**Solution:**
1. Check browser console (F12)
2. Look for 404 errors
3. Images should load from Vercel CDN
4. Try hard refresh: Ctrl+Shift+R

---

### **Issue: OTP not in Render logs**

**Solution:**
1. Make sure you clicked "Send OTP"
2. Check "Logs" tab is showing **live logs**
3. Scroll to bottom of logs
4. Search for your phone number
5. OTP expires after 10 minutes - send new one

---

## ✅ Production Checklist

Before demo:

- [ ] Backend deployed and responding
- [ ] Frontend loads without errors
- [ ] Can send OTP successfully
- [ ] Can see OTP in Render logs
- [ ] Can login with OTP
- [ ] Dashboard loads after login
- [ ] Chatbot responds to messages
- [ ] All images loading
- [ ] No console errors

---

## 🎯 Quick Demo Flow (3 minutes)

### **Demo 1: Login (1 min)**
```
1. Open frontend URL
2. Select "Migrant Worker"
3. Enter: 9876543210
4. Click "Send OTP"
5. Show Render logs (have it open already)
6. Copy OTP from logs
7. Enter OTP
8. Login → Show dashboard
```

### **Demo 2: Chatbot (1 min)**
```
1. Click blue chatbot button
2. Type: "How do I login?"
3. Show fast Groq AI response
4. Type: "emergency"
5. Show emergency contacts
```

### **Demo 3: Features (1 min)**
```
1. Show QR code
2. Show health records
3. Show multilingual support
4. Show responsive design
```

---

## 📊 Monitoring

### **Check Backend Health:**
```
https://swaasthyam-backend.onrender.com/api/status
```

### **Render Dashboard:**
- Events: Deployment history
- Logs: Real-time logs
- Metrics: CPU, Memory usage

### **Vercel Dashboard:**
- Deployments: Frontend builds
- Analytics: Page views
- Logs: Runtime logs

---

## 🔗 Quick Links

- **Frontend:** https://swaasthyam-9eqcyormk-krushna-rasals-projects.vercel.app
- **Backend:** https://swaasthyam-backend.onrender.com
- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/Krushna968/GITS

---

## 💡 Pro Tips

1. **Keep Render logs open** during demo for quick OTP access
2. **Test login once** before actual demo
3. **Have phone numbers written down**: 9876543210, 9876543211, 9876543212
4. **Browser at 100% zoom** for better visibility
5. **Close other tabs** to avoid distractions

---

**Last Updated:** October 3, 2025  
**Status:** ✅ CORS Fixed - Waiting for Render deployment

