


// import React, { useState, useEffect } from "react";
// import {
//   FaSort,
//   FaSortUp,
//   FaSortDown,
//   FaEdit,
//   FaEye,
//   FaSyncAlt,
//   FaTimes,
//   FaPlus,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { getData, postData } from "../../services/apiService";

// const AgentBookingTable = () => {
//   const [data, setData] = useState([]);
//   const [sortColumn, setSortColumn] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showCompanyModal, setShowCompanyModal] = useState(false);

//   // ✅ Company form data
//   const [companyData, setCompanyData] = useState({
//     name: "",
//     gstNumber: "",
//     panNumber: "",
//     // contactPerson: "",
//     phone: "",
//     email: "",
//     addressLine1: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     notes: "",
//   });

//   // ✅ Checkbox state for GST
//   const [hasGst, setHasGst] = useState(false);

//   const rowsPerPage = 8;
//   const navigate = useNavigate();
//   const roll = sessionStorage.getItem("role");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await getData("/api/company/get-companies");
//       setData(response.bookings || []);
//     } catch (error) {
//       console?.error("Error fetching data:", error);
//     }
//   };

//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortOrder("asc");
//     }
//   };

//   const filteredData = data
//     .filter((item) => {
//       if (filter === "all") return true;
//       return item.type?.toLowerCase() === filter.toLowerCase();
//     })
//     .filter((item) =>
//       Object.values(item).some((value) =>
//         value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );

//   const sortedData = [...filteredData].sort((a, b) => {
//     if (!sortColumn) return 0;
//     let valA = a[sortColumn];
//     let valB = b[sortColumn];
//     if (valA == null || valB == null) return 0;
//     if (sortColumn === "date" || sortColumn === "journeyDate") {
//       valA = new Date(valA);
//       valB = new Date(valB);
//     }
//     if (valA < valB) return sortOrder === "asc" ? -1 : 1;
//     if (valA > valB) return sortOrder === "asc" ? 1 : -1;
//     return 0;
//   });

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
//   const totalPages = Math.ceil(sortedData.length / rowsPerPage);
//   const goToPage = (page) => setCurrentPage(page);

//   const handleAddCompany = async () => {
//     try {
//       const payload = { ...companyData };
//       if (!hasGst) delete payload.gstNumber; // remove GST if not applicable

//       const res = await postData("/api/company/create-company", payload);
//       if (res.success) {
//         alert("✅ Company added successfully!");
//         setShowCompanyModal(false);
//         setCompanyData({
//           name: "",
//           gstNumber: "",
//           panNumber: "",
//         //   contactPerson: "",
//           phone: "",
//           email: "",
//           addressLine1: "",
//           city: "",
//           state: "",
//           postalCode: "",
//           notes: "",
//         });
//         setHasGst(false);
//         fetchData();
//       } else {
//         alert("❌ Failed to add company!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error while adding company!");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow">
//       {/* 🔍 Search + Filter + Add Company */}
//       <div className="mb-4 flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search bookings..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <div className="flex items-center space-x-3">
//           <select
//             value={filter}
//             onChange={(e) => {
//               setFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="all">All</option>
//             <option value="Bus">Bus</option>
//             <option value="Railway">Train</option>
//             <option value="Flight">Flight</option>
//           </select>

//           <button
//             onClick={() => setShowCompanyModal(true)}
//             className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
//           >
//             <FaPlus className="mr-2" /> Add Company
//           </button>
//         </div>
//       </div>

//       {/* 🧾 Company Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Company Name
//               </th>
//               {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Contact Person
//               </th> */}
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
//                 City
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.length > 0 ? (
//               currentRows.map((row, index) => (
//                 <tr
//                   key={index}
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
//                   {/* <td className="px-6 py-4 text-sm text-gray-900">
//                     {row.contactPerson}
//                   </td> */}

//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {row.p}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {row.email}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {row.phone}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900 capitalize">
//                     {row.city}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🏢 Add Company Modal */}
//       {showCompanyModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
//               Add Company
//             </h2>

//             <button
//               onClick={() => setShowCompanyModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* ✅ GST Checkbox */}
//             <div className="flex items-center mb-4">
//               <input
//                 type="checkbox"
//                 id="gstCheck"
//                 checked={hasGst}
//                 onChange={(e) => setHasGst(e.target.checked)}
//                 className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded"
//               />
//               <label htmlFor="gstCheck" className="text-sm text-gray-700">
//                 Does this company have a GST number?
//               </label>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
//               {Object.entries(companyData).map(([key, value]) => {
//                 if (key === "gstNumber" && !hasGst) return null; // hide GST if unchecked
//                 return (
//                   <div key={key}>
//                     <label className="block text-sm font-medium text-gray-700 capitalize">
//                       {key.replace(/([A-Z])/g, " $1")}
//                     </label>
//                     <input
//                       type="text"
//                       value={value}
//                       onChange={(e) =>
//                         setCompanyData({ ...companyData, [key]: e.target.value })
//                       }
//                       className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Footer */}
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowCompanyModal(false)}
//                 className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddCompany}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AgentBookingTable;
    
import React, { useState, useEffect } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaEye,
  FaSyncAlt,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../services/apiService";

const AgentBookingTable = () => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: "",
    gstNumber: "",
    panNumber: "",
    phone: "",
    email: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  const [hasGst, setHasGst] = useState(false);
  const rowsPerPage = 8;
  const navigate = useNavigate();
  const roll = sessionStorage.getItem("role");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getData("/api/company/get-companies");
      setData(response.companies || []); // ✅ fixed key for API response
    } catch (error) {
      console?.error("Error fetching data:", error);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredData = data
    .filter((item) => {
      if (filter === "all") return true;
      return item.type?.toLowerCase() === filter.toLowerCase();
    })
    .filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    let valA = a[sortColumn];
    let valB = b[sortColumn];
    if (valA == null || valB == null) return 0;
    if (sortColumn === "date" || sortColumn === "journeyDate") {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  const handleAddCompany = async () => {
    try {
      const payload = { ...companyData };
      if (!hasGst) delete payload.gstNumber;

      const res = await postData("/api/company/create-company", payload);
      if (res.success) {
        alert("✅ Company added successfully!");
        setShowCompanyModal(false);
        setCompanyData({
          name: "",
          gstNumber: "",
          panNumber: "",
          phone: "",
          email: "",
          addressLine1: "",
          city: "",
          state: "",
          postalCode: "",
          notes: "",
        });
        setHasGst(false);
        fetchData();
      } else {
        alert("❌ Failed to add company!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while adding company!");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow">
 
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Bus">Bus</option>
            <option value="Railway">Train</option>
            <option value="Flight">Flight</option>
          </select>

          <button
            onClick={() => setShowCompanyModal(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            <FaPlus className="mr-2" /> Add Company
          </button>
        </div>
      </div>

      {/* 🧾 Company Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                PAN Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Postal Code
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                    {row.city}
                  </td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                    {row.state}
                  </td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                    {row.panNumber}
                  </td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                    {row.postalCode}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🏢 Add Company Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Add Company
            </h2>

            <button
              onClick={() => setShowCompanyModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>

            {/* ✅ GST Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="gstCheck"
                checked={hasGst}
                onChange={(e) => setHasGst(e.target.checked)}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="gstCheck" className="text-sm text-gray-700">
                Does this company have a GST number?
              </label>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
              {Object.entries(companyData).map(([key, value]) => {
                if (key === "gstNumber" && !hasGst) return null;
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, [key]: e.target.value })
                      }
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCompanyModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCompany}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentBookingTable;
