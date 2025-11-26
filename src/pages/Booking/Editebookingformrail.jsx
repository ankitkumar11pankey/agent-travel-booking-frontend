// import React, { useState } from "react";
// import Demo from "./Demo";
// import { postData } from '../../services/apiService';
// export default function Editebookingformrail() {
//   const [formData, setFormData] = useState({
//     clientName: "",
//     email: "",
//     phone: "",
//     pnr: "",
//     trainNumber: "",
//     trainName: "",
//     from: "",
//     to: "",
//     journeyDate: "",
//     classType: "",
//     passengers: 1,
//     amount: 0,
//   });
// const agentid= sessionStorage.getItem("agentId");
//   const [passengerDetails, setPassengerDetails] = useState([
//     { name: "", age: "", gender: "" },
//   ]);

//   // Handle field change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle passenger details
//   const handlePassengerChange = (index, field, value) => {
//     const updated = [...passengerDetails];
//     updated[index][field] = value;
//     setPassengerDetails(updated);
//   };

//   // Update passenger fields when count changes
//   const handlePassengerCountChange = (e) => {
//     const count = parseInt(e.target.value);
//     setFormData({ ...formData, passengers: count });
//     const updated = Array.from(
//       { length: count },
//       (_, i) => passengerDetails[i] || { name: "", age: "", gender: "" }
//     );
//     setPassengerDetails(updated);
//   };

//   const handleSubmit = async(e) => {

//     e.preventDefault();
   
//     console.log("Train Booking Submitted:", { formData, passengerDetails });
//     alert("Train Booking Submitted Successfully!");

//     const obj = {
//             type: "rail",
//             createdBy: agentid ? agentid : 1, // dynamic
//             client: {
//               name: formData.clientName,
//               phone: formData.phone,
//               email: formData.email,
//             },
//             // booking: {
//             //   flightNumber: formData.airline, // airline → flightNumber
//             //   fromAirport: formData.from,
//             //   toAirport: formData.to,
//             //   departureDateTime: formData.departureDate,
//             //   travelClass: formData.flightClass,
//             //   fare: formData.totalAmount,
//             //   passengers: passengerDetails
//             // },
//             booking: {
//     trainNumber:formData.trainNumber,
//     classType: formData.classType, 
//     fromStation: formData.from,
//     toStation:formData.to, 
//     departureDate:formData.journeyDate, 
//     fare: formData.amount,
//     passengers: passengerDetails
//   },

//           };
    
//           console.log(obj ," xyzabc");
          
       
//         try {
//           const bookingData = { ...formData, passengerDetails };
//           const res = await postData('/api/booking', obj)
//           console.log("Server Response:", res);
    
//         }
//         catch (error) {
//           console.error("Unexpected Error:", error);
//           alert("An unexpected error occurred. Please try again.");
//         }
    
//       } 
    
    


//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-1 text-gray-800">Train Booking</h2>
//       <p className="text-sm text-gray-500 mb-6">Enter train booking details</p>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow rounded-xl p-6 space-y-6"
//       >
//         {/* Client Info */}
//         <div>
//           <h3 className="font-medium text-gray-700 mb-3">Client Information</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div> 
//               <label className="block text-gray-600 mb-1">Client Name</label>
//               <Demo fromdata={formData} setFormData={setFormData} />  
//               {/* <input
//                 type="text"
//                 name="clientName"
//                 placeholder="Enter client name"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//                 required
//               /> */}
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">Email</label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 name="email"
//                 placeholder="client@email.com"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 value={formData.phone}
//                 name="phone"
//                 placeholder="+91 98765 43210"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//                 required
//               />
//             </div>
//             <div>
//         <label className="text-sm text-gray-600">Remarks</label>
//         <textarea
//           name="remarks"
//           value={formData.remarks}
//           onChange={handleChange}
//           placeholder="Enter cancellation remarks..."
//           className="border rounded-lg px-4 py-2 w-full h-20"
//         ></textarea>
//       </div>
//           </div>
//         </div>

//         {/* Train Info */}
//         <div>
//           <h3 className="font-medium text-gray-700 mb-3">Train Information</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-600 mb-1">PNR Number</label>
//               <input
//                 type="text"
//                 name="pnr"
//                 placeholder="Enter PNR"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">Train Number</label>
//               <input
//                 type="text"
//                 name="trainNumber"
//                 placeholder="Train Number"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">Train Name</label>
//               <input
//                 type="text"
//                 name="trainName"
//                 placeholder="Enter train name"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">Class Type</label>
//               <select
//                 name="classType"
//                 value={formData.classType}
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//               >
//                 <option value="">Select Class</option>
//                 <option value="AC">AC</option>
//                 <option value="Sleeper">Sleeper</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">From Station</label>
//               <input
//                 type="text"
//                 name="from"
//                 placeholder="Departure station"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">To Station</label>
//               <input
//                 type="text"
//                 name="to"
//                 placeholder="Arrival station"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-600 mb-1">Journey Date</label>
//               <input
//                 type="date"
//                 name="journeyDate"
//                 onChange={handleChange}
//                 className="border rounded-lg px-4 py-2 w-full"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Passenger Info */}
//         <div>
//           <h3 className="font-medium text-gray-700 mb-3">Passenger Details</h3>
//           <div className="flex items-center gap-4 mb-3">
//             <label className="text-gray-600">Number of Passengers:</label>
//             <input
//               type="number"
//               min="1"
//               name="passengers"
//               value={formData.passengers}
//               onChange={handlePassengerCountChange}
//               className="border rounded-lg px-3 py-2 w-24"
//             />
//           </div>

