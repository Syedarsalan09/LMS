import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { getDashboardStats } from "../services/dashboardService";

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState(null);

  const loadDashboard = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadDashboard]);

  if (!stats) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading dashboard...</h4>
      </div>
    );
  }

  const adminCards = [
    {
      title: "👨‍🎓 Total Students",
      value: stats.totalUsers,
      color: "primary",
    },
    {
      title: "📚 Book Titles",
      value: stats.totalBooks,
      color: "success",
    },
    {
      title: "📦 Available Copies",
      value: stats.availableBooks,
      color: "warning",
    },
    {
      title: "📖 Issued Books",
      value: stats.issuedBooks,
      color: "info",
    },
    {
      title: "✅ Returned Books",
      value: stats.returnedBooks,
      color: "secondary",
    },
    {
      title: "👤 Role",
      value: "Admin",
      color: "dark",
    },
  ];

  const studentCards = [
    {
      title: "📖 My Issued Books",
      value: stats.myIssuedBooks,
      color: "primary",
    },
    {
      title: "✅ Returned Books",
      value: stats.myReturnedBooks,
      color: "success",
    },
    {
      title: "📚 Available Copies",
      value: stats.availableBooks,
      color: "warning",
    },
    {
      title: "💰 Total Fine",
      value: `₹${stats.totalFine}`,
      color: "danger",
    },
    {
      title: "👤 Role",
      value: "Student",
      color: "dark",
    },
  ];

  const cards =
    user.role === "admin"
      ? adminCards
      : studentCards;

  return (
    <div className="container mt-5">

      <div className="text-center mb-5">

        <h2 className="fw-bold">
          📊 Library Dashboard
        </h2>

        <p className="text-muted">
          Welcome back,
          <strong> {user.name}</strong>
        </p>

      </div>

      <div className="row">

        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            color={card.color}
          />
        ))}

      </div>

      <div className="card shadow mt-5">

        <div className="card-body">

          <h4 className="mb-4">
            🚀 Quick Actions
          </h4>

          <div className="d-flex flex-wrap gap-3">

            <Link
              to="/books"
              className="btn btn-primary"
            >
              Browse Books
            </Link>

            {user.role === "admin" ? (
              <>
                <Link
                  to="/admin"
                  className="btn btn-dark"
                >
                  Admin Panel
                </Link>

                <Link
                  to="/issued-books"
                  className="btn btn-warning"
                >
                  Issued Books
                </Link>
              </>
            ) : (
              <Link
                to="/mybooks"
                className="btn btn-success"
              >
                My Books
              </Link>
            )}

            <Link
  to="/change-password"
  className="btn btn-outline-secondary"
>
  Change Password
</Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;