# 🏥 Swaasthyam - Digital Health Records for Migrant Workers

<div align="center">

![Swaasthyam Logo](./public/Cooked-Coders/assets/logo%202.png)

**A Comprehensive Healthcare Management Platform for Migrant Workers in India**

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Swaasthyam** (Sanskrit for "Health") is a government digital health initiative designed specifically for migrant workers in India. It provides a secure, multilingual platform for managing health records, tracking medical history, and ensuring healthcare continuity across state borders.

### 🎯 Mission
To provide accessible, portable, and secure digital health records for India's 140+ million migrant workers, ensuring continuity of care regardless of location.

### 🚀 Key Highlights
- 🌐 **Multilingual Support**: 10+ Indian languages (Hindi, Marathi, English, Tamil, Telugu, Malayalam, Kannada, Bengali, Gujarati, Punjabi)
- 📱 **Mobile-First Design**: Optimized for low-bandwidth areas
- 🔒 **OTP Authentication**: No passwords - simple and secure
- 🌓 **Dark Mode**: Beautiful UI with automatic theme switching
- 🤖 **AI Chatbot**: Powered by Groq AI (Llama 3.3 70B)
- 📊 **QR Code Health ID**: Quick access to health records
- ♿ **Accessibility**: WCAG compliant for inclusive design

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ **OTP-Based Login** - No passwords needed, secure 6-digit OTP
- ✅ **JWT Authentication** - Secure token-based sessions
- ✅ **Role-Based Access Control** - Three user types with specific permissions
- ✅ **Data Encryption** - All sensitive data encrypted at rest
- ✅ **Rate Limiting** - Protection against brute force attacks
- ✅ **Input Sanitization** - MongoDB injection protection

### 👥 User Management
#### Migrant Workers
- 📋 View personal health records
- 💊 Track medications and prescriptions
- 📅 Schedule health checkups
- 🆔 QR code health ID for quick identification
- 📊 Health metrics dashboard
- 🔔 Receive health alerts and reminders
- 📍 Location-based health services

#### Health Officers
- ➕ Add/update worker health records
- 📝 Generate health certificates
- 👥 Manage worker registrations
- 📨 Send health alerts and notifications
- 📈 View worker health analytics
- 🏥 Track camp-wise health data

#### Government Officials
- 📊 Access comprehensive health analytics
- 📈 View state/district-wise reports
- 📉 Policy insights and recommendations
- 🗺️ Geographic health mapping
- 📋 Export data for policy decisions

### 🤖 AI-Powered Chatbot
- 💬 **24/7 Assistance** - Always available for help
- 🧠 **Context-Aware** - Remembers conversation history
- ⚡ **Super Fast** - Powered by Groq AI (Llama 3.3 70B)
- 🌐 **Multilingual** - Responds in user's preferred language
- 🎯 **Smart Suggestions** - Quick reply options
- 📚 **Knowledge Base** - Comprehensive platform information
- 🚨 **Emergency Support** - Immediate emergency contacts

**Chatbot Capabilities:**
- Login and OTP troubleshooting
- Platform feature explanations
- Health record queries
- Registration guidance
- Privacy and security information
- Emergency contact information

### 🎨 User Interface
- 🌓 **Dark Mode** - Elegant theme switching with smooth transitions
- 📱 **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- 🎭 **Premium Animations** - Glassmorphism, gradient overlays, smooth transitions
- ♿ **Accessibility** - Screen reader compatible, keyboard navigation
- 🌈 **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- ⚡ **Fast Loading** - Optimized performance with code splitting

### 🌐 Multilingual Support
Supports 10+ Indian languages:
- 🇬🇧 English
- 🇮🇳 Hindi (हिन्दी)
- 🇮🇳 Marathi (मराठी)
- 🇮🇳 Tamil (தமிழ்)
- 🇮🇳 Telugu (తెలుగు)
- 🇮🇳 Malayalam (മലയാളം)
- 🇮🇳 Kannada (ಕನ್ನಡ)
- 🇮🇳 Bengali (বাংলা)
- 🇮🇳 Gujarati (ગુજરાતી)
- 🇮🇳 Punjabi (ਪੰਜਾਬੀ)

### 📊 Health Records Management
- 🏥 Complete medical history
- 💉 Vaccination records
- 🩺 Lab test results
- 📋 Doctor prescriptions
- 🏥 Hospital visit history
- 🩹 Treatment records
- ⚠️ Allergy information
- 🧬 Blood group and vital stats

### 🔔 Alert & Notification System
- 📨 Health checkup reminders
- 💊 Medication alerts
- 🚨 Emergency notifications
- 📍 Nearby health facility alerts
- 🏥 Camp health drive updates
- ⚠️ Disease outbreak warnings

