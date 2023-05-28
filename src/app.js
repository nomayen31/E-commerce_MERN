const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");


const app =express();
const rateLimiter = rateLimit({
    windowMs: 1 * 60 *1000,  //1 minute
    max:5,
    message:'too many request from this ip.. pls try again later' 
})
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api/users",userRouter);


app.get("/test",(req, res)=>{
    res.status(200).send({
        message:'api is working fine',
    });
})


// client error handling 
app.use((req,res,next)=>{
    // res.status(404).json({message: 'route not found'})
    next(createError(404, 'route not found'))
})
// server error handling -> all the error 
app.use((err,req,res,next)=>{
     return res.status(err.status || 500).json({
        success: false,
        message: err.message,
     })
})

module.exports = app;