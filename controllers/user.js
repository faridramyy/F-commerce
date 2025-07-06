import User from "../models/User.js";
import jwt from "jsonwebtoken";
import secrets from "../config/secrets.js";
import passport from "passport";
import crypto from 'crypto';
import {
  sendEmail,
  getVerificationEmailTemplate,
  generatePasswordResetEmail,
} from "../utils/emailService.js";

const generateToken = (userId) =>
  jwt.sign({ id: userId }, secrets.jwt.accessTokenSecret, {
    expiresIn: secrets.jwt.accessTokenExpiresIn,
  });

/* ---------- Auth ---------- */
export const signup = async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email }))
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });

    const user = await User.create(req.body);
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: secrets.env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const htmlContent = getVerificationEmailTemplate({
      userName: user.firstName,
      userId: user._id,
    });

    sendEmail({
      to: user.email,
      subject: "Verify your email!",
      text: `Hello ${user.firstName}, please verify your email by clicking this link: /api/auth/verify/${user._id}`,
      html: htmlContent,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    user.lastLogin = new Date();
    await user.save();

    user = await User.findById(user._id).select("-password");

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: secrets.env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req, res) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err) {
      console.error("Google callback error:", err);
      return res.redirect("/");
    }

    try {
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: secrets.env === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect("/");
    } catch (error) {
      console.error("Error in Google callback:", error);
      res.redirect("/");
    }
  })(req, res);
};


// purely client-side in SPA; this endpoint just keeps parity for future refresh-token flow
export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

/* ---------- CRUD (admin) ---------- */
export const createUser = async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email }))
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ status: "success", count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    res.status(200).json({ status: "success", data: updated });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const verifyUserEmail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isActiveEmail = true;
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error("❌ Error during email verification:", error);
    res.status(500).json({ message: "Server error." });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with that email." });
    }

    // Use crypto to generate a 6-character random string
    const verificationCode = crypto
      .randomBytes(3) // 3 bytes = 6 characters of hexadecimal code
      .toString('hex')
      .toUpperCase(); // Convert to uppercase for better readability


    user.resetPasswordCode = verificationCode;
    user.resetPasswordCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();

    // Now send the email
    const htmlContent = generatePasswordResetEmail({
      userName: user.firstName,
      verificationCode,
    });
    
    await sendEmail({
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your verification code is: ${verificationCode}`,
      html: htmlContent,
    });

    res.status(200).json({ message: "Verification code sent to your email." });
  } catch (error) {
    console.error("❌ Error during forgot password:", error);
    res.status(500).json({ message: "Server error." });
  }
};

