const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    mobileNumber : {
        type : Number,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        unique : true,
    },
},{timestamps : true});

const user = mongoose.model("user",userSchema);

module.exports = user;