import React from 'react';
import { Box, Typography, Paper, Button, styled } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled(Box)`
    padding: 40px;
    max-width: 600px;
    margin: 0 auto;
`;

const ProfileCard = styled(Paper)(({ theme }) => ({
    padding: '32px',
    marginTop: '20px',
    background: theme.palette.background.paper,
    border: theme.palette.mode === 'dark' ? '1px solid #1e293b' : '1px solid #f0f0f0',
}));

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <ProfileContainer>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            
            <ProfileCard>
                <Typography variant="h6" gutterBottom>
                    Welcome, {user?.firstname} {user?.lastname}!
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        <strong>Username:</strong> {user?.username}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>User ID:</strong> {user?.id}
                    </Typography>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleLogout}
                        sx={{ mr: 2 }}
                    >
                        Logout
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </Button>
                </Box>
            </ProfileCard>
        </ProfileContainer>
    );
};

export default UserProfile; 