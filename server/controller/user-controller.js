import User from '../model/userSchema.js';
import { generateToken } from '../middleware/auth.js';

export const userLogIn = async (request, response) => {
    try {
        console.log('Login attempt for:', request.body.username);
        let user = await User.findOne({ username: request.body.username, password: request.body.password });
        if(user) {
            // Generate JWT token
            const token = generateToken(user);
            return response.status(200).json({ 
                message: `${request.body.username} login successful`,
                token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                }
            });
        } else {
            return response.status(401).json({ message: 'Invalid Login' });
        }

    } catch (error) {
        console.log('Login error:', error.message);
        response.status(500).json({ message: 'Server error during login' });        
    }
}

export const verifyToken = async (request, response) => {
    try {
        // The authenticateToken middleware will handle the verification
        // If we reach here, the token is valid
        response.status(200).json({ 
            message: 'Token is valid',
            user: request.user
        });
    } catch (error) {
        console.log('Token verification error:', error.message);
        response.status(500).json({ message: 'Server error during token verification' });
    }
}

export const logout = async (request, response) => {
    try {
        // JWT tokens are stateless, so we just return success
        // The client should remove the token from storage
        response.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Logout error:', error.message);
        response.status(500).json({ message: 'Server error during logout' });
    }
}

export const userSignUp = async (request, response) => {
    try {
        console.log('Signup attempt for:', request.body.username);
        console.log('Request body:', request.body);
        
        // Validate required fields
        const { firstname, lastname, username, email, password, phone } = request.body;
        if (!firstname || !lastname || !username || !email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }
        
        // Check if username already exists
        const existUsername = await User.findOne({ username: request.body.username });
        if(existUsername) {
            return response.status(401).json({ message: 'Username already exists' });
        }
        
        // Check if email already exists
        const existEmail = await User.findOne({ email: request.body.email });
        if(existEmail) {
            return response.status(401).json({ message: 'Email already exists' });
        }
        
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        console.log('User saved successfully:', newUser.username);
        
        // Generate JWT token for new user
        const token = generateToken(newUser);
        response.status(200).json({ 
            message: 'User registered successfully',
            token: token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname
            }
        });
        
    } catch (error) {
        console.log('Signup error:', error.message);
        console.log('Error details:', error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            if (error.keyPattern && error.keyPattern.email) {
                response.status(401).json({ message: 'Email already exists' });
            } else if (error.keyPattern && error.keyPattern.username) {
                response.status(401).json({ message: 'Username already exists' });
            } else {
                response.status(401).json({ message: 'User already exists' });
            }
        } else {
            response.status(500).json({ message: 'Server error during signup' });
        }
    }
}



