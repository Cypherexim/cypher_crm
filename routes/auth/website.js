const express = require("express");
const router = express.Router();
const {website} = require("../../controllers/index");

router.post("/signup", website.register);

router.post("/buy_package", website.checkoutPackage);

router.post("/add_demo", website.demoSchedule)

module.exports = router;
