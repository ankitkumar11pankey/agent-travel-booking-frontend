

// import React, { useState, useEffect } from "react";
// import { CalendarDays } from "lucide-react";
// import Demo from "./Demo";
// import { getData, putData } from "../../services/apiService";
// import { useParams, useNavigate } from "react-router-dom";

// export default function Editebookingformflite() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const type = "flight";

//   const [formData, setFormData] = useState({
//     clientName: "",
//     email: "",
//     phone: "",
//     from: "",
//     to: "",
//     departureDate: "",
//     returnDate: "",
//     oneWay: false,
//     airline: "",
//     flightClass: "",
//     passengers: 1,
//     remarks: "",
//     totalAmount: "",
//   });

//   const [passengerDetails, setPassengerDetails] = useState([
//     { name: "", age: "", gender: "" },
//   ]);

//   const [errors, setErrors] = useState({});
//   const agentid = sessionStorage.getItem("agentId");

//   // --------------------------- LOAD DATA --------------------------
//   useEffect(() => {
//     fetchBooking();
//   }, []);

//   const fetchBooking = async () => {
//     try {
//       const res = await getData(`/api/updateBooking/${type}/${id}`);

//       if (res?.success) {
//         const booking = res.booking;

//         setFormData({
//           clientName: booking.client.name,
//           email: booking.client.email,
//           phone: booking.client.phone,
//           from: booking.fromAirport,
//           to: booking.toAirport,
//           departureDate: booking.departureDateTime,
//           returnDate: booking.returnDateTime || "",
//           oneWay: booking.oneWay,
//           airline: booking.flightNumber,
//           flightClass: booking.travelClass,
//           passengers: booking.passengers?.length || 1,
//           remarks: booking.remarks || "",
//           totalAmount: booking.fare,
//         });

//         setPassengerDetails(booking.flightPassengers);
//       }
//     } catch (err) {
//       console.log("Error fetching flight booking:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });

//     if (name === "passengers") {
//       const count = parseInt(value);
//       const updated = [...passengerDetails];
//       while (updated.length < count)
//         updated.push({ name: "", age: "", gender: "" });
//       while (updated.length > count) updated.pop();
//       setPassengerDetails(updated);
//     }
//   };

//   const handlePassengerChange = (index, e) => {
//     const { name, value } = e.target;
//     const updated = [...passengerDetails];
//     updated[index][name] = value;
//     setPassengerDetails(updated);
//   };

//   // --------------------------- VALIDATION --------------------------
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.clientName.trim())
//       newErrors.clientName = "Client name is required";

//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     else if (!/^[0-9]{10}$/.test(formData.phone))
//       newErrors.phone = "Enter valid 10-digit number";

//     if (!formData.from.trim())
//       newErrors.from = "Departure city is required";

//     if (!formData.to.trim()) newErrors.to = "Arrival city is required";

//     if (!formData.departureDate)
//       newErrors.departureDate = "Departure date is required";

//     if (!formData.oneWay && !formData.returnDate)
//       newErrors.returnDate = "Return date required";

//     if (!formData.airline) newErrors.airline = "Select airline";

//     if (!formData.flightClass) newErrors.flightClass = "Select class";

//     if (!formData.totalAmount) newErrors.totalAmount = "Enter amount";

//     passengerDetails.forEach((p, i) => {
//       if (!p.name.trim()) newErrors[`pname${i}`] = "Name required";
//       if (!p.age.trim()) newErrors[`page${i}`] = "Age required";
//       if (!p.gender) newErrors[`pgender${i}`] = "Gender required";
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --------------------------- SUBMIT --------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return alert("Fix errors first!");

//     const obj = {
//       type: "flight",
//       updatedBy: agentid ? agentid : 1,
//       client: {
//         name: formData.clientName,
//         phone: formData.phone,
//         email: formData.email,
//       },
//       booking: {
//         flightNumber: formData.airline,
//         fromAirport: formData.from,
//         toAirport: formData.to,
//         departureDateTime: formData.departureDate,
//         returnDateTime: formData.returnDate,
//         oneWay: formData.oneWay,
//         travelClass: formData.flightClass,
//         fare: formData.totalAmount,
//         remarks: formData.remarks,
//         passengers: passengerDetails,
//       },
//     };

//     try {
//       const res = await putData(`/api/bookings/${type}/${id}`, obj);

//       if (res?.success) {
//         alert("Flight Booking Updated Successfully!");
//          navigate(-1);
//       } else {
//         alert("Update failed!");
//       }
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Unexpected error!");
//     }
//   };

//   // --------------------------- UI --------------------------
//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-1">
//         Edit Flight Booking
//       </h1>
//       <p className="text-gray-500 mb-6">Modify and update flight booking</p>

//       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">

//         {/* CLIENT DETAILS */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <div>
//               <label className="block text-sm mb-1">Client Name *</label>
//               <Demo formData={formData} setFormData={setFormData} />
//               {errors.clientName && (
//                 <p className="text-red-500 text-sm">{errors.clientName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             <div>
//               <label className="block text-sm mb-1">Phone *</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 maxLength={10}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm">{errors.phone}</p>
//               )}
//             </div>

