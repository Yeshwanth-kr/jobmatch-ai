import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLoading } from "../context/LoadingContext.jsx";

const Login = () => {
  const { setAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loading } = useLoading();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        setAuthenticated(true);
        navigate("/home"); // or wherever you want to go next
      }
    } catch (err) {
      setError("Network error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
        >
          {" "}
          <h1 className="text-3xl font-bold mb-4 text-center">Job Match AI</h1>
          <h2 className="text-2xl font-bold">Login</h2>
          <input
            type="text"
            name="Email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    );
  }
};

export default Login;
