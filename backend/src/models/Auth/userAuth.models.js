import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    fullName:{
        type:String,
    },
    userName :{
        type : String ,
        required : true ,
    },
    userEmail : {
        type : String ,
        required : true ,
        unique : true
    },
    userPassword : {
        type : String ,
    },
    refreshToken:{
        type:String,
    },
    role:{
        type : String ,
        default : "user"
    },
    provider:{
        type:String,
        enum:['local' , 'google' , 'github'],
        default:'local'
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    profilePic:{
        type:String,
    }
} , {timestamps : true});

const user  = mongoose.model("user" , userAuthSchema);

export default user;