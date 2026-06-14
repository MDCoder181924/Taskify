import user from "../../models/Auth/userAuth.models.js";
import admin from "../../models/Auth/adminAuth.models.js";
import jwt from "jsonwebtoken";

const checkUserExist = async (req, res, next) => {
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

        if ( userExist || adminExist) {
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

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    // Support simulated identity switching in development / local testing
    const simulatedEmail = req.headers['x-simulated-user'];
    if (simulatedEmail && process.env.NODE_ENV !== 'production') {
      const simulatedUserObj = await user.findOne({ userEmail: simulatedEmail });
      if (simulatedUserObj) {
        req.user = {
          userId: simulatedUserObj._id.toString(),
          userEmail: simulatedUserObj.userEmail,
          role: simulatedUserObj.role
        };
      }
    }

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token"
    });
  }
};

export { authMiddleware  , checkUserExist};