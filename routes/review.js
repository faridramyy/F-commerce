import express from "express";
import {
  createReview,
  getAllReviews,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.js";
import { createReviewValidator, updateReviewValidator } from "../validators/review.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js"; // assumes you're using a JWT auth middleware

const router = express.Router();

router.get("/", getAllReviews);
router.get("/product/:productId", getProductReviews);

router.post("/", protect, createReviewValidator, validationResultHandler, createReview);
router.put("/:id", protect, updateReviewValidator, validationResultHandler, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;
