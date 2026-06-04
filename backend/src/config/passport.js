import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import user from "../models/Auth/userAuth.models.js";

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://taskify-b6n9.onrender.com/auth/user/google/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let exitingUser = await user.findOne({ userEmail: profile.emails[0].value, })
                if (exitingUser) {
                    return done(null, exitingUser)
                }
                const newUser = await user.create({
                    fullName: profile.displayName,
                    userName: profile.displayName,
                    userEmail: profile.emails[0].value,
                    profilePic: profile.photos[0].value || profile.photos[0].url,
                    provider: "google",
                    isVerified: true,
                })

                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
)

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://taskify-b6n9.onrender.com/auth/user/github/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) {
                return done(
                    new Error("GitHub email not found"),
                    null
                );
            }
            let exitingUser = await user.findOne({ userEmail: email });
            if (exitingUser) {
                return done(null, exitingUser)
            }
            const newUser = await user.create({
                fullName: profile.displayName,
                userName: profile.displayName,
                userEmail: email,
                profilePic: profile.photos[0].value || profile.photos[0].url,
                provider: "github",
                isVerified: true,
            })
            return done(null, newUser);
        }
        catch (error) {
            return done(error, null);
        }
    }
    )
)

export default passport;