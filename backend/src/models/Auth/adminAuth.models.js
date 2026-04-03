import mongoose from "mongosse";

const adminAuthSchema = new mongoose.Schema({
    adminName: {
        type: String,
        require: true,
        unnique: true,
    },
    adminEmail: {
        type: String,
        require: true,
        unnique: true
    },
    adminPassword: {
        type: String,
        require: true
    },
    role :{
        type : String ,
        default : "admin"
    }
} , {timestamps : true});

const admin = mongoose.model("admin" , adminAuthSchema);

export default admin;