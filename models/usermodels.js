const mongoose = require("mongoose");
const Userschema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model("User",Userschema)