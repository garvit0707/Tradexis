import mongoose from 'mongoose';


const connectDB = ()=>{
    try {
        // console.log("MongoDB connected successfully");
        return mongoose.connect(url);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

export default connectDB;