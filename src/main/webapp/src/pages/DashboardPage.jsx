import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
