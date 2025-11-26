
// import React, { useState } from "react";
// import { CalendarDays } from "lucide-react";
// import Demo from "./Demo";
// import { postData } from '../../services/apiService';

// export default function FlightBooking() {
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
//     totalAmount: "",
//   });

//   const [passengerDetails, setPassengerDetails] = useState([
//     { name: "", age: "", gender: "" },
//   ]);

//   const [errors, setErrors] = useState({});

//   const agentid = sessionStorage.getItem("agentId");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });

//     // Update passenger count
//     if (name === "passengers") {
//       const count = parseInt(value);
//       const updated = [...passengerDetails];
//       while (updated.length < count) updated.push({ name: "", age: "", gender: "" });
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

  
//   const validate = () => {
//     console.log(formData);
    
//     const newErrors = {};

//     if (!formData?.clientName?.trim()) newErrors.clientName = "Client name is required";
//     if (!formData?.phone?.trim()) newErrors.phone = "Phone number is required";
//     else if (!/^[0-9]{10}$/.test(formData.phone))
//       newErrors.phone = "Enter valid 10-digit phone number";

//     if (!formData?.from?.trim()) newErrors.from = "Departure city is required";
//     if (!formData?.to?.trim()) newErrors.to = "Arrival city is required";
//     if (!formData.departureDate) newErrors.departureDate = "Departure date is required";

//     if (!formData.oneWay && !formData.returnDate)
//       newErrors.returnDate = "Return date required for round trips";

//     if (!formData.airline) newErrors.airline = "Select airline";
//     if (!formData.flightClass) newErrors.flightClass = "Select flight class";
//     if (!formData.totalAmount) newErrors.totalAmount = "Enter total amount";

//     passengerDetails.forEach((p, i) => {
//       if (!p.name.trim()) newErrors[`pname${i}`] = `Passenger ${i + 1} name required`;
//       if (!p.age.trim()) newErrors[`page${i}`] = `Passenger ${i + 1} age required`;
//       if (!p.gender) newErrors[`pgender${i}`] = `Passenger ${i + 1} gender required`;
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
// console.log(agentid ,"abc");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log(" Booking Saved:", { formData, passengerDetails });
//       alert("Flight Booking Saved Successfully!");
//       const obj = {
//         type: "flight",
//         createdBy: agentid ? agentid : 1,
//         client: {
//           name: formData.clientName,
//           phone: formData.phone,
//           email: formData.email,
//         },
//         booking: {
//           flightNumber: formData.airline, 
//           fromAirport: formData.from,
//           toAirport: formData.to,
//           departureDateTime: formData.departureDate,
//           travelClass: formData.flightClass,
//           fare: formData.totalAmount,
//           passengers: passengerDetails,
//           airline:formData.airline
//         },
//       };

//       console.log(obj ," xyzabc");
      
   
//     try {
//       const bookingData = { ...formData, passengerDetails };
      
//       const res = await postData('/api/booking', obj)
//       console.log("Server Response:", res);

//     }
//     catch (error) {
//       console.error("Unexpected Error:", error);
//       alert("An unexpected error occurred. Please try again.");
//     }

//   }else {
//     alert("Please fill all required fields correctly!");
// }

//   };

// return (
//   <div className="p-8 bg-gray-50 min-h-screen">
//     <h1 className="text-2xl font-semibold text-gray-800 mb-1">Flight Booking</h1>
//     <p className="text-gray-500 mb-6">Enter flight booking details</p>

//     <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
//       {/* --- Booking Details --- */}
//       <div>
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm mb-1">Client Name *</label>
//             <Demo fromdata={formData} setFormData={setFormData} />
//             {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Email (Optional)</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg"
//               placeholder="client@email.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Phone *</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, ""); // remove non-digits
//                 if (value.length <= 10) {
//                   handleChange(e);
//                 }
//               }}
//               maxLength={10}
//               className="w-full px-4 py-2 border rounded-lg"
//               placeholder="Enter 10-digit number"
//             />
//             {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Remarks</label>
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               onChange={handleChange}
//               placeholder="Enter cancellation remarks..."
//               className="border rounded-lg px-4 py-2 w-full h-20"
//             ></textarea>
//           </div>
//         </div>
//       </div>

