import express from "express";
import {
  addBook,
  getBooks,
  getAllBooks,
  getAdminBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  getCategories,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ==========================
// Public / Logged-in Users
// ==========================

// Get all books
router.get("/", protect, getBooks);

router.get(
  "/admin",
  protect,
  adminOnly,
  getAdminBooks
);

router.get("/all", protect, adminOnly, getAllBooks);

router.get("/search", protect, searchBooks);

router.get("/categories", protect, getCategories);

// Get single book
router.get("/:id", protect, getBookById);

// ==========================
// Admin Only
// ==========================

// Add book
router.post("/", protect, adminOnly, upload.single("coverImage"), addBook);

// Update book
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("coverImage"),
  updateBook
);

// Delete book
router.delete("/:id", protect, adminOnly, deleteBook);

export default router;