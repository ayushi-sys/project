import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';


//database connection
mongoose.set('strictQuery', false);

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDb database connected')
    }catch (err){
        console.log("Mongodb database connection failed")
    }
}


dotenv.config()
const port = process.env.PORT || 8000;
const app = express();
const corsOptions ={
    origin: true,
    credentials:true
}

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

//for testing
app.get('/', (req, res) => {
    res.send("api is working");
});

app.listen(port, () => {
    connect();
    console.log('server listening to port', port);
});