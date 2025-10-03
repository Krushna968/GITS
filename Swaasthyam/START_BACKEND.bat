@echo off
echo ========================================
echo  SWAASTHYAM BACKEND STARTUP
echo ========================================
echo.

cd backend

echo [1/3] Creating test users...
node createTestUser.js

echo.
echo [2/3] Starting MongoDB...
echo Make sure MongoDB is running!
echo.

echo [3/3] Starting Backend Server...
echo.
npm run dev

pause

