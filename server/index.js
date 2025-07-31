import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

import Connection from './database/db.js';
import DefaultData from './default.js';
import Routes from './routes/route.js';


dotenv.config();
const app = express();

const PORT = 8000;

const username = process.env.DB_USERNAME || 'subhajitdas1768';
const password = process.env.DB_PASSWORD || 'Das344153%40';

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

// Only run DefaultData if database credentials are provided
if (username && password && username !== 'your_mongodb_username') {
    DefaultData();
} else {
    console.log('Database credentials not configured. Skipping data import.');
}

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        'https://e-commerce-website-rose-pi.vercel.app',
        'https://e-commerce-website-4939.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use('/', Routes);

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY || 'bKMfNxPPf_QdZppa';
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID || 'WorldP64425807474247';
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE || 'WEBSTAGING';
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID || 'WEB';
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID || 'Retail';
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID || 'CUST_001';
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'kunaltyagi@gmail.com';
paytmParams['MOBILE_NO'] = '1234567852';
