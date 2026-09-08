import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  exportUsers,
  exportBooks,
  exportIssuedBooks,
  exportFines,
} from "../controllers/reportController.js";

const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  exportUsers
);

router.get(
  "/books",
  authMiddleware,
  adminMiddleware,
  exportBooks
);

router.get(
  "/issues",
  authMiddleware,
  adminMiddleware,
  exportIssuedBooks
);

router.get(
  "/fines",
  authMiddleware,
  adminMiddleware,
  exportFines
);

export default router;