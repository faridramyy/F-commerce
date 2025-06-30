import express from "express";

const router = express.Router();

router.use("/", (req, res) => {
  return res.render("index");
});

export default router;
