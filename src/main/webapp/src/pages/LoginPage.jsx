import React from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
