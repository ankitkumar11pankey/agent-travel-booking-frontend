// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { getData,post } from "../../services/apiService";

// const EditTrainBookingDetails = () => {
//   const { id } = useParams();


//   const [numPassengers, setNumPassengers] = useState(1);
//   const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }]);

//   const handlePassengerChange = (index, field, value) => {
//     const updated = [...passengers];
//     updated[index][field] = value;
//     setPassengers(updated);
//   };

//   const handleNumChange = (e) => {
//     const count = parseInt(e.target.value || 1);
//     setNumPassengers(count);
//     setPassengers(Array.from({ length: count }, (_, i) => passengers[i] || { name: "", age: "", gender: "" }));
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-6">Update Booking Details - {id}</h2>

//       {/* ================= CLIENT INFORMATION ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Client Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Client Name</label>
//             <input type="text" className="w-full border rounded-md p-2" placeholder="Enter client name" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Contact Number</label>
//             <input type="text" className="w-full border rounded-md p-2" placeholder="Enter contact number" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input type="email" className="w-full border rounded-md p-2" placeholder="Enter email address" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Address</label>
//             <input type="text" className="w-full border rounded-md p-2" placeholder="Enter client address" />
//           </div>
//         </div>
//       </section>

//       {/* ================= TRAIN INFORMATION ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Train Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">From Station</label>
//             <input type="text" className="w-full border rounded-md p-2" placeholder="Departure station" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">To Station</label>
//             <input type="text" className="w-full border rounded-md p-2" placeholder="Arrival station" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Journey Date</label>
//             <input type="date" className="w-full border rounded-md p-2" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Train Number</label>
//             <input type="text" className="w-full border rounded-md p-2" placeholder="Enter train number" />
//           </div>
//         </div>
//       </section>

//       {/* ================= PASSENGER DETAILS ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Passenger Details</h3>
//         <div className="mb-4 flex items-center gap-3">
//           <label className="text-sm font-medium">Number of Passengers:</label>
//           <input
//             type="number"
//             value={numPassengers}
//             onChange={handleNumChange}
//             min="1"
//             className="border p-2 w-20 rounded-md"
//           />
//         </div>

//         <div className="space-y-4">
//           {passengers.map((p, i) => (
//             <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-3 rounded-md bg-gray-50">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Passenger {i + 1} Name</label>
//                 <input
//                   type="text"
//                   className="w-full border rounded-md p-2"
//                   value={p.name}
//                   onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Age</label>
//                 <input
//                   type="number"
//                   className="w-full border rounded-md p-2"
//                   value={p.age}
//                   onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Gender</label>
//                 <select
//                   className="w-full border rounded-md p-2"
//                   value={p.gender}
//                   onChange={(e) => handlePassengerChange(i, "gender", e.target.value)}
//                 >
//                   <option value="">Select Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= BOOKING INFORMATION ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Booking Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">PNR Number *</label>
//             <input type="text" className="w-full border rounded-md p-2" value="PNR123456" readOnly />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Ticket Number *</label>
//             <input type="text" className="w-full border rounded-md p-2" placeholder="Enter ticket number" />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium mb-1">Upload Ticket (PDF/Image)</label>
//             <input type="file" className="w-full border rounded-md p-2" />
//           </div>
//         </div>
//       </section>

//       {/* ================= PAYMENT DETAILS ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Payment Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Previous Balance (₹)</label>
//             <input type="number" className="w-full border rounded-md p-2" value="0" readOnly />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Amount (₹)</label>
//             <input type="number" className="w-full border rounded-md p-2" placeholder="0" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Ticket Type</label>
//             <select className="w-full border rounded-md p-2">
//               <option>Select ticket type</option>
//               <option>Bus</option>
//               <option>Train</option>
//               <option>Flight</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Service Charge (₹)</label>
//             <input type="number" className="w-full border rounded-md p-2" placeholder="0" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Total Amount (₹)</label>
//             <input type="number" className="w-full border rounded-md p-2" placeholder="0.00" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Date of Receiving</label>
//             <input type="date" className="w-full border rounded-md p-2" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Payment Mode</label>
//             <select className="w-full border rounded-md p-2">
//               <option>Select payment mode</option>
//               <option>Cash</option>
//               <option>UPI</option>
//               <option>Bank Transfer</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Payment Amount (₹)</label>
//             <input type="number" className="w-full border rounded-md p-2" placeholder="0" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Remaining Balance (₹)</label>
//             <input type="number" className="w-full border rounded-md p-2" placeholder="0.00" readOnly />
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-sm font-medium mb-1">Remarks</label>
//           <textarea className="w-full border rounded-md p-2" rows="3" placeholder="Enter any additional remarks..."></textarea>
//         </div>
//       </section>

