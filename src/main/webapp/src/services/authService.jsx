import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
//import { isAuthenticated, logout } from "../services/authService"; // Import authService functions



const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  //add axios register page authservice

  useEffect(() => { 
    if (isAuthenticated()) {
      logout();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Unauthorized Access
          </h1>

          <p className="text-gray-600 mb-6">
            You do not have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Go to Login
            </Link>

            <Link
              to="/"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
