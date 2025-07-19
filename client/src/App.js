import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import { useUser } from "./context/UserContext.jsx";
import { useLoading } from "./context/LoadingContext.jsx";

function App() {
  const { authenticated, setAuthenticated } = useAuth();
  const { setEmail, setName } = useUser();
  const { setLoading } = useLoading();
  const appLoad = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/me`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setAuthenticated(true);
        const data = await res.json();
        setEmail(data.email);
        setName(data.name);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    appLoad();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={authenticated ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={authenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
  // return <Home />;
}

export default App;
