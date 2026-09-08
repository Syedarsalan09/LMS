import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyBooks from "./pages/MyBooks";
import Admin from "./pages/Admin";
import BookDetails from "./pages/BookDetails";
import IssuedBooks from "./pages/IssuedBooks";
import NotFound from "./pages/NotFound";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import {
  getBooks,
  getAdminBooks,
} from "./services/bookService";
import { getMyBooks } from "./services/issueService";

function App() {
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalBooks, setTotalBooks] = useState(0);

const [books, setBooks] = useState([]);

// ==========================
// Admin Books Pagination
// ==========================

const [adminBooks, setAdminBooks] = useState([]);
const [adminCurrentPage, setAdminCurrentPage] = useState(1);
const [adminTotalPages, setAdminTotalPages] = useState(1);
const [adminTotalBooks, setAdminTotalBooks] = useState(0);
const [myBooks, setMyBooks] = useState([]);

const [myBooksCurrentPage, setMyBooksCurrentPage] =
  useState(1);

const [myBooksTotalPages, setMyBooksTotalPages] =
  useState(1);

const [myBooksTotal, setMyBooksTotal] =
  useState(0);

const [loadingBooks, setLoadingBooks] =
  useState(true);

const [loadingAdminBooks, setLoadingAdminBooks] =
  useState(true);

const [loadingMyBooks, setLoadingMyBooks] =
  useState(true);
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "",
          role: "",
        };
  });

  // ==========================
  // Load Books
  // ==========================

const loadBooks = useCallback(
  async (
    page = 1,
    keyword = "",
    category = "All",
    sort = "newest"
  ) => {
    try {
      setLoadingBooks(true);

      const response = await getBooks(
        page,
        5,
        sort,
        keyword,
        category
      );

      setBooks(response.data.books);

      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalBooks(response.data.totalBooks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBooks(false);
    }
  },
  []
);

// ==========================
// Load All Books For Admin
// ==========================

const loadAdminBooks = useCallback(
  async (
    page = 1,
    keyword = ""
  ) => {
    try {
      setLoadingAdminBooks(true);

      const response = await getAdminBooks(
        page,
        5,
        keyword
      );

      setAdminBooks(response.data.books);

      setAdminCurrentPage(
        response.data.currentPage
      );

      setAdminTotalPages(
        response.data.totalPages
      );

      setAdminTotalBooks(
        response.data.totalBooks
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAdminBooks(false);
    }
  },
  []
);

  // ==========================
  // Load My Books
  // ==========================

  const loadMyBooks = useCallback(
  async (
    page = 1,
    keyword = "",
    category = "All",
    sort = "newest"
  ) => {
    if (user.role === "admin") {
      setMyBooks([]);
      setLoadingMyBooks(false);
      return;
    }

    try {
      setLoadingMyBooks(true);

      const response = await getMyBooks(
        page,
        5,
        keyword,
        category,
        sort
      );

      setMyBooks(response.issues);

      setMyBooksCurrentPage(
        response.currentPage
      );

      setMyBooksTotalPages(
        response.totalPages
      );

      setMyBooksTotal(
        response.total
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMyBooks(false);
    }
  },
  [user.role]
);

  // ==========================
  // Initial Load
  // ==========================

useEffect(() => {
  if (!isLoggedIn) {
    setBooks([]);
    setAdminBooks([]);
    setMyBooks([]);

    setCurrentPage(1);
    setAdminCurrentPage(1);

    return;
  }

  // Student / normal Books pagination
  loadBooks(1);

  // Admin pagination
  if (user.role === "admin") {
    loadAdminBooks(1);
  } else {
    loadMyBooks(1);
  }
}, [
  isLoggedIn,
  user.role,
  loadBooks,
  loadMyBooks,
  loadAdminBooks,
]);

  // ==========================
  // Save Login State
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "isLoggedIn",
      isLoggedIn
    );
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }, [user]);

  return (
    <>
     <Navbar
  isLoggedIn={isLoggedIn}
  setIsLoggedIn={setIsLoggedIn}
  user={user}
  setUser={setUser}
/>

      <main className="flex-grow-1">

        <Routes>

          <Route
            path="/"
            element={
              <Home 
                books={books} 
                loadingBooks={loadingBooks}
             />
            }
          />

          <Route
            path="/books"
            element={
              <Books
  books={books}
  loadingBooks={loadingBooks}
  myBooks={myBooks}
  loadBooks={loadBooks}
  loadMyBooks={loadMyBooks}
  user={user}
  currentPage={currentPage}
  totalPages={totalPages}
  totalBooks={totalBooks}
/>
            }
          />

          <Route
            path="/books/:id"
            element={
              <BookDetails/>
            }
          />

          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            }
          />

          <Route
               path="/forgot-password"
               element={<ForgotPassword />}
            />

            <Route
               path="/reset-password/:token"
               element={<ResetPassword />}
            />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                user={user}
              >
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />

          <Route
  path="/change-password"
  element={
    <ProtectedRoute
      isLoggedIn={isLoggedIn}
      user={user}
    >
      <ChangePassword />
    </ProtectedRoute>
  }
/>

          <Route
  path="/mybooks"
  element={
    <ProtectedRoute
      isLoggedIn={isLoggedIn}
      user={user}
    >
      <MyBooks
        myBooks={myBooks}
        loadBooks={loadBooks}
        loadMyBooks={loadMyBooks}
        loadingMyBooks={loadingMyBooks}
        currentPage={myBooksCurrentPage}
        totalPages={myBooksTotalPages}
        totalBooks={myBooksTotal}
      />
    </ProtectedRoute>
  }
/>


          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                user={user}
                adminOnly
              >
                <Admin
  books={adminBooks}
  loadBooks={loadAdminBooks}
  loadingBooks={loadingAdminBooks}
  currentPage={adminCurrentPage}
  totalPages={adminTotalPages}
  totalBooks={adminTotalBooks}
/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/issued-books"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                user={user}
                adminOnly
              >
                <IssuedBooks />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>

      <Footer />
    </>
  );
}

export default App;