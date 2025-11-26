import React, { useEffect, useState } from "react";
import Demo from "./Demo";
import { getData, putData } from '../../services/apiService';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Editebookingformbus() {

  const {  id } = useParams();  
  const type="bus"
  const navigate = useNavigate();
const role=sessionStorage.getItem("role")
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
    remarks: "",
    amount: 0,
  });

  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);

  const agentid = sessionStorage.getItem("agentID");

 
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getData(`/api/updateBooking/${type}/${id}`);
        console.log("GET booking data:", res);

        if (res?.booking) {
          setFormData({
            clientName: res?.booking.client?.name || "",
            email: res?.booking.client?.email || "",
            phone: res?.booking.client?.phone || "",
            remarks: res?.booking.client?.note || "",
            ticketNumber: res.booking?.busNumber || "",
            busOperator: res.booking?.companyType || "",
            from: res.booking?.fromStop || "",
            to: res.booking?.toStop || "",
            journeyDate: res.booking?.departureDateTime?.split("T")[0] || "",
            busType: res.booking?.busType || "",
            seatType: res.booking?.seatType || "",
            seatNumbers: res.booking?.seatNumber || "",
            passengers: res.booking?.busPassengers?.length || 1,
            amount: res.booking?.fare || 0,
          });

          setPassengerDetails(
            res.booking?.busPassengers || [{ name: "", age: "", gender: "" }]
          );
        }

      } catch (error) {
        console.error("GET API ERROR:", error);
      }
    };

    fetchBooking();
  }, [type, id]);

  
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

    if (!formData.phone) {
      Swal.fire({ icon: "error", title: "Phone Missing" });
      return;
    }

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
        companyType: formData.busOperator,
        seatNumber: formData.seatNumbers,
        busType: formData.busType,
        passengers: passengerDetails,
        fare: formData.amount,
      },
    };
      console.log(passengerDetails);
      
    try {
      let a=""
      if(role==="admin")
      {
        a="/api/bookings/"+type+"/" +id
      }
      else{
        a="/api/bookings/agent/"+agentid+"/"+type+"/"+id
      }
      const result = await putData(a, obj);

      Swal.fire({
        icon: "success",
        title: "Booking Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(-1);

    } catch (error) {
      console.error("POST ERROR:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-1 text-gray-800">Bus Booking</h2>
        <p className="text-sm text-gray-500 mb-6">Update bus booking details</p>

        <form onSubmit={handleSubmit} className="space-y-8">

          
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Client Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Client Name *</label>
                <Demo formData={formData} setFormData={setFormData} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone *</label>
                <input type="tel" name="phone" value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" required />
              </div>

              <div>
                <label className="text-sm text-gray-600">Remarks</label>
                <textarea name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full h-20"></textarea>
              </div>
            </div>
          </div>

       
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Bus Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-600">Ticket Number</label>
                <input type="text" name="ticketNumber"
                  value={formData.ticketNumber}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Bus Operator</label>
                <input type="text" name="busOperator"
                  value={formData.busOperator}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">From *</label>
                <input type="text" name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">To *</label>
                <input type="text" name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Journey Date *</label>
                <input type="date" name="journeyDate"
                  value={formData.journeyDate}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Bus Type</label>
                <select name="busType" value={formData.busType}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Select</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Seater">Seater</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Seat Type</label>
                <select name="seatType" value={formData.seatType}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full">
                  <option value="">Select</option>
                  <option value="Window">Window</option>
                  <option value="Middle">Middle</option>
                  <option value="Aisle">Aisle</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Seat Numbers</label>
                <input type="text" name="seatNumbers"
                  value={formData.seatNumbers}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full" />
              </div>

            </div>
          </div>

    
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Passenger Details</h3>

            <div className="flex gap-4 mb-4">
              <label className="text-gray-700">Passengers:</label>

              <input type="number" min="1"
                value={formData.passengers}
                onChange={handlePassengerCountChange}
                className="border px-3 py-2 rounded-lg w-24" />
            </div>

            {passengerDetails.map((p, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-3 rounded-lg mb-3">
                <div>
                  <label>Name</label>
                  <input value={p.name}
                    onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full" />
                </div>

                <div>
                  <label>Age</label>
                  <input type="number" value={p.age}
                    onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full" />
                </div>

                <div>
                  <label>Gender</label>
                  <select value={p.gender}
                    onChange={(e) => handlePassengerChange(i, "gender", e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

              </div>
            ))}

          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

            <div>
              <label>Total Amount *</label>
              <input type="number" name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full" required />
            </div>

            <div className="flex justify-end gap-3 mt-6 md:mt-0">
              <button type="button" className="px-4 py-2 border rounded-lg"
                onClick={() => navigate(-1)}>
                Cancel
              </button>

              <button type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Update Booking
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}
