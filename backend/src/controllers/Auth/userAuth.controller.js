import user from "../../models/Auth/userAuth.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {generateAccessToken ,generateRefreshToken } from '../../services/sesstionService.js'

export const userRagister = async (req, res, next) => {
    try {
        const {fullName, userName, userEmail, userPassword } = req.body;
        if (!fullName || !userName || !userEmail || !userPassword) {
            return res.status(400).json({
                success:false,
                message: "all fields are required"
            })
        }

        const bycryptPassword = await bcrypt.hash(userPassword, 10);

        const newUser = await user.create({
            fullName,
            userName,
            userEmail,
            userPassword: bycryptPassword,
            role: "user"
        })

        const accesstoken = generateAccessToken(newUser);
        const refreshtoken = generateRefreshToken(newUser);

        newUser.refreshToken = refreshtoken;

        await newUser.save();

        res.cookie("accessToken" , accesstoken , {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge : 15*60 *1000,
        })

        res.cookie("refreshToken" , refreshtoken , {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
        })

        newUser.userPassword = undefined;

        return res.status(201).json({
            success:true,
            message: "user register successfully",
            accesstoken,
            refreshtoken,
            user: newUser
        })


    } catch (err) {
        console.log("User Register Error : ", err);
        return res.status(500).json({
            success:false,
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
                suucess:false,
                message: "all fields are required"
            })
        }

        const existingUser = await user.findOne({userEmail});

        if (!existingUser) {
            return res.status(404).json({
                success:false,
                message: "user not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(userPassword, existingUser.userPassword);

        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message: "invalid credentials"
            })
        }

        const accesstoken = generateAccessToken(existingUser);
        const refreshtoken = generateRefreshToken(existingUser);

        existingUser.refreshToken = refreshtoken;

        await existingUser.save();

        res.cookie("accessToken" ,accesstoken, {
            httpOnly:true,
            secure:false,
            sameSite: "strict",
            maxAge : 15*60*1000,
        })

        res.cookie("refreshToken" , refreshtoken , {
            httpOnly : true,
            secure : false,
            sameSite:"strict",
            maxAge : 7*24*60*60*1000,
        })

        existingUser.userPassword = undefined;

        return res.status(200).json({
            success: true,
            message: "user login successfully",
            accesstoken,
            refreshtoken,
            existingUser
        })

    }catch(err){
        console.log("User Login Error : " , err);
        return res.status(500).json({
            message: "user login error",
            error: err.message
        })
    }
}

export const userLogout = async (req, res)=>{
    try{

        const refreshtoken = req.cookies.refreshToken;

        const existingUser  = await user.findOne({
            refreshToken : refreshtoken
        })

        if(!existingUser){
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({
                succes:true,
                message:"User is not logged in"
            })
        }

        existingUser.refreshToken = null;
        await existingUser.save();

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({
            success:true,
            message: "User logged out successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


export const refreshAccessToken = async ( req , res) => {
    try{
        const refreshtoken = req.cookies.refreshToken;
        if(!refreshtoken){
            return res.status(401).json({
                success:false,
                message:"Refresh token not found"
            })
        }

        const existingUser = await user.findOne({ refreshToken : refreshtoken});

        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"Invalid refresh token"
            })
        }

        const decoded = jwt.verify(refreshtoken ,process.env.REFRESH_TOKEN_SECRET);
        
        const newAccessToken = generateAccessToken(existingUser);

        res.cookie("accessToken" , newAccessToken ,{
            httpOnly: true,
            secure:false,
            sameSite:"strict",
            maxAge:15*60*1000,
        })

        return res.status(200).json({
            success:true,
            message:"new accesstoken creat",
            accesstoken : newAccessToken,
        })

    }catch(error){
        return res.status(401).json({
            success:false,
            message: "Invalid refresh token",
        })
    }
}