//             <div>
//               <label className="text-sm">Remarks</label>
//               <textarea
//                 name="remarks"
//                 value={formData.remarks}
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full h-20"
//               ></textarea>
//             </div>
//           </div>
//         </div>

//         {/* FLIGHT INFO */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Flight Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <div>
//               <label className="text-sm">From *</label>
//               <input
//                 type="text"
//                 name="from"
//                 value={formData.from}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
//             </div>

//             <div>
//               <label className="text-sm">To *</label>
//               <input
//                 type="text"
//                 name="to"
//                 value={formData.to}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
//             </div>

//             <div>
//               <label className="block text-sm mb-1">Departure Date *</label>
//               <input
//                 type="date"
//                 name="departureDate"
//                 value={formData.departureDate}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               {errors.departureDate && (
//                 <p className="text-red-500 text-sm">{errors.departureDate}</p>
//               )}
//             </div>
// {/* 
//             <div>
//               <label className="block text-sm mb-1">Return Date</label>
//               <input
//                 type="date"
//                 name="returnDate"
//                 value={formData.returnDate}
//                 onChange={handleChange}
//                 disabled={formData.oneWay}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               <label className="flex gap-2 mt-2">
//                 <input
//                   type="checkbox"
//                   name="oneWay"
//                   checked={formData.oneWay}
//                   onChange={handleChange}
//                 />
//                 One Way
//               </label>
//               {errors.returnDate && (
//                 <p className="text-red-500 text-sm">{errors.returnDate}</p>
//               )}
//             </div> */}

//             <div>
//               <label className="text-sm">Airline *</label>
//               <select
//                 name="airline"
//                 value={formData.airline}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               >
//                 <option value="">Select airline</option>
//                 <option value="IndiGo">IndiGo</option>
//                 <option value="Air India">Air India</option>
//                 <option value="SpiceJet">SpiceJet</option>
//               </select>
//               {errors.airline && <p className="text-red-500 text-sm">{errors.airline}</p>}
//             </div>

//             <div>
//               <label className="text-sm">Flight Class *</label>
//               <select
//                 name="flightClass"
//                 value={formData.flightClass}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               >
//                 <option value="">Select class</option>
//                 <option value="Economy">Economy</option>
//                 <option value="Business">Business</option>
//               </select>
//               {errors.flightClass && <p className="text-red-500 text-sm">{errors.flightClass}</p>}
//             </div>

//             <div>
//               <label className="text-sm">Passengers *</label>
//               <input
//                 type="number"
//                 name="passengers"
//                 min="1"
//                 value={formData.passengers}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             <div>
//               <label className="text-sm">Total Amount (₹) *</label>
//               <input
//                 type="number"
//                 name="totalAmount"
//                 value={formData.totalAmount}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               {errors.totalAmount && (
//                 <p className="text-red-500 text-sm">{errors.totalAmount}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* PASSENGERS */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Passenger Details</h2>
//           {passengerDetails.map((p, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg"
//             >
//               <input
//                 type="text"
//                 name="name"
//                 value={p.name}
//                 onChange={(e) => handlePassengerChange(index, e)}
//                 className="w-full px-4 py-2 border rounded-lg"
//                 placeholder={`Passenger ${index + 1} Name`}
//               />

//               <input
//                 type="number"
//                 name="age"
//                 value={p.age}
//                 onChange={(e) => handlePassengerChange(index, e)}
//                 className="w-full px-4 py-2 border rounded-lg"
//                 placeholder="Age"
//               />

//               <select
//                 name="gender"
//                 value={p.gender}
//                 onChange={(e) => handlePassengerChange(index, e)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               >
//                 <option value="">Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           ))}
//         </div>

//         {/* BUTTONS */}
//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 border rounded-lg"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             className="px-6 py-2 bg-black text-white rounded-lg"
//           >
//             Update Booking
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import Demo from "./Demo";
import { getData, putData } from "../../services/apiService";
import { useParams, useNavigate } from "react-router-dom";

