import React, { useState } from 'react'

export default function PaymentForm({formData, setFromData}) {


    const handleformData = (field, value) => {

    console.log(field.target.name, "vae", field.target.value);

    if (field.target.name == "amount") {
      console.log("check oue"); 

      setFromData((prev) => ({
        ...prev,
        totalAmount: Number(field.target.value) + Number(formData.serviceCharge)+ Number(formData.Bookingcharge)+ Number(formData.othercharge),
        amount: field.target.value,

      }));
      return
    }

    if (field.target.name == "serviceCharge") {
      console.log("check oue");

      setFromData((prev) => ({
        ...prev,
        totalAmount: Number(field.target.value) + Number(formData.amount)+ Number(formData.Bookingcharge),
        serviceCharge: field.target.value,

      }));
      return
    }
    if(field.target.name=="Bookingcharge"){
     console.log("check other charge");
      setFromData((prev) => ({
        ...prev,
        totalAmount: Number(formData.amount) + Number(formData.serviceCharge)+ Number(field.target.value),
        Bookingcharge: field.target.value,
      }));
      return
    }


    if (field.target.name == "paymentAmount") {


      setFromData((prev) => ({
        ...prev,
        remainingBalance: Number(formData.totalAmount) - Number(field.target.value),

        paymentAmount: field.target.value,

      }));
      return
    }
    if(field.target.name=="othercharge"){
     console.log("check other charge");
      setFromData((prev) => ({
        ...prev,
        totalAmount: Number(formData.amount) + Number(formData.serviceCharge)+ Number(formData.Bookingcharge)  + Number(field.target.value),
        othercharge: field.target.value,
      }));
      return
    }


    setFromData({ ...formData, [field.target.name]: field.target.value });
    
  };

  return (
    <div>
         <from>
          <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Payment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <label className="text-sm font-medium">Previous Balance (₹)</label>
            <input type="number" value={formData.previousBalance} className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" name="previousBalance" onChange={handleformData} />
          </div> */}
          <div>
            <label className="text-sm font-medium"> Tikart Amount (₹) *</label>
            <input type="number" value={formData.amount} name="amount" onChange={handleformData} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
            <div>
            <label className="text-sm font-medium">Booking  charge (₹)</label>
            <input type="number" value={formData.Bookingcharge} name="Bookingcharge" onChange={handleformData} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Ticket Type {formData.ticketType}</label>
            <select onChange={handleformData} value={formData.ticketType} name="ticketType" className="w-full border rounded-md px-3 py-2 mt-1">
              <option value="select tickert type">Select ticket type</option>
              <option value="General">General</option>
              <option value="Tatkal">Tatkal</option>
              <option value="Permium Tatkal ">Permium Tatkal</option>
              <option value="sr.Citizen">Current Tikart</option>
              <option value="sr.Citizen">Confirmation</option>
              <option value="sr.Citizen">Open Date</option>
              <option value="sr.Citizen">RAC</option>
              <option value="Ladies">
                Boarding
              </option>

              <option value="sr.Citizen">Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Type Service Charge (₹)</label>
            <input type="number" value={formData.serviceChargent} name="serviceCharge" onChange={handleformData} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
           <div>
            <label className="text-sm font-medium">Other charge (₹)</label>
            <input type="number" value={formData.othercharge} name="othercharge" onChange={handleformData} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Total Amount (₹) </label>
            <input type="number" value={formData?.totalAmount} name="totalAmount" readOnly className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" />
          </div>
          
          
          {/* <div>
            <label className="text-sm font-medium">Date of Receiving</label>
            <input type="date" value={formData.dateOfReceiving} name="dateOfReceiving" onChange={handleformData} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div> */}
          {/* <div>
            <label className="text-sm font-medium">Payment Mode</label>
            <select onChange={handleformData} value={formData.paymentMode} name="paymentMode" className="w-full border rounded-md px-3 py-2 mt-1">
              <option value="">Select payment mode</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer"> Bank Transfer</option>
            </select>
          </div> */}
          {/* <div>
            <label className="text-sm font-medium">Payment Amount (₹)</label>
            <input type="number" value={formData.paymentAmount} name="paymentAmount" onChange={handleformData} className="w-full border rounded-md px-3 py-2 mt-1" />
          </div> */}
          {/* <div>
            <label className="text-sm font-medium">Remaining Balance (₹)</label>
            <input type="number" value={formData.remainingBalance} name="remainingBalance" onChange={handleformData} className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100" />
          </div> */}
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Remarks</label>
          <textarea
            rows="3"
            placeholder="Enter any additional remarks..."
            className="w-full border rounded-md px-3 py-2 mt-1"
          ></textarea>
        </div>
      </section>

      

         </from>
    </div>
  )
}
