const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    rollno:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }

},{timestamps:true});

const userModerl=mongoose.model("user",userSchema);
module.exports=userModerl;