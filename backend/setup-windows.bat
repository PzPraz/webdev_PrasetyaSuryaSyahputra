@echo off
echo ========================================
echo Form Builder - Backend Setup for Windows
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
set PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
set PRISMA_SKIP_POSTINSTALL_GENERATE=1
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ERROR: Installation failed!
    pause
    exit /b 1
)
echo.

echo Step 4: Generating Prisma Client...
call npm run db:generate
if %errorlevel% neq 0 (
    echo ERROR: Prisma generate failed!
    echo.
    echo Try running manually: npm run db:generate
    pause
    exit /b 1
)
echo.

echo Step 5: Running database migrations...
call npm run db:migrate
if %errorlevel% neq 0 (
    echo WARNING: Migration failed. Make sure PostgreSQL is running.
    echo You can run migrations later with: npm run db:migrate
)
echo.

echo ========================================
echo Setup complete! You can now run:
echo   npm run dev
echo ========================================
pause