export default function Editebookingformflite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const type = "flight";
 const role=sessionStorage.getItem("role")
 
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    oneWay: false,
    airline: "",
    flightClass: "",
    passengers: 1,
    remarks: "",
    totalAmount: "",
  });

  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);

  const [errors, setErrors] = useState({});
  const agentid = sessionStorage.getItem("agentID");

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const res = await getData(`/api/updateBooking/${type}/${id}`);

      if (res?.success) {
        const booking = res.booking;

        setFormData({
          clientName: booking.client.name,
          email: booking.client.email,
          phone: booking.client.phone,
          from: booking.fromAirport,
          to: booking.toAirport,
          departureDate: booking.departureDateTime,
          returnDate: booking.returnDateTime || "",
          oneWay: booking.oneWay,
          airline: booking.flightNumber,
          flightClass: booking.travelClass,
          passengers: booking.passengers?.length || 1,
          remarks: booking.remarks || "",
          totalAmount: booking.fare,
        });

        setPassengerDetails(booking.flightPassengers);
      }
    } catch (err) {
      console.log("Error fetching flight booking:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "passengers") {
      const count = parseInt(value);
      const updated = [...passengerDetails];
      while (updated.length < count)
        updated.push({ name: "", age: "", gender: "" });
      while (updated.length > count) updated.pop();
      setPassengerDetails(updated);
    }
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...passengerDetails];
    updated[index][name] = value;
    setPassengerDetails(updated);
  };

  
  const validate = () => {
    const newErrors = {};

    if (!formData.clientName.trim())
      newErrors.clientName = "Client name is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit number";

    if (!formData.from.trim())
      newErrors.from = "Departure city is required";

    if (!formData.to.trim()) newErrors.to = "Arrival city is required";

    if (!formData.departureDate)
      newErrors.departureDate = "Departure date is required";

    if (!formData.oneWay && !formData.returnDate)
      newErrors.returnDate = "Return date required";

    if (!formData.airline) newErrors.airline = "Select airline";

    if (!formData.flightClass) newErrors.flightClass = "Select class";

    if (!formData.totalAmount) newErrors.totalAmount = "Enter amount";

    passengerDetails.forEach((p, i) => {
      if (!p.name.trim()) newErrors[`pname${i}`] = "Name required";
      if (!p.age.trim()) newErrors[`page${i}`] = "Age required";
      if (!p.gender) newErrors[`pgender${i}`] = "Gender required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validate()) return alert("Fix errors first!");

    const obj = {
      type: "flight",
      updatedBy: agentid ? agentid : 1,
      client: {
        name: formData.clientName,
        phone: formData.phone,
        email: formData.email,
      },
      booking: {
        flightNumber: formData.airline,
        fromAirport: formData.from,
        toAirport: formData.to,
        departureDateTime: formData.departureDate,
        returnDateTime: formData.returnDate,
        oneWay: formData.oneWay,
        travelClass: formData.flightClass,
        fare: formData.totalAmount,
        remarks: formData.remarks,
        passengers: passengerDetails,
      },
    };

    try {
      let a=""
        if(role==="admin")
        {
           a="/api/bookings/"+type+"/"+id
        }
        else{
          a="/api/bookings/agent/"+agentid+"/"+type+"/"+id
        }
      const res = await putData(a, obj);

      if (res?.success) {
        alert("Flight Booking Updated Successfully!");
         navigate(-1);
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Unexpected error!");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        Edit Flight Booking
      </h1>
      <p className="text-gray-500 mb-6">Modify and update flight booking</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">

        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm mb-1">Client Name *</label>
              <Demo formData={formData} setFormData={setFormData} />
              {errors.clientName && (
                <p className="text-red-500 text-sm">{errors.clientName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full h-20"
              ></textarea>
            </div>
          </div>
        </div>

    
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Flight Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm">From *</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
            </div>

            <div>
              <label className="text-sm">To *</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Departure Date *</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.departureDate && (
                <p className="text-red-500 text-sm">{errors.departureDate}</p>
              )}
            </div>
{/* 
            <div>
              <label className="block text-sm mb-1">Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                disabled={formData.oneWay}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <label className="flex gap-2 mt-2">
                <input
                  type="checkbox"
                  name="oneWay"
                  checked={formData.oneWay}
                  onChange={handleChange}
                />
                One Way
              </label>
              {errors.returnDate && (
                <p className="text-red-500 text-sm">{errors.returnDate}</p>
              )}
            </div> */}

            <div>
              <label className="text-sm">Airline *</label>
              <select
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select airline</option>
                <option value="IndiGo">IndiGo</option>
                <option value="Air India">Air India</option>
                <option value="SpiceJet">SpiceJet</option>
              </select>
              {errors.airline && <p className="text-red-500 text-sm">{errors.airline}</p>}
            </div>

            <div>
              <label className="text-sm">Flight Class *</label>
              <select
                name="flightClass"
                value={formData.flightClass}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select class</option>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
              </select>
              {errors.flightClass && <p className="text-red-500 text-sm">{errors.flightClass}</p>}
            </div>

            <div>
              <label className="text-sm">Passengers *</label>
              <input
                type="number"
                name="passengers"
                min="1"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
{/* 
            <div>
              <label className="text-sm">Total Amount (₹) *</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.totalAmount && (
                <p className="text-red-500 text-sm">{errors.totalAmount}</p>
              )}
            </div> */}
          </div>
        </div>

      
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Passenger Details</h2>
          {passengerDetails.map((p, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg"
            >
              <input
                type="text"
                name="name"
                value={p.name}
                onChange={(e) => handlePassengerChange(index, e)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder={`Passenger ${index + 1} Name`}
              />

              <input
                type="number"
                name="age"
                value={p.age}
                onChange={(e) => handlePassengerChange(index, e)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Age"
              />

              <select
                name="gender"
                value={p.gender}
                onChange={(e) => handlePassengerChange(index, e)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          ))}
        </div>
          
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Update Booking
          </button>
        </div>
      </form>
    </div>
  );
}
