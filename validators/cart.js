import { body } from "express-validator";

export const addToCartValidator = [
  body("product").notEmpty().withMessage("Product ID is required"),
  body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

export const updateCartQtyValidator = [
  body("product").notEmpty().withMessage("Product ID is required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];
