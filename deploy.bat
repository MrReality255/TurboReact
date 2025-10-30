@echo off
call npm run build --production
call npm publish --registry https://npm.pkg.github.com
pause