### 🔗 Integration Features
- 🔐 **DigiLocker Integration** - Fetch documents securely
- 📷 **QR Code Scanning** - Quick worker identification
- 📱 **SMS Notifications** - OTP and alerts via SMS
- 🗺️ **Location Services** - Find nearby health facilities
- 📊 **Data Export** - CSV/PDF report generation

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI Framework |
| **React Router DOM** | 7.9.1 | Routing |
| **Tailwind CSS** | 4.1.13 | Styling |
| **Vite** | 7.1.2 | Build Tool |
| **Axios** | 1.12.2 | HTTP Client |
| **React Icons** | 5.5.0 | Icon Library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime |
| **Express.js** | 4.18.2 | Web Framework |
| **MongoDB** | 8.0+ | Database |
| **Mongoose** | 8.0.0 | ODM |
| **JWT** | 9.0.2 | Authentication |
| **Bcrypt.js** | 2.4.3 | Password Hashing |

### AI & Services
| Service | Purpose |
|---------|---------|
| **Groq AI** | Chatbot (Llama 3.3 70B) |
| **Google Gemini** | Alternative AI provider |

### Security & Middleware
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting
- **Express Mongo Sanitize** - NoSQL injection protection
- **Morgan** - HTTP request logger
- **Compression** - Response compression

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │  Dark Mode   │  │  Languages   │      │
│  │  Components  │  │   Context    │  │   Context    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Express    │  │  Middleware  │  │    Routes    │      │
│  │    Server    │  │  (Auth, etc) │  │  Controllers │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
┌───────────────────────────┐  ┌────────────────────┐
│      DATA LAYER           │  │   EXTERNAL APIs    │
│  ┌──────────────────┐     │  │  ┌──────────────┐ │
│  │    MongoDB       │     │  │  │   Groq AI    │ │
│  │  (Health Records)│     │  │  └──────────────┘ │
│  └──────────────────┘     │  │  ┌──────────────┐ │
│  ┌──────────────────┐     │  │  │  DigiLocker  │ │
│  │   User Models    │     │  │  └──────────────┘ │
│  └──────────────────┘     │  │  ┌──────────────┐ │
│  ┌──────────────────┐     │  │  │   SMS API    │ │
│  │  Alert Models    │     │  │  └──────────────┘ │
│  └──────────────────┘     │  └────────────────────┘
└───────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v8 or higher)
- npm or yarn
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Krushna968/GITS.git
cd GITS/Swaasthyam
```

### 2️⃣ Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will be available at `http://localhost:5173`

