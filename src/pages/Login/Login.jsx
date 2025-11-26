

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {postData} from "../../services/apiService";

export default function Login() {
  const [role, setRole] = useState("agent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    
       const res=await postData("/api/auth/login", { email, password, role }); 
       console.log(res);
       
    if(res?.role === "admin"){
      sessionStorage.setItem("adminsession", res.token);
      sessionStorage.setItem("role", "admin");
      navigate("/admin");
    } else if (res?.role === "agent") {
         sessionStorage.setItem("adminsession", res.token);
         sessionStorage.setItem("agentID", res.user.id);
         sessionStorage.setItem("role", "agent");
      navigate("/agent");
    } else {
      setError("Invalid email or password");
    }
       
    } catch (err) {
      setError("An error occurred. Please try again.");
      return;
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[400px] bg-white shadow-lg rounded-2xl p-8">
        
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-blue-600">✈️</span>
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800">
          Travel Booking System
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to manage bookings and agents
        </p>

    
        <div className="flex bg-gray-100 rounded-full mb-6">
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === "admin"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Admin
          </button>

          <button
            onClick={() => setRole("agent")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === "agent"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Agent
          </button>
        </div>

       
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`${role}@travel.com`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

         
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
           
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login as {role === "admin" ? "Admin" : "Agent"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-4">
          Demo: admin@travel.com / agent@travel.com | Pass: 123456
        </p>
      </div>
    </div>
  );
}

