import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-white text-xl font-bold hover:text-indigo-200"
          >
            My App
          </Link>

          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-indigo-200"
              >
                Dashboard
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="text-white hover:text-indigo-200">
                  Admin Panel
                </Link>
              )}
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white mr-4">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-indigo-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
