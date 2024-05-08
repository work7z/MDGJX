@echo off

REM Set environment variables
set HOSTNAME=127.0.0.1
set PORT=39899

REM set production
set NODE_ENV=production

REM Check if node binary exists
if not exist .\bin\node\bin\node (
    node .\boot\pre-entrypoint.js --type=web2
) else (
    echo "Node binary not found, Node.js v20.0+ is required."
)

pause