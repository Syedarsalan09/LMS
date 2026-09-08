import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isLoggedIn,
  adminOnly = false,
  user,
  children,
}) => {

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;