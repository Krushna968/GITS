@echo off
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                                                        ║
echo ║     CREATE TEST USERS IN PRODUCTION DATABASE          ║
echo ║                                                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo This will create test users in your production MongoDB.
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo STEP 1: Get MongoDB URI from Render
echo.
echo 1. Go to: https://dashboard.render.com
echo 2. Click: swaasthyam-backend
echo 3. Click: Environment tab
echo 4. Find: MONGODB_URI
echo 5. Copy the full URI (mongodb+srv://...)
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
set /p MONGODB_URI="Paste MongoDB URI here: "
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Creating .env.production in backend folder...
echo.

cd backend

echo NODE_ENV=production > .env.production
echo MONGODB_URI=%MONGODB_URI% >> .env.production
echo PORT=5000 >> .env.production
echo JWT_SECRET=swaasthyam_jwt_secret_key_2025_hackathon >> .env.production
echo JWT_REFRESH_SECRET=swaasthyam_refresh_secret_key_2025_hackathon >> .env.production

echo ✅ Environment file created!
echo.
echo Running seed script...
echo.

node createTestUser.js

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Cleaning up...
del .env.production
echo.
echo ✅ Done! Test users created in production database.
echo.
echo Test login with:
echo   Phone: 9876543210
echo   Get OTP from: Render Dashboard → Logs
echo.
pause

