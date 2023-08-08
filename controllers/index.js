const {registration} = require("./auth/registrationController");
const {login} = require("./auth/loginController");
const {lead} = require("./auth/leadController");
const {user} = require("./auth/userController");
const {website} = require("./auth/websiteController");

module.exports = {registration, login, lead, user, website};
