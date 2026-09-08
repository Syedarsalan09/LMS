import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container text-center"
      style={{ marginTop: "100px" }}
    >
      <h1 className="display-1 text-danger">404</h1>

      <h2>Page Not Found</h2>

      <p className="text-muted">
        Sorry! The page you are looking for doesn't exist.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        🏠 Go Home
      </Link>
    </div>
  );
};

export default NotFound;