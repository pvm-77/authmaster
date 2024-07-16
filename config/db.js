

import mongoose from "mongoose"

import 'dotenv/config'


export const dbConnection=async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongodb connect')
        
    } catch (error) {
        console.error('mongodb not connected:',error)
    }
   

}