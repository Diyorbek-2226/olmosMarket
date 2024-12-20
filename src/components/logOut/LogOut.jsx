import React from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Haqiqatan ham chiqishni xohlaysizmi?");
    if (confirmLogout) {
      // Clear all items in localStorage
      localStorage.clear();

      // Redirect to the login page
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <div className="p-8 rounded-lg shadow-lg bg-gray-700 w-[90%] max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Chiqishni xohlaysizmi?</h1>
        <p className="text-gray-300 mb-6">Akkauntingizdan chiqib ketishingiz tasdiqlanishi kerak.</p>
        <div className="flex justify-between">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded-lg font-medium"
          >
            Ha, chiqish
          </button>
          <button
            onClick={() => navigate(-1)} // Navigate back if the user cancels
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-medium"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
