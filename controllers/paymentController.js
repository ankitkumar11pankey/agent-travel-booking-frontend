
const sequelize = require("../config/db"); 
const Payment = require("../models/paymentModel");
const Client = require("../models/clientModel");
const BookingFlight = require("../models/bookingFlightModel");
const BookingBus = require("../models/bookingBusModel");
const BookingRail = require("../models/bookingRailModel");
const BookingUpdate = require("../models/bookingUpdateModel");

const getBookingModel = (type) => {
  if (type === "flight") return BookingFlight;
  if (type === "bus") return BookingBus;
  if (type === "rail") return BookingRail;
  throw new Error("Invalid booking type");
};


exports.collectPayment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      bookingType,
      bookingId,

      receivingAmount,
      receivingDate,
      paymentType,
      paymentAmount,
      note,

      serviceCharge = 0,
      otherCharge = 0,


      bankName, transactionId, transactionDate,
      cardNumber, cardType, cardHolderName, cardTransactionDate,
      upiId, upiTransactionId, upiTransactionDate,
      chequeNumber, chequeBankName, chequeTransactionDate,
      totalAmount
    } = req.body;

    console.log('body', req.body);
    if (!bookingType || !bookingId || !receivingDate || !paymentType) {
      await t.rollback();
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    
    const BookingModel = getBookingModel(bookingType);
    const booking = await BookingModel.findByPk(bookingId);
    if (!booking) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const clientId = booking.clientId;
    const client = await Client.findByPk(clientId); 

    if(paymentAmount > totalAmount){
      await t.rollback();
      return res.status(400).json({ success: false, message: "Receiving amount exceeds total amount" });
    }
    
    const baseTotal = Number(booking.totalAmount ?? booking.fare ?? 0);

    const invoiceTotal = Number((baseTotal + Number(serviceCharge || 0) + Number(otherCharge || 0)).toFixed(2));


   

    

    let maskedCard = null;
    if (cardNumber) {
      const digits = String(cardNumber).replace(/\D/g, "");
      maskedCard = digits.length > 4 ? `**** **** **** ${digits.slice(-4)}` : digits;
    }

    let myObj = {
      clientId,
      bookingId,
      pnrNumber: booking.pnrNumber ?? null,
      ticketNumber: booking.ticketNumber ?? null,

      totalAmount: baseTotal,
      serviceCharge: Number(serviceCharge || 0),
      otherCharge: Number(otherCharge || 0),
      invoiceTotal: invoiceTotal,

      totalRemainingBalance: 0,

      receivingAmount: Number(paymentAmount),
      receivingDate,
      note,

      paymentType,
      bankName, transactionId, transactionDate,
      cardNumber: maskedCard, cardType, cardHolderName, cardTransactionDate,
      upiId, upiTransactionId, upiTransactionDate,
      chequeNumber, chequeBankName, chequeTransactionDate,

      createdBy: req.user?.id ?? null,
      companyId: booking.companyId ?? null
    };
    let paymentObj = {
      bookingType
    };
    for(let key of Object.keys(myObj)) {
      console.log('myObj[key]', key  , '   ', myObj[key]);
      if(myObj[key]) {
        console.log('inside null');
        paymentObj[key] = myObj[key];
      }
    }
    // console.log('paymentObj', paymentObj);

   
    const payment = await Payment.create(paymentObj, { transaction: t });
    // console.log('payment created', payment.id);
    //  const prevPaid = Number(await Payment.sum("receivingAmount", {
    //   where: { clientId }
    // }) || 0);
    let prevPaid = 0;
    const allPayments = await Payment.findAll({
      where: { clientId },
      transaction: t
    });
    for(let pay of allPayments) {
      console.log('pay.receivingAmount', pay.receivingAmount);
      prevPaid += Number(pay.receivingAmount);
    }

    console.log('prevPaid', prevPaid, totalAmount, paymentAmount);

    const allTotal = Number(await BookingUpdate.sum("totalAmount", {
      where: { clientId }
    }) || 0);
    console.log('client Id', clientId)
    console.log('allTotal', allTotal);
    const diff = parseFloat(allTotal) - parseFloat(prevPaid);
    if(diff < 0){
      await t.rollback();
      return res.status(400).json({ success: false, message: "Overpayment detected. Please check the amounts." });
    }
    client.remainingBalance = parseFloat(diff).toFixed(2);
    await client.save({ transaction: t }); 

    console.log('client after update', client.remainingBalance);


    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Receiving recorded successfully",
      payment,
      // invoiceTotal,
      // invoicePaid: prevPaid,
      // invoiceRemaining
    });
  } catch (err) {
    await t.rollback();
    console.error("collectPayment error:", err);
    return res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};


exports.getBookingInvoice = async (req, res) => {
  try {
    const { type, id } = req.params;
    const BookingModel = getBookingModel(type);

    const booking = await BookingModel.findByPk(id);
    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    const baseTotal = Number(booking.totalAmount ?? booking.fare ?? 0);

    const serviceCharge = Number(booking.serviceCharge || 0);
    const otherCharge = Number(booking.otherCharge || 0);


   
    const invoiceTotal = (
      baseTotal +
      serviceCharge +
      otherCharge +
      gst +
      markup -
      discount
    );

  
    const invoicePaid = Number(
      await Payment.sum("receivingAmount", { where: { bookingId: id } }) || 0
    );

    const invoiceRemaining = Number((invoiceTotal - invoicePaid).toFixed(2));

    const client = await Client.findByPk(booking.clientId);

    return res.status(200).json({
      success: true,
      invoiceTotal,
      invoicePaid,
      invoiceRemaining,
      booking,
      client: client
        ? {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
          }
        : null,
    });
  } catch (err) {
    console.error("getBookingInvoice error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


exports.getClientInvoice = async (req, res) => {
  try {
    const { type, bookingId } = req.params;
    let bookingModel;
    if (type === "flight") bookingModel = BookingFlight;
    else if (type === "bus") bookingModel = BookingBus;
    else if (type === "rail") bookingModel = BookingRail;
    const booking = await bookingModel.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const bookingUpdate = await BookingUpdate.findOne({
      where: { bookingId: booking.id, bookingType: type },
    });

    if(!bookingUpdate){
      return res.status(404).json({ success: false, message: "Booking update not found" });
    }

    

    const clientId = booking.clientId;
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    let totalBookingAmount = bookingUpdate.totalAmount || 0;
    let totalPreviousBalance = Number(client.remainingBalance || 0);
    const payments = await Payment.findAll({
      where: { clientId, bookingId: booking.id, bookingType: type },
    });
    let totalPayments = 0;
    for (let payment of payments) {
      totalPayments += Number(payment.receivingAmount || 0);
    }
    console.log('totalBookingAmount', parseFloat(totalBookingAmount), totalPayments);
    let ticketRemainingAmount = (parseFloat(totalBookingAmount).toFixed(2)) - parseFloat(totalPayments).toFixed(2);
    ticketRemainingAmount = parseFloat(ticketRemainingAmount).toFixed(2);
 
    return res.status(200).json({
      success: true,
      clientId,
      totalBookingAmount,
      totalPreviousBalance,
      ticketRemainingAmount
    });

  } catch (err) {
    console.error("getClientInvoice error:", err);
    return res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};
