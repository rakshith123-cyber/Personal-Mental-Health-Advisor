import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={Chat}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={Profile}
            />
          }
        />
        <Route
          path="/resources"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={Resources}
            />
          }
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/chat" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
