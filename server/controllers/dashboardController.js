import User from "../models/User.js";
import Book from "../models/Book.js";
import Issue from "../models/Issue.js";

// =====================================
// Dashboard Statistics
// =====================================
export const getDashboardStats = async (req, res) => {
  try {
    // ===========================
    // ADMIN DASHBOARD
    // ===========================
    if (req.user.role === "admin") {
      const totalUsers = await User.countDocuments({
        role: "student",
      });

      const totalBooks = await Book.countDocuments();

      const issuedBooks = await Issue.countDocuments({
        status: "issued",
      });

      const returnedBooks = await Issue.countDocuments({
        status: "returned",
      });

      const books = await Book.find();

      const availableBooks = books.reduce(
        (total, book) => total + book.availableCopies,
        0
      );

      return res.status(200).json({
        role: "admin",

        totalUsers,
        totalBooks,
        availableBooks,
        issuedBooks,
        returnedBooks,
      });
    }

    // ===========================
    // STUDENT DASHBOARD
    // ===========================

    const myIssuedBooks = await Issue.countDocuments({
      user: req.user.id,
      status: "issued",
    });

    const myReturnedBooks = await Issue.countDocuments({
      user: req.user.id,
      status: "returned",
    });

    const books = await Book.find();

    const availableBooks = books.reduce(
      (total, book) => total + book.availableCopies,
      0
    );

    const fines = await Issue.find({
      user: req.user.id,
    });

    const totalFine = fines.reduce(
      (total, issue) => total + issue.fine,
      0
    );

    return res.status(200).json({
      role: "student",

      availableBooks,

      myIssuedBooks,

      myReturnedBooks,

      totalFine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};