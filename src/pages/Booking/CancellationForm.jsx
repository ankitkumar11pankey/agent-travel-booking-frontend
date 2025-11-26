// // 📄 src/pages/booking/CancellationForm.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CancellationForm({ booking, onClose }) {
//   const [formData, setFormData] = useState({
//     availableBalance: 0,
//     ticketAmount: booking?.ticketAmount,
//     bookingServiceCharge: booking?.bookingCharge,
//     totalAmount: booking?.payment,
//     cancelDate: "",
//     cancellationServiceCharge: 0,
//     paidAmount: 0,
//     remainingAmount: booking?.payment,
//     remarks: "",
//   });
// const navigate=useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updated = { ...formData, [name]: value };

//     const total =
//       parseFloat(updated.totalAmount || 0) -
//       (parseFloat(updated.paidAmount || 0) +
//         parseFloat(updated.cancellationServiceCharge || 0));

//     updated.remainingAmount = total >= 0 ? total.toFixed(2) : 0;
//     setFormData(updated);
//   };

//  const onClosePage =(e)=>{
//   navigate(-1);
//  }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Cancellation processed for ${booking.clientName}`);
//     onClose();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow rounded-xl p-6 space-y-6 mt-8"
//     >
//       <div className="flex justify-between items-center border-b pb-3">
//         <h3 className="text-lg font-semibold text-gray-800">
//           Cancellation Form - {booking?.id}
//         </h3>
//         <button
//           type="button"
//           onClick={onClosePage}
//           className="text-gray-500 hover:text-gray-800"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Booking Info */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
//         <div>
//           <p className="text-xs text-gray-500">Client</p>
//           <p className="font-medium">{booking?.clientName}</p>
//         </div>
//         <div>
//           <p className="text-xs text-gray-500">Mode</p>
//           <p className="font-medium">{booking?.route}</p>
//         </div>
//         <div>
//           <p className="text-xs text-gray-500">Booking Date</p>
//           <p className="font-medium">{booking?.bookingDate}</p>
//         </div>
//       </div>

//       {/* Payment Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm text-gray-600">Available Balance (₹)</label>
//           <input
//             type="number"
//             name="availableBalance"
//             value={formData.availableBalance}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Ticket Amount (₹)</label>
//           <input
//             type="number"
//             name="ticketAmount"
//             value={formData.ticketAmount}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">
//             Service Charge (Booking)
//           </label>
//           <input
//             type="number"
//             name="bookingServiceCharge"
//             value={formData.bookingServiceCharge}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Total Amount (₹)</label>
//           <input
//             type="number"
//             name="totalAmount"
//             value={formData.totalAmount}
//             readOnly
//             className="border rounded-lg px-4 py-2 w-full bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Cancellation Date *</label>
//           <input
//             type="date"
//             name="cancelDate"
//             value={formData.cancelDate}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-2 w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">
//             Service Charge (Cancellation)
//           </label>
//           <input
//             type="number"
//             name="cancellationServiceCharge"
//             value={formData.cancellationServiceCharge}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Paid Amount (₹) *</label>
//           <input
//             type="number"
//             name="paidAmount"
//             value={formData.paidAmount}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-2 w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Remaining Amount (₹)</label>
//           <input
//             type="number"
//             name="remainingAmount"
//             value={formData.remainingAmount}
//             readOnly
//             className="border rounded-lg px-4 py-2 w-full bg-gray-100"
//           />
//         </div>
//       </div>

//       {/* Remarks */}
//       <div>
//         <label className="text-sm text-gray-600">Remarks</label>
//         <textarea
//           name="remarks"
//           value={formData.remarks}
//           onChange={handleChange}
//           placeholder="Enter cancellation remarks..."
//           className="border rounded-lg px-4 py-2 w-full h-20"
//         ></textarea>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-3">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
//         >
//           Close
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//         >
//           Process Cancellation
//         </button>
//       </div>
//     </form>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData } from "../../services/apiService";