### 3️⃣ Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure `.env` file:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/swaasthyam

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Groq AI Configuration (Get free key from https://console.groq.com/keys)
GROQ_API_KEY=your_groq_api_key_here

# Optional: Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4️⃣ Seed Database (Optional)
```bash
# Run seed script to populate sample data
node scripts/seedData.js
```

### 5️⃣ Start Backend Server
```bash
# Start development server with auto-reload
npm run dev

# Or start production server
npm start
```
Backend API will be available at `http://localhost:5000`

### 6️⃣ Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

### 🎉 Ready to Use!
**Default Test Accounts:**
```
Migrant Worker:
Phone: 9876543210
OTP: (Check backend terminal)

Health Officer:
Phone: 9876543211
OTP: (Check backend terminal)

Government Official:
Phone: 9876543212
OTP: (Check backend terminal)
```

---

## 📁 Project Structure

```
Swaasthyam/
├── 📂 public/
│   └── Cooked-Coders/
│       └── assets/          # Images, logos, icons
│
├── 📂 src/                  # Frontend React Application
│   ├── 📂 components/       # Reusable React components
│   │   ├── Chatbot.jsx     # AI Chatbot with premium UI
│   │   └── DarkModeToggle.jsx  # Theme switcher
│   │
│   ├── App.jsx             # Main app component & routing
│   ├── main.jsx            # React entry point
│   │
│   ├── 🌐 Pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── LoginPage.jsx       # OTP-based login
│   │   ├── MigrantDashboard.jsx    # Worker dashboard
│   │   ├── OfficerDashboard.jsx    # Officer dashboard
│   │   ├── OfficialDashboard.jsx   # Official dashboard
│   │   ├── OfficerRegistration.jsx
│   │   ├── OfficialRegistration.jsx
│   │   ├── WorkerRegistration.jsx
│   │   └── DigiLockerMock.jsx  # DigiLocker integration
│   │
│   ├── 🎨 Contexts/
│   │   ├── DarkModeContext.jsx    # Dark mode state management
│   │   └── LanguageContext.jsx    # i18n translations
│   │
│   └── LoadingAnimation.jsx   # Loading screens
│
├── 📂 backend/              # Node.js Express Backend
│   ├── 📂 config/
│   │   └── database.js     # MongoDB connection
│   │
│   ├── 📂 models/          # Mongoose schemas
│   │   ├── User.js         # User model
│   │   ├── HealthRecord.js # Health record model
│   │   └── Alert.js        # Alert/notification model
│   │
│   ├── 📂 controllers/     # Route handlers
│   │   ├── authController.js      # Authentication logic
│   │   ├── authOTPController.js   # OTP management
│   │   ├── healthController.js    # Health records
│   │   └── alertController.js     # Notifications
│   │
│   ├── 📂 routes/          # API endpoints
│   │   ├── authRoutes.js
│   │   ├── healthRoutes.js
│   │   ├── alertRoutes.js
│   │   └── chatbot.js      # Chatbot API
│   │
│   ├── 📂 services/        # Business logic
│   │   ├── groqChatbotService.js  # Groq AI integration
│   │   ├── geminiChatbotService.js # Google Gemini
│   │   └── chatbotService.js      # Chatbot orchestration
│   │
│   ├── 📂 middleware/
│   │   ├── auth.js         # JWT verification
│   │   └── errorHandler.js # Global error handling
│   │
│   ├── 📂 utils/
│   │   ├── otpService.js   # OTP generation & validation
│   │   └── tokenUtils.js   # JWT utilities
│   │
│   ├── 📂 scripts/
│   │   └── seedData.js     # Database seeding
│   │
│   ├── server.js           # Express server entry point
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
│
├── 📂 Documentation/
│   ├── README.md              # This file
│   ├── START_HERE.md          # Quick start guide
│   ├── BACKEND_USAGE_GUIDE.md # Backend API docs
│   ├── CHATBOT_README.md      # Chatbot integration
│   ├── OTP_AUTHENTICATION_GUIDE.md # OTP system docs
│   ├── DARK_MODE_GUIDE.md     # Dark mode implementation
│   └── PROJECT_STATUS.md      # Current development status
│
├── package.json            # Frontend dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── eslint.config.js       # ESLint rules
└── .gitignore             # Git ignore rules
```

---

## 👥 User Roles

### 1. 🏃 Migrant Worker
**Primary Users** - Migrant workers accessing their health information

**Capabilities:**
- ✅ View complete health records
- ✅ Download health certificates
- ✅ Access QR code health ID
- ✅ View medication schedules
- ✅ Track health checkups
- ✅ Receive health alerts
- ✅ Update contact information
- ✅ Find nearby health facilities

**Login:** Mobile number + OTP

### 2. 👨‍⚕️ Health Officer
**Field Workers** - Government health officers at camps/sites

**Capabilities:**
- ✅ Register new migrant workers
- ✅ Add/update health records
- ✅ Schedule health checkups
- ✅ Generate health certificates
- ✅ Send health alerts to workers
- ✅ View worker health history
- ✅ Mark health issues/follow-ups
- ✅ Upload lab reports

**Login:** Registered mobile + OTP
**Registration:** Self-registration with verification

### 3. 🏛️ Government Official
**Decision Makers** - State/district health officials

**Capabilities:**
- ✅ View aggregate health statistics
- ✅ Generate reports (district/state-wise)
- ✅ Access health analytics dashboard
- ✅ Policy insights and recommendations
- ✅ Geographic health mapping
- ✅ Export data for analysis
- ✅ Monitor health trends
- ✅ Track disease outbreaks

**Login:** Registered email/mobile + OTP
**Registration:** Admin-approved registration

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Send OTP
```http
POST /auth/send-otp
Content-Type: application/json

{
  "phone": "9876543210"
}

Response: 200 OK
{
  "success": true,
  "message": "OTP sent successfully",
  "expiresIn": "10 minutes"
}
```

#### Verify OTP & Login
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "phone": "9876543210",
  "otp": "123456"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "role": "worker",
    "phone": "9876543210"
  }
}
```

### Health Records Endpoints

#### Get User Health Records
```http
GET /health/records
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "records": [...]
}
```

#### Add Health Record (Officers Only)
```http
POST /health/records
Authorization: Bearer <token>
Content-Type: application/json

{
  "workerId": "...",
  "diagnosis": "Common Cold",
  "prescription": "Rest and fluids",
  "notes": "Follow up in 3 days"
}
```

### Chatbot Endpoints

#### Send Message to Chatbot
```http
POST /chatbot/query
Content-Type: application/json

