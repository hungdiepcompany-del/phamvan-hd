$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$ProjectId = "phamvan-hd"

Write-Host ""
Write-Host "PHAM VAN MEDIA - PRODUCTION DEPLOY (SPARK)" -ForegroundColor Cyan
Write-Host "Target: https://phamvan-hd.web.app" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Node.js khong co trong PATH." }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw "npm khong co trong PATH." }

if (-not (Test-Path ".\node_modules")) {
  Write-Host "[1/3] Cai dependency..." -ForegroundColor Yellow
  npm install
  if ($LASTEXITCODE -ne 0) { throw "npm install failed." }
} else { Write-Host "[1/3] Dependency da san sang." -ForegroundColor Green }

Write-Host "[2/3] Build production + tu dong quet public/fonts..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed - khong deploy." }

Write-Host "[3/3] Deploy Hosting + Firestore Rules..." -ForegroundColor Yellow
$oldPreference=$ErrorActionPreference
$ErrorActionPreference="Continue"
npx --yes firebase-tools@latest deploy --only "hosting,firestore:rules" --project $ProjectId
$exitCode=$LASTEXITCODE
$ErrorActionPreference=$oldPreference
if ($exitCode -ne 0) { throw "Firebase deploy failed." }

Write-Host ""
Write-Host "DEPLOY COMPLETE - KHONG CAN FIREBASE STORAGE/BLAZE" -ForegroundColor Green
Write-Host "https://phamvan-hd.web.app" -ForegroundColor Green
Write-Host "https://phamvan-hd.web.app/#admin" -ForegroundColor Green
