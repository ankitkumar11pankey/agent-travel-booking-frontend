const Company = require("../models/companyModel");


exports.createOrFetchCompany = async (req, res) => {
  try {
    const {
      name,
      gstNumber,
      panNumber,
      contactPerson,
      phone,
      email,
      addressLine1,
      city,
      state,
      postalCode,
      country,
      isActive,
      notes,
      createdBy,
    } = req.body;

    let existingCompany;

 
    if (gstNumber) {
      existingCompany = await Company.findOne({ where: { gstNumber } });
    } else {
    
      existingCompany = await Company.findOne({
        where: { name, panNumber },
      });
    }

 
    if (existingCompany) {
      return res.status(200).json({
        success: true,
        message: "Company already exists",
        company: existingCompany,
        autofill: true,
      });
    }


    const newCompany = await Company.create({
      name,
      gstNumber: gstNumber || null,
      panNumber,
      contactPerson,
      phone,
      email,
      addressLine1,
      city,
      state,
      postalCode,
      country: country || "India",
      isActive: isActive !== undefined ? isActive : true,
      notes,
      createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "New company created successfully",
      company: newCompany,
      autofill: false,
    });
  } catch (error) {
    console.error("Error in createOrFetchCompany:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
      error: error.message,
    });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company)
      return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ success: true, company });
  } catch (err) {
    console.error("Error fetching company:", err);
    res.status(500).json({ message: "Error fetching company", error: err.message });
  }
};
