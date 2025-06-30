import express from "express";
import frontendRouter from "./frontend.js";

const router = express.Router();

router.use("/", frontendRouter);

export default router;
