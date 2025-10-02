# Swaasthyam Healthcare Application Startup Script
# Starts both Backend API and Frontend Dev Server

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "   SWAASTHYAM HEALTHCARE APPLICATION              " -ForegroundColor Cyan
Write-Host "   Full Stack Startup Script                      " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "📂 Project Root: $ProjectRoot" -ForegroundColor Yellow
Write-Host ""

# Check if MongoDB is running
Write-Host "🔍 Checking MongoDB status..." -ForegroundColor Cyan
$mongoService = Get-Service MongoDB -ErrorAction SilentlyContinue

if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "❌ MongoDB is not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start MongoDB first:" -ForegroundColor Yellow
    Write-Host "  1. Run 'mongod' in a terminal" -ForegroundColor Yellow
    Write-Host "  2. Or start MongoDB service" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Do you want to continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit 1
    }
}

Write-Host ""
Write-Host "---------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

# Start Backend Server
Write-Host "🚀 Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
Write-Host "   Opening in new window..." -ForegroundColor Gray

$backendPath = Join-Path $ProjectRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'BACKEND API SERVER' -ForegroundColor Green; npm run dev"

Write-Host "✅ Backend server starting..." -ForegroundColor Green
Write-Host ""

# Wait a bit for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "🚀 Starting Frontend Server (Port 5173)..." -ForegroundColor Cyan
Write-Host "   Opening in new window..." -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ProjectRoot'; Write-Host 'FRONTEND DEV SERVER' -ForegroundColor Magenta; npm run dev"

Write-Host "✅ Frontend server starting..." -ForegroundColor Green
Write-Host ""

# Wait for servers to fully start
Write-Host "⏳ Waiting for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "---------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

# Test if servers are running
Write-Host "🧪 Testing server connectivity..." -ForegroundColor Cyan
Write-Host ""

try {
    $backendResponse = Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get -TimeoutSec 5 -ErrorAction SilentlyContinue
    if ($backendResponse.success) {
        Write-Host "✅ Backend API is responding!" -ForegroundColor Green
        Write-Host "   URL: http://localhost:5000" -ForegroundColor Gray
    }
} catch {
    Write-Host "⚠️  Backend may still be starting..." -ForegroundColor Yellow
    Write-Host "   URL: http://localhost:5000" -ForegroundColor Gray
}

Write-Host ""

try {
    $frontendCheck = Test-NetConnection -ComputerName localhost -Port 5173 -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($frontendCheck) {
        Write-Host "✅ Frontend dev server is running!" -ForegroundColor Green
        Write-Host "   URL: http://localhost:5173" -ForegroundColor Gray
    }
} catch {
    Write-Host "⚠️  Frontend may still be starting..." -ForegroundColor Yellow
    Write-Host "   URL: http://localhost:5173" -ForegroundColor Gray
}

Write-Host ""
Write-Host "---------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""
Write-Host "APPLICATION STARTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Server Status:" -ForegroundColor Cyan
Write-Host "   • Backend API:  http://localhost:5000" -ForegroundColor White
Write-Host "   • Frontend App: http://localhost:5173" -ForegroundColor White
Write-Host "   • Database:     MongoDB (localhost:27017)" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Test Credentials:" -ForegroundColor Cyan
Write-Host "   • Worker:  9876543210 / password123" -ForegroundColor White
Write-Host "   • Officer: 9876543211 / password123" -ForegroundColor White
Write-Host "   • Official: 9876543212 / password123" -ForegroundColor White
Write-Host ""
Write-Host "📝 Quick Actions:" -ForegroundColor Cyan
Write-Host "   • Open Frontend:  http://localhost:5173" -ForegroundColor Yellow
Write-Host "   • View API Docs:  backend/README.md" -ForegroundColor Yellow
Write-Host "   • Check Logs:     See the opened terminal windows" -ForegroundColor Yellow
Write-Host ""
Write-Host "🛑 To stop servers:" -ForegroundColor Red
Write-Host "   Close the PowerShell windows or press Ctrl+C in each" -ForegroundColor Gray
Write-Host ""
Write-Host "---------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

# Ask if user wants to open browser
$openBrowser = Read-Host "Would you like to open the application in your browser? (y/n)"
if ($openBrowser -eq 'y') {
    Write-Host ""
    Write-Host "🌐 Opening browser..." -ForegroundColor Cyan
    Start-Process "http://localhost:5173"
    Write-Host "✅ Browser opened!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Happy coding!" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press Enter to exit this window (servers will keep running)..."
Read-Host

