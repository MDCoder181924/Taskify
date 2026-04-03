import admin from "../../models/Auth/adminAuth.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminRagister = async (req, res, next) => {
    try {
        const { adminName, adminEmail, adminPassword } = req.body;
        if (!adminName || !adminEmail || !adminPassword) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }

        const bycryptPassword = await bcrypt.hash(adminPassword, 10);

        const newAdmin = await admin.create({
            adminName,
            adminEmail,
            adminPassword: bycryptPassword,
            role: "admin"
        })

        return res.status(201).json({
            message: "admin register successfully",
            admin: newAdmin
        })


    } catch (err) {
        console.log("Admin Ragister Error : ", err);
        return res.status(500).json({
            message: "admin ragister error",
            error: err.message
        })
    }
}


export const adminLogin = async (req, res, next) => {

    try {
        const {adminEmail, adminPassword} = req.body;

        if (!adminEmail || !adminPassword) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }

        const admin = await admin.findOne({adminEmail});

        if (!admin) {
            return res.status(404).json({
                message: "admin not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(adminPassword, admin.adminPassword);

        if(!isPasswordMatch){
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        const token = jwt.sign({
            id:admin._id,
            role:admin.role
        },process.env.JWT_SECRET_KEY , {expiresIn : "1d"});

        cookieStore.set("adminToken" ,token , {
            httpOnly : true ,
            secure : process.env.NODE_ENV === "production" ? true : false ,
            sameSite : "strict" ,
            maxAge : 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "admin login successfully",
            token
        })

    }catch(err){
        console.log("Admin Login Error : " , err);
        return res.status(500).json({
            message: "admin login error",
            error: err.message
        })
    }
}