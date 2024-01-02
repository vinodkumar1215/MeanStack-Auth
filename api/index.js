import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js'
const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);


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