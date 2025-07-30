@echo off
echo Creating .env file for server...
echo.
echo DB_USERNAME=subhajitdas1768 > server\.env
echo DB_PASSWORD=Das344153%%40 >> server\.env
echo JWT_SECRET=your-super-secret-jwt-key-change-in-production >> server\.env
echo MONGODB_URI=mongodb+srv://subhajitdas1768:Das344153%%40@cluster0.oq7x442.mongodb.net/flipkart-clone?retryWrites=true^&w=majority^&appName=Cluster0 >> server\.env
echo.
echo .env file created successfully!
echo.
echo Now you can start the server with: cd server ^& npm start
pause 