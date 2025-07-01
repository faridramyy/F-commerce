import { body } from "express-validator";

/* ---------- Auth ---------- */
export const signupValidator = [
  body("firstName")
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be 2‒30 characters"),
  body("lastName")
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be 2‒30 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

/* ---------- CRUD / profile ---------- */
export const createUserValidator = signupValidator; // for admin-only create
export const updateUserValidator = [
  body("firstName").optional().isLength({ min: 2, max: 30 }),
  body("lastName").optional().isLength({ min: 2, max: 30 }),
  body("phone").optional().matches(/^\+?[0-9]{7,15}$/),
  body("email").optional().isEmail(),
];
