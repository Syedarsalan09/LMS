import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);

      alert(response.data.message);

      setEmail("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card shadow mx-auto p-4"
        style={{ maxWidth: "500px" }}
      >

        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Send Reset Link
          </button>

        </form>

        <div className="text-center mt-3">

          <Link to="/login">
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;