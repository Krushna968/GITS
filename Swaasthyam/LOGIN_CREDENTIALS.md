# 🔐 Swaasthyam - Login Credentials & Startup Guide

## 🚀 Quick Start

### Step 1: Start Backend (CMD/PowerShell 1)
```bash
cd C:\Projects\GITS\Cooked-Coders\Swaasthyam\backend
npm run dev
```

### Step 2: Start Frontend (CMD/PowerShell 2)
```bash
cd C:\Projects\GITS\Cooked-Coders\Swaasthyam
npm run dev
```

### Step 3: Open Browser
```
http://localhost:5173
```

---

## 🎫 Test Login Credentials

### 👷 MIGRANT WORKER
```
Phone Number: 9876543210
Password: 123456
Role: Worker

Steps:
1. Select "Migrant Worker" from dropdown
2. Enter phone: 9876543210
3. Click "Send OTP"
4. Check backend terminal for 6-digit OTP
5. Enter OTP and click "Verify & Login"
```

### 👨‍⚕️ HEALTH OFFICER
```
Phone Number: 9876543211
Password: 123456
Role: Officer

Steps:
1. Select "Officer" from dropdown
2. Enter phone: 9876543211
3. Click "Send OTP"
4. Check backend terminal for 6-digit OTP
5. Enter OTP and click "Verify & Login"
```

### 🏛️ GOVERNMENT OFFICIAL
```
Phone Number: 9876543212
Password: 123456
Role: Official

Steps:
1. Select "Official" from dropdown
2. Enter phone: 9876543212
3. Click "Send OTP"
4. Check backend terminal for 6-digit OTP
5. Enter OTP and click "Verify & Login"
```

---

## 📋 How OTP Works

1. **Enter Phone Number** (10 digits)
2. **Click "Send OTP"**
3. **Backend Terminal** will show OTP like:
   ```
   📨 OTP for 9876543210: 123456
   ⏰ Valid for 10 minutes
   ```
4. **Copy the 6-digit OTP** from terminal
5. **Enter in frontend** and click "Verify & Login"

---

## 🖼️ Fixed Issues

✅ **Logo & Images Now Visible**
- Fixed image paths from `/Cooked-Coders/assets/` to `/assets/`
- All images (logo, camera, lock) now load correctly

✅ **Bright Theme Applied**
- Removed all dark mode classes
- Clean blue and white professional design

✅ **Backend Connected**
- Auto-detects environment (localhost vs production)
- Works on both local and deployed versions

---

## 🎬 Demo Flow (For Presentation)

### Demo 1: Worker Login
```
1. Open http://localhost:5173
2. Select "Migrant Worker"
3. Enter: 9876543210
4. Click "Send OTP"
5. Check terminal: Copy OTP (e.g., 123456)
6. Enter OTP
7. Click "Verify & Login"
8. ✅ Navigate to Worker Dashboard
```

### Demo 2: Chatbot
```
1. Click floating blue chatbot button (bottom-right)
2. Try these queries:
   - "How do I login?"
   - "OTP not received"
   - "emergency"
   - "What is Swaasthyam?"
3. Show AI responses
4. Show quick reply buttons
5. ✅ Demonstrate Groq AI speed
```

### Demo 3: Officer Dashboard
```
1. Logout (if logged in as worker)
2. Select "Officer"  
3. Enter: 9876543211
4. Get OTP and login
5. ✅ Show officer features (add health records, etc.)
```

---

## 🔧 Troubleshooting

### Logo Not Showing?
**Solution:** Images are now at `/assets/` - should work!
If not, check: `public/assets/logo 2.png` exists

### OTP Not Working?
**Solution:** 
- Check backend terminal for OTP
- OTP expires after 10 minutes
- Make sure phone number is 10 digits
- User must exist in database (already created)

### Backend Connection Error?
**Solution:**
- Make sure backend is running on port 5000
- Check MongoDB is running
- Verify API endpoints are correct

### Frontend Not Loading?
**Solution:**
- Run `npm run dev` in root directory
- Open http://localhost:5173
- Clear browser cache if needed

---

## 📊 API Endpoints Being Used

### Local Development:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

### Production (Deployed):
- Backend: `https://swaasthyam-backend.onrender.com`
- Frontend: `https://swaasthyam.vercel.app`

---

## 💡 Quick Tips

### For Smooth Demo:
1. ✅ Keep backend terminal visible to show OTP
2. ✅ Have both terminals open side by side
3. ✅ Test login once before actual demo
4. ✅ Clear browser cache before presentation
5. ✅ Keep OTP visible in terminal
6. ✅ Prepare to show chatbot features

### Key Features to Highlight:
- ✅ Clean bright UI (no dark mode)
- ✅ OTP-based secure authentication
- ✅ Logo and images visible
- ✅ AI Chatbot (Groq powered)
- ✅ Multilingual support
- ✅ QR code scanning option
- ✅ Role-based dashboards

---

## 📱 User Roles & Features

### 👷 Migrant Worker Can:
- View health records
- See QR code health ID
- Track medications
- View health alerts
- Access emergency contacts

### 👨‍⚕️ Health Officer Can:
- Add/update health records
- Generate health certificates
- Manage worker registrations
- Send health alerts
- View worker analytics

### 🏛️ Government Official Can:
- View state-wide analytics
- Generate reports
- Policy insights
- Geographic health mapping
- Export data

---

## ✅ Pre-Presentation Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Test login with one account
- [ ] Logo visible on page
- [ ] Chatbot button visible
- [ ] OTP showing in backend terminal
- [ ] Browser zoom at 100%
- [ ] Close unnecessary tabs
- [ ] Clear notifications

---

## 🎉 Ready to Present!

**URLs:**
- **Local:** http://localhost:5173
- **Deployed:** https://swaasthyam.vercel.app

**Login:** Use any of the 3 test accounts above

**Demo Time:** ~5-7 minutes recommended

---

**Built with ❤️ by Cooked Coders Team**

**Tech Stack:**
- React 19.1.1 + Tailwind CSS 4.1
- Node.js 18+ + Express 4.18
- MongoDB 8.0 + Groq AI (Llama 3.3 70B)

---

**Last Updated:** October 3, 2025
**Status:** ✅ Ready for Demo

