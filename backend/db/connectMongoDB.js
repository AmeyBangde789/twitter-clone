import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${dbConnection.connection.host}`)
    } catch (error) {
        console.log(`Error connection to mongoDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectMongoDB;