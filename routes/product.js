import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  createProductValidator,
  updateProductValidator,
} from "../validators/productValidator.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js"; // advanced version

const router = express.Router();

// ✅ Public
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ✅ Admin-only
router.post(
  "/",
  protect(["admin"]),
  createProductValidator,
  validationResultHandler,
  createProduct
);
router.put(
  "/:id",
  protect(["admin"]),
  updateProductValidator,
  validationResultHandler,
  updateProduct
);
router.delete("/:id", protect(["admin"]), deleteProduct);

export default router;
