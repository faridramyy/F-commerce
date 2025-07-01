import { body } from "express-validator";

export const createProductValidator = [
  body("name").notEmpty().withMessage("Name is required").isLength({ max: 120 }),
  body("description").optional().isLength({ max: 2000 }),
  body("price").isFloat({ min: 0 }).withMessage("Price must be >= 0"),
  body("discount").optional().isFloat({ min: 0, max: 100 }),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be >= 0"),
  body("category").notEmpty().withMessage("Category ID is required"),
  body("images").isArray({ min: 1 }).withMessage("At least one image is required"),
];

export const updateProductValidator = [
  body("name").optional().isLength({ max: 120 }),
  body("description").optional().isLength({ max: 2000 }),
  body("price").optional().isFloat({ min: 0 }),
  body("discount").optional().isFloat({ min: 0, max: 100 }),
  body("stock").optional().isInt({ min: 0 }),
  body("images").optional().isArray({ min: 1 }),
];
