# Swaasthyam Deployment Script for Windows PowerShell
# This script helps you deploy the frontend to Vercel

Write-Host "🚀 Swaasthyam Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "Installing Vercel CLI globally..." -ForegroundColor Yellow
    npm install -g vercel
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI!" -ForegroundColor Red
        Write-Host "Please run: npm install -g vercel" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "✅ Vercel CLI installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI is already installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Deployment Options:" -ForegroundColor Cyan
Write-Host "1. Deploy to Preview (staging)" -ForegroundColor White
Write-Host "2. Deploy to Production" -ForegroundColor White
Write-Host "3. Login to Vercel" -ForegroundColor White
Write-Host "4. Check deployment status" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🔨 Building and deploying to preview..." -ForegroundColor Yellow
        vercel
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Deploying to production..." -ForegroundColor Yellow
        Write-Host "⚠️  Make sure you have:" -ForegroundColor Yellow
        Write-Host "   - Deployed backend to Render" -ForegroundColor White
        Write-Host "   - Updated VITE_API_URL in Vercel dashboard" -ForegroundColor White
        Write-Host "   - Tested everything locally" -ForegroundColor White
        Write-Host ""
        $confirm = Read-Host "Continue? (y/n)"
        
        if ($confirm -eq "y") {
            vercel --prod
        } else {
            Write-Host "Deployment cancelled." -ForegroundColor Yellow
        }
    }
    "3" {
        Write-Host ""
        Write-Host "🔐 Logging in to Vercel..." -ForegroundColor Yellow
        vercel login
    }
    "4" {
        Write-Host ""
        Write-Host "📊 Checking deployment status..." -ForegroundColor Yellow
        vercel ls
    }
    "5" {
        Write-Host ""
        Write-Host "👋 Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice! Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Check your deployment URL in the output above" -ForegroundColor White
Write-Host "2. Visit the URL to verify everything works" -ForegroundColor White
Write-Host "3. Check DEPLOYMENT_GUIDE.md for more details" -ForegroundColor White
Write-Host ""

