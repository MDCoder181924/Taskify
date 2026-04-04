import mongoose from "mongoose";

const adminAuthSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        unique: true,
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    role :{
        type : String ,
        default : "admin"
    }
} , {timestamps : true});

const admin = mongoose.model("admin" , adminAuthSchema);

export default admin;