//       {/* ================= ACTION BUTTONS ================= */}
//       <div className="flex justify-end gap-3">
//         <button className="px-4 py-2 border rounded-md">Cancel</button>
//         <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-indigo-700">Update Booking</button>
//       </div>
//     </div>
//   );
// };

// export default EditTrainBookingDetails;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getData, postData } from "../../services/apiService";

// const EditTrainBookingDetails = () => {
//   const { id } = useParams(); // bookingId
//   const navigate = useNavigate();
//   const type = "rail"; // static type; you can make it dynamic if needed

//   // Form state
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }]);
//   const [formData, setFormData] = useState({
//     clientName: "",
//     contactNumber: "",
//     email: "",
//     address: "",
//     fromStation: "",
//     toStation: "",
//     journeyDate: "",
//     trainNumber: "",
//     pnrNumber: "",
//     ticketNumber: "",
//     amount: "",
//     serviceCharge: "",
//     totalAmount: "",
//     dateOfReceiving: "",
//     paymentMode: "",
//     paymentAmount: "",
//     remarks: "",
//   });

//   // ====================== GET API CALL ======================
//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const response = await getData(`/api/updateBooking/${type}/${id}`);
//         const data = response?.data || response;

//         if (data) {
//           setFormData({
//             clientName: data.clientName || "",
//             contactNumber: data.contactNumber || "",
//             email: data.email || "",
//             address: data.address || "",
//             fromStation: data.fromStation || "",
//             toStation: data.toStation || "",
//             journeyDate: data.journeyDate || "",
//             trainNumber: data.trainNumber || "",
//             pnrNumber: data.pnrNumber || "",
//             ticketNumber: data.ticketNumber || "",
//             amount: data.amount || "",
//             serviceCharge: data.serviceCharge || "",
//             totalAmount: data.totalAmount || "",
//             dateOfReceiving: data.dateOfReceiving || "",
//             paymentMode: data.paymentMode || "",
//             paymentAmount: data.paymentAmount || "",
//             remarks: data.remarks || "",
//           });

//           if (data.passengers && data.passengers.length > 0) {
//             setPassengers(data.passengers);
//             setNumPassengers(data.passengers.length);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching booking:", error);
//       }
//     };

//     fetchBooking();
//   }, [id, type]);

