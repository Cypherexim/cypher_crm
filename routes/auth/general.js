const express = require("express");
const router = express.Router();
const {general} = require("../../controllers/index");

router.get("/getAllCompanies", general.fetchCompanies);

router.get("/getSingleCompany", general.fetchSingleCompanyData);

router.get("/getEmailExistanceResponse", general.fetchEmailExistance);

router.get("/getAllEmailsList", general.fetchAllEmails);

router.get("/getAllUserRoles", general.fetchAllRoles);

router.get("/getRolePermission", general.fetchRolePermission);

module.exports = router;
