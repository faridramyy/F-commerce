import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.layout = "admin/partials/layout";
  next();
});

// Route mappings
router.get("/add-product", (req, res) => res.render("admin/add-product"));
router.get("/customer-details", (req, res) => res.render("admin/customer_details"));
router.get("/customers", (req, res) => res.render("admin/customers"));
router.get("/order-details", (req, res) => res.render("admin/order_details"));
router.get("/orders", (req, res) => res.render("admin/orders"));
router.get("/products", (req, res) => res.render("admin/products"));
router.get("/refund", (req, res) => res.render("admin/refund"));

export default router;
