import express from "express";
import {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
} from "../controllers/coupon.js";
import {
  createCouponValidator,
  updateCouponValidator,
} from "../validators/coupon.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js"; // advanced version with roles

const router = express.Router();

// ✅ Public: Validate coupon by code
router.get("/code/:code", getCouponByCode);

// ✅ Admin only: Manage coupons
router.get("/", protect(["admin"]), getAllCoupons);
router.post(
  "/",
  protect(["admin"]),
  createCouponValidator,
  validationResultHandler,
  createCoupon
);
router.put(
  "/:id",
  protect(["admin"]),
  updateCouponValidator,
  validationResultHandler,
  updateCoupon
);
router.delete("/:id", protect(["admin"]), deleteCoupon);

export default router;
