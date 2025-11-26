// import React, { useState } from "react";
// import Demo from "./Demo";
// import { postData } from '../../services/apiService';
// export default function TrainBooking() {
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
//     trainName:formData.trainName,
//     pnrNumber:formData.pnr,
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


import React, { useState } from "react";
import Demo from "./Demo";
import { postData } from '../../services/apiService';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function TrainBooking() {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    pnr: "",
    trainNumber: "",
    trainName: "",
    from: "",
    to: "",
    journeyDate: "",
    classType: "",
    passengers: 1,
    amount: 0,
  });
   const role=sessionStorage.getItem("role")
  console.log("role" ,role);
    const navigate = useNavigate()
  
  const agentid = sessionStorage.getItem("agentID");
  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
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

  const handleSubmit = async(e) => {

    e.preventDefault();
   
    console.log("Train Booking Submitted:", { formData, passengerDetails });


    const obj = {
            type: "rail",
            createdBy: agentid ? agentid : 1, 
            client: {
              name: formData.clientName,
              phone: formData.phone,
              email: formData.email,
            },
            // booking: {
            //   flightNumber: formData.airline, // airline → flightNumber
            //   fromAirport: formData.from,
            //   toAirport: formData.to,
            //   departureDateTime: formData.departureDate,
            //   travelClass: formData.flightClass,
            //   fare: formData.totalAmount,
            //   passengers: passengerDetails
            // },
            booking: {
    trainNumber:formData.trainNumber,
    trainName:formData.trainName,
    pnrNumber:formData.pnr,
    classType: formData.classType, 
    fromStation: formData.from,
    toStation:formData.to, 
    departureDate:formData.journeyDate, 
    fare: formData.amount,
    passengers: passengerDetails
  },

          };
    
          console.log(obj ," xyzabc");
          
       
        // try {
        //   const bookingData = { ...formData, passengerDetails };
        //   if(role==="admin")
        //   {
        //       const res = await postData('/api/booking', obj)
        //   console.log("Server Response:", res);
        //   }
        //   else{   
        //             const res = await postData("/api/booking/agent/"+agentid, obj)
        //           console.log("Server Response:", res);
        //   }
          
    
        // }
        // catch (error) {
        //   console.error("Unexpected Error:", error);
        //   alert("An unexpected error occurred. Please try again.");
        // }
    
        
        
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
      <h2 className="text-2xl font-semibold mb-1 text-gray-800">Train Booking</h2>
      <p className="text-sm text-gray-500 mb-6">Enter train booking details</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-6"
      >
     
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Client Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div> 
              <label className="block text-gray-600 mb-1">Client Name</label>
              <Demo fromdata={formData} setFormData={setFormData} />  
              {/* <input
                type="text"
                name="clientName"
                placeholder="Enter client name"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              /> */}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                name="email"
                placeholder="client@email.com"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                name="phone"
                placeholder="+91 98765 43210"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
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
          <h3 className="font-medium text-gray-700 mb-3">Train Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-gray-600 mb-1">PNR Number</label>
              <input
                type="text"
                name="pnr"
                placeholder="Enter PNR"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div> */}

            <div>
              <label className="block text-gray-600 mb-1">Train Number</label>
              <input
                type="text"
                name="trainNumber"
                placeholder="Train Number"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Train Name</label>
              <input
                type="text"
                name="trainName"
                placeholder="Enter train name"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Class Type</label>
              <select
                name="classType"
                value={formData.classType}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              >
                <option value="">Select Class</option>
                <option value="AC">AC</option>
                <option value="Sleeper">Sleeper</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">From Station</label>
              <input
                type="text"
                name="from"
                placeholder="Departure station"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">To Station</label>
              <input
                type="text"
                name="to"
                placeholder="Arrival station"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Journey Date</label>
              <input
                type="date"
                name="journeyDate"
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-3">Passenger Details</h3>
          <div className="flex items-center gap-4 mb-3">
            <label className="text-gray-600">Number of Passengers:</label>
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
            <div
              key={index}
              className="grid grid-cols-3 gap-4 mb-3 bg-gray-50 p-3 rounded-lg"
            >
              <div>
                <label className="block text-gray-600 mb-1">
                  Passenger {index + 1} Name
                </label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) =>
                    handlePassengerChange(index, "name", e.target.value)
                  }
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Age</label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) =>
                    handlePassengerChange(index, "age", e.target.value)
                  }
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Gender</label>
                <select
                  value={passenger.gender}
                  onChange={(e) =>
                    handlePassengerChange(index, "gender", e.target.value)
                  }
                  className="border rounded-lg px-4 py-2 w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        
        <div className="grid gap-4 items-center">
          {/* <div>
            <label className="block text-gray-600 mb-1">Total Amount (₹)</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter total amount"
              value={formData.amount}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div> */}

          <div className="flex justify-end m-full gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg text-gray-600"
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
  );
}
