# 🏥 Swaasthyam Backend - Complete Usage Guide

## 📖 Table of Contents

1. [Quick Start](#quick-start)
2. [MongoDB Setup](#mongodb-setup)
3. [Running the Backend](#running-the-backend)
4. [Testing the API](#testing-the-api)
5. [Integrating with Frontend](#integrating-with-frontend)
6. [Common Workflows](#common-workflows)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites Installed?
- ✅ Node.js (v18+)
- ✅ MongoDB OR MongoDB Atlas account
- ✅ npm

### Installation
```bash
cd backend
npm install
```

✅ **Dependencies installed successfully with 0 vulnerabilities!**

---

## 💾 MongoDB Setup

### Option 1: Local MongoDB (Simple, No Internet Needed)

**1. Check if MongoDB is installed:**
```powershell
mongod --version
```

**2. Start MongoDB:**
```powershell
mongod
```

Keep this terminal running!

### Option 2: MongoDB Atlas (Cloud - Recommended)

**1. Sign up:** https://www.mongodb.com/cloud/atlas/register

**2. Create cluster:**
- Choose FREE tier
- Select region closest to you
- Click "Create Cluster"

**3. Create database user:**
- Security → Database Access → Add New User
- Create username and password
- Save these credentials!

**4. Allow network access:**
- Security → Network Access → Add IP Address
- Choose "Allow Access from Anywhere" (for development)

**5. Get connection string:**
- Clusters → Connect → Connect your application
- Copy the connection string
- Replace `<password>` with your password

**6. Update `.env` file:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swaasthyam
```

---

## ▶️ Running the Backend

### Development Mode (with auto-reload)
```bash
cd backend
npm run dev
```

### Production Mode
```bash
cd backend
npm start
```

### Expected Output
```
╔═══════════════════════════════════════════════════════╗
║   🏥  SWAASTHYAM HEALTHCARE API SERVER               ║
║   Status: ✅ Running                                 ║
║   Port: 5000                                         ║
║   Environment: development                           ║
║   URL: http://localhost:5000                         ║
╚═══════════════════════════════════════════════════════╝

✅ MongoDB Connected: localhost
📊 Database: swaasthyam
```

---

## 🧪 Testing the API

### Method 1: Using Browser

Visit: `http://localhost:5000/`

You should see:
```json
{
  "success": true,
  "message": "Swaasthyam Healthcare API is running",
  "version": "1.0.0"
}
```

### Method 2: Using PowerShell (Windows)

**Test 1: Register a Worker**
```powershell
$body = @{
    name = "Rajesh Kumar"
    phone = "9876543210"
    password = "password123"
    role = "worker"
    location = @{
        state = "Kerala"
        district = "Thiruvananthapuram"
    }
    gender = "male"
    bloodGroup = "B+"
    occupation = "Construction Worker"
} | ConvertTo-Json

$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -Body $body -ContentType "application/json"
$workerToken = $response.token
$workerId = $response.user._id

Write-Host "✅ Worker registered!" -ForegroundColor Green
Write-Host "Worker ID: $workerId"
Write-Host "Token: $workerToken"
```

**Test 2: Register an Officer**
```powershell
$body = @{
    name = "Dr. Priya Sharma"
    phone = "9876543211"
    password = "password123"
    role = "officer"
} | ConvertTo-Json

$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -Body $body -ContentType "application/json"
$officerToken = $response.token
$officerId = $response.user._id

Write-Host "✅ Officer registered!" -ForegroundColor Green
Write-Host "Officer Token: $officerToken"
```

**Test 3: Officer Creates Health Record for Worker**
```powershell
$headers = @{
    Authorization = "Bearer $officerToken"
}

$body = @{
    workerId = $workerId
    bloodPressure = @{
        systolic = 120
        diastolic = 80
    }
    temperature = 98.6
    weight = 70
    height = 175
    diagnosis = "Routine checkup - all normal"
    medications = @(
        @{
            name = "Vitamin D"
            dosage = "1000 IU"
            frequency = "Once daily"
            duration = "30 days"
        }
    )
    status = "fit"
    nextCheckupDate = "2025-03-15"
    notes = "Worker is healthy and fit for work"
} | ConvertTo-Json -Depth 5

$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/health/records" -Headers $headers -Body $body -ContentType "application/json"

Write-Host "✅ Health record created!" -ForegroundColor Green
```

**Test 4: Worker Views Their Health Records**
```powershell
$headers = @{
    Authorization = "Bearer $workerToken"
}

$response = Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/health/records/my" -Headers $headers

Write-Host "✅ Worker can see their health records!" -ForegroundColor Green
$response.data
```

**Test 5: Officer Creates Alert for Worker**
```powershell
$headers = @{
    Authorization = "Bearer $officerToken"
}

$body = @{
    workerId = $workerId
    type = "checkup"
    title = "Upcoming Health Checkup"
    message = "Your next health checkup is scheduled for March 15, 2025"
    severity = "medium"
    actionRequired = $true
    actionType = "visit_clinic"
    actionDeadline = "2025-03-15"
} | ConvertTo-Json

$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/alerts" -Headers $headers -Body $body -ContentType "application/json"

Write-Host "✅ Alert created!" -ForegroundColor Green
```

**Test 6: Worker Views Their Alerts**
```powershell
$headers = @{
    Authorization = "Bearer $workerToken"
}

$response = Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/alerts/my" -Headers $headers

Write-Host "✅ Worker can see their alerts!" -ForegroundColor Green
Write-Host "Unread count: $($response.unreadCount)" -ForegroundColor Yellow
$response.data
```

---

## 🔗 Integrating with Frontend

### Update Frontend API Configuration

Create `src/services/api.js` in your frontend:

```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => apiCall('/auth/me'),
  
  updateProfile: (profileData) => apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
  
  logout: () => apiCall('/auth/logout', {
    method: 'POST',
  }),
};

// Health API
export const healthAPI = {
  getMyRecords: (page = 1) => apiCall(`/health/records/my?page=${page}`),
  
  getLatestStatus: () => apiCall('/health/status/latest'),
  
  getAllWorkers: (page = 1, search = '') => 
    apiCall(`/health/workers?page=${page}&search=${search}`),
  
  createRecord: (recordData) => apiCall('/health/records', {
    method: 'POST',
    body: JSON.stringify(recordData),
  }),
  
  getWorkerRecords: (workerId, page = 1) => 
    apiCall(`/health/records/worker/${workerId}?page=${page}`),
};

// Alert API
export const alertAPI = {
  getMyAlerts: (page = 1, unread = false) => 
    apiCall(`/alerts/my?page=${page}&unread=${unread}`),
  
  createAlert: (alertData) => apiCall('/alerts', {
    method: 'POST',
    body: JSON.stringify(alertData),
  }),
  
  markAsRead: (alertId) => apiCall(`/alerts/${alertId}/read`, {
    method: 'PATCH',
  }),
  
  markAllAsRead: () => apiCall('/alerts/mark-all-read', {
    method: 'PATCH',
  }),
};
```

### Example: Login Component

```javascript
import { useState } from 'react';
import { authAPI } from '../services/api';

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login({ phone, password });
      
      // Save token
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Redirect based on role
      if (response.user.role === 'worker') {
        navigate('/worker-dashboard');
      } else if (response.user.role === 'officer') {
        navigate('/officer-dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="tel" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 📋 Common Workflows

### Workflow 1: Worker Registration & Health Check

1. **Worker registers** → Gets token + QR ID
2. **Officer creates health record** → Worker gets status
3. **Worker views health records** → Sees their data
4. **Officer sends alert** → Worker gets notified
5. **Worker reads alert** → Alert marked as read

### Workflow 2: Officer Managing Multiple Workers

1. **Officer logs in** → Gets token
2. **Gets all workers list** → Sees worker overview
3. **Selects a worker** → Views detailed health history
4. **Adds new health record** → Updates worker status
5. **Creates alert** → Notifies worker about next checkup

### Workflow 3: Government Official Oversight

1. **Official logs in** → Gets admin token
2. **Views statistics** → Sees overall health metrics
3. **Reviews all workers** → Monitors population health
4. **Checks alert statistics** → Tracks notifications

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check if MongoDB is running: `mongod --version`
2. Or use MongoDB Atlas
3. Verify `MONGODB_URI` in `.env`

### Issue: "Port 5000 already in use"

**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID>)
taskkill /PID <PID> /F

# Or change port in .env
# PORT=5001
```

### Issue: "JWT token expired"

**Solution:**
- Login again to get a new token
- Or implement token refresh in frontend

### Issue: "CORS error in frontend"

**Solution:**
- Verify `CORS_ORIGIN` in `.env` matches your frontend URL
- Default is `http://localhost:5173`

---

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 10,
  "total": 100,
  "page": 1,
  "pages": 10,
  "data": [ /* array of items */ ]
}
```

---

## 🎯 Summary

✅ **Backend Features:**
- JWT Authentication with refresh tokens
- Role-based access control
- Health records CRUD operations
- Alert/notification system
- Secure password hashing
- Input validation & sanitization
- Rate limiting
- MongoDB with indexes for performance

✅ **Ready for Production:**
- Professional error handling
- Security best practices
- Scalable architecture
- Comprehensive API documentation

---

## 📞 Need Help?

- Check `backend/README.md` for full API documentation
- Check `backend/QUICKSTART.md` for quick commands
- Review error messages in terminal
- Test endpoints with Postman or PowerShell

---

**Your backend is ready! Now integrate it with your React frontend and build something amazing! 🚀**

