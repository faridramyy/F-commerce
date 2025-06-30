import express from "express";
import frontendRouter from "./frontend.js";
import adminFrontendRouter from "./admin-frontend.js";

const router = express.Router();

router.use("/", frontendRouter);
router.use("/admin", adminFrontendRouter);

export default router;
