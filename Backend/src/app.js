import express from "express";
import userRouter from './routes/user.routes.js';
import forgotPasswordRouter from './routes/forgotPassword.js'
import nurseryRouter from './routes/nursery.routes.js';
import addressRouter from './routes/address.routes.js';
import plantRouter from './routes/plant.routes.js';
import orderRouter from './routes/order.routes.js';
import cartRouter from './routes/cart.routes.js';


import cors from "cors";
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';
const  app= express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(bodyParser.json());
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", userRouter,addressRouter,forgotPasswordRouter)
// app.use("/api/v1/users/cart",cartRouter)
app.use("/api/v1/nursery",nurseryRouter)
app.use("/api/v1/plant",plantRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/cart",cartRouter)

export {app};