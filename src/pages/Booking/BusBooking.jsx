// import React, { useState } from "react";
// import Demo from "./Demo";
// import { postData } from '../../services/apiService';
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// export default function BusBooking() {
//   const [formData, setFormData] = useState({
//     clientName: "",
//     email: "",
//     phone: "",
//     ticketNumber: "",
//     busOperator: "",
//     from: "",
//     to: "",
//     journeyDate: "",
//     busType: "",
//     seatType: "",
//     seatNumbers: "",
//     passengers: 1,
//     amount: 0,
//   });

//   const navigate = useNavigate()

//   const [passengerDetails, setPassengerDetails] = useState([
//     { name: "", age: "", gender: "" },
//   ]);

//   const agentid = sessionStorage.getItem("agentId");
//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle passenger count change
//   const handlePassengerCountChange = (e) => {
//     const count = parseInt(e.target.value);
//     setFormData({ ...formData, passengers: count });
//     const updated = Array.from({ length: count }, (_, i) => passengerDetails[i] || { name: "", age: "", gender: "" });
//     setPassengerDetails(updated);
//   };

//   // Handle passenger info
//   const handlePassengerChange = (index, field, value) => {
//     const updated = [...passengerDetails];
//     updated[index][field] = value;
//     setPassengerDetails(updated);
//   };

//   console.log("foror",formData);
  

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Bus Booking Submitted:", { formData, passengerDetails });


//     const obj = {

//       type: "bus",
//       createdBy: agentid ? agentid : 1, // dynamic
//       client: {
//         name: formData.clientName,
//         phone: formData.phone,
//         email: formData.email,
//         note: formData.remarks,
//       },
//       booking: {
//         busNumber: formData.ticketNumber,
//         seatType: formData.seatType,
//         fromStop: formData.from,
//         toStop: formData.to,
//         departureDateTime: formData.journeyDate,
//         companyType: formData.busOperator || 55,
//         seatNumber: formData.seatNumbers || 55,
//         busType: formData.busType,
//         passengers: passengerDetails,
//         fare: formData.amount,
//       },
//     }

//     console.log(obj, " xyzabc");


//     try {
//       // const bookingData = { ...formData, passengerDetails };

//       if(!formData.phone){
//       Swal.fire({
//   title: 'Error!',
//   text: 'Phone is missing',
//   icon: 'error',
//   confirmButtonText: 'OK'
// })
// return
//       }
//       const res = await postData('/api/booking', obj)
//       console.log("Server Response:", res);
// Swal.fire({
//   position: "center",
//   icon: "success",
//   title: "Successfully booking ",
//   showConfirmButton: false,
//   timer: 1500
// });
// navigate(-1)



//     }
//     catch (error) {
//       console.error("Unexpected Error:", error);
//       Swal.fire({
//   title: 'Error!',
//   text: 'Something went to wrong',
//   icon: 'error',
//   confirmButtonText: 'OK'
// })
//     }

//   }
//   // alert("Bus Booking Submitted Successfully!");


//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
//         <h2 className="text-2xl font-semibold mb-1 text-gray-800">Bus Booking</h2>
//         <p className="text-sm text-gray-500 mb-6">Enter bus booking details</p>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Client Info */}
//           <div>
//             <h3 className="font-medium text-gray-700 mb-3">Client Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Client Name *</label>
//                 <Demo fromdata={formData} setFormData={setFormData} />
//                 {/* <input type="text" name="clientName" placeholder="Enter client name" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required /> */}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                 <input type="email" name="email" placeholder="client@email.com" value={formData.email} onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Phone *</label>
//                 <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-600">Remarks</label>
//                 <textarea
//                   name="remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                   placeholder="Enter cancellation remarks..."
//                   className="border rounded-lg px-4 py-2 w-full h-20"
//                 ></textarea>
//               </div>
//             </div>
//           </div>

//           {/* Bus Info */}
//           <div>
//             <h3 className="font-medium text-gray-700 mb-3">Bus Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Ticket Number</label>
//                 <input type="text" name="ticketNumber" placeholder="Enter ticket number" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Bus Operator</label>
//                 <input type="text" name="busOperator" placeholder="e.g., RedBus, VRL Travels" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">From *</label>
//                 <input type="text" name="from" placeholder="Departure city" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">To *</label>
//                 <input type="text" name="to" placeholder="Arrival city" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Journey Date *</label>
//                 <input type="date" name="journeyDate" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Bus Type</label>
//                 <select name="busType" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full">
//                   <option value="">Select bus type</option>
//                   <option value="AC">AC</option>
//                   <option value="Non-AC">Non-AC</option>
//                   <option value="Sleeper">Sleeper</option>
//                   <option value="Seater">Seater</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Seat Type</label>
//                 <select name="seatType" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full">
//                   <option value="">Select seat type</option>
//                   <option value="Window">Window</option>
//                   <option value="Middle">Middle</option>
//                   <option value="Aisle">Aisle</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Seat Numbers</label>
//                 <input type="text" name="seatNumbers" placeholder="e.g., A1, A2, B3" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
//               </div>
//             </div>
//           </div>

//           {/* Passenger Info */}
//           <div>
//             <h3 className="font-medium text-gray-700 mb-3">Passenger Details</h3>
//             <div className="flex items-center gap-4 mb-3">
//               <label className="text-gray-600 font-medium">Number of Passengers:</label>
//               <input
//                 type="number"
//                 min="1"
//                 name="passengers"
//                 value={formData.passengers}
//                 onChange={handlePassengerCountChange}
//                 className="border rounded-lg px-3 py-2 w-24"
//               />
//             </div>

