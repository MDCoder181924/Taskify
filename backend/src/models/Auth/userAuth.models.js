import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
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
        required : true
    },
    refreshToken:{
        type:String,
    },
    role:{
        type : String ,
        default : "user"
    }
} , {timestamps : true});

const user  = mongoose.model("user" , userAuthSchema);

export default user;