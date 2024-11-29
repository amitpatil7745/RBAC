import React from "react";
import { Navigate } from "react-router-dom";
//import { isAuthenticated } from "../services/authService";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Check authentication and role-based access
  if (!token) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required, check them
  if (requiredRoles && requiredRoles.length > 0) {
    if (!requiredRoles.includes(user.role)) {
      // User doesn't have required role
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check token validity (optional, depends on your backend)
  if (!isAuthenticated(token)) {
    // Token is invalid or expired
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;
