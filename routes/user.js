import express from "express";
import {
  signup,
  login,
  logout,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import {
  signupValidator,
  loginValidator,
  createUserValidator,
  updateUserValidator,
} from "../validators/user.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

/* ---------- Auth ---------- */
router.post("/signup", signupValidator, validationResultHandler, signup);
router.post("/login", loginValidator, validationResultHandler, login);
router.post("/logout", logout); // client removes token

/* ---------- Admin CRUD ---------- */
router.get("/", protect(["admin"]), getAllUsers);
router.post(
  "/",
  protect(["admin"]),
  createUserValidator,
  validationResultHandler,
  createUser
);
router.get("/:id", protect(["admin"]), getUserById);
router.put(
  "/:id",
  protect(["admin"]),
  updateUserValidator,
  validationResultHandler,
  updateUser
);
router.delete("/:id", protect(["admin"]), deleteUser);

export default router;
