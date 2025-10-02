# Quick Frontend Deployment Script
Write-Host "🚀 Swaasthyam Frontend Deployment" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if logged in to Vercel
Write-Host "Step 1: Checking Vercel login..." -ForegroundColor Yellow
$vercelWhoami = vercel whoami 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to Vercel" -ForegroundColor Red
    Write-Host "📝 Opening Vercel login..." -ForegroundColor Yellow
    Write-Host ""
    vercel login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Login failed. Please try again." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Logged in to Vercel!" -ForegroundColor Green
Write-Host ""

# Get backend URL
Write-Host "Step 2: Backend URL Configuration" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Please enter your Render backend URL" -ForegroundColor Cyan
Write-Host "   Example: https://swaasthyam-backend-xxxx.onrender.com" -ForegroundColor White
Write-Host ""
$backendUrl = Read-Host "Backend URL"

if ([string]::IsNullOrWhiteSpace($backendUrl)) {
    Write-Host "⚠️  No backend URL provided. Using default..." -ForegroundColor Yellow
    $backendUrl = "https://swaasthyam-backend.onrender.com"
}

# Remove trailing slash if present
$backendUrl = $backendUrl.TrimEnd('/')

Write-Host ""
Write-Host "Using backend URL: $backendUrl/api" -ForegroundColor Green
Write-Host ""

# Deploy
Write-Host "Step 3: Deploying to Vercel..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Answer the prompts:" -ForegroundColor Yellow
Write-Host "   - Set up and deploy? → Yes" -ForegroundColor White
Write-Host "   - Project name? → swaasthyam (or press Enter)" -ForegroundColor White
Write-Host "   - Directory? → ./ (press Enter)" -ForegroundColor White
Write-Host "   - Override settings? → No" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to start deployment"

vercel

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Preview deployment successful!" -ForegroundColor Green
Write-Host ""

# Add environment variable
Write-Host "Step 4: Adding environment variable..." -ForegroundColor Yellow
$apiUrl = "$backendUrl/api"
Write-Host "VITE_API_URL=$apiUrl" -ForegroundColor White

# Create .env.production file
$envContent = "VITE_API_URL=$apiUrl"
Set-Content -Path ".env.production" -Value $envContent

Write-Host "✅ Environment file created!" -ForegroundColor Green
Write-Host ""

# Ask about production deployment
Write-Host "Step 5: Production Deployment" -ForegroundColor Yellow
Write-Host ""
$deployProd = Read-Host "Deploy to production now? (y/n)"

if ($deployProd -eq "y") {
    Write-Host ""
    Write-Host "🚀 Deploying to production..." -ForegroundColor Yellow
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 SUCCESS! Your app is live!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Next Steps:" -ForegroundColor Cyan
        Write-Host "1. Visit your app URL (shown above)" -ForegroundColor White
        Write-Host "2. Test login with phone: 9876543210" -ForegroundColor White
        Write-Host "3. Check Render logs for OTP" -ForegroundColor White
        Write-Host "4. Test all features!" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "ℹ️  Preview deployment complete!" -ForegroundColor Cyan
    Write-Host "Run 'vercel --prod' when ready for production" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green

