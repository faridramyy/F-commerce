import jwt from "jsonwebtoken";
import User from "../models/User.js";
import secrets from "../config/secrets.js";

export const protect =
  (allowedRoles = []) =>
  async (req, res, next) => {
    try {
      let token;
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }
      if (!token)
        return res.status(401).json({ status: "error", message: "Unauthorized: No token" });

      const decoded = jwt.verify(token, secrets.jwt.accessTokenSecret);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      if (allowedRoles.length && !allowedRoles.includes(user.role))
        return res.status(403).json({ status: "error", message: "Forbidden: Access denied" });

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ status: "error", message: "Unauthorized: Invalid token" });
    }
  };