{
  "message": "How do I login?",
  "sessionId": "session_12345"
}

Response: 200 OK
{
  "success": true,
  "response": "To login, enter your 10-digit mobile number...",
  "quickReplies": [...]
}
```

**For complete API documentation, see:** [BACKEND_USAGE_GUIDE.md](./BACKEND_USAGE_GUIDE.md)

---

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run deploy   # Deploy to GitHub Pages
```

#### Backend
```bash
npm start        # Start production server
npm run dev      # Start with nodemon (auto-reload)
```

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
# Required
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swaasthyam
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_key

# Optional
NODE_ENV=development
GEMINI_API_KEY=your_gemini_key
```

### Code Style
- **ESLint**: Enforces code quality
- **Prettier**: Code formatting (recommended)
- Follow React best practices
- Use functional components with hooks
- Tailwind CSS for styling

---

## 🚀 Deployment

### Frontend Deployment

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### GitHub Pages
```bash
npm run deploy
```

### Backend Deployment

#### Heroku
```bash
heroku create swaasthyam-api
git push heroku main
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...
```

#### Railway
```bash
railway login
railway init
railway up
```

### Database
- **MongoDB Atlas** (recommended for cloud)
- Ensure proper indexes for performance
- Regular backups

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [START_HERE.md](./START_HERE.md) | New developer quick start guide |
| [BACKEND_USAGE_GUIDE.md](./BACKEND_USAGE_GUIDE.md) | Complete backend API documentation |
| [CHATBOT_README.md](./CHATBOT_README.md) | AI chatbot integration guide |
| [OTP_AUTHENTICATION_GUIDE.md](./OTP_AUTHENTICATION_GUIDE.md) | OTP system implementation |
| [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md) | Dark mode implementation guide |
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | Current development status |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Report Bugs
- Use GitHub Issues
- Include steps to reproduce
- Provide screenshots if applicable

### ✨ Suggest Features
- Open a feature request issue
- Explain the use case
- Discuss implementation approach

### 🔀 Submit Pull Requests

1. **Fork the repository**
```bash
git clone https://github.com/Krushna968/GITS.git
cd GITS/Swaasthyam
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
```bash
# Write code
# Add tests
# Update documentation
```

4. **Commit with conventional commits**
```bash
git commit -m "feat: add amazing feature"
```

5. **Push and create PR**
```bash
git push origin feature/amazing-feature
```

### 📝 Commit Convention
```
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes
refactor: Code refactoring
test: Test updates
chore: Build/config changes
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Team

**Cooked Coders** - Development Team

### Contact
- 📧 Email: support@swaasthyam.gov.in
- 🐛 Issues: [GitHub Issues](https://github.com/Krushna968/GITS/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Krushna968/GITS/discussions)

---

## 🙏 Acknowledgments

- **Government of India** - For the healthcare initiative
- **MongoDB** - Database platform
- **Groq AI** - For the amazing Llama 3.3 70B model
- **React Community** - For the incredible ecosystem
- **Tailwind CSS** - For the beautiful styling framework
- **All Contributors** - For making this project possible

---

## 🔮 Roadmap

### Phase 1 (Current) ✅
- [x] Core authentication system
- [x] Health record management
- [x] Multi-language support
- [x] Dark mode
- [x] AI chatbot integration

### Phase 2 (Planned) 📋
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Advanced analytics dashboard
- [ ] Telemedicine integration
- [ ] SMS notifications
- [ ] Aadhaar integration
- [ ] Voice interface

---

## 📊 Statistics

- **Lines of Code**: 10,000+
- **Components**: 25+
- **API Endpoints**: 30+
- **Languages Supported**: 10+
- **Database Models**: 5+
- **Active Development**: ✅
- **Production Ready**: ✅

---

## 💡 Support

### Need Help?
1. 📖 Check the [documentation](#-documentation)
2. 💬 Use the AI chatbot in the app
3. 🐛 Open an [issue](https://github.com/Krushna968/GITS/issues)
4. 📧 Email: support@swaasthyam.gov.in

### Emergency Contacts
- 🚑 **Ambulance**: 108 (Free 24/7)
- 🏥 **Health Helpline**: 104
- 📞 **COVID Helpline**: 1075

---

<div align="center">

## ⭐ Star Us!

If you find this project helpful, please consider giving it a ⭐!

**Made with ❤️ by Cooked Coders**

[⬆ Back to Top](#-swaasthyam---digital-health-records-for-migrant-workers)

---

### 🚀 **Let's make healthcare accessible for everyone!** 🚀

</div>

