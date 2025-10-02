# 🏥 Swaasthyam Healthcare API Backend

A professional, scalable healthcare management system backend built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ **JWT Authentication** with refresh tokens
- ✅ **Role-Based Access Control** (Worker, Officer, Supervisor, Official)
- ✅ **Health Records Management** with full CRUD operations
- ✅ **Alert System** with notifications
- ✅ **Secure Password Hashing** with bcrypt
- ✅ **Rate Limiting** to prevent abuse
- ✅ **Input Validation & Sanitization**
- ✅ **MongoDB with Mongoose ODM**
- ✅ **Error Handling** with custom error classes
- ✅ **API Documentation** (this file!)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+ recommended) - [Download](https://nodejs.org/)
- **MongoDB** (v6+ recommended) - [Download](https://www.mongodb.com/try/download/community)
  - Or use **MongoDB Atlas** (cloud) - [Free Tier](https://www.mongodb.com/cloud/atlas/register)
- **npm** or **yarn** package manager

## 🛠️ Installation

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Setup Environment Variables

Create a `.env` file in the `backend` directory (already created, but update if needed):

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database (Choose one)
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/swaasthyam

# MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swaasthyam

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=swaasthyam_jwt_secret_key_2025_hackathon
JWT_REFRESH_SECRET=swaasthyam_refresh_secret_key_2025_hackathon
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### Step 4: Run the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

## 📊 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "phone": "9876543210",
  "password": "password123",
  "role": "worker",
  "emergencyContact": {
    "name": "Sunita Kumar",
    "phone": "9876543211",
    "relationship": "Wife"
  },
  "location": {
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "address": "123 Main St"
  },
  "dateOfBirth": "1988-01-15",
  "gender": "male",
  "bloodGroup": "B+",
  "occupation": "Construction Worker"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "role": "worker",
    "qrId": "SW-KE-abc123",
    ...
  }
}
```

### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "phone": "9876543210",
  "password": "password123"
}
```

### 3. Get My Profile
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

### 4. Update Profile
**PUT** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Rajesh Kumar Updated",
  "emergencyContact": {
    "name": "Updated Contact",
    "phone": "9876543299"
  }
}
```

### 5. Logout
**POST** `/api/auth/logout`

---

## 🏥 Health Records Endpoints

### 1. Create Health Record (Officer/Official only)
**POST** `/api/health/records`

**Headers:**
```
Authorization: Bearer <officer_token>
```

**Request Body:**
```json
{
  "workerId": "507f1f77bcf86cd799439011",
  "bloodPressure": {
    "systolic": 120,
    "diastolic": 80
  },
  "temperature": 98.6,
  "weight": 70,
  "height": 175,
  "diagnosis": "Routine checkup - all normal",
  "symptoms": ["none"],
  "medications": [
    {
      "name": "Vitamin D",
      "dosage": "1000 IU",
      "frequency": "Once daily",
      "duration": "30 days"
    }
  ],
  "status": "fit",
  "nextCheckupDate": "2025-03-15",
  "notes": "Worker is healthy and fit for work"
}
```

### 2. Get My Health Records (Worker)
**GET** `/api/health/records/my?page=1&limit=10`

### 3. Get Worker Health Records (Officer)
**GET** `/api/health/records/worker/:workerId?page=1&limit=10`

### 4. Get My Latest Status (Worker)
**GET** `/api/health/status/latest`

### 5. Get All Workers (Officer)
**GET** `/api/health/workers?page=1&limit=20&search=rajesh`

### 6. Get Health Statistics (Officer)
**GET** `/api/health/statistics`

---

## 🔔 Alerts Endpoints

### 1. Create Alert (Officer/Official only)
**POST** `/api/alerts`

**Request Body:**
```json
{
  "workerId": "507f1f77bcf86cd799439011",
  "type": "checkup",
  "title": "Upcoming Health Checkup",
  "message": "Your next health checkup is scheduled for March 15, 2025",
  "severity": "medium",
  "actionRequired": true,
  "actionType": "visit_clinic",
  "actionDeadline": "2025-03-15"
}
```

### 2. Get My Alerts (Worker)
**GET** `/api/alerts/my?page=1&limit=20&unread=true`

### 3. Mark Alert as Read
**PATCH** `/api/alerts/:alertId/read`

### 4. Mark All Alerts as Read
**PATCH** `/api/alerts/mark-all-read`

### 5. Delete Alert
**DELETE** `/api/alerts/:alertId`

---

## 👥 User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **worker** | Migrant worker | View own health records, alerts |
| **officer** | Healthcare officer | Manage all worker records, create alerts |
| **supervisor** | Supervisor | Same as officer + additional oversight |
| **official** | Government official | Full access to all data and statistics |

---

## 📝 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Worker",
    "phone": "9999999999",
    "password": "password123",
    "role": "worker"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9999999999",
    "password": "password123"
  }'
```

**Get Profile:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection "Swaasthyam API"
3. Add requests for each endpoint
4. Set up environment variables for `base_url` and `token`

---

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js         # MongoDB connection
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── healthController.js # Health records logic
│   └── alertController.js  # Alerts logic
├── middleware/
│   ├── auth.js             # JWT & authorization
│   └── errorHandler.js     # Error handling
├── models/
│   ├── User.js             # User schema
│   ├── HealthRecord.js     # Health record schema
│   └── Alert.js            # Alert schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── healthRoutes.js     # Health endpoints
│   └── alertRoutes.js      # Alert endpoints
├── utils/
│   └── tokenUtils.js       # JWT utilities
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── README.md               # This file
└── server.js               # Main entry point
```

---

## 🔒 Security Features

- ✅ **Password Hashing** with bcrypt (10 rounds)
- ✅ **JWT Tokens** with expiration
- ✅ **Helmet.js** for security headers
- ✅ **Rate Limiting** to prevent DDoS
- ✅ **MongoDB Sanitization** to prevent injection
- ✅ **CORS** configuration
- ✅ **Input Validation**

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the port in `.env` or kill the process
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### JWT Token Expired
**Solution:** Use the refresh token endpoint or login again

---

## 📈 Performance Tips

- Use indexes on frequently queried fields (already implemented)
- Enable MongoDB replica sets for production
- Use Redis for caching (future enhancement)
- Implement database connection pooling
- Use PM2 for production deployment

---

## 🚢 Deployment

### Using Render.com (Recommended)

1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

### Using Railway.app

1. Install Railway CLI
2. Run `railway login`
3. Run `railway init`
4. Run `railway up`

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@swaasthyam.gov.in

---

## 👨‍💻 Developers

Built by **Cooked Coders** team

---

## 📄 License

MIT License - feel free to use for your projects!

---

**Happy Coding! 🚀**

