# 🚀 START HERE - Complete Setup Guide

## ✅ **Current Status**

- ✅ Frontend: RUNNING on http://localhost:5173
- ❌ Backend: NOT RUNNING (you need to start it)
- ✅ MongoDB: RUNNING
- ✅ Code: OTP authentication is fully implemented

---

## 📝 **What You Need to Do Now**

### **STEP 1: Start the Backend** (REQUIRED)

Open a new PowerShell/Terminal window and run:

```powershell
cd C:\Projects\GITS\Cooked-Coders\Swaasthyam\backend
npm run dev
```

**Expected output:**
```
[nodemon] starting `node server.js`
╔═══════════════════════════════════════════╗
║   🏥  SWAASTHYAM HEALTHCARE API SERVER   ║
║   Status: ✅ Running                     ║
║   Port: 5000                             ║
╚═══════════════════════════════════════════╝
✅ MongoDB Connected: localhost
```

**Keep this terminal window open!**

---

### **STEP 2: Open Your Application**

Your frontend is already running!

👉 **Open browser and go to:** http://localhost:5173

You should see your Swaasthyam login page!

---

### **STEP 3: Update Frontend to Use Backend**

Your frontend needs to call the backend API. Update your `LoginPage.jsx`:

**Find this code** (around line 30-38):
```javascript
const handleSendOtp = () => {
  if (phone.length !== 10) {
    alert("Please enter a 10-digit mobile number");
    return;
  }
  setShowOtp(true);
  setOtp("");
  // TODO: trigger backend OTP send
};
```

**Replace with:**
```javascript
const handleSendOtp = async () => {
  if (phone.length !== 10) {
    alert("Please enter a 10-digit mobile number");
    return;
  }
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setShowOtp(true);
      setOtp("");
      alert(`OTP sent to ${phone}! Check your backend terminal for the code.`);
    } else {
      alert(data.message || 'Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    alert('Failed to send OTP. Make sure backend is running!');
  }
};
```

**Find this code** (around line 45-64):
```javascript
const handleVerify = () => {
  if (otp.length !== 6) {
    alert("Please enter the 6-digit OTP");
    return;
  }
  
  setIsLoading(true);
  
  // Simulate API call with loading animation
  setTimeout(() => {
    if (selectedUserType === "officer") {
      navigate("/officer");
    } else if (selectedUserType === "official") {
      navigate("/official-dashboard");
    } else if (selectedUserType === "migrant") {
      navigate("/migrant-dashboard");
    }
    setIsLoading(false);
  }, 1500);
};
```

**Replace with:**
```javascript
const handleVerify = async () => {
  if (otp.length !== 6) {
    alert("Please enter the 6-digit OTP");
    return;
  }
  
  setIsLoading(true);
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navigate based on role
      if (data.user.role === 'worker') {
        navigate("/migrant-dashboard");
      } else if (data.user.role === 'officer') {
        navigate("/officer");
      } else if (data.user.role === 'official') {
        navigate("/official-dashboard");
      }
    } else {
      alert(data.message || 'Invalid OTP');
      setIsLoading(false);
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    alert('Failed to verify OTP. Please try again.');
    setIsLoading(false);
  }
};
```

---

### **STEP 4: Test the Login Flow**

1. **Open browser**: http://localhost:5173
2. **Select user type**: Worker (or Officer/Official)
3. **Enter phone number**: `9876543210`
4. **Click "Send OTP"**
5. **Check backend terminal** - you'll see a box with the 6-digit OTP code
6. **Enter the OTP** and click "Verify"
7. **You should be logged in!** 🎉

---

## 🧪 **Test Accounts Available**

| Phone Number | Role | Name | Details |
|-------------|------|------|---------|
| 9876543210 | Worker | Rajesh Kumar | Has 2 health records, 3 alerts |
| 9876543211 | Officer | Dr. Priya Sharma | Can create health records |
| 9876543212 | Official | Mr. Anil Menon | Can view statistics |

**No passwords needed!** Just use OTP.

---

## 📊 **How to See the OTP**

When you click "Send OTP", look at your **backend terminal window**. You'll see:

```
╔═══════════════════════════════════════════╗
║           OTP SENT (MOCK)                ║
╠═══════════════════════════════════════════╣
║  Phone: 9876543210                       ║
║  OTP Code: 123456                        ║
║  Valid for: 5 minutes                    ║
╚═══════════════════════════════════════════╝
```

Use this 6-digit code to login!

---

## 🎯 **Quick Summary**

**What's Working:**
✅ OTP authentication system (backend)  
✅ User database with mock data  
✅ Health records & alerts  
✅ JWT token authentication  
✅ All API endpoints  

**What You Need to Do:**
1. ✅ Start backend server
2. ✅ Update frontend `LoginPage.jsx` to call backend
3. ✅ Test login with phone: 9876543210

---

## 🛠️ **Common Issues**

### Backend won't start?
```powershell
# Make sure you're in backend folder
cd C:\Projects\GITS\Cooked-Coders\Swaasthyam\backend

# Try installing dependencies again
npm install

# Then start
npm run dev
```

### Can't connect to backend?
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Try: `curl http://localhost:5000/` to test

### OTP not showing?
- Look at the backend terminal window (where you ran `npm run dev`)
- OTP is printed in a box format in that terminal

---

## 📁 **Important Files**

- **`OTP_AUTHENTICATION_GUIDE.md`** - Complete OTP documentation
- **`backend/README.md`** - Full API documentation  
- **`backend/MOCK_DATA_SUMMARY.md`** - Test data details
- **`PROJECT_STATUS.md`** - Project overview

---

## 🎉 **You're Almost Done!**

**Just do these 2 things:**

1. **Start backend**: `cd backend && npm run dev`
2. **Update LoginPage.jsx** with the code above

Then your full-stack OTP authentication will work! 🚀

---

**Need help? Check the backend terminal for errors or OTP codes!**

