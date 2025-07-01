import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.js";
import { createOrderValidator } from "../validators/order.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Authenticated user creates and views their orders
router.post("/", protect, createOrderValidator, validationResultHandler, createOrder);
router.get("/my-orders", protect, getMyOrders);

// Admin: manage all orders
router.get("/", protect, getAllOrders); // You can add an isAdmin middleware
router.put("/:id", protect, updateOrderStatus); // Protect with isAdmin if needed
router.delete("/:id", protect, deleteOrder); // Protect with isAdmin if needed

export default router;
