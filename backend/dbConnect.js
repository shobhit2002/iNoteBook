const mongoose = require('mongoose');

const mongoConnURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = ()=>{
    mongoose.connect(mongoConnURI , ()=>{
        console.log("Connected to mongoose successfully...");
    })
}

module.exports = connectToMongo;