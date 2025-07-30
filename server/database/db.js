import mongoose from 'mongoose';

// Set mongoose options to suppress deprecation warnings
mongoose.set('strictQuery', false);

const Connection = async (username, password) => {
    // Use the provided MongoDB Atlas connection string
    const URL = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@cluster0.oq7x442.mongodb.net/flipkart-clone?retryWrites=true&w=majority&appName=Cluster0`;
    
    try {
        await mongoose.connect(URL, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds timeout
        });
        console.log('Database Connected Successfully');
    } catch(error) {
        console.log('Database Connection Error: ', error.message);
        console.log('Please check your MongoDB Atlas connection string and credentials');
    }
};

export default Connection;