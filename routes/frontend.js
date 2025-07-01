import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import secrets from "../config/secrets.js";

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    let token;

    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // Or fallback to token in cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // No token found
    if (!token) {
      res.locals.user = null;
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, secrets.jwt.accessTokenSecret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.locals.user = null;
      return next();
    }

    // Success: attach user to response
    res.locals.user = user;
    next();
  } catch (err) {
    res.locals.user = null;
    next(); // Ensure request continues
  }
});

// Route mappings
router.get("/", (req, res) => res.render("index"));
router.get("/about-us", (req, res) => res.render("about-us"));
router.get("/category", (req, res) => res.render("category"));
router.get("/product-details", (req, res) => res.render("product-details"));
router.get("/cart", (req, res) => res.render("cart"));
router.get("/checkout", (req, res) => res.render("checkout"));
router.get("/contact", (req, res) => res.render("contact"));
router.get("/account", (req, res) => res.render("account"));

export default router;
