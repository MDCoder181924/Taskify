import User from "../../models/Auth/userAuth.models.js";

export const getMe = async (req, res) => {
    try {

        const user = await User.findById(
            req.user.userId
        ).select("-userPassword");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserCount = async ( req , res) => {
    try{
        const totalUsers = await User.countDocuments({role : "user"});
        res.status(200).json({
            success: true,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}