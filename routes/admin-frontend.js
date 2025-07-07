import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.layout = "admin/partials/layout";
  next();
});

// Route mappings
router.get("/", (req, res) => res.render("admin/dashboard"));
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin/users", { users });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
});
router.get("/products", (req, res) => res.render("admin/products"));
router.get("/orders", (req, res) => res.render("admin/orders"));
router.get("/user-details", (req, res) => res.render("admin/user-details"));
router.get("/order-details", (req, res) => res.render("admin/order-details"));

export default router;
