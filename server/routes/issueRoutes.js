import express from "express";

import {
  issueBook,
  returnBook,
  getMyIssuedBooks,
  getAllIssuedBooks,
} from "../controllers/issueController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ===============================
// Issue a Book
// ===============================
router.post("/", authMiddleware, issueBook);

// ===============================
// Return a Book
// ===============================
router.put("/:issueId/return", authMiddleware, returnBook);

// ===============================
// Get My Issued Books
// ===============================
router.get("/my-books", authMiddleware, getMyIssuedBooks);

// ===============================
// Get All Issued Books (Admin)
// ===============================
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllIssuedBooks
);

export default router;