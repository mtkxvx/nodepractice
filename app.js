const express = require('express');
const app = express();
const mongoose = require('mongoose')
const body= require('body-parser')
const dotenv =require('dotenv')
dotenv.config();

const userRoute=require('./routers/users')

app.use(body.json())

app.use('/',userRoute)


mongoose.connect(
    process.env.CONNECTION_DB,{useNewUrlParser:true,
        useUnifiedTopology: true,},()=>{
        console.log("DB connected")
    }
)


app.listen(3000)