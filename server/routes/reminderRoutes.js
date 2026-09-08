import express from "express";
import { sendReminderEmails } from "../controllers/reminderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ===============================
// Send Reminder Emails (Admin Only)
// ===============================
router.post(
  "/send",
  authMiddleware,
  adminMiddleware,
  sendReminderEmails
);

export default router;