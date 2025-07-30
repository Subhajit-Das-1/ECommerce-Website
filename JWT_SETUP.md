# JWT Authentication Setup Guide

## Backend Setup

### 1. Install JWT Package
```bash
cd server
npm install jsonwebtoken --legacy-peer-deps
```

### 2. Create .env File
Create a `.env` file in the `server` directory with:
```
DB_USERNAME=subhajitdas1768
DB_PASSWORD=Das344153%40
JWT_SECRET=your-super-secret-jwt-key-change-in-production
MONGODB_URI=mongodb+srv://subhajitdas1768:Das344153%40@cluster0.oq7x442.mongodb.net/flipkart-clone?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Start the Server
```bash
cd server
npm start
```

## Frontend Setup

### 1. Start the Client
```bash
cd client
npm start
```

## Features Implemented

### ✅ JWT Authentication
- **Secure Login/Signup**: JWT tokens generated on successful authentication
- **Token Storage**: Tokens stored securely in localStorage
- **Auto Token Verification**: Tokens verified on app load
- **Automatic Logout**: Expired tokens automatically clear auth state

### ✅ Session Management
- **Persistent Sessions**: Users stay logged in until logout or token expiry
- **Token Expiry**: 7-day token validity
- **Secure Logout**: Proper token cleanup on logout

### ✅ Protected Routes
- **Profile Page**: Requires authentication to access
- **Auto Redirect**: Unauthenticated users redirected to home

### ✅ API Security
- **Request Interceptors**: Automatically include auth headers
- **Response Interceptors**: Handle token expiration
- **Error Handling**: Proper error responses for auth failures

## Testing the JWT System

### 1. Login/Signup
- Go to http://localhost:3000
- Click "Login" button
- Create account or login with existing credentials
- JWT token will be stored automatically

### 2. Verify Session Persistence
- Refresh the page
- User should remain logged in
- Check browser localStorage for token

### 3. Test Protected Route
- Click "Profile" in header (only visible when logged in)
- Should show user profile with authentication required

### 4. Test Logout
- Click username in header
- Select "Logout"
- Should clear token and redirect to home

### 5. Test Token Expiry
- Wait 7 days or manually clear localStorage
- Should automatically logout and redirect

## API Endpoints

### Authentication
- `POST /login` - Login with username/password
- `POST /signup` - Register new user
- `POST /logout` - Logout (client-side token removal)
- `GET /verify-token` - Verify token validity (protected)

### Protected Routes
- All routes with `authenticateToken` middleware require valid JWT

## Security Features

- ✅ **JWT Tokens**: Secure, stateless authentication
- ✅ **Token Expiry**: 7-day automatic expiration
- ✅ **Secure Storage**: Tokens stored in localStorage
- ✅ **Auto Verification**: Tokens verified on app load
- ✅ **Error Handling**: Proper error responses
- ✅ **Logout Cleanup**: Complete auth state cleanup

## File Structure

```
server/
├── middleware/auth.js          # JWT middleware
├── controller/user-controller.js # Updated with JWT
├── routes/route.js            # Updated routes
└── .env                       # Environment variables

client/
├── service/jwtService.js      # JWT utilities
├── service/api.js            # Updated API calls
├── context/AuthContext.jsx   # Auth state management
├── Components/ProtectedRoute.jsx # Route protection
└── Components/Profile/UserProfile.jsx # Profile page
```

## Next Steps

1. **Install JWT package**: `npm install jsonwebtoken --legacy-peer-deps`
2. **Create .env file**: Add JWT_SECRET and database config
3. **Start servers**: Both backend and frontend
4. **Test authentication**: Login, logout, protected routes

The JWT authentication system is now fully implemented and ready for testing! 🔐✨ 