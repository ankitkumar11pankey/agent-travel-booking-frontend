// import React, { useState, useEffect } from "react";
// import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";

// const DynamicTable = () => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [sortColumn, setSortColumn] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//       const result = await response.json();
//       setData(result);
//       if (result.length > 0) {
//         setColumns(Object.keys(result[0]));
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSort = (column) => {
//     if (column === sortColumn) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortOrder("asc");
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   const filteredData = data.filter((item) =>
//     Object.values(item).some((value) =>
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const sortedData = [...filteredData].sort((a, b) => {
//     if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
//     if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
//     return 0;
//   });

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

// //   const [searchTerm, setSearchTerm] = useState("");
// const [filter, setFilter] = useState("all");




//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow">
//       <div className="mb-4">
//         <div className="relative flex justify-between items-center">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="w-[50%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Search"
//           />
//           {/* <FaSearch className="absolute left-58 top-3 text-gray-400" /> */}
//            <div >
//     <select
//       value={filter}
//       onChange={(e) => setFilter(e.target.value)}
//       className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       <option value="all">All</option>
//       <option value="bus">Bus</option>
//       <option value="train">Train</option>
//       <option value="flight">Flight</option>
//     </select>
//   </div>

//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               {columns.map((column) => (
//                 <th
//                   key={column}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort(column)}
//                   aria-sort={sortColumn === column ? sortOrder : "none"}
//                 >
//                   <div className="flex items-center">
//                     {column}
//                     {sortColumn === column ? (
//                       sortOrder === "asc" ? (
//                         <FaSortUp className="ml-1" />
//                       ) : (
//                         <FaSortDown className="ml-1" />
//                       )
//                     ) : (
//                       <FaSort className="ml-1" />
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className="hover:bg-gray-50 transition-colors duration-200"
//               >
//                 {columns.map((column) => (
//                   <td
//                     key={column}
//                     className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
//                   >
//                     {row[column]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-between items-center">
//         <div>
//           <p className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">{indexOfFirstRow + 1}</span> to{" "}
//             <span className="font-medium">
//               {Math.min(indexOfLastRow, filteredData.length)}
//             </span>{" "}
//             of <span className="font-medium">{filteredData.length}</span> results
//           </p>
//         </div>
//         <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//           {Array.from(
//             { length: Math.ceil(filteredData.length / rowsPerPage) },
//             (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => paginate(i + 1)}
//                 className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                   currentPage === i + 1
//                     ? "z-10 bg-blue-500 border-blue-500 text-white"
//                     : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//                 }`}
//                 aria-current={currentPage === i + 1 ? "page" : undefined}
//               >
//                 {i + 1}
//               </button>
//             )
//           )}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default DynamicTable;


import React, { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaEye, FaSyncAlt, FaTimes } from "react-icons/fa";
import { getData } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const AgentBookingTable = () => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  // const [navigate,setnavigate]=useState();
  const rowsPerPage = 8;
const navigate = useNavigate(); 
const roll = sessionStorage.getItem("role");
  const agentid= sessionStorage.getItem("agentID");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getData("/api/dashboard/agent-bookings/"+agentid);
      setData(response.bookings || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
const handlechange=(booking)=>{
     let type = booking?.type
    let mode = ""
    if (type === "Railway") {
      mode = "rail"
    } else if (type === "Flight") {
      mode = "flight"
    } else {
      mode = "bus"
    }
    navigate(`/${roll}/editbookingform-${mode}/${booking.id}`)
  }

    const handleUpdate = (booking) => {
    
    console.log("muee", booking);

    let type = booking?.type
    let mode = ""
    if (type === "Railway") {
      mode = "train"
    } else if (type === "Flight") {
      mode = "flight"
    } else {
      mode = "bus"
    }



    navigate(`/${roll}/booking/update-booking/${mode}/${booking.id}`)
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

   
    if (sortColumn === "date" || sortColumn === "createdAt") {
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
      </div>


      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              {[
                { key: "bookingId", label: "Booking ID" },
                { key: "userName", label: "User Name" },
                { key: "mode", label: "Mode" },
                // { key: "amount", label: "Amount" },
                { key: "date", label: "Date" },
                { key: "fromTo", label: "Route" },
                { key: "bookedBy", label: "Booked By" },
                

                { key: "bookingStatus", label: "Status" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">
                    {col.label}
                    {sortColumn === col.key ? (
                      sortOrder === "asc" ? (
                        <FaSortUp className="ml-1" />
                      ) : (
                        <FaSortDown className="ml-1" />
                      )
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Action
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.clientSnapshotName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {row.type}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{row.fare}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.departureDateTime  || row.departureDate}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {row.fromAirport||row.fromStation||row.fromStop} → {row.toAirport||row.toStation||row.toStop}
                  </td>

                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {row.bookedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.bookingStatus}
                  </td>
                     <td className="px-6 py-4 text-sm text-gray-900 flex space-x-3">
                                      <button className="text-blue-500 hover:text-blue-700"
                                       onClick={()=>handlechange(row)}
                                      >

                                        <FaEdit />
                                      </button>
                                      {/* <button className="text-green-500 hover:text-green-700">
                                        <FaEye />
                                      </button> */}
                                      <button
                                        className="text-yellow-500 hover:text-yellow-700"
                                        onClick={() => handleUpdate(row)}
                                      >
                                        <FaSyncAlt />
                                      </button>
                                   
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

    
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <b>{indexOfFirstRow + 1}</b> to{" "}
          <b>{Math.min(indexOfLastRow, sortedData.length)}</b> of{" "}
          <b>{sortedData.length}</b> results
        </p>

        <div className="flex space-x-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-blue-600 border-blue-400 hover:bg-blue-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-blue-600 border-blue-400 hover:bg-blue-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentBookingTable;
