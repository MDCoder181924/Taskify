import user from "../../models/Auth/userAuth.models.js";
import admin from "../../models/Auth/adminAuth.models.js";

const authMiddleware = async (req, res, next) => {
    try {
        const name = req.body.userName || req.body.adminName;
        const email = req.body.userEmail || req.body.adminEmail;

        if (!name && !email) {
            return next(); 
        }

        const userExist = await user.findOne({
            $or: [
                { userName: name },
                { userEmail: email }
            ]
        });

        const adminExist = await admin.findOne({
            $or: [
                { adminName: name },
                { adminEmail: email }
            ]
        });

        if (userExist || adminExist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};

export { authMiddleware };