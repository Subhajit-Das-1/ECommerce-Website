import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box 
                display="flex" 
                flexDirection="column"
                justifyContent="center" 
                alignItems="center" 
                minHeight="100vh"
            >
                <CircularProgress />
                <Typography style={{ marginTop: 16 }}>
                    Loading...
                </Typography>
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 