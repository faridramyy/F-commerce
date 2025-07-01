import { body } from "express-validator";

export const createReviewValidator = [
  body("product").notEmpty().withMessage("Product ID is required"),
  body("rating")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("title").optional().isLength({ max: 120 }).withMessage("Max 120 chars"),
  body("comment").optional().isLength({ max: 2000 }).withMessage("Max 2000 chars"),
];

export const updateReviewValidator = [
  body("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("title").optional().isLength({ max: 120 }),
  body("comment").optional().isLength({ max: 2000 }),
];