//       {/* --- Flight Info --- */}
//       <div>
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">Flight Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm mb-1">From *</label>
//             <input
//               type="text"
//               name="from"
//               value={formData.from}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg"
//               placeholder="Departure city"
//             />
//             {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">To *</label>
//             <input
//               type="text"
//               name="to"
//               value={formData.to}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg"
//               placeholder="Arrival city"
//             />
//             {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Departure Date *</label>
//             <div className="relative">
//               <CalendarDays className="absolute left-3 top-2.5 text-gray-400" />
//               <input
//                 type="date"
//                 name="departureDate"
//                 value={formData.departureDate}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg"
//               />
//             </div>
//             {errors.departureDate && (
//               <p className="text-red-500 text-sm">{errors.departureDate}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Return Date (Optional)</label>
//             <div className="relative flex items-center gap-2">
//               <input
//                 type="date"
//                 name="returnDate"
//                 value={formData.returnDate}
//                 onChange={handleChange}
//                 disabled={formData.oneWay}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   name="oneWay"
//                   checked={formData.oneWay}
//                   onChange={handleChange}
//                 />
//                 One way
//               </label>
//             </div>
//             {errors.returnDate && <p className="text-red-500 text-sm">{errors.returnDate}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Airline *</label>
//             <select
//               name="airline"
//               value={formData.airline}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg"
//             >
//               <option value="">Select airline</option>
//               <option value="IndiGo">IndiGo</option>
//               <option value="Air India">Air India</option>
//               <option value="SpiceJet">SpiceJet</option>
//             </select>
//             {errors.airline && <p className="text-red-500 text-sm">{errors.airline}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Class *</label>
//             <select
//               name="flightClass"
//               value={formData.flightClass}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg"
//             >
//               <option value="">Select class</option>
//               <option value="Economy">Economy</option>
//               <option value="Business">Business</option>
//             </select>
//             {errors.flightClass && <p className="text-red-500 text-sm">{errors.flightClass}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Number of Passengers *</label>
//             <input
//               type="number"
//               name="passengers"
//               min="1"
//               value={formData.passengers}
//               onChange={(e) => {
//                 const value = parseInt(e.target.value, 10);
//                 if (!isNaN(value) && value >= 1) {
//                   handleChange(e); // normal update
//                 } else {
//                   setFormData({ ...formData, passengers: "" }); // reset to 1 if below
//                 }
//               }}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Total Amount (₹) *</label>
//             <input
//               type="number"
//               name="totalAmount"
//               value={formData.totalAmount}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//             {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount}</p>}
//           </div>
//         </div>
//       </div>

//       {/* --- Passenger Details --- */}
//       <div>
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">Passenger Details</h2>
//         {passengerDetails.map((p, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg"
//           >
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 value={p.name}
//                 onChange={(e) => handlePassengerChange(index, e)}
//                 placeholder={`Passenger ${index + 1} Name`}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               {errors[`pname${index}`] && (
//                 <p className="text-red-500 text-sm">{errors[`pname${index}`]}</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="number"
//                 name="age"
//                 value={p.age}
//                 onChange={(e) => handlePassengerChange(index, e)}
//                 placeholder="Age"
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//               {errors[`page${index}`] && (
//                 <p className="text-red-500 text-sm">{errors[`page${index}`]}</p>
//               )}
//             </div>
//             <div>
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
//               {errors[`pgender${index}`] && (
//                 <p className="text-red-500 text-sm">{errors[`pgender${index}`]}</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- Buttons --- */}
//       <div className="flex justify-end gap-3">
//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           className="px-6 py-2 border rounded-lg hover:bg-gray-100"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//         >
//           Proceed to Confirmation
//         </button>
//       </div>
//     </form>
//   </div>
// );
// }



import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import Demo from "./Demo";
import { postData } from '../../services/apiService';
import { useNavigate } from "react-router-dom";

export default function FlightBooking() {
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
    // totalAmount: "",
  });
  const role=sessionStorage.getItem("role")
  console.log("asdc" ,role);
  const navigate=useNavigate();
  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);

  const [errors, setErrors] = useState({});

  const agentid = sessionStorage.getItem("agentID");
