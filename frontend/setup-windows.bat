@echo off
echo ========================================
echo Form Builder - Frontend Setup for Windows
echo ========================================
echo.

echo Step 1: Cleaning old installations...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules 2>nul
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json 2>nul
)
echo Clean complete.
echo.

echo Step 2: Clearing npm cache...
call npm cache clean --force
echo.

echo Step 3: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Installation failed!
    pause
    exit /b 1
)
echo.

echo ========================================
echo Setup complete! You can now run:
echo   npm run dev
echo ========================================
pause
