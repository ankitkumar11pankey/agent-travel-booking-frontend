const Enquiry = require("../models/enquiryModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");

// const createEnquiry = async (req, res) => {
//   try {
//     const { name, email, mobile, mode, bookingDate } = req.body;

//     if (!name || !email || !mobile || !mode || !bookingDate) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (!["Bus", "Train", "Flight"].includes(mode)) {
//       return res.status(400).json({ message: "Invalid mode value" });
//     }

//     const user = req.user;
//     let assignEnquiry = null;

//     if (user.role === "agent") {
//       assignEnquiry = user.id;
//     }

//     const enquiry = await Enquiry.create({
//       name,
//       email,
//       mobile,
//       mode,
//       bookingDate,
//       role: user.role,
//       createdBy: user.id,
//       assignEnquiry,
//       status: "new",
//     });

//     return res.status(201).json({
//       message: "Enquiry created successfully",
//       enquiry,
//     });
//   } catch (error) {
//     console.error("Create Enquiry Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// const getAllEnquiries = async (req, res) => {
//   try {
//     const enquiries = await Enquiry.findAll({
//       order: [["createdAt", "DESC"]],
//     });

//     if (!enquiries.length) {
//       return res.status(404).json({ message: "No enquiries found" });
//     }

//     res.status(200).json({
//       message: "All enquiries fetched successfully",
//       count: enquiries.length,
//       enquiries,
//     });
//   } catch (error) {
//     console.error("Get All Enquiries Error:", error);
//     res.status(500).json({ message: "Server error while fetching enquiries" });
//   }
// };

// const getAgentEnquiries = async (req, res) => {
//   try {
//     const agentId =  req.params.id;;
//   //  console.log("hii",agentId);
//     const enquiries = await Enquiry.findAll({
//       where: { assignEnquiry: agentId },
//       order: [["createdAt", "DESC"]],
//     });

//     if (enquiries.length === 0) {
//       return res.status(404).json({ message: "No enquiries found" });
//     }

//     res.status(200).json({
//       success: true,
//       total: enquiries.length,
//       data: enquiries,
//     });
//   } catch (error) {
//     console.error("Error fetching agent enquiries:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// const assignEnquiry = async (req, res) => {
//   try {
//     const enquiryId = req.params.id;
//     const { agentId } = req.body;
//     if (!agentId) return res.status(400).json({ message: "agentId required" });

//     const enquiry = await Enquiry.findByPk(enquiryId);
//     if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

//     enquiry.assignedTo = agentId;
//     enquiry.status = "assigned";
//     await enquiry.save();

//     const agent = await User.findByPk(agentId);
//     if (agent && agent.email) {
//       const subject = `Enquiry #${enquiry.id} assigned to you`;
//       const text = `Hello ${agent.name || "Agent"},\n\nYou have been assigned Enquiry #${enquiry.id}.\nCustomer: ${enquiry.name} (${enquiry.email}, ${enquiry.mobile})\nMode: ${enquiry.mode}\nBookingDate: ${enquiry.bookingDate}\n\nPlease handle it in your dashboard.`;
//       sendMail(agent.email, subject, text).catch((err) => console.error("Agent notify error:", err));
//     }

//     return res.status(200).json({ message: "Enquiry assigned", enquiry });
//   } catch (err) {
//     console.error("assignEnquiry error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

const createEnquiry = async (req, res) => {
  try {
    const { name, email, mobile, mode, bookingDate } = req.body;

    if (!name || !email || !mobile || !mode || !bookingDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["Bus", "Train", "Flight"].includes(mode)) {
      return res.status(400).json({ message: "Invalid mode value" });
    }

    const user = req.user; 
    if (!user)
      return res.status(401).json({ message: "Authentication required" });

    const assignEnquiry = user.role === "agent" ? user.id : null;
    const enquirystatus = assignEnquiry ? "assigned" : "new";

    const enquiry = await Enquiry.create({
      name,
      email,
      mobile,
      mode,
      bookingDate,
      role: user.role, 
      createdBy: user.id,
      creatorName: user.name || user.email || null,
      assignEnquiry,
      enquirystatus,
    });

    return res
      .status(201)
      .json({ message: "Enquiry created successfully", enquiry });
  } catch (error) {
    console.error("Create Enquiry Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!enquiries.length) {
      return res
        .status(200)
        .json({ message: "No enquiries found", count: 0, enquiries: [] });
    }

    res.status(200).json({
      message: "All enquiries fetched successfully",
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("Get All Enquiries Error:", error);
    res.status(500).json({ message: "Server error while fetching enquiries" });
  }
};

// Get enquiries for a specific agent (param: id)
// const getAgentEnquiries = async (req, res) => {
//   try {
//     const agentIdRaw = req.params.id || req.query.agentId; // support param or query
//     console.log("👉 agentId:", agentIdRaw);
// console.log("🧩 Checking Enquiry Table for createdBy / assignEnquiry with this ID...");

//     if (!agentIdRaw)
//       return res.status(400).json({ message: "agent id required" });

//     const agentId = parseInt(agentIdRaw, 10);
//     if (Number.isNaN(agentId))
//       return res.status(400).json({ message: "invalid agent id" });

//     const enquiries = await Enquiry.findAll({
//     where: {
//   [Op.or]: [
//     { createdBy: String(agentId) },
//     { assignEnquiry: String(agentId) },
//   ],
// },
//       order: [["createdAt", "DESC"]],
//     });
// console.log("📦 Enquiries Found:", enquiries.length);
//     if (!enquiries.length) {
//       return res
//         .status(200)
//         .json({
//           message: "No enquiries found for this agent",
//           total: 0,
//           data: [],
//         });
//     }

//     res.status(200).json({
//       success: true,
//       total: enquiries.length,
//       data: enquiries,
//     });
//   } catch (error) {
//     console.error("Error fetching agent enquiries:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

const getAgentEnquiries = async (req, res) => {
  try {
    const agentIdRaw = req.params.id || req.query.agentId;

    if (!agentIdRaw)
      return res.status(400).json({ message: "Agent ID required" });

    const agentId = parseInt(agentIdRaw, 10);
    if (Number.isNaN(agentId))
      return res.status(400).json({ message: "Invalid Agent ID" });

    const enquiries = await Enquiry.findAll({
      where: {
        [Op.or]: [
          { createdBy: agentId },
          { assignEnquiry: agentId }
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    if (!enquiries.length) {
      return res.status(200).json({
        message: "No enquiries found for this agent",
        total: 0,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      total: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching agent enquiries:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const assignEnquiryToAgent = async (req, res) => {
  try {
    const { enquiryId, agentId } = req.body;


    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

   
    const agent = await User.findByPk(agentId);
    if (!agent || agent.role !== "agent") {
      return res.status(400).json({ message: "Invalid agent" });
    }

  
    enquiry.assignEnquiry = agentId;
    enquiry.enquirystatus = "assigned";
    await enquiry.save();

    res.status(200).json({
      message: "Enquiry assigned successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Error assigning enquiry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllAgents = async (req, res) => {
  try {
    const agents = await User.findAll({
      where: { role: "agent" },
      attributes: ["id", "name", "email"],
    });

    res.status(200).json({
      success: true,
      agents,
    });
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const { enquirystatus } = req.body;

    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enquiry.enquirystatus = enquirystatus;
    await enquiry.save();

    res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getAgentEnquiries,
  assignEnquiryToAgent,
  getAllAgents,
  updateEnquiryStatus,
};
  