//             {passengerDetails.map((passenger, index) => (
//               <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 bg-gray-50 p-3 rounded-lg">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">
//                     Passenger {index + 1} Name
//                   </label>
//                   <input
//                     type="text"
//                     value={passenger.name}
//                     placeholder="Full Name"
//                     onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
//                     className="border rounded-lg px-4 py-2 w-full"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
//                   <input
//                     type="number"
//                     value={passenger.age}
//                     placeholder="Age"
//                     onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
//                     className="border rounded-lg px-4 py-2 w-full"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
//                   <select
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
//                     className="border rounded-lg px-4 py-2 w-full"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Amount + Buttons */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Total Amount (₹) *</label>
//               <input
//                 type="number"
//                 name="amount"
//                 placeholder="Enter total amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//                 required
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-6 md:mt-0">
//               <button
//                 type="button"
//                 className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
//                 onClick={() => window.history.back()}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Proceed to Confirmation
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import Demo from "./Demo";
import { postData } from '../../services/apiService';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function BusBooking() {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    ticketNumber: "",
    busOperator: "",
    from: "",
    to: "",
    journeyDate: "",
    busType: "",
    seatType: "",
    seatNumbers: "",
    passengers: 1,
    amount: 0,
  });
 const role=sessionStorage.getItem("role")
  console.log("role" ,role);
  const navigate = useNavigate()

  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);

  const agentid = sessionStorage.getItem("agentID");
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFormData({ ...formData, passengers: count });
    const updated = Array.from({ length: count }, (_, i) => passengerDetails[i] || { name: "", age: "", gender: "" });
    setPassengerDetails(updated);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  console.log("foror",formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Bus Booking Submitted:", { formData, passengerDetails });


    const obj = {

      type: "bus",
      createdBy: agentid ? agentid : 1, 
      client: {
        name: formData.clientName,
        phone: formData.phone,
        email: formData.email,
        note: formData.remarks,
      },
      booking: {
        busNumber: formData.ticketNumber,
        seatType: formData.seatType,
        fromStop: formData.from,
        toStop: formData.to,
        departureDateTime: formData.journeyDate,
        companyType: formData.busOperator || 55,
        seatNumber: formData.seatNumbers || 55,
        busType: formData.busType,
        passengers: passengerDetails,
        fare: formData.amount,
      },
    }

    console.log(obj, " xyzabc");


    try {
    

      if(!formData.phone){
      Swal.fire({
  title: 'Error!',
  text: 'Phone is missing',
  icon: 'error',
  confirmButtonText: 'OK'
})

      }
      let a =""
      if(role==="admin"){
        a = '/api/booking'
      }
      else{
      a = "/api/booking/agent/"+agentid;
      }
      const res = await postData(a, obj)
      console.log("Server Response:", res);
Swal.fire({
  position: "center",
  icon: "success",
  title: "Successfully booking ",
  showConfirmButton: false,
  timer: 1500
});
navigate(-1)



    }
    catch (error) {
      console.error("Unexpected Error:", error);
      Swal.fire({
  title: 'Error!',
  text: 'Something went to wrong',
  icon: 'error',
  confirmButtonText: 'OK'
})
    }

  }
  


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-1 text-gray-800">Bus Booking</h2>
        <p className="text-sm text-gray-500 mb-6">Enter bus booking details</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Client Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Client Name *</label>
                <Demo fromdata={formData} setFormData={setFormData} />
                {/* <input type="text" name="clientName" placeholder="Enter client name" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required /> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input type="email" name="email" placeholder="client@email.com" value={formData.email} onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone *</label>
                <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
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
            <h3 className="font-medium text-gray-700 mb-3">Bus Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Ticket Number</label>
                <input type="text" name="ticketNumber" placeholder="Enter ticket number" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bus Operator</label>
                <input type="text" name="busOperator" placeholder="e.g., RedBus, VRL Travels" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">From *</label>
                <input type="text" name="from" placeholder="Departure city" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">To *</label>
                <input type="text" name="to" placeholder="Arrival city" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Journey Date *</label>
                <input type="date" name="journeyDate" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bus Type</label>
                <select name="busType" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Select bus type</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Seater">Seater</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Seat Type</label>
                <select name="seatType" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Select seat type</option>
                  <option value="Window">Window</option>
                  <option value="Middle">Middle</option>
                  <option value="Aisle">Aisle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Seat Numbers</label>
                <input type="text" name="seatNumbers" placeholder="e.g., A1, A2, B3" onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
              </div>
            </div>
          </div>

        
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Passenger Details</h3>
            <div className="flex items-center gap-4 mb-3">
              <label className="text-gray-600 font-medium">Number of Passengers:</label>
              <input
                type="number"
                min="1"
                name="passengers"
                value={formData.passengers}
                onChange={handlePassengerCountChange}
                className="border rounded-lg px-3 py-2 w-24"
              />
            </div>

            {passengerDetails.map((passenger, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 bg-gray-50 p-3 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Passenger {index + 1} Name
                  </label>
                  <input
                    type="text"
                    value={passenger.name}
                    placeholder="Full Name"
                    onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                  <input
                    type="number"
                    value={passenger.age}
                    placeholder="Age"
                    onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                  <select
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 items-center">
           
            <div className="flex w-full justify-end gap-3 mt-6 md:mt-0">
              <button
                type="button"
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Proceed to Confirmation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
