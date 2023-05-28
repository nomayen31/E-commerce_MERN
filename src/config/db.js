const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const connectDatabase = async(options= {})=>{
    try {
        await mongoose.connect(mongodbURL,options)
        console.log('connection to DB successfully established');
        mongoose.connection.on('error', (error)=>{
            console.error('Db connection error: ',error);
        })
    } catch (error) {
        console.error('could not connect to DB: ',error.toString());
    }
};

module.exports = connectDatabase;