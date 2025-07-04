import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.layout = "admin/partials/layout";
  next();
});

// Route mappings
router.get("/", (req, res) => res.render("admin/dashboard"));
router.get("/users", (req, res) => res.render("admin/users"));
router.get("/products", (req, res) => res.render("admin/products"));
router.get("/orders", (req, res) => res.render("admin/orders"));
router.get("/add-product", (req, res) => res.render("admin/add-product"));
router.get("/user-details", (req, res) => res.render("admin/user-details"));
router.get("/order-details", (req, res) => res.render("admin/order-details"));
router.get("/refund", (req, res) => res.render("admin/refund"));

export default router;
