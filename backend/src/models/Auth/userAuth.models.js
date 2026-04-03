import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    userName :{
        type : String ,
        require : true ,
        unnique : true
    },
    userEmail : {
        type : String ,
        require : true ,
        unnique : true
    },
    userPassword : {
        type : String ,
        require : true
    },
    role:{
        type : String ,
        default : "user"
    }
} , {timestamps : true});

const user  = mongoose.model("user" , userAuthSchema);

export default user;