//   // ====================== HANDLERS ======================
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handlePassengerChange = (index, field, value) => {
//     const updated = [...passengers];
//     updated[index][field] = value;
//     setPassengers(updated);
//   };

//   const handleNumChange = (e) => {
//     const count = parseInt(e.target.value || 1);
//     setNumPassengers(count);
//     setPassengers(
//       Array.from({ length: count }, (_, i) => passengers[i] || { name: "", age: "", gender: "" })
//     );
//   };

//   // ====================== POST API CALL ======================
//   const handleSubmit = async () => {
//     try {
//       const payload = { ...formData, passengers };
//       const response = await postData(`/api/updateBooking/${type}/${id}`, payload);
//       alert("Booking updated successfully!");
//       console.log("Updated booking response:", response);
//       navigate(-1); // Go back to previous page
//     } catch (error) {
//       console.error("Error updating booking:", error);
//       alert("Failed to update booking!");
//     }
//   };

//   // ====================== UI ======================
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-6">Update Booking Details - {id}</h2>

//       {/* ================= CLIENT INFORMATION ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Client Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             placeholder="Enter client name"
//             value={formData.clientName}
//             onChange={(e) => handleChange("clientName", e.target.value)}
//           />
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             placeholder="Enter contact number"
//             value={formData.contactNumber}
//             onChange={(e) => handleChange("contactNumber", e.target.value)}
//           />
//           <input
//             type="email"
//             className="border rounded-md p-2"
//             placeholder="Enter email address"
//             value={formData.email}
//             onChange={(e) => handleChange("email", e.target.value)}
//           />
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             placeholder="Enter client address"
//             value={formData.address}
//             onChange={(e) => handleChange("address", e.target.value)}
//           />
//         </div>
//       </section>

//       {/* ================= TRAIN INFORMATION ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Train Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             placeholder="Departure station"
//             value={formData.fromStation}
//             onChange={(e) => handleChange("fromStation", e.target.value)}
//           />
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             placeholder="Arrival station"
//             value={formData.toStation}
//             onChange={(e) => handleChange("toStation", e.target.value)}
//           />
//           <input
//             type="date"
//             className="border rounded-md p-2"
//             value={formData.journeyDate}
//             onChange={(e) => handleChange("journeyDate", e.target.value)}
//           />
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             placeholder="Enter train number"
//             value={formData.trainNumber}
//             onChange={(e) => handleChange("trainNumber", e.target.value)}
//           />
//         </div>
//       </section>

//       {/* ================= PASSENGER DETAILS ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Passenger Details</h3>
//         <div className="mb-4 flex items-center gap-3">
//           <label className="text-sm font-medium">Number of Passengers:</label>
//           <input
//             type="number"
//             value={numPassengers}
//             onChange={handleNumChange}
//             min="1"
//             className="border p-2 w-20 rounded-md"
//           />
//         </div>

//         <div className="space-y-4">
//           {passengers.map((p, i) => (
//             <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-3 rounded-md bg-gray-50">
//               <input
//                 type="text"
//                 className="border rounded-md p-2"
//                 value={p.name}
//                 onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
//                 placeholder={`Passenger ${i + 1} Name`}
//               />
//               <input
//                 type="number"
//                 className="border rounded-md p-2"
//                 value={p.age}
//                 onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
//                 placeholder="Age"
//               />
//               <select
//                 className="border rounded-md p-2"
//                 value={p.gender}
//                 onChange={(e) => handlePassengerChange(i, "gender", e.target.value)}
//               >
//                 <option value="">Select Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= BOOKING INFORMATION ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Booking Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             value={formData.pnrNumber}
//             onChange={(e) => handleChange("pnrNumber", e.target.value)}
//             placeholder="PNR Number"
//           />
//           <input
//             type="text"
//             className="border rounded-md p-2"
//             value={formData.ticketNumber}
//             onChange={(e) => handleChange("ticketNumber", e.target.value)}
//             placeholder="Ticket Number"
//           />
//         </div>
//       </section>

//       {/* ================= PAYMENT DETAILS ================= */}
//       <section className="mb-8">
//         <h3 className="text-lg font-semibold mb-3 border-b pb-1">Payment Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="number"
//             className="border rounded-md p-2"
//             placeholder="Amount"
//             value={formData.amount}
//             onChange={(e) => handleChange("amount", e.target.value)}
//           />
//           <input
//             type="number"
//             className="border rounded-md p-2"
//             placeholder="Service Charge"
//             value={formData.serviceCharge}
//             onChange={(e) => handleChange("serviceCharge", e.target.value)}
//           />
//           <input
//             type="number"
//             className="border rounded-md p-2"
//             placeholder="Total Amount"
//             value={formData.totalAmount}
//             onChange={(e) => handleChange("totalAmount", e.target.value)}
//           />
//           <input
//             type="date"
//             className="border rounded-md p-2"
//             value={formData.dateOfReceiving}
//             onChange={(e) => handleChange("dateOfReceiving", e.target.value)}
//           />
//           <select
//             className="border rounded-md p-2"
//             value={formData.paymentMode}
//             onChange={(e) => handleChange("paymentMode", e.target.value)}
//           >
//             <option>Select payment mode</option>
//             <option>Cash</option>
//             <option>UPI</option>
//             <option>Bank Transfer</option>
//           </select>
//           <input
//             type="number"
//             className="border rounded-md p-2"
//             placeholder="Payment Amount"
//             value={formData.paymentAmount}
//             onChange={(e) => handleChange("paymentAmount", e.target.value)}
//           />
//         </div>

//         <textarea
//           className="w-full border rounded-md p-2 mt-3"
//           rows="3"
//           placeholder="Remarks"
//           value={formData.remarks}
//           onChange={(e) => handleChange("remarks", e.target.value)}
//         ></textarea>
//       </section>

//       {/* ================= ACTION BUTTONS ================= */}
//       <div className="flex justify-end gap-3">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 border rounded-md"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-indigo-700"
//         >
//           Update Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditTrainBookingDetails;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, postData, postDatawithFile } from "../../services/apiService";
import PaymentForm from "./PaymentForm";

const EditTrainBookingDetails = () => {
  const { id: bookingId } = useParams();

  console.log("Booking ID:", bookingId);
  const navigate = useNavigate();
  const type = "rail";
  const [loading, setLoading] = useState(true);
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }]);
  const [paymentdata, setpaymentdata] = useState({
    pnrNumber: "",
    // ticketNumber: "",
    uploadTicket: "",
    // previousBalance: 0,
    amount: 0,
    ticketType: "",
    serviceCharge: "",
    totalAmount: 0,
    dateOfReceiving: "",
    paymentMode: "",
    paymentAmount: 0,
    // remainingBalance: "",
    ticketStatus: "",
    remarks: "",
  });
  const [formData, setFormData] = useState({
    clientName: "",
    contactNumber: "",
    email: "",

    fromStation: "",
    toStation: "",
    journeyDate: "",
    trainNumber: "",
    ticketNumber: "",
    amount: "",
    ticketType: "",
    Bookingcharge:"",

  });


  console.log(bookingId);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getData(`/api/updateBooking/${type}/${bookingId}`);
        if (res && res) {
          const data = res.booking;
          console.log(data);

          setFormData({
            clientName: data.client.name || "",
            contactNumber: data.client.phone || "",
            email: data.client.email || "",

            fromStation: data.fromStation || "",
            toStation: data.toStation || "",
            journeyDate: data.departureDate || "",
            trainNumber: data.trainNumber || "",
            status: data.status || "",

          });

          if (data.railPassengers && data.railPassengers.length > 0) {
            setPassengers(data.railPassengers);
            setNumPassengers(data.railPassengers.length);
          }
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch booking data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [type, bookingId]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlepaymentdata = (field, value) => {

    console.log(field.target.name, "vae", field.target.value);
    if(field.target.name=="uploadTicket"){
      setpaymentdata({ ...paymentdata, [field.target.name]: field.target.files[0] });
      return
    }
    if (field.target.name == "amount") {
      console.log("check oue");

      setpaymentdata((prev) => ({
        ...prev,
        totalAmount: Number(field.target.value) + Number(paymentdata.serviceCharge),
        amount: field.target.value,

      }));
      return
    }

    if (field.target.name == "serviceCharge") {
      console.log("check oue");

      setpaymentdata((prev) => ({
        ...prev,
        totalAmount: Number(field.target.value) + Number(paymentdata.amount),
        serviceCharge: field.target.value,

      }));
      return
    }

    if (field.target.name == "paymentAmount") {


      setpaymentdata((prev) => ({
        ...prev,
        remainingBalance: Number(paymentdata.totalAmount) - Number(field.target.value),

        paymentAmount: field.target.value,

      }));
      return
    }


    setpaymentdata({ ...paymentdata, [field.target.name]: field.target.value });
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleNumChange = (e) => {
    const count = parseInt(e.target.value || 1);
    setNumPassengers(count);
    setPassengers(
      Array.from({ length: count }, (_, i) => passengers[i] || { name: "", age: "", gender: "" })
    );
  };

  const handleSubmit = async () => {
    try {
      // const payload = {
      //   ...formData,
      //   passengers,
      //   paymentdata,
      // };
      // console.log("form data", formData);

      // console.log("passenger", passengers);

      // console.log("paymentdatadata", paymentdata);

      // const booking = {

      //   bookingId: bookingId,
      //   bookingType: "rail",
      //   pnrNumber: paymentdata.pnrNumber,
      //   ticketNumber: paymentdata.ticketNumber,
      //   previousBalance: 500.00,
      //   amount: 4500.00,
      //   ticketType: paymentdata.ticketType,
      //   serviceCharge: 150.00,

      //   dateOfReceiving: "2025-11-09",
      //   paymentMode: "UPI",
      //   paymentAmount: 4650.00,
      //   remainingBalance: 0.00,
      //   remarks: "Full payment received successfully",
      //   updatedBy: 2,
      //   ...paymentdata
      // };

      const datasentToform = new FormData();
      Object.keys(formData).forEach((key) => {
        datasentToform.append(key, formData[key]);
      })
      Object.keys(paymentdata).forEach((key) => {
        datasentToform.append(key, paymentdata[key]);
      })


      const res = await postDatawithFile(`/api/updateBooking/${type}/${bookingId}`, datasentToform);

      alert("Booking updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Failed to update booking.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold text-gray-600">
        Loading booking details...
      </div>
    );
  }

  


  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Update Booking Details - {bookingId}
      </h2>


      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 border-b pb-1">Client Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Client Name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter client name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter email address"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter client address"
            />
          </div> */}
        </div>
      </section>


      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 border-b pb-1">Train Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">From Station</label>
            <input
              type="text"
              value={formData.fromStation}
              onChange={(e) => handleChange("fromStation", e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Departure station"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To Station</label>
            <input
              type="text"
              value={formData.toStation}
              onChange={(e) => handleChange("toStation", e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Arrival station"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Journey Date</label>
            <input
              type="date"
              value={formData.journeyDate}
              onChange={(e) => handleChange("journeyDate", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Train Number</label>
            <input
              type="text"
              value={formData.trainNumber}
              onChange={(e) => handleChange("trainNumber", e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter train number"
            />
          </div>
        </div>
      </section>


      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 border-b pb-1">Passenger Details</h3>
        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-medium">Number of Passengers:</label>
          <input
            type="number"
            value={numPassengers}
            onChange={handleNumChange}
            min="1"
            className="border p-2 w-20 rounded-md"
          />
        </div>

        <div className="space-y-4">
          {passengers.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-3 rounded-md bg-gray-50"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Passenger {i + 1} Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={p.name}
                  onChange={(e) =>
                    handlePassengerChange(i, "name", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={p.age}
                  onChange={(e) =>
                    handlePassengerChange(i, "age", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  value={p.gender || ""}
                  onChange={(e) => handlePassengerChange(i, "gender", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>



      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 border-b pb-1">Booking Information</h3>         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">PNR Number *</label>
            <input type="text" onChange={handlepaymentdata} value={paymentdata.pnrNumber} name="pnrNumber" className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ticket Number (Optional)</label>
            <input type="text" onChange={handlepaymentdata} value={paymentdata.ticketNumber} name="ticketNumber" className="w-full border rounded-md p-2" placeholder="Enter ticket number" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Upload Ticket (PDF/Image)</label>
            <input type="file" onChange={handlepaymentdata} name="uploadTicket" className="w-full border rounded-md p-2" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={paymentdata.ticketStatus}
              onChange={({ target }) => setpaymentdata((prev) => ({ ...prev, ticketStatus: target.value }))}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Waiting">Waiting</option>
            </select>
          </div>


        </div>
      </section>




      <PaymentForm formData={paymentdata} setFromData={setpaymentdata} />
      {/* <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Payment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Previous Balance (₹)</label>
            <input type="number" value={paymentdata.previousBalance} className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" name="previousBalance" onChange={handlepaymentdata} />
          </div>
          <div>
            <label className="text-sm font-medium">Amount (₹) *</label>
            <input type="number" value={paymentdata.amount} name="amount" onChange={handlepaymentdata} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Ticket Type</label>
            <select onChange={handlepaymentdata} value={paymentdata.serviceCharge} name="serviceCharge" className="w-full border rounded-md px-3 py-2 mt-1">
              <option value="select tickert type">Select ticket type</option>
              <option value="confirm">Confirmed</option>
              <option value="waiting ">Waiting</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Service Charge (₹)</label>
            <input type="number" value={paymentdata.serviceChargent} name="serviceCharge" onChange={handlepaymentdata} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Total Amount (₹){paymentdata?.totalAmount} </label>
            <input type="number" value={paymentdata?.totalAmount} name="totalAmount" readOnly className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" />
          </div>
          <div>
            <label className="text-sm font-medium">Date of Receiving</label>
            <input type="date" value={paymentdata.dateOfReceiving} name="dateOfReceiving" onChange={handlepaymentdata} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Payment Mode</label>
            <select onChange={handlepaymentdata} value={paymentdata.paymentMode} name="paymentMode" className="w-full border rounded-md px-3 py-2 mt-1">
              <option value="">Select payment mode</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer"> Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Payment Amount (₹)</label>
            <input type="number" value={paymentdata.paymentAmount} name="paymentAmount" onChange={handlepaymentdata} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Remaining Balance (₹)</label>
            <input type="number" value={paymentdata.remainingBalance} name="remainingBalance" onChange={handlepaymentdata} className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Remarks</label>
          <textarea
            rows="3"
            placeholder="Enter any additional remarks..."
            className="w-full border rounded-md px-3 py-2 mt-1"
          ></textarea>
        </div>
      </section> */}


      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-indigo-700"
        >
          Update Booking
        </button>
      </div>
    </div>
  );
};

export default EditTrainBookingDetails;
