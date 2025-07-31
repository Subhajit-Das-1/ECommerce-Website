import axios from 'axios';
import { jwtService } from './jwtService.js';

const url = process.env.REACT_APP_API_URL || 'https://ecommerce-website-3-9ze3.onrender.com';

// Create axios instance with default config
const api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const authHeader = jwtService.getAuthHeader();
        if (authHeader.Authorization) {
            config.headers.Authorization = authHeader.Authorization;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token expired or invalid, clear auth and redirect to login
            jwtService.clearAuth();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export const authenticateLogin = async (user) => {
    try {
        const response = await api.post('/login', user);
        return response;
    } catch (error) {
        console.log('Error while calling login API: ', error);
        throw error;
    }
}

export const authenticateSignup = async (user) => {
    try {
        const response = await api.post('/signup', user);
        return response;
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/logout');
        return response;
    } catch (error) {
        console.log('Error while calling logout API: ', error);
        throw error;
    }
}

export const verifyToken = async () => {
    try {
        const response = await api.get('/verify-token');
        return response;
    } catch (error) {
        console.log('Error while verifying token: ', error);
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        return await api.get(`/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export const payUsingPaytm = async (data) => {
    try {
        let response = await api.post('/payment', data);
        return response.data;
    } catch (error) {
        console.log('Error', error);
    }
}