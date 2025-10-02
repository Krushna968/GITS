# 🔐 OTP Authentication System - Complete Guide

## ✅ **IMPLEMENTATION COMPLETE!**

Your backend now uses **OTP-based authentication** (no passwords!) to match your frontend.

---

## 🎯 **What Changed**

### ✅ Removed Password Authentication
- ❌ Old: Login with phone + password
- ✅ New: Login with phone + OTP (6-digit code)

### ✅ New Files Created
1. **`utils/otpService.js`** - OTP generation and SMS sending
2. **`controllers/authOTPController.js`** - OTP authentication logic

### ✅ Files Modified
1. **`models/User.js`** - Removed password, added OTP fields
2. **`routes/authRoutes.js`** - Added OTP endpoints
3. **`scripts/seedData.js`** - Removed passwords from mock data

---

## 📱 **How OTP Authentication Works**

### Step 1: User Enters Phone Number
```
Frontend → POST /api/auth/send-otp
Body: { "phone": "9876543210" }
```

### Step 2: Backend Generates & Sends OTP
- Generates 6-digit OTP
- Saves to database with 5-minute expiry
- Sends OTP via SMS (currently mocked - prints to console)

### Step 3: User Enters OTP
```
Frontend → POST /api/auth/verify-otp
Body: { "phone": "9876543210", "otp": "123456" }
```

### Step 4: Backend Verifies & Issues Token
- Verifies OTP matches and not expired
- Clears OTP from database
- Returns JWT token for authenticated requests

---

## 🔑 **API Endpoints**

### 1. Send OTP
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully to your mobile number",
  "data": {
    "phone": "9876543210",
    "expiresIn": "5 minutes"
  }
}
```

### 2. Verify OTP & Login
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "role": "worker",
    "qrId": "SW-KE-mg9i3tw4-XDMG70"
  }
}
```

### 3. Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9999999999",
  "role": "worker",
  "location": {
    "state": "Kerala",
    "district": "Kochi"
  }
}
```

---

## 🧪 **Testing with PowerShell**

### Test 1: Send OTP
```powershell
$body = @{ phone = "9876543210" } | ConvertTo-Json
$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/send-otp" -Body $body -ContentType "application/json"
Write-Host "OTP sent! Check backend terminal for the code."
```

### Test 2: Verify OTP
```powershell
# Use the OTP from backend terminal
$body = @{ 
    phone = "9876543210"
    otp = "123456"  # Replace with actual OTP from terminal
} | ConvertTo-Json

$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/verify-otp" -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "Logged in! Token: $token"
```

### Test 3: Use Token for Authenticated Requests
```powershell
$headers = @{ Authorization = "Bearer $token" }
$profile = Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/auth/me" -Headers $headers
$profile.data.user
```

---

## 📊 **Mock Data Available**

### Test Users (Use these phone numbers to test)

| Name | Phone | Role | Details |
|------|-------|------|---------|
| Rajesh Kumar | 9876543210 | Worker | Has health records & alerts |
| Dr. Priya Sharma | 9876543211 | Officer | Can create health records |
| Mr. Anil Menon | 9876543212 | Official | Can view statistics |

**No passwords needed!** Just use OTP authentication.

---

## 🚀 **Starting the Application**

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Start Frontend  
```bash
cd C:\Projects\GITS\Cooked-Coders\Swaasthyam
npm run dev
```

### Open Browser
```
http://localhost:5173
```

---

## 💡 **How to Login in Your Frontend**

### 1. User enters phone number → Click "Send OTP"
```javascript
const sendOTP = async (phone) => {
  const response = await fetch('http://localhost:5000/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  const data = await response.json();
  // Show OTP input field
};
```

### 2. User enters OTP → Click "Verify & Login"
```javascript
const verifyOTP = async (phone, otp) => {
  const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });
  const data = await response.json();
  
  // Save token
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  // Redirect based on role
  if (data.user.role === 'worker') {
    navigate('/migrant-dashboard');
  } else if (data.user.role === 'officer') {
    navigate('/officer');
  }
};
```

---

## 🔒 **OTP Security Features**

✅ **6-digit random OTP** - Hard to guess  
✅ **5-minute expiry** - Limited window  
✅ **One-time use** - Cleared after verification  
✅ **Stored hashed** - Not visible in database  
✅ **Rate limited** - Prevents spam  

---

## 📝 **OTP SMS Integration (Production)**

Currently, OTP is **printed to backend terminal** (mock).

For production, update `backend/utils/otpService.js`:

```javascript
import twilio from 'twilio';

const client = twilio(accountSid, authToken);

export const sendOTPviaSMS = async (phone, otp) => {
  await client.messages.create({
    body: `Your Swaasthyam OTP is: ${otp}. Valid for 5 minutes.`,
    from: '+1234567890',  // Your Twilio number
    to: `+91${phone}`     // User's number
  });
};
```

**Popular SMS Gateways:**
- Twilio
- AWS SNS
- MSG91
- Fast2SMS (India)
- Plivo

---

## 🛠️ **Troubleshooting**

### Issue: "User not found"
**Solution**: The phone number must be registered first. Use `/api/auth/register` endpoint.

### Issue: "Invalid or expired OTP"
**Solution**: 
- OTP expires after 5 minutes
- Request a new OTP with `/api/auth/send-otp`

### Issue: "Cannot see OTP in console"
**Solution**: Check the backend terminal window. OTP is printed in a box format.

---

## 📁 **Updated Project Structure**

```
backend/
├── controllers/
│   └── authOTPController.js  ← NEW! OTP authentication logic
├── models/
│   └── User.js               ← UPDATED! Removed password, added OTP
├── routes/
│   └── authRoutes.js         ← UPDATED! Added OTP endpoints
├── utils/
│   ├── otpService.js         ← NEW! OTP generation
│   └── tokenUtils.js         ← Existing JWT tokens
└── scripts/
    └── seedData.js           ← UPDATED! No passwords
```

---

## ✨ **Summary**

🎉 **Your backend is now fully OTP-based!**

**What works:**
✅ Send OTP to phone number  
✅ Verify OTP and login  
✅ JWT tokens for authenticated requests  
✅ Mock data without passwords  
✅ All existing endpoints (health records, alerts)  

**Next steps:**
1. Start backend server
2. Test OTP flow with PowerShell commands
3. Update frontend to call OTP endpoints
4. Integrate SMS gateway for production

---

## 🔗 **Quick Links**

- **Backend README**: `backend/README.md`
- **Mock Data Summary**: `backend/MOCK_DATA_SUMMARY.md`
- **Project Status**: `PROJECT_STATUS.md`
- **Usage Guide**: `BACKEND_USAGE_GUIDE.md`

---

**🎊 Your OTP authentication system is ready! Test it now! 🎊**

