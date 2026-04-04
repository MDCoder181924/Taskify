import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    userName :{
        type : String ,
        required : true ,
        unique : true
    },
    userEmail : {
        type : String ,
        require : true ,
        unique : true
    },
    userPassword : {
        type : String ,
        required : true
    },
    role:{
        type : String ,
        default : "user"
    }
} , {timestamps : true});

const user  = mongoose.model("user" , userAuthSchema);

export default user;