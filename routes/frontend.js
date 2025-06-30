import express from "express";

const router = express.Router();

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