export default function CancellationForm({ booking, onClose }) {
  const navigate = useNavigate();
  const id=useParams();
  console.log(id);
  
  
  const [formData, setFormData] = useState({
    availableBalance: 0,
    ticketAmount: booking?.ticketAmount || 0,
    bookingServiceCharge: booking?.bookingCharge || 0,
    totalAmount: booking?.payment || 0,
    cancelDate: "",
    Cancellationcharge:0,
    cancellationServiceCharge: 0,
    paidAmount: 0,
    remainingAmount: booking?.payment || 0,
    remarks: "",
  
  });

  const [loading, setLoading] = useState(false);

  let a="";
      if(id.type == "Flight")
      {
         a="flight"
      }
      else if(id.type=="Rail")
      {
        a="rail";
      }
      else{
        a="bus";
      }

 
  useEffect(() => {
   
    const fetchCancellationData = async () => {
      
      
      try {
        const res = await getData("/api/confirmed/"+ a+"/"+id.id);
        console.log("Existing cancellations:", res.booking);
    setFormData((ankit) => ({
  ...ankit,
  ...res.booking
}));

      } catch (err) {
        console.error("Error fetching cancellation data:", err);
      }
    };

    fetchCancellationData();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
  

   if (name == "Cancellationcharge") {
      console.log("check oue");

      setFormData((prev) => ({
        ...prev,
        remainingAmount: Number(formData.totalAmount)   - (  Number(value) + Number(formData.cancellationServiceCharge) + Number(formData.paidAmount) ),
        Cancellationcharge : value,

      }));
      return
    }

    if (name == "cancellationServiceCharge") {
      console.log("check oue");

      setFormData((prev) => ({
        ...prev,
        remainingAmount: Number(formData.totalAmount)   -  ( Number(value) + Number(formData.Cancellationcharge) + Number(formData.paidAmount) ),
        cancellationServiceCharge : value,

      }));
      return
    }

    if (name == "paidAmount") {
      console.log("check oue");

      setFormData((prev) => ({
        ...prev,
        remainingAmount: Number(formData.totalAmount)   -  ( Number(value) + Number(formData.Cancellationcharge) + Number(formData.cancellationServiceCharge)),
        paidAmount : value,

      }));
      return
    }

   


    const updated = { ...formData, [name]: value };

    // const total =
    //   parseFloat(updated.totalAmount || 0) -
    //   (parseFloat(updated.paidAmount || 0) +
    //     parseFloat(updated.cancellationServiceCharge || 0));

    // updated.remainingAmount = total >= 0 ? total.toFixed(2) : 0;
    setFormData(updated);
  };


  const onClosePage = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cancelDate || !formData.paidAmount) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      const type = booking?.type || "bus";
      const bookingId = booking?.bookingId;

      const payload = {
        ...formData,
        bookingId,
        type,
      };
 
console.log("afd",formData);


  const bb = {
  availableBalance: 0,
  ticketAmount: formData.ticketAmount,
  serviceChargeBooking:formData.bookingServiceCharge,
  serviceChargeCancellation:formData.bookingServiceCharge,
  totalAmount: formData.totalAmount,
  paidAmount: formData.paidAmount,
  remainingAmount: formData.remainingAmount,
  refundAmount: 1500,
  cancellationDate: formData.cancelDate,
  remarks: formData.remarks
}


      const response = await postData(
        `/api/cancelBooking/cancel/${a}/${id.id}`,
        bb
      );

      if (response?.success) {
        alert(` Cancellation processed for ${booking.clientName}`);
        onClose(); 
      } else {
        alert(" Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting cancellation:", error);
      alert("Cancelled booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 space-y-6 mt-8"
    >
      
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Cancellation Form - {booking?.bookingId}
        </h3>
        <button
          type="button"
          onClick={onClosePage}
          className="text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-xs text-gray-500">Client</p>
          <p className="font-medium">{formData.client?.name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Mode</p>
          <p className="font-medium">{formData?.type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Route</p>
          <p className="font-medium">{formData?.route}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Booking Date</p>
          <p className="font-medium">{formData?.bookingDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div>
          <label className="text-sm text-gray-600">Available Balance (₹)</label>
          <input
            type="number"
            name="availableBalance"
            value={formData.availableBalance}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div> */}

        {/* <div>
          <label className="text-sm text-gray-600">Ticket Amount (₹)</label>
          <input
            type="number"
            name="ticketAmount"
            value={formData.ticketAmount}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div> */}

        {/* <div>
          <label className="text-sm text-gray-600">
            Service Charge (Booking)
          </label>
          <input
            type="number"
            name="bookingServiceCharge"
            value={formData.bookingServiceCharge}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div> */}

        <div>
          <label className="text-sm text-gray-600">Total Amount (₹)</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            readOnly
            className="border rounded-lg px-4 py-2 w-full bg-gray-100"
          />
        </div>


        <div>
          <label className="text-sm text-gray-600">Cancellation Date *</label>
          <input
            type="date"
            name="cancelDate"
            value={formData.cancelDate}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
        </div>

          <div>
          <label className="text-sm text-gray-600">Cancellation Refund  charge  (₹)</label>
          <input
            type="number"
         
            value={formData.Cancellationcharge}
            name="Cancellationcharge"
             onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Service Charge (Cancellation)
          </label>
          <input
            type="number"
            name="cancellationServiceCharge"
            value={formData.cancellationServiceCharge}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Paid Amount (₹) *</label>
          <input
            type="number"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Remaining Amount (₹)</label>
          <input
            type="number"
            name="remainingAmount"
            value={formData.remainingAmount}
          
            readOnly
            className="border rounded-lg px-4 py-2 w-full bg-gray-100"
          />
        </div>
      </div>


   <div>
          <label className="text-sm text-gray-600">Refund Amount (₹)</label>
          <input
            type="number"
            name="remainingAmount"
            value={ formData.remainingAmount > 0 ? 0 : (formData.remainingAmount) * -1}
            readOnly
            className="border rounded-lg px-4 py-2 w-full bg-gray-100"
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

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Close
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Processing..." : "Process Cancellation"}
        </button>
      </div>
    </form>
  );
}

