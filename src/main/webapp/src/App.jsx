import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RegisterPage from "./components/Register";


function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
         

          {/* 404 Not Found Route */}
          <Route 
            path="*" 
            element={
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    404 - Page Not Found
                  </h1>
                  <p className="text-gray-600 mb-6">
                    The page you are looking for does not exist.
                  </p>
                  <a 
                    href="/" 
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                  >
                    Return to Home
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;