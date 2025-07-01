import express from "express";
import frontendRouter from "./frontend.js";
import adminFrontendRouter from "./admin-frontend.js";
import userRouter from "./user.js";
import reviewRouter from "./review.js";
import orderRouter from "./order.js";
import couponRouter from "./coupon.js";
import cartRouter from "./cart.js";

const router = express.Router();

router.use("/", frontendRouter);
router.use("/admin", adminFrontendRouter);
router.use("/api/user", userRouter);
router.use("/api/review", reviewRouter);
router.use("/api/order", orderRouter);
router.use("/api/coupon", couponRouter);
router.use("/api/cart", cartRouter);

export default router;
