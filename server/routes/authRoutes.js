import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Forgot Password
router.post(
  "/forgot-password",
  forgotPassword
);

// Reset Password
router.post(
  "/reset-password/:token",
  resetPassword
);


router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome! You have accessed a protected route.",
    user: req.user,
  });
});
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin!",
    });
  }
);

// Change Password
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;