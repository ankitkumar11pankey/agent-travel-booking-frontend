// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getData,postData } from "../../services/apiService";

// const EditFlightBookingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [numPassengers, setNumPassengers] = useState(1);

//   const passengers = Array.from({ length: numPassengers }, (_, i) => i + 1);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-xl font-semibold mb-2">Update Flight Booking Details - {id}</h2>
//       <p className="text-sm text-gray-600 mb-6">Edit flight booking, passenger, and payment details.</p>

//       {/* Booking Details */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Booking Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Client Name *</label>
//             <input type="text" placeholder="Enter client name" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input type="email" placeholder="client@email.com" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Phone *</label>
//             <input type="tel" placeholder="+91 98765 43210" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//         </div>
//       </section>

//       {/* Flight Information */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Flight Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">From *</label>
//             <input type="text" placeholder="Departure city" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">To *</label>
//             <input type="text" placeholder="Arrival city" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Departure Date *</label>
//             <input type="date" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Return Date (Optional)</label>
//             <input type="date" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Airline</label>
//             <select className="w-full border rounded-md px-3 py-2 mt-1">
//               <option>Select airline</option>
//               <option>IndiGo</option>
//               <option>Air India</option>
//               <option>Vistara</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm font-medium">Class</label>
//             <select className="w-full border rounded-md px-3 py-2 mt-1">
//               <option>Select class</option>
//               <option>Economy</option>
//               <option>Business</option>
//               <option>First Class</option>
//             </select>
//           </div>
//         </div>
//       </section>

//       {/* Passenger Details */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Passenger Details</h3>

//         <div className="mb-4">
//           <label className="text-sm font-medium mr-2">Number of Passengers:</label>
//           <input
//             type="number"
//             min="1"
//             max="10"
//             value={numPassengers}
//             onChange={(e) => setNumPassengers(parseInt(e.target.value) || 1)}
//             className="w-20 border rounded-md px-2 py-1"
//           />
//         </div>

//         {passengers.map((p) => (
//           <div key={p} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b pb-4">
//             <div>
//               <label className="text-sm font-medium">Passenger {p} Name</label>
//               <input type="text" placeholder="Enter name" className="w-full border rounded-md px-3 py-2 mt-1" />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Age</label>
//               <input type="number" placeholder="Age" className="w-full border rounded-md px-3 py-2 mt-1" />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Gender</label>
//               <select className="w-full border rounded-md px-3 py-2 mt-1">
//                 <option>Select Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Booking Information */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Booking Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">PNR Number *</label>
//             <input type="text"  placeholder="Enter PNR number"  className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Ticket Number *</label>
//             <input type="text" placeholder="Enter ticket number" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div className="md:col-span-2">
//             <label className="text-sm font-medium">Upload Ticket (PDF/Image)</label>
//             <input type="file" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//         </div>
//       </section>

//       {/* Payment Details */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Payment Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Previous Balance (₹)</label>
//             <input type="number" value="0" className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" readOnly />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Amount (₹) *</label>
//             <input type="number" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Ticket Type</label>
//             <select className="w-full border rounded-md px-3 py-2 mt-1">
//               <option>Select ticket type</option>
//               <option>Confirmed</option>
//               <option>Waiting</option>
//               <option>Cancelled</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm font-medium">Service Charge (₹)</label>
//             <input type="number" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Total Amount (₹)</label>
//             <input type="number" value="0.00" className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" readOnly />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Date of Receiving</label>
//             <input type="date" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Payment Mode</label>
//             <select className="w-full border rounded-md px-3 py-2 mt-1">
//               <option>Select payment mode</option>
//               <option>Cash</option>
//               <option>UPI</option>
//               <option>Credit Card</option>
//               <option>Bank Transfer</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm font-medium">Payment Amount (₹)</label>
//             <input type="number" className="w-full border rounded-md px-3 py-2 mt-1" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Remaining Balance (₹)</label>
//             <input type="number" value="0.00" className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" readOnly />
//           </div>
//         </div>
//         <div className="mt-4">
//           <label className="text-sm font-medium">Remarks</label>
//           <textarea
//             rows="3"
//             placeholder="Enter any additional remarks..."
//             className="w-full border rounded-md px-3 py-2 mt-1"
//           ></textarea>
//         </div>
//       </section>

//       {/* Buttons */}
//       <div className="flex justify-end gap-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 border rounded-md hover:bg-gray-100"
//         >
//           Cancel
//         </button>
//         <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-800">
//           Update Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditFlightBookingDetails;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, postData, postDatawithFile } from "../../services/apiService";
import PaymentForm from "./PaymentForm";
const EditFlightBookingDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const type = "flight"; 
  const [loading, setLoading] = useState(true);
  const [numPassengers, setNumPassengers] = useState(1);
  const [file, setFile] = useState(null);
