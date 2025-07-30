// Generate a secure JWT secret key
import crypto from 'crypto';

// Generate a random 64-byte hex string
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('🔐 Your Secure JWT Secret Key:');
console.log('================================');
console.log(jwtSecret);
console.log('================================');
console.log('');
console.log('📝 Copy this to your .env file as:');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('');
console.log('⚠️  Keep this secret secure and never share it!'); 