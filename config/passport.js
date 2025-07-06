import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import secrets from "./secrets.js";

const GOOGLE_CLIENT_ID = secrets.google.clientId;
const GOOGLE_CLIENT_SECRET = secrets.google.clientSecret;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error("Missing Google OAuth credentials in environment variables");
  process.exit(1);
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/api/user/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create new user if doesn't exist
          const [firstName, ...rest] = profile.displayName.split(" ");
          const lastName = rest.join(" ") || "-";
          user = await User.create({
            firstName,
            lastName,
            email: profile.emails[0].value,
            password: Math.random().toString(36).slice(-8), // Generate random password
            isActiveEmail: true, // Google accounts are pre-verified
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
