import express from "express";
import { userLogin ,userRagister , userLogout, refreshAccessToken } from "../../controllers/Auth/userAuth.controller.js";
import { authMiddleware  , checkUserExist} from "../../middleware/Auth/Auth.middleware.js";
import { generateAccessToken, generateRefreshToken } from "../../services/sesstionService.js";
import passport from '../../config/passport.js'

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
};

const userRoutes = express.Router();

userRoutes.post("/register", checkUserExist, userRagister);
userRoutes.post("/login", userLogin);
userRoutes.post("/logout", userLogout);
userRoutes.post("/refresh-token", refreshAccessToken);

userRoutes.get('/profile' , authMiddleware , (req , res)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
})

userRoutes.get(`/google` , passport.authenticate('google', {scope : ["profile" , "email"]}))

userRoutes.get(`/google/callback` ,passport.authenticate("google" , {session:false})  , (req , res)=>{
    const accesstoken = generateAccessToken(req.user);

    const refreshtoken = generateRefreshToken(req.user);

    res.cookie("accessToken", accesstoken, {
        ...cookieOptions,
    });

    res.cookie("refreshToken", refreshtoken, {
        ...cookieOptions,
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
})

userRoutes.get(`/github`, passport.authenticate("github", { scope: ["user:email"] }));

userRoutes.get('/github/callback', passport.authenticate("github", { session: false }), async (req, res) => {
    const accesstoken = generateAccessToken(req.user);
    const refreshtoken = generateRefreshToken(req.user);

    res.cookie("accessToken", accesstoken, {
        ...cookieOptions,
    });
    res.cookie("refreshToken", refreshtoken, {
        ...cookieOptions,
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
});


export default userRoutes;