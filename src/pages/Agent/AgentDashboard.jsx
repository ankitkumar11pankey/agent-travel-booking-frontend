

// import React, { useState, useEffect } from "react";
// // import Navbar from "../../components/Navbar";
// // import AgentSidebar from "../../components/Sidebar/AgentSidebar";

// export default function AgentDashboard() {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const [showInquiryModal, setShowInquiryModal] = useState(false);

//   // Auto show Inquiry form after login
//   useEffect(() => {
//     setTimeout(() => setShowInquiryModal(true), 800);
//   }, []);

//   // Form state
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
//     console.log("Agent Inquiry Submitted:", formData);
//     alert("Inquiry submitted successfully!");
//     setShowInquiryModal(false);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* {isSidebarOpen && <AgentSidebar onClose={() => setSidebarOpen(false)} />} */}

//       <div className="flex-1 flex flex-col">
//         {/* <Navbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} /> */}

//         <main className="flex-1 p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Agent Dashboard
//           </h2>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <p className="text-gray-600">Welcome to the Agent Portal ✈️</p>
//           </div>
//         </main>
//       </div>

//       {/* Inquiry Modal */}
//       {showInquiryModal && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative border-t-4 border-blue-500">
//             <button
//               onClick={() => setShowInquiryModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//             >
//               ✖
//             </button>

//             <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
//               Agent Inquiry Form
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
import { DollarSign, Users, ClipboardList, XCircle } from "lucide-react";

export default function AgentDashboard() {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

 
  useEffect(() => {
    setTimeout(() => setShowInquiryModal(true), 800);
  }, []);

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    modeOfJourney: "bus",
    bookingDate: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
    alert("Inquiry submitted successfully!");
    setShowInquiryModal(false);
  };

  const dashboardStats = [
    { title: "Today's Bookings", value: 8, sub: "3 pending payment", icon: <ClipboardList className="text-blue-600" /> },
    { title: "Total Clients", value: 142, sub: "+5 this week", icon: <Users className="text-green-600" /> },
    { title: "This Month Revenue", value: "₹2,45,000", sub: "+12% from last month", icon: <DollarSign className="text-purple-600" /> },
    { title: "Cancellations", value: 3, sub: "2 refunds pending", icon: <XCircle className="text-red-600" /> },
  ];

 
  const bookings = [
    { id: "BK101", client: "Amit Sharma", type: "Flight", route: "Delhi - Mumbai", time: "10:30 AM", amount: "₹8,500", status: "confirmed" },
    { id: "BK102", client: "Neha Patel", type: "Train", route: "Mumbai - Bangalore", time: "11:45 AM", amount: "₹2,100", status: "pending" },
    { id: "BK103", client: "Rohan Gupta", type: "Bus", route: "Pune - Goa", time: "02:15 PM", amount: "₹1,200", status: "confirmed" },
    { id: "BK104", client: "Priya Reddy", type: "Flight", route: "Hyderabad - Delhi", time: "03:30 PM", amount: "₹9,200", status: "pending" },
  ];


  const inquiries = [
    { id: "INQ01", client: "Suresh Kumar", type: "Flight", details: "Looking for Delhi to Dubai flights", date: "2 hours ago", status: "pending" },
    { id: "INQ02", client: "Kavita Singh", type: "Train", details: "AC 1st class tickets to Kolkata", date: "5 hours ago", status: "responded" },
    { id: "INQ03", client: "Vikram Shah", type: "Bus", details: "Group booking for 15 people", date: "1 day ago", status: "pending" },
  ];

  
  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600 text-white";
      case "pending":
        return "bg-yellow-200 text-gray-800";
      case "responded":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back, Agent User</h2>
      <p className="text-gray-500 mb-6">Your daily bookings and client activities</p>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-gray-600">{card.title}</h3>
              <span className="bg-gray-100 p-2 rounded-full">{card.icon}</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{card.value}</p>
            <p className="text-sm text-gray-500">{card.sub}</p>
          </div>
        ))}
      </div>

    
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Bookings</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b">
              <th className="pb-2">Booking ID</th>
              <th>Client</th>
              <th>Type</th>
              <th>Route</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b text-sm text-gray-700 hover:bg-gray-50">
                <td className="py-2">{b.id}</td>
                <td>{b.client}</td>
                <td>{b.type}</td>
                <td>{b.route}</td>
                <td>{b.time}</td>
                <td>{b.amount}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(b.status)}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Inquiries</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b">
              <th className="pb-2">ID</th>
              <th>Client</th>
              <th>Type</th>
              <th>Details</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id} className="border-b text-sm text-gray-700 hover:bg-gray-50">
                <td className="py-2">{inq.id}</td>
                <td>{inq.client}</td>
                <td>{inq.type}</td>
                <td>{inq.details}</td>
                <td>{inq.date}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(inq.status)}`}>
                    {inq.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inquiry Modal */}
      {/* {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative border-t-4 border-blue-500">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">Agent Inquiry Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Mode of Journey</label>
                <select
                  name="modeOfJourney"
                  value={formData.modeOfJourney}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="aeroplane">Aeroplane</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Booking Date</label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
