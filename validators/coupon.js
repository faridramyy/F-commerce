import { body } from "express-validator";

export const createCouponValidator = [
  body("code")
    .isLength({ min: 4, max: 12 })
    .withMessage("Code must be 4–12 characters")
    .matches(/^[A-Z0-9]+$/)
    .withMessage("Code must be uppercase alphanumeric"),

  body("discountType")
    .isIn(["percent", "fixed"])
    .withMessage("Discount type must be 'percent' or 'fixed'"),

  body("amount")
    .isFloat({ min: 1 })
    .withMessage("Amount must be at least 1"),

  body("minOrderAmount")
    .optional()
    .isFloat({ min: 0 }),

  body("maxDiscountAmount")
    .optional()
    .isFloat({ min: 0 }),

  body("expiresAt")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage("Valid expiration date required"),
];

export const updateCouponValidator = [
  body("discountType").optional().isIn(["percent", "fixed"]),
  body("amount").optional().isFloat({ min: 1 }),
  body("minOrderAmount").optional().isFloat({ min: 0 }),
  body("maxDiscountAmount").optional().isFloat({ min: 0 }),
  body("expiresAt").optional().isISO8601().toDate(),
  body("isActive").optional().isBoolean(),
];
