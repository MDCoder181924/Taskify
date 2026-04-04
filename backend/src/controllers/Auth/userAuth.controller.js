import user from "../../models/Auth/userAuth.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const userRagister = async (req, res, next) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        if (!userName || !userEmail || !userPassword) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }

        const bycryptPassword = await bcrypt.hash(userPassword, 10);

        const newUser = await user.create({
            userName,
            userEmail,
            userPassword: bycryptPassword,
            role: "user"
        })

        return res.status(201).json({
            message: "user register successfully",
            user: newUser
        })


    } catch (err) {
        console.log("User Register Error : ", err);
        return res.status(500).json({
            message: "user register error",
            error: err.message
        })
    }
}


export const userLogin = async (req, res, next) => {

    try {
        const {userEmail, userPassword} = req.body;

        if (!userEmail || !userPassword) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }

        const existingUser = await user.findOne({userEmail});

        if (!existingUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(userPassword, existingUser.userPassword);

        if(!isPasswordMatch){
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        const token = jwt.sign({
            id:existingUser._id,
            role:existingUser.role
        },process.env.JWT_SECRET_KEY , {expiresIn : "1d"});

        res.cookie("userToken" ,token , {
            httpOnly : true ,
            secure : process.env.NODE_ENV === "production" ? true : false ,
            sameSite : "strict" ,
            maxAge : 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "user login successfully",
            token
        })

    }catch(err){
        console.log("User Login Error : " , err);
        return res.status(500).json({
            message: "user login error",
            error: err.message
        })
    }
}