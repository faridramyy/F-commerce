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
router.get("/user-details/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("admin/user-details", { user });
  } catch (err) {
    console.error("Error fetching user:", err);
  }
});
router.get("/order-details", (req, res) => res.render("admin/order-details"));

export default router;
