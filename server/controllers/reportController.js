import User from "../models/User.js";
import Book from "../models/Book.js";
import Issue from "../models/Issue.js";
import XLSX from "xlsx";

// ===============================
// Export Users
// ===============================
export const exportUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "name email role createdAt"
    );

    const data = users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Role: user.role,
      Joined: user.createdAt.toLocaleDateString(),
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Users"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Users.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Export Books
// ===============================
export const exportBooks = async (req, res) => {
  try {
    const books = await Book.find();

    const data = books.map((book) => ({
      Title: book.title,
      Author: book.author,
      Category: book.category,
      Publisher: book.publisher,
      PublishedYear: book.publishedYear,
      ISBN: book.isbn,
      TotalCopies: book.totalCopies,
      AvailableCopies: book.availableCopies,
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Books"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Books.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Export Issued Books
// ===============================
export const exportIssuedBooks = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("user", "name email")
      .populate("book", "title");

    const data = issues.map((issue) => ({
      Student: issue.user?.name,
      Email: issue.user?.email,
      Book:
        issue.book?.title ||
        issue.bookSnapshot?.title,
      IssueDate:
        issue.createdAt.toLocaleDateString(),
      DueDate:
        issue.dueDate.toLocaleDateString(),
      ReturnDate: issue.returnDate
        ? issue.returnDate.toLocaleDateString()
        : "-",
      Status: issue.status,
      Fine: issue.fine,
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Issued Books"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=IssuedBooks.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Export Fines
// ===============================
export const exportFines = async (req, res) => {
  try {
    const issues = await Issue.find({
      fine: { $gt: 0 },
    })
      .populate("user", "name email")
      .populate("book", "title");

    const data = issues.map((issue) => ({
      Student: issue.user?.name || "-",
      Email: issue.user?.email || "-",
      Book:
        issue.book?.title ||
        issue.bookSnapshot?.title ||
        "Deleted Book",
      "Due Date": new Date(
        issue.dueDate
      ).toLocaleDateString(),
      "Return Date": issue.returnDate
        ? new Date(issue.returnDate).toLocaleDateString()
        : "-",
      Fine: issue.fine,
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Fines"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Fines.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};