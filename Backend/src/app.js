import express from "express";
import userRouter from './routes/user.routes.js';

import nurseryRouter from './routes/nursery.routes.js';
import addressRouter from './routes/address.routes.js';

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

app.use("/api/v1/users", userRouter,addressRouter)
// app.use("/api/v1/users/cart",cartRouter)
app.use("/api/v1/nursery",nurseryRouter)

export {app};