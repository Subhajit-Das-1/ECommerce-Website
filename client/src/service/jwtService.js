const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const jwtService = {
    // Store token and user data
    setAuth: (token, user) => {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    // Get stored token
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    // Get stored user data
    getUser: () => {
        const userData = localStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        return !!token;
    },

    // Clear authentication data
    clearAuth: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    // Get authorization header for API calls
    getAuthHeader: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}; 