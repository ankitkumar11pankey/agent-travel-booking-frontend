const express = require("express");
const router = express.Router();
const { createOrFetchCompany, getAllCompanies, getCompanyById } = require("../controllers/companyController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/create-company", authenticate, createOrFetchCompany);

router.get("/get-companies", authenticate, getAllCompanies);


router.get("/get-company/:id", authenticate, getCompanyById);

module.exports = router;
