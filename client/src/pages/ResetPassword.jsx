import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword(token, {
        newPassword,
        confirmPassword,
      });

      alert(response.data.message);

      navigate("/login");
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
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              New Password
            </label>

            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;