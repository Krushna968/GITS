# ⚡ Quick Start Guide

## 🚀 Get Backend Running in 5 Minutes!

### Step 1: Ensure MongoDB is Running

**Windows:**
```powershell
# Check if MongoDB is installed
mongod --version

# Start MongoDB (if installed locally)
mongod
```

**Or use MongoDB Atlas** (Cloud - Recommended for hackathon):
- Sign up at https://www.mongodb.com/cloud/atlas/register
- Create a free cluster
- Get your connection string
- Update `MONGODB_URI` in `.env` file

### Step 2: Start the Backend Server

```bash
npm run dev
```

You should see:
```
╔═══════════════════════════════════════════════════════╗
║   🏥  SWAASTHYAM HEALTHCARE API SERVER               ║
║   Status: ✅ Running                                 ║
║   Port: 5000                                         ║
╚═══════════════════════════════════════════════════════╝
```

### Step 3: Test the API

Open a new terminal and run:

```bash
# Test health check
curl http://localhost:5000/

# Or visit in browser:
# http://localhost:5000/
```

---

## 🧪 Quick API Testing

### 1. Register a Worker

```powershell
$body = @{
    name = "Test Worker"
    phone = "9876543210"
    password = "password123"
    role = "worker"
    location = @{
        state = "Kerala"
    }
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -Body $body -ContentType "application/json"
```

### 2. Register an Officer

```powershell
$body = @{
    name = "Dr. Sharma"
    phone = "9876543211"
    password = "password123"
    role = "officer"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -Body $body -ContentType "application/json"
```

### 3. Login

```powershell
$body = @{
    phone = "9876543210"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/login" -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "Token: $token"
```

### 4. Get My Profile

```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/auth/me" -Headers $headers
```

---

## 📊 Common Issues & Solutions

### ❌ MongoDB Connection Error

**Error:** `Error: connect ECONNREFUSED`

**Solutions:**
1. Make sure MongoDB is running: `mongod`
2. Or use MongoDB Atlas (cloud)
3. Check `MONGODB_URI` in `.env` file

### ❌ Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Change port in `.env`: `PORT=5001`
2. Or kill the process:
   ```powershell
   # Find process
   netstat -ano | findstr :5000
   
   # Kill it (replace <PID> with actual PID)
   taskkill /PID <PID> /F
   ```

### ❌ Module Not Found

**Error:** `Cannot find module...`

**Solution:**
```bash
npm install
```

---

## 🎯 Next Steps

1. ✅ Backend is running on port 5000
2. ✅ Start your React frontend: `cd .. && npm run dev`
3. ✅ Frontend will run on port 5173
4. ✅ Test the complete application!

---

## 📝 Important Endpoints

| Endpoint | Description |
|----------|-------------|
| `http://localhost:5000/` | API health check |
| `http://localhost:5000/api/auth/register` | Register new user |
| `http://localhost:5000/api/auth/login` | Login |
| `http://localhost:5000/api/health/records/my` | Get my health records |
| `http://localhost:5000/api/alerts/my` | Get my alerts |

---

**Need help?** Check `README.md` for full documentation!

**Happy Coding! 🚀**