//           {passengerDetails.map((passenger, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-3 gap-4 mb-3 bg-gray-50 p-3 rounded-lg"
//             >
//               <div>
//                 <label className="block text-gray-600 mb-1">
//                   Passenger {index + 1} Name
//                 </label>
//                 <input
//                   type="text"
//                   value={passenger.name}
//                   onChange={(e) =>
//                     handlePassengerChange(index, "name", e.target.value)
//                   }
//                   className="border rounded-lg px-4 py-2 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 mb-1">Age</label>
//                 <input
//                   type="number"
//                   value={passenger.age}
//                   onChange={(e) =>
//                     handlePassengerChange(index, "age", e.target.value)
//                   }
//                   className="border rounded-lg px-4 py-2 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 mb-1">Gender</label>
//                 <select
//                   value={passenger.gender}
//                   onChange={(e) =>
//                     handlePassengerChange(index, "gender", e.target.value)
//                   }
//                   className="border rounded-lg px-4 py-2 w-full"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Amount + Buttons */}
//         <div className="grid grid-cols-2 gap-4 items-center">
//           <div>
//             <label className="block text-gray-600 mb-1">Total Amount (₹)</label>
//             <input
//               type="number"
//               name="amount"
//               placeholder="Enter total amount"
//               value={formData.amount}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2 w-full"
//               required
//             />
//           </div>

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               className="px-4 py-2 border rounded-lg text-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Proceed to Confirmation
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Demo from "./Demo";
import { getData, putData } from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Editebookingformrail() {
  const { id } = useParams();
  const type = "rail";
  const navigate = useNavigate();
const role=sessionStorage.getItem("role")
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    remarks: "",
    pnr: "",
    trainNumber: "",
    trainName: "",
    from: "",
    to: "",
    journeyDate: "",
    classType: "",
    passengers: 1,
    // amount: 0,
  });

  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);

  const agentId = sessionStorage.getItem("agentID");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getData(`/api/updateBooking/${type}/${id}`);

        console.log("TRAIN GET DATA:", res);

        if (res?.booking) {
          setFormData({
            clientName: res.booking?.client?.name || "",
            email: res.booking?.client?.email || "",
            phone: res.booking?.client?.phone || "",
            remarks: res.booking?.client?.note || "",
            pnr: res.booking?.pnrNumber || "",
            trainNumber: res.booking?.trainNumber || "",
            trainName: res.booking?.trainName || "",
            from: res.booking?.fromStation || "",
            to: res.booking?.toStation || "",
            journeyDate: res.booking?.departureDate?.split("T")[0] || "",
            classType: res.booking?.classType || "",
            passengers: res.booking?.railPassengers?.length || 1,
            // amount: res.booking?.fare || 0,
          });

          setPassengerDetails(
            res.booking?.railPassengers || [{ name: "", age: "", gender: "" }]
          );
        }
      } catch (error) {
        console.log("GET API ERROR:", error);
      }
    };

    fetchBooking();
  }, [id, type]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFormData({ ...formData, passengers: count });

    const updated = Array.from(
      { length: count },
      (_, i) => passengerDetails[i] || { name: "", age: "", gender: "" }
    );
    setPassengerDetails(updated);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      type: "rail",
      createdBy: agentId ? agentId : 1,
      client: {
        name: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        note: formData.remarks,
      },
      booking: {
        pnrNumber: formData.pnr,
        trainNumber: formData.trainNumber,
        trainName: formData.trainName,
        fromStation: formData.from,
        toStation: formData.to,
        departureDate: formData.journeyDate,
        classType: formData.classType,
        // fare: formData.amount,
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
        a="/api/bookings/agent/"+agentId+"/"+type+"/"+id
      }
      console.log(a);
   
      
      await putData(a, obj);

      Swal.fire({
        icon: "success",
        title: "Train Booking Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(-1);
    } catch (error) {
      console.log("PUT ERROR:", error);
      Swal.fire({ icon: "error", title: "Update failed" });
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-1 text-gray-800">Edit Train Booking</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-6"
      >
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Client Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Client Name</label>
              <Demo formData={formData} setFormData={setFormData} />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Remarks</label>
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
          <h3 className="font-medium text-gray-700 mb-3">Train Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>PNR Number</label>
              <input
                type="text"
                name="pnr"
                value={formData.pnr}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label>Train Number</label>
              <input
                type="text"
                name="trainNumber"
                value={formData.trainNumber}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label>Train Name</label>
              <input
                type="text"
                name="trainName"
                value={formData.trainName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label>Class Type</label>
              <select
                name="classType"
                value={formData.classType}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              >
                <option value="">Select</option>
                <option value="AC">AC</option>
                <option value="Sleeper">Sleeper</option>
              </select>
            </div>

            <div>
              <label>From Station</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label>To Station</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label>Journey Date</label>
              <input
                type="date"
                name="journeyDate"
                value={formData.journeyDate}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>
          </div>
        </div>

       
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Passenger Details</h3>

          <div className="flex items-center gap-4 mb-3">
            <label>Passengers:</label>
            <input
              type="number"
              min="1"
              value={formData.passengers}
              onChange={handlePassengerCountChange}
              className="border rounded-lg px-3 py-2 w-24"
            />
          </div>

          {passengerDetails.map((p, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg mb-3">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) =>
                    handlePassengerChange(i, "name", e.target.value)
                  }
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <div>
                <label>Age</label>
                <input
                  type="number"
                  value={p.age}
                  onChange={(e) =>
                    handlePassengerChange(i, "age", e.target.value)
                  }
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <div>
                <label>Gender</label>
                <select
                  value={p.gender}
                  onChange={(e) =>
                    handlePassengerChange(i, "gender", e.target.value)
                  }
                  className="border rounded-lg px-4 py-2 w-full"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

      
        <div className="grid grid-cols-2 gap-4 items-center">
          {/* <div>
            <label>Total Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div> */}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Update Booking
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


