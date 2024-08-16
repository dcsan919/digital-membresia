import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de importar jwtDecode correctamente

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard/*" // Asegúrate de que las rutas en Dashboard coincidan con esto
            element={<Dashboard onLogout={handleLogout} />} 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