const [paymentdata, setpaymentdata] = useState({
    // pnrNumber: "",
    // ticketNumber: "",
    uploadTicket: "",
    previousBalance: "",
    amount: 0,
    // ticketType: "",
    serviceCharge: "",
    totalAmount: 0,
    dateOfReceiving: "",
    // paymentMode: "",
    // paymentAmount: 0,
    // remainingBalance: "",
    // // ticketStatus :"",
    // remarks: "",
  });

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    airline: "",
    travelClass: "",
    
    passengers: [{ name: "", age: "", gender: "" }],
    pnrNumber: "",
     ticketStatus :"",
    ticketNumber: "",
    previousBalance: 0,
    amount: 0,
    ticketType: "",
    serviceCharge: 0,
    totalAmount: 0,
    dateOfReceiving: "",
    paymentMode: "",
    paymentAmount: 0,
    remainingBalance: 0,
    Bookingcharge:"",
    remarks: "",
  });


  useEffect(() => {

    
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await getData(`/api/updateBooking/${type}/${id}`);
    
        if (res && res) {
          console.log("reee",res);
          
          const booking = res?.booking;
          console.log(booking);
          
          setFormData({
            clientName: booking?.client?.name || "",
            email: booking.client?.email || "",
            phone: booking.client.phone || "",
            from: booking.fromAirport || "",
            to: booking.toAirport || "",
            departureDate: booking.departureDateTime || "",
            returnDate: booking.returnDate || "",
            airline: booking.flightNumber || "",
            travelClass: booking.travelClass || "",

            passengers: booking.flightPassengers?.length
              ? booking.flightPassengers
              : [{ name: "", age: "", gender: "" }],
              
          });
          setNumPassengers(
            booking.passengers?.length ? booking.passengers.length : 1
          );
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        alert("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...formData.passengers];
    updatedPassengers[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      passengers: updatedPassengers,
    }));
  };

  const handlePassengerCountChange = (count) => {
    const num = Math.max(1, Math.min(count, 10)); // limit 1–10
    setNumPassengers(num);
    const updated = [...formData.passengers];
    if (num > updated.length) {
      for (let i = updated.length; i < num; i++) {
        updated.push({ name: "", age: "", gender: "" });
      }
    } else {
      updated.length = num;
    }
    setFormData((prev) => ({ ...prev, passengers: updated }));
  };

  
  const handleFileChange = (e) => {
    setpaymentdata((prev=>({...prev,uploadTicket:e.target.files[0]})))
  };

  
  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();
      console.log("total data", formData, paymentdata);
      
      Object.keys(formData).forEach((key) => {
        if (key === "passengers") {
          dataToSend.append("passengers", JSON.stringify(formData.passengers));
        } else {
          dataToSend.append(key, formData[key]);
        }
      });
      console.log(paymentdata);
      
      Object.keys(paymentdata).forEach((key) => {
        console.log(paymentdata.ticketStatus);
        
        dataToSend.append(key, paymentdata[key]);
      });
      const res = await postDatawithFile(`/api/updateBooking/${type}/${id}`, dataToSend);

      if (res.success) {
        alert("Booking updated successfully!");
        navigate(-1);
      } else {
        alert(res.message || "Failed to update booking.");
      }
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Something went wrong while updating.");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading booking details...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-2">
        Update Flight Booking Details - {id}
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Edit flight booking, passenger, and payment details.
      </p>

    
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Booking Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Client Name *</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Flight Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">From *</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Departure city"
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">To *</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Arrival city"
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Departure Date *</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          {/* <div>
            <label className="text-sm font-medium">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div> */}
        </div>
      </section>

    
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Passenger Details
        </h3>
        <div className="mb-4">
          <label className="text-sm font-medium mr-2">
            Number of Passengers:
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.passengers?.length}
            onChange={(e) =>
              handlePassengerCountChange(parseInt(e.target.value) || 1)
            }
            className="w-20 border rounded-md px-2 py-1"
          />
        </div>
        {formData.passengers.map((p, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b pb-4"
          >
            <div>
              <label className="text-sm font-medium">Passenger {i + 1} Name</label>
              <input
                type="text"
                value={p.name}
                onChange={(e) =>
                  handlePassengerChange(i, "name", e.target.value)
                }
                placeholder="Enter name"
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                value={p.age}
                onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
                placeholder="Age"
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gender  </label>
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
      </section>

  
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Booking Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">PNR Number *</label>
            <input
              type="text"
              name="pnrNumber"
              value={formData.pnrNumber}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Ticket Number (Optional)</label>
            <input
              type="text"
              name="ticketNumber"
              value={formData.ticketNumber}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Upload Ticket 
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>

                        <div className="col-span-2">
  <label className="block text-sm font-medium mb-1">Status</label>
  <select
    name="status"
    value={formData.ticketStatus}
    onChange={({target})=>setFormData((prev)=>({...prev,ticketStatus:target.value}))}
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
            <input type="number" value="0" className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" readOnly />
          </div>
          <div>
            <label className="text-sm font-medium">Amount (₹) *</label>
            <input type="number" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Ticket Type</label>
            <select className="w-full border rounded-md px-3 py-2 mt-1">
              <option>Select ticket type</option>
              <option>Confirmed</option>
              <option>Waiting</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Service Charge (₹)</label>
            <input type="number" className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Total Amount (₹)</label>
            <input type="number" value="0.00" className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" readOnly />
           </div>
           <div>
             <label className="text-sm font-medium">Date of Receiving</label>
             <input type="date" className="w-full border rounded-md px-3 py-2 mt-1" />
           </div>
           <div>
             <label className="text-sm font-medium">Payment Mode</label>
             <select className="w-full border rounded-md px-3 py-2 mt-1">
               <option>Select payment mode</option>
               <option>Cash</option>
               <option>UPI</option>
               <option>Credit Card</option>
               <option>Bank Transfer</option>
             </select>
           </div>
           <div>
             <label className="text-sm font-medium">Payment Amount (₹)</label>
             <input type="number" className="w-full border rounded-md px-3 py-2 mt-1" />
           </div>
           <div>
             <label className="text-sm font-medium">Remaining Balance (₹)</label>
             <input type="number" value="0.00" className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" readOnly />
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

      
      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-800"
        >
          Update Booking
        </button>
      </div>
    </div>
  );
};

export default EditFlightBookingDetails;
