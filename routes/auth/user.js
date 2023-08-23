const express = require("express");
const router = express.Router();
const {login, registration, user} = require("../../controllers/index");


router.post("/login", login.userLogin);

router.post("/register", registration.userRegister);

router.get("/getInvoiceNum", user.fetchInvoiceNumber);

router.get("/updateInvoiceNum", user.updateInvoiceNumber);

router.get("/getAllUsers", user.fetchAllUsers);

router.post("/sendEmail", user.sendInvoiceEmail);

module.exports = router;
