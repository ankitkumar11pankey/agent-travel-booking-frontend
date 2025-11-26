
const Client = require("../models/clientModel");
const { Op } = require("sequelize");
const createClient = async (req, res) => {
  try {
    const { name, email, phone, notes } = req.body;
    if (!name || !phone) return res.status(400).json({ message: "name and phone required" });

   
    const existing = await Client.findOne({ where: { phone } });
    if (existing) return res.status(409).json({ message: "Client already exists", client: existing });

    const client = await Client.create({
      name, email, phone, address, notes, createdBy: req.user?.id || null
    });
    return res.status(201).json({ message: "Client created", client });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getClients = async (req, res) => {
  try {
    const q = req.query.q || "";
 
    const where = q ? {
      [require("sequelize").Op.or]: [
        { name: { [require("sequelize").Op.like]: `%${q}%` } },
        { phone: { [require("sequelize").Op.like]: `%${q}%` } },
        { email: { [require("sequelize").Op.like]: `%${q}%` } }
      ]
    } : {};

    const clients = await Client.findAll({ where, order: [["createdAt","DESC"]] });
    res.status(200).json({ count: clients.length, clients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const searchClients = async (req, res) => {
  try {
    const { query } = req.query; // frontend sends ?query=Ravi

    let clients;

    if (!query || query.trim() === "") {

      clients = await Client.findAll({
        attributes: ["id", "name", "phone", "email", "notes"],
        limit: 50, 
        order: [["createdAt", "DESC"]],
      });
    } else {
    
      clients = await Client.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `${query}%` } },
            { phone: { [Op.like]: `${query}%` } },
          ],
        },
        attributes: ["id", "name", "phone", "email", "notes"],
        limit: 50,
        order: [["createdAt", "DESC"]],
      });
    }

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports ={
  createClient,
  getClients ,
  searchClients
}