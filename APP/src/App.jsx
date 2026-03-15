import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import PublicRoute from './pages/PublicRoute.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const URL = import.meta.env.VITE_API_URL;

  const validateToken = async () => {

    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      return;
    }

    try {
      await axios.get(`${URL}/api/usuario/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setIsAuth(true);

    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("loggedUsername");
      localStorage.removeItem("userNivel");
      localStorage.removeItem("userCreateDate");

window.location.reload();
    }
  }

  useEffect(() => {
    validateToken()
  }, [])

  useEffect(() => {

    const handleStorageChange = (event) => {
      if (event.key === "token") {
        console.log("Token alterado!");

        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };

  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            isAuth
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route
          path="/login"
          element={
            <PublicRoute isAuth={isAuth}>
              <Login setIsAuth={setIsAuth} />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;