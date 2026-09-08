import { useState } from "react";
import api from "../services/api";
import {
  useNavigate,
  Link,
} from "react-router-dom";

const Login = ({ setIsLoggedIn, setUser }) => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {
      console.log("Submitting:", {
      email,
      password,
    });

      const response = await api.post("/auth/login", {
      email,
      password,
    });
    const { token, user, message } = response.data;

    // Save token and user
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    // Update App state
    setIsLoggedIn(true);
    setUser(user);

    alert(message);

    // Redirect based on role
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    alert(
      error.response?.data?.message || "Login Failed"
    );
  }
};
  return(
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center text-primary mb-4">
                📚 Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>

                <div className="text-center mb-3">
               <Link to="/forgot-password">
                   Forgot Password?
               </Link>
              </div>

                <button
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;