import express from "express";
import {
  getCart,
  addToCart,
  updateItemQty,
  removeFromCart,
  clearCart,
} from "../controllers/cart.js";
import {
  addToCartValidator,
  updateCartQtyValidator,
} from "../validators/cart.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect()); // All routes require login

router.get("/", getCart);
router.post("/", addToCartValidator, validationResultHandler, addToCart);
router.put("/", updateCartQtyValidator, validationResultHandler, updateItemQty);
router.delete("/clear", clearCart);
router.delete("/:productId", removeFromCart);

export default router;
