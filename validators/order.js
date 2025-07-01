import { body } from "express-validator";

export const createOrderValidator = [
  body("items").isArray({ min: 1 }).withMessage("Order must contain items"),
  body("items.*.product").notEmpty().withMessage("Each item must reference a product"),
  body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("items.*.price").isFloat({ min: 0 }).withMessage("Price must be >= 0"),

  body("shippingAddress").notEmpty().withMessage("Shipping address is required"),
  body("shippingAddress.fullName").notEmpty(),
  body("shippingAddress.phone").notEmpty(),
  body("shippingAddress.street").notEmpty(),
  body("shippingAddress.city").notEmpty(),
  body("shippingAddress.country").notEmpty(),
  body("shippingAddress.postalCode").notEmpty(),

  body("paymentMethod").isIn(["card", "paypal", "cod"]),

  body("subtotal").isFloat({ min: 0 }),
  body("shippingCost").isFloat({ min: 0 }),
  body("tax").isFloat({ min: 0 }),
  body("discount").optional().isFloat({ min: 0 }),
  body("total").isFloat({ min: 0 }),
];
