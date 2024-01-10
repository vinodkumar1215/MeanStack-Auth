import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//Response handler middleware
app.use((obj, req, res, next)=> {
    const statusCode = obj.status || 500;
    const Message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200,201,204].some(a=> a === obj.status) ? true : false,
        status: statusCode,
        message: Message,
        data: obj.data
    });
});


//DB Connection
const connectMangoDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database..!")
    } catch (error) {
        throw error;
    }
}

app.listen(3000, ()=> {
    connectMangoDB();
    console.log("Server running..!");
});