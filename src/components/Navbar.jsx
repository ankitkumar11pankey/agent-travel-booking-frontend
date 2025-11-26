


import React from "react";
import { Menu, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-3 border-b">
     
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={20} className="text-gray-700" />
        </button>

        
      </div>

      
      <div className="flex items-center space-x-4">
        
        <button
          onClick={handleLogout}
          className="flex items-center border border-gray-300 text-sm font-medium text-gray-700 rounded-lg px-3 py-1.5 hover:bg-gray-100 hover:border-gray-400 hover:text-red-500 transition-all duration-200"
        >
          <LogOut size={18} className="mr-1" /> Logout
        </button>
      </div>
    </nav>
  );
}
