import { useState } from 'react';

import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;

const Profile = ({ account, setAccount }) => {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setAccount('');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    
    return (
        <>
            <Box onClick={handleClick}><Typography style={{ marginTop: 2 }}>{account}</Typography></Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); handleLogout();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )    
}

export default Profile;