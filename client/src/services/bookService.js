import api from "./api";

// Get all books
export const getBooks = (
  page = 1,
  limit = 5,
  sort = "newest",
  keyword = "",
  category = "All"
) =>
  api.get(
    `/books?page=${page}&limit=${limit}&sort=${sort}&keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}`
  );

// Get all books for Admin
export const getAllBooks = () =>
  api.get("/books/all");

// Get paginated books for Admin
export const getAdminBooks = (
  page = 1,
  limit = 5,
  keyword = ""
) =>
  api.get(
    `/books/admin?page=${page}&limit=${limit}&keyword=${encodeURIComponent(keyword)}`
  );

// Get one book
export const getBookById = (id) =>
  api.get(`/books/${id}`);

export const getCategories = () =>
  api.get("/books/categories");

// Create a new book
export const createBook = (bookData) =>
  api.post("/books", bookData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update a book
export const updateBook = (id, bookData) =>
  api.put(`/books/${id}`, bookData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete a book
export const deleteBook = (id) =>
  api.delete(`/books/${id}`);