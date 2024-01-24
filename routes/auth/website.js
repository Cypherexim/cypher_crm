const express = require("express");
const router = express.Router();
const {website} = require("../../controllers/index");

router.post("/signup", website.register);

router.post("/buy_package", website.checkoutPackage);

router.post("/add_demo", website.demoSchedule);

router.get("/continent_countries", website.countriesData);

module.exports = router;