console.log("xz nkxc",agentid);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    
    if (name === "passengers") {
      const count = parseInt(value);
      const updated = [...passengerDetails];
      while (updated.length < count) updated.push({ name: "", age: "", gender: "" });
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
    console.log(formData);
    
    const newErrors = {};

    if (!formData?.clientName?.trim()) newErrors.clientName = "Client name is required";
    if (!formData?.phone?.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit phone number";

    if (!formData?.from?.trim()) newErrors.from = "Departure city is required";
    if (!formData?.to?.trim()) newErrors.to = "Arrival city is required";
    if (!formData.departureDate) newErrors.departureDate = "Departure date is required";

    // if (!formData.oneWay && !formData.returnDate)
    //   newErrors.returnDate = "Return date required for round trips";

    if (!formData.airline) newErrors.airline = "Select airline";
    if (!formData.flightClass) newErrors.flightClass = "Select flight class";
    // if (!formData.totalAmount) newErrors.totalAmount = "Enter total amount";

    passengerDetails.forEach((p, i) => {
      if (!p.name.trim()) newErrors[`pname${i}`] = `Passenger ${i + 1} name required`;
      if (!p.age.trim()) newErrors[`page${i}`] = `Passenger ${i + 1} age required`;
      if (!p.gender) newErrors[`pgender${i}`] = `Passenger ${i + 1} gender required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
console.log(agentid ,"abc");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(" Booking Saved:", { formData, passengerDetails });
      alert("Flight Booking Saved Successfully!");
      const obj = {
        type: "flight",
        createdBy: agentid ? agentid : 1,
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
          travelClass: formData.flightClass,
          fare: formData.totalAmount,
          passengers: passengerDetails,
          airline:formData.airline
        },
      };

      console.log(obj ," xyzabc");
      
   
    try {
      const bookingData = { ...formData, passengerDetails };
      if(role==="admin")
      {
     const res = await postData('/api/booking', obj)
      console.log("Server Response:", res);

      }else{
        console.log("ankit");
        
        const res = await postData("/api/booking/agent/"+agentid, obj)
      console.log("Server Response:", res);
      navigate=-1;
      }
 
    }
    catch (error) {
      console.error("Unexpected Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }

  }else {
    alert("Please fill all required fields correctly!");
}

  };

return (
  <div className="p-8 bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-semibold text-gray-800 mb-1">Flight Booking</h1>
    <p className="text-gray-500 mb-6">Enter flight booking details</p>

    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
    
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Client Name *</label>
            <Demo fromdata={formData} setFormData={setFormData} />
            {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Email (Optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="client@email.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); 
                if (value.length <= 10) {
                  handleChange(e);
                }
              }}
              maxLength={10}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter 10-digit number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-600">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Enter cancellation remarks..."
              className="border rounded-lg px-4 py-2 w-full h-20"
            ></textarea>
          </div>
        </div>
      </div>

      
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Flight Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">From *</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Departure city"
            />
            {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">To *</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Arrival city"
            />
            {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Departure Date *</label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            {errors.departureDate && (
              <p className="text-red-500 text-sm">{errors.departureDate}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm mb-1">Return Date (Optional)</label>
            <div className="relative flex items-center gap-2">
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                disabled={formData.oneWay}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="oneWay"
                  checked={formData.oneWay}
                  onChange={handleChange}
                />
                One way
              </label>
            </div>
            {errors.returnDate && <p className="text-red-500 text-sm">{errors.returnDate}</p>}
          </div> */}

          <div>
            <label className="block text-sm mb-1">Airline *</label>
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
            <label className="block text-sm mb-1">Class *</label>
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
            <label className="block text-sm mb-1">Number of Passengers *</label>
            <input
              type="number"
              name="passengers"
              min="1"
              value={formData.passengers}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1) {
                  handleChange(e); 
                } else {
                  setFormData({ ...formData, passengers: "" }); 
                }
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* <div>
            <label className="block text-sm mb-1">Total Amount (₹) *</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount}</p>}
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
            <div>
              <input
                type="text"
                name="name"
                value={p.name}
                onChange={(e) => handlePassengerChange(index, e)}
                placeholder={`Passenger ${index + 1} Name`}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors[`pname${index}`] && (
                <p className="text-red-500 text-sm">{errors[`pname${index}`]}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="age"
                value={p.age}
                onChange={(e) => handlePassengerChange(index, e)}
                placeholder="Age"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors[`page${index}`] && (
                <p className="text-red-500 text-sm">{errors[`page${index}`]}</p>
              )}
            </div>
            <div>
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
              {errors[`pgender${index}`] && (
                <p className="text-red-500 text-sm">{errors[`pgender${index}`]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

  
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Proceed to Confirmation
        </button>
      </div>
    </form>
  </div>
);
}
