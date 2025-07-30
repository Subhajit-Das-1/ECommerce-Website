import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtService } from '../service/jwtService';
import { verifyToken } from '../service/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = jwtService.getUser();
                const token = jwtService.getToken();
                
                if (token && storedUser) {
                    // Verify token with server
                    try {
                        await verifyToken();
                        setUser(storedUser);
                        setIsAuthenticated(true);
                    } catch (error) {
                        // Token is invalid, clear auth
                        jwtService.clearAuth();
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                jwtService.clearAuth();
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (token, userData) => {
        jwtService.setAuth(token, userData);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await verifyToken(); // Only call logout API if token is still valid
        } catch (error) {
            // Token already expired, just clear local storage
        }
        
        jwtService.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 