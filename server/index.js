import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import repoRoutes from './src/routes/reporoutes.js';
import authRoutes from './src/routes/authRoutes.js';


dotenv.config();

const app = express();

const connect = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB")
    } catch (error){
        throw error;
    }
};
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
})

app.use(cors());
app.use(express.json());

app.use('/',authRoutes);
app.use('/api/v1', repoRoutes);

app.listen(3000,()=> {
    connect();
    console.log("App is listening on port 3000");
})