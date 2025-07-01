import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect =
  (allowedRoles = []) =>
  async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized: No token" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      if (allowedRoles.length && !allowedRoles.includes(user.role))
        return res.status(403).json({ message: "Forbidden: Access denied" });

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
