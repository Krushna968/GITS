# 🔧 CREATE TEST USERS ON RENDER

## ❌ Problem: "User not found. Please register first."

Your production database doesn't have test users yet!

---

## ✅ Solution: Run Seed Script on Render

### **Method 1: Using Render Shell (Recommended)**

1. **Go to Render Dashboard:**
   ```
   https://dashboard.render.com
   ```

2. **Click on your service:**
   - Service name: `swaasthyam-backend`

3. **Click "Shell" tab** (top menu)

4. **Wait for shell to load** (takes 10-20 seconds)

5. **Run this command:**
   ```bash
   node createTestUser.js
   ```

6. **Expected output:**
   ```
   🔄 Creating test users...
   ✅ Test users created successfully!
   
   📝 Test Users Created:
   
   1. Migrant Worker
      Phone: 9876543210
      Name: Rajesh Kumar
   
   2. Health Officer
      Phone: 9876543211
      Name: Priya Sharma
   
   3. Government Official
      Phone: 9876543212
      Name: Dr. Amit Patel
   ```

7. **Done!** Users created in production database.

---

### **Method 2: Using Local Script (If Method 1 fails)**

1. **Update local `.env` with production MongoDB:**

   ```bash
   # In backend/.env
   MONGODB_URI=mongodb+srv://your-production-uri-from-render
   ```

2. **Run locally:**
   ```bash
   cd C:\Projects\GITS\Cooked-Coders\Swaasthyam\backend
   node createTestUser.js
   ```

3. **Restore `.env` to local URI** after done

---

## 🧪 Test Login After Creating Users

1. **Visit frontend:**
   ```
   https://swaasthyam-9eqcyormk-krushna-rasals-projects.vercel.app
   ```

2. **Try login:**
   - Select: Migrant Worker
   - Phone: 9876543210
   - Click "Send OTP"

3. **Get OTP from Render logs:**
   - Render Dashboard → Your Service → "Logs" tab
   - Search: "OTP" or "9876543210"
   - Copy the 6-digit OTP

4. **Enter OTP and login!**

---

## 📱 Test User Credentials

```
┌─────────────────────────────────────┐
│ MIGRANT WORKER                       │
│ Phone: 9876543210                    │
│ Password: 123456 (not needed)        │
├─────────────────────────────────────┤
│ HEALTH OFFICER                       │
│ Phone: 9876543211                    │
│ Password: 123456 (not needed)        │
├─────────────────────────────────────┤
│ GOVERNMENT OFFICIAL                  │
│ Phone: 9876543212                    │
│ Password: 123456 (not needed)        │
└─────────────────────────────────────┘
```

**Note:** OTP is the primary login method. Passwords are backup only.

---

## 🚨 Troubleshooting

### **Shell not working on Render:**

**Solution:** Use Method 2 (local script with production MongoDB URI)

---

### **"Cannot connect to MongoDB":**

**Check:**
1. MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. MongoDB URI is correct in Render environment variables
3. MongoDB cluster is not paused

---

### **Script runs but users not showing:**

**Check:**
1. Verify database name is `swaasthyam`
2. Check MongoDB Atlas → Collections
3. Look for `users` collection

---

### **"Duplicate key error":**

**Solution:** Users already exist! Just try logging in.

---

## 🎯 Quick Steps Summary

```bash
1. Render Dashboard → swaasthyam-backend → Shell
2. node createTestUser.js
3. Wait for success message
4. Test login with 9876543210
5. Get OTP from Logs tab
```

---

**That's it! Your app should work now!** 🎉

