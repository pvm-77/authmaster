import  express from 'express';
import cors from 'cors'
import authRouter from './API/auth/index.js';
import userRouter from './API/users/user.routes.js';
import errorHandler from './middleware/error.js';
import { dbConnection } from './config/db.js';
const app=express()
app.use(cors())
app.use(express.json())

dbConnection()
// app.use(middleware.requestLogger)

app.use('/api/ping',(req,res)=>{
    res.status(200).json({message:'pong'})
})
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler)




export default app;