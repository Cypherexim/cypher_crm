const express = require("express");
const router = express.Router();
const {general} = require("../../controllers/index");

router.get("/getAllCompanies", general.fetchCompanies);

router.get("/getSingleCompany", general.fetchSingleCompanyData);

module.exports = router;
