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

import protect, {
  optionalAuthMiddleware,
} from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ==========================
// Public book browsing; all write/admin routes remain protected.
// ==========================

// Get all books
router.get("/", optionalAuthMiddleware, getBooks);

router.get(
  "/admin",
  protect,
  adminOnly,
  getAdminBooks
);

router.get("/all", protect, adminOnly, getAllBooks);

router.get("/search", optionalAuthMiddleware, searchBooks);

router.get("/categories", optionalAuthMiddleware, getCategories);

// Get single book
router.get("/:id", optionalAuthMiddleware, getBookById);

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