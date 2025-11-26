// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getData,postData } from "../../services/apiService";

// const EditBusBookingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [numPassengers, setNumPassengers] = useState(1);

//   const passengers = Array.from({ length: numPassengers }, (_, i) => i + 1);

 
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-xl font-semibold mb-2">Update Bus Booking Details - {id}</h2>
//       <p className="text-sm text-gray-600 mb-6">
//         Edit bus booking, passenger, and payment details.
//       </p>

//       {/* Client Information */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Client Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Client Name *</label>
//             <input
//               type="text"
//               placeholder="Enter client name"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="client@email.com"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Phone *</label>
//             <input
//               type="tel"
//               placeholder="+91 98765 43210"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Bus Information */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Bus Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Bus Operator</label>
//             <input
//               type="text"
//               placeholder="e.g., VRL Travels"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Ticket Number</label>
//             <input
//               type="text"
//               placeholder="Enter ticket number"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">From *</label>
//             <input
//               type="text"
//               placeholder="Departure city"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">To *</label>
//             <input
//               type="text"
//               placeholder="Arrival city"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Journey Date *</label>
//             <input
//               type="date"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Bus Type</label>
//             <select className="w-full border rounded-md px-3 py-2 mt-1">
//               <option>Select bus type</option>
//               <option>AC</option>
//               <option>Non-AC</option>
//               <option>Sleeper</option>
//               <option>Seater</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm font-medium">Seat Type</label>
//             <select className="w-full border rounded-md px-3 py-2 mt-1">
//               <option>Select seat type</option>
//               <option>Window</option>
//               <option>Aisle</option>
//               <option>Sleeper</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm font-medium">Seat Numbers</label>
//             <input
//               type="text"
//               placeholder="e.g., A1, A2, B3"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
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
//           <div
//             key={p}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b pb-4"
//           >
//             <div>
//               <label className="text-sm font-medium">Passenger {p} Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter name"
//                 className="w-full border rounded-md px-3 py-2 mt-1"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Age</label>
//               <input
//                 type="number"
//                 placeholder="Age"
//                 className="w-full border rounded-md px-3 py-2 mt-1"
//               />
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
//             <label className="text-sm font-medium">Booking ID *</label>
//             <input
//               type="text"
//               value="BUS123456"
//               disabled
//               className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Upload Ticket (PDF/Image)</label>
//             <input
//               type="file"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Payment Details */}
//       <section className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 border-b pb-2">Payment Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Previous Balance (₹)</label>
//             <input
//               type="number"
//               value="0"
//               className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100"
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Amount (₹) *</label>
//             <input
//               type="number"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
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
//             <input
//               type="number"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Total Amount (₹)</label>
//             <input
//               type="number"
//               value="0.00"
//               className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100"
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Date of Receiving</label>
//             <input
//               type="date"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
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
//             <input
//               type="number"
//               className="w-full border rounded-md px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Remaining Balance (₹)</label>
//             <input
//               type="number"
//               value="0.00"
//               className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100"
//               readOnly
//             />
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

