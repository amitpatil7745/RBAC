import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Our Application
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Discover powerful features and seamless user experience
        </p>

        <div className="flex justify-center space-x-4">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Secure Authentication
            </h2>
            <p className="text-gray-600">
              Role-based access control with robust authentication mechanisms
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
            <p className="text-gray-600">
              Personalized dashboard with user-specific insights and actions
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Responsive Design</h2>
            <p className="text-gray-600">
              Mobile-friendly interface with modern and clean UI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
