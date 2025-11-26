

// import React, { useState, useEffect } from "react";
// // import Navbar from "../../components/Navbar";
// // import AdminSidebar from "../../components/Sidebar/AdminSidebar";

// export default function AdminDashboard() {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const [showInquiryModal, setShowInquiryModal] = useState(false);

//   // Show modal automatically after login
//   useEffect(() => {
//     setTimeout(() => setShowInquiryModal(true), 800);
//   }, []);

//   // Form State
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     modeOfJourney: "bus",
//     bookingDate: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Inquiry Submitted:", formData);
//     alert("Inquiry Saved Successfully!");
//     setShowInquiryModal(false);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* {isSidebarOpen && <AdminSidebar onClose={() => setSidebarOpen(false)} />} */}

//       <div className="flex-1 flex flex-col">
//         {/* <Navbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} /> */}

//         <main className="flex-1 p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Admin Dashboard
//           </h2>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <p className="text-gray-600">Welcome to the Admin Portal 👋</p>
//           </div>
//         </main>
//       </div>

//       {/* Inquiry Modal */}
//       {showInquiryModal && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative">
//             <button
//               onClick={() => setShowInquiryModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//             >
//               ✖
//             </button>

//             <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//               Inquiry Form
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Mode of Journey
//                 </label>
//                 <select
//                   name="modeOfJourney"
//                   value={formData.modeOfJourney}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="bus">Bus</option>
//                   <option value="train">Train</option>
//                   <option value="aeroplane">Aeroplane</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Booking Date
//                 </label>
//                 <input
//                   type="date"
//                   name="bookingDate"
//                   value={formData.bookingDate}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Submit Inquiry
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Users, CreditCard, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // const [showInquiryModal, setShowInquiryModal] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setShowInquiryModal(true), 800);
    return () => clearTimeout(timer);
  }, []);

 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    modeOfJourney: "bus",
    bookingDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
    alert("Inquiry Saved Successfully!");
    setShowInquiryModal(false);
  };

  // Dashboard Stats
  const stats = [
    {
      title: "Total Agents",
      value: "24",
      change: "+3 this month",
      icon: <Users className="text-white w-5 h-5" />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+18% from last month",
      icon: <CreditCard className="text-white w-5 h-5" />,
      bg: "bg-green-500",
    },
    {
      title: "Revenue",
      value: "₹12,45,000",
      change: "+25% from last month",
      icon: <DollarSign className="text-white w-5 h-5" />,
      bg: "bg-purple-500",
    },
    {
      title: "Active Bookings",
      value: "87",
      change: "15 pending payment",
      icon: <TrendingUp className="text-white w-5 h-5" />,
      bg: "bg-orange-500",
    },
  ];

  
  const bookings = [
    {
      id: "BK001",
      agent: "Rajesh Kumar",
      client: "Amit Sharma",
      type: "Flight",
      route: "Delhi - Mumbai",
      amount: "₹8,500",
      status: "confirmed",
    },
    {
      id: "BK002",
      agent: "Priya Singh",
      client: "Neha Patel",
      type: "Train",
      route: "Mumbai - Bangalore",
      amount: "₹2,100",
      status: "pending",
    },
    {
      id: "BK003",
      agent: "Vikram Joshi",
      client: "Rohan Gupta",
      type: "Bus",
      route: "Pune - Goa",
      amount: "₹1,200",
      status: "confirmed",
    },
    {
      id: "BK004",
      agent: "Anjali Verma",
      client: "Suresh Kumar",
      type: "Flight",
      route: "Chennai - Kolkata",
      amount: "₹9,800",
      status: "confirmed",
    },
    {
      id: "BK005",
      agent: "Rahul Mehta",
      client: "Kavita Reddy",
      type: "Train",
      route: "Hyderabad - Delhi",
      amount: "₹3,400",
      status: "cancelled",
    },
  ];

  const getStatusBadge = (status) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center justify-center w-fit";
    switch (status) {
      case "confirmed":
        return `${base} bg-green-600 text-white`;
      case "pending":
        return `${base} bg-blue-200 text-gray-700`;
      case "cancelled":
        return `${base} bg-red-500 text-white`;
      default:
        return base;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">
          Monitor your travel booking system performance
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">{item.title}</p>
              <div className={`${item.bg} p-2 rounded-lg`}>{item.icon}</div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                {item.value}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{item.change}</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-10">
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Recent Bookings
        </h3>
        <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 border-b">Booking ID</th>
                <th className="px-4 py-3 border-b">Agent</th>
                <th className="px-4 py-3 border-b">Client</th>
                <th className="px-4 py-3 border-b">Type</th>
                <th className="px-4 py-3 border-b">Route</th>
                <th className="px-4 py-3 border-b">Amount</th>
                <th className="px-4 py-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border-b">{b.id}</td>
                  <td className="px-4 py-3 border-b">{b.agent}</td>
                  <td className="px-4 py-3 border-b">{b.client}</td>
                  <td className="px-4 py-3 border-b">{b.type}</td>
                  <td className="px-4 py-3 border-b">{b.route}</td>
                  <td className="px-4 py-3 border-b font-medium">{b.amount}</td>
                  <td className="px-4 py-3 border-b">
                    <span className={getStatusBadge(b.status)}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Modal */}
      {/* {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Inquiry Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Mode of Journey
                </label>
                <select
                  name="modeOfJourney"
                  value={formData.modeOfJourney}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="aeroplane">Aeroplane</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Booking Date
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}
