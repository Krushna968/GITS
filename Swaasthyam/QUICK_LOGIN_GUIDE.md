# 🔐 QUICK LOGIN GUIDE

## 📱 Test User Credentials

### 1️⃣ MIGRANT WORKER
```
📞 Mobile Number: 9876543210
👤 Name: Rajesh Kumar
🏷️ Role: Worker
```

**Steps to Login:**
1. Open: http://localhost:5173
2. Select "Migrant Worker" from dropdown
3. Enter phone: **9876543210**
4. Click **"Send OTP"**
5. Look at **Backend Terminal** - you'll see:
   ```
   📨 OTP for 9876543210: 123456
   ⏰ Valid for 10 minutes
   ```
6. Copy the 6-digit OTP (e.g., **123456**)
7. Enter OTP in frontend
8. Click **"Verify & Login"**
9. ✅ You'll be redirected to **Migrant Worker Dashboard**

---

### 2️⃣ HEALTH OFFICER
```
📞 Mobile Number: 9876543211
👤 Name: Priya Sharma
🏷️ Role: Officer
```

**Steps to Login:**
1. Open: http://localhost:5173
2. Select **"Officer"** from dropdown
3. Enter phone: **9876543211**
4. Click **"Send OTP"**
5. Look at **Backend Terminal** - you'll see:
   ```
   📨 OTP for 9876543211: 654321
   ⏰ Valid for 10 minutes
   ```
6. Copy the 6-digit OTP (e.g., **654321**)
7. Enter OTP in frontend
8. Click **"Verify & Login"**
9. ✅ You'll be redirected to **Officer Dashboard**

---

### 3️⃣ GOVERNMENT OFFICIAL
```
📞 Mobile Number: 9876543212
👤 Name: Dr. Amit Patel
🏷️ Role: Official
```

**Steps to Login:**
1. Open: http://localhost:5173
2. Select **"Official"** from dropdown
3. Enter phone: **9876543212**
4. Click **"Send OTP"**
5. Look at **Backend Terminal** - you'll see:
   ```
   📨 OTP for 9876543212: 789012
   ⏰ Valid for 10 minutes
   ```
6. Copy the 6-digit OTP (e.g., **789012**)
7. Enter OTP in frontend
8. Click **"Verify & Login"**
9. ✅ You'll be redirected to **Official Dashboard**

---

## 🖥️ Where to Find OTP in Backend Terminal

When you click "Send OTP", your **backend terminal** will display something like this:

```
╔════════════════════════════════════════════╗
║          OTP VERIFICATION CODE             ║
╠════════════════════════════════════════════╣
║  Phone: 9876543210                         ║
║  OTP Code: 123456                          ║
║  Expires: 10 minutes                       ║
╚════════════════════════════════════════════╝
```

**OR**

```
📨 OTP sent to 9876543210
🔢 OTP Code: 123456
⏰ Expires in: 10 minutes
```

---

## 📋 Quick Reference Table

| User Type | Phone Number | Where to Find OTP | Dashboard After Login |
|-----------|--------------|-------------------|----------------------|
| **👷 Migrant Worker** | `9876543210` | Backend Terminal | Worker Dashboard |
| **👨‍⚕️ Health Officer** | `9876543211` | Backend Terminal | Officer Dashboard |
| **🏛️ Government Official** | `9876543212` | Backend Terminal | Official Dashboard |

---

## 🎬 Demo Flow for Presentation

### Demo 1: Worker Login (1 minute)
```
1. Frontend: Select "Migrant Worker"
2. Frontend: Enter "9876543210"
3. Frontend: Click "Send OTP"
4. Backend Terminal: Show OTP (e.g., 123456)
5. Frontend: Enter "123456"
6. Frontend: Click "Verify & Login"
7. ✅ Show Worker Dashboard
```

### Demo 2: Chatbot Test (1 minute)
```
1. Click floating blue chatbot button (bottom-right)
2. Ask: "How do I login?"
3. Show Groq AI response (fast!)
4. Ask: "emergency"
5. Show emergency contacts (108, 104)
```

### Demo 3: Officer Dashboard (1 minute)
```
1. Logout from worker account
2. Select "Officer"
3. Enter "9876543211"
4. Get OTP from terminal
5. Login
6. ✅ Show Officer Dashboard features
```

---

## 💡 Pro Tips

### For Smooth Presentation:

1. **Keep Backend Terminal Visible**
   - Position it where you can easily see OTPs
   - Make the font larger if needed
   - Keep it on a second monitor if available

2. **Prepare Before Demo**
   - Test login once before actual demo
   - Keep all 3 phone numbers written down
   - Have browser at 100% zoom

3. **If OTP Doesn't Show**
   - Check backend terminal scrolled to bottom
   - Look for lines with "OTP" or "📨"
   - OTP is always 6 digits

4. **Quick OTP Copy**
   - Select OTP in terminal
   - Ctrl+C (or right-click copy)
   - Paste in frontend (Ctrl+V)

---

## 🚨 Troubleshooting

### "User not found"
✅ **Solution:** User exists! Phone numbers are:
   - Worker: 9876543210
   - Officer: 9876543211
   - Official: 9876543212

### "OTP not showing in terminal"
✅ **Solution:** 
   - Scroll down in backend terminal
   - Look for "📨 OTP" message
   - Make sure backend is running (npm run dev)

### "Invalid OTP"
✅ **Solution:**
   - OTP expires after 10 minutes
   - Click "Send OTP" again to get new one
   - Make sure you copied all 6 digits
   - No spaces in OTP

### "Backend not running"
✅ **Solution:**
   ```powershell
   cd C:\Projects\GITS\Cooked-Coders\Swaasthyam\backend
   npm run dev
   ```

---

## 🎯 Ready to Demo!

**Backend Terminal Output Example:**
```
🔄 Creating test users...
✅ Test users created successfully!

Server running on http://localhost:5000
MongoDB Connected

📨 OTP for 9876543210: 123456
⏰ Valid for 10 minutes
```

**Just copy the 6-digit number and paste it in the frontend!**

---

## 📞 All Login Numbers at a Glance

```
Worker:    9876543210
Officer:   9876543211
Official:  9876543212
```

**Remember:** OTP is shown in **BACKEND TERMINAL** after clicking "Send OTP"!

---

**Last Updated:** October 3, 2025  
**Status:** ✅ Ready for Demo  
**Groq AI:** ✅ Working  
**Images:** ✅ Fixed  
**Theme:** ✅ Bright

