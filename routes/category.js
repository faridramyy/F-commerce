import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/categoryValidator.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js"; // advanced version with roles

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin-only routes
router.post(
  "/",
  protect(["admin"]),
  createCategoryValidator,
  validationResultHandler,
  createCategory
);

router.put(
  "/:id",
  protect(["admin"]),
  updateCategoryValidator,
  validationResultHandler,
  updateCategory
);

router.delete("/:id", protect(["admin"]), deleteCategory);

export default router;
