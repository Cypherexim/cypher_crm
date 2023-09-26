const {registration} = require("./auth/registrationController");
const {login} = require("./auth/loginController");
const {lead} = require("./auth/leadController");
const {user} = require("./auth/userController");
const {website} = require("./auth/websiteController");
const {general} = require("./auth/generalController");

module.exports = {registration, login, lead, user, website, general};