// export default EditBusBookingDetails;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import { getData, postData, postDatawithFile } from "../../services/apiService";
import PaymentForm from "./PaymentForm";
const EditBusBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [numPassengers, setNumPassengers] = useState(1);
const [paymentdata, setpaymentdata] = useState({
    pnrNumber: "",
    ticketNumber: "",
    uploadTicket: "",
    previousBalance: 0,
    amount: 0,
    ticketType: "",
    serviceCharge: "",
    totalAmount: 0,
    dateOfReceiving: "",
    paymentMode: "",
    paymentAmount: 0,
    remainingBalance: "",
        ticketStatus :"",
    remarks: "",
  });
  
   const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    busOperator: "",
    ticketNumber: "",
    from: "",
    to: "",
    journeyDate: "",
    busType: "",
    seatType: "",
    seatNumbers: "",
    passengers: [{ name: "", age: "", gender: "" }],
    bookingId: "",
    amount: "",
    ticketType: "",
    serviceCharge: "",
    totalAmount: "",
    dateOfReceiving: "",
    paymentMode: "",
    paymentAmount: "",
    Bookingcharge:"",
    remarks: "",
  });

  const passengers = Array.from({ length: numPassengers }, (_, i) => i + 1);
  const type="bus";
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getData(`/api/updateBooking/${type}/${id}`);
        if (res && res) {
          setFormData(res.booking);
        
          
          if (res.busPassengers && res.busPassengers.length > 0) {
            setNumPassengers(res.busPassengers.length);
          }
        }
      } catch (err) {
        console.error("Error fetching booking data:", err);
      }
    };
    fetchBooking();
  }, [id]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...formData.passengers];
    updatedPassengers[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      passengers: updatedPassengers,
    }));
  };

 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handlepaymentdata = (field, value) => {

    console.log(field.target.name, "vae", field.target.value);
    if(field.target.name=="uploadTicket"){
      setpaymentdata({ ...paymentdata, [field.target.name]: field.target.files[0] });
      return
    }

    console.log(paymentdata);
    
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

  const handleUpdate = async () => {
    try {
      const datasentToform = new FormData();
      Object.keys(formData).forEach((key) => {
        datasentToform.append(key, formData[key]);
      });
      Object.keys(paymentdata).forEach((key) => {
        datasentToform.append(key, paymentdata[key]);
      });

      const res = await postDatawithFile(`/api/updateBooking/bus/${id}`, booking);
      alert("Booking updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Failed to update booking!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-2">
        Update Bus Booking Details - {id}
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Edit bus booking, passenger, and payment details.
      </p>

      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Client Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Client Name *</label>
            <input
              type="text"
              placeholder="Enter client name"
              value={formData?.client?.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="client@email.com"
              value={formData?.client?.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone *</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData?.client?.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
        </div>
      </section>

      
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Bus Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Bus Operator</label>
            <input
              type="text"
              placeholder="e.g., VRL Travels"
              value={formData.companyType || ""}
              onChange={(e) =>
                setFormData({ ...formData, busOperator: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          {/* <div>
            <label className="text-sm font-medium">Ticket Number</label>
            <input
              type="text"
              placeholder="Enter ticket number"
              value={formData.ticketNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, ticketNumber: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div> */}
          <div>
            <label className="text-sm font-medium">From *</label>
            <input
              type="text"
              placeholder="Departure city"
              value={formData.fromStop || ""}
              onChange={(e) =>
                setFormData({ ...formData, from: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">To *</label>
            <input
              type="text"
              placeholder="Arrival city"
              value={formData.toStop || ""}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div> 
            <label className="text-sm font-medium">Journey Date *</label>
            <input
              type="date"
              value={formData?.departureDateTime || ""}
              onChange={(e) =>
                setFormData({ ...formData, journeyDate: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bus Type</label>
                <select name="busType" value={formData.busType} onChange={handleChange} className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Select bus type</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Seater">Seater</option>
                </select>
              </div>

                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Seat Type</label>
                <select name="seatType" value={formData?.seatType} onChange={handleChange} className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Select seat type</option>
                  <option value="Window">Window</option>
                  <option value="Middle">Middle</option>
                  <option value="Aisle">Aisle</option>
                </select>
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Seat Numbers</label>
                <input type="text" name="seatNumbers" placeholder="e.g., A1, A2, B3" value={formData.seatNumber} onChange={handleChange} className="border rounded-lg px-4 py-2 w-full" />
              </div>
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
            value={formData?.busPassengers?.length}
            onChange={(e) =>
              setNumPassengers(parseInt(e.target.value) || 1)
            }
            className="w-20 border rounded-md px-2 py-1"
          />
        </div>

        {formData?.busPassengers?.map((p,i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-b pb-4"
          >
            <div>
              <label className="text-sm font-medium">
                Passenger  Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={p.name}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                placeholder="Age"
                value={p.age}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
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

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 border-b pb-1">Booking Information</h3>         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <label className="block text-sm font-medium mb-1">PNR Number *</label>
            <input type="text" onChange={handlepaymentdata} value={paymentdata.pnrNumber} name="pnrNumber" className="w-full border rounded-md p-2" />
          </div> */}
          <div>
            <label className="block text-sm font-medium mb-1">Ticket Number *</label>
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
    onChange={({target})=>setpaymentdata((prev)=>({...prev,ticketStatus:target.value}))}
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
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-800"
        >
          Update Booking
        </button>
      </div>
    </div>
  );
};

export default EditBusBookingDetails;
