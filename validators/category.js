import { body } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .notEmpty().withMessage("Category name is required")
    .isLength({ min: 2, max: 30 }).withMessage("Name must be 2–30 characters"),
  body("image")
    .optional()
    .isString().withMessage("Image must be a string URL"),
];

export const updateCategoryValidator = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 30 }).withMessage("Name must be 2–30 characters"),
  body("image")
    .optional()
    .isString().withMessage("Image must be a string URL"),
  body("isActive")
    .optional()
    .isBoolean().withMessage("isActive must be a boolean"),
];
