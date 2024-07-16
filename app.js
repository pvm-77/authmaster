import  express from 'express';
import cors from 'cors'
import authRouter from './API/auth/index.js'
import errorHandler from './middleware/error.js';
import { dbConnection } from './config/db.js';
const app=express()
app.use(cors())
app.use(express.json())

dbConnection()
// app.use(middleware.requestLogger)

app.use('/api', authRouter);
app.use('/',(req,res)=>{
    res.status(200).json({'message':'welcome everybody'})
})

app.use(errorHandler)


export default app;