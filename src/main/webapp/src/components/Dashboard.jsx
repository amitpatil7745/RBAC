import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { login } from "../services/authService";

// Mock API service since external service is not supported
const getUserData = async (userId) => {
  // Simulate an API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "User",
        recentActivity: [
          {
            description: "Logged in",
            timestamp: new Date().toISOString()
          },
          {
            description: "Updated profile",
            timestamp: new Date(Date.now() - 86400000).toISOString() // 24 hours ago
          }
        ]
      });
    }, 1000); // Simulate network delay
  });
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("User not authenticated");
        }
        
        const data = await getUserData(user.id);
        setUserData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch user data");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    // Ensure a user is in local storage for testing
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify({ id: "test-user-123" }));
    }

    fetchUserData();
  }, []);

  const handleUpdateProfile = () => {
    alert("Profile update functionality not implemented");
  };

  const handleChangePassword = () => {
    alert("Change password functionality not implemented");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {userData?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Information Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {userData?.email || 'Not available'}
            </p>
            <p>
              <strong>Role:</strong> {userData?.role || 'Not specified'}
            </p>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white shadow-md rounded-lg p6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {userData?.recentActivity?.length > 0 ? (
            <ul className="space-y-2">
              {userData.recentActivity.map((activity, index) => (
                <li 
                  key={index} 
                  className="text-sm text-gray-700 border-b pb-2 last:border-b-0"
                >
                  {activity.description} - {new Date(activity.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              onClick={handleUpdateProfile}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Update Profile
            </button>
            <button 
              onClick={handleChangePassword}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;