import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';
import productRoutes from "./routers/products.js";
import authRoutes from "./routers/auth.js";
import orderRoutes from "./routers/order.js";
import paymentRoutes from "./routers/payment.js";

const app = express()

//Handle uncaught exception
process.on('uncaughtException', (err) =>{
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to Uncaught exception');
    process.exit(1);
    
});

dotenv.config({path:"backend/config/config.env"})
//connecting to database
connectDatabase();

app.use(express.json({
    limit:"10mb",
    verify:(req, res, buf) => {
        req.rawBody = buf.toString()
    }
}));
app.use(cookieParser());


app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes)
app.use("/api/v1", paymentRoutes);

//using error middleware
app.use(errorMiddleware);
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

//handle unhandle promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to Unhandled Promise Rejection');
    server.close(() =>{
        process.exit(1);
    });
});