const express = require("express");
const router = express.Router();
const {lead} = require("../../controllers/index");

router.get("/getOpenLeads", lead.fetchOpenLeads);

router.get("/getCloseLeads", lead.fetchCloseLeads);

router.delete("/deleteOpenLead", lead.deleteOpenLead);

router.get("/getRejectLeads", lead.fetchRejectLeads);

router.post("/addRejectLead", lead.insertRejectLead);

router.delete("/deleteRejectLead", lead.deleteRejectLead);

router.get("/getFollowupLeads", lead.fetchFollowupLeads);

router.delete("/deleteFollowupLead", lead.deleteFollowupLead);

router.post("/addSingleLead", lead.insertOpenLead);

router.post("/addMultipleLeads", lead.insertExcelOpenLeads);

router.post("/revertToOpenLeads", lead.revertOpenLead);

router.post("/updateOpenLead", lead.updateSingleLead);

router.post("/addFollowupLead", lead.insertFollowupLead);

router.post("/addDemoLead", lead.insertDemoLead);

router.get("/getDemoLeads", lead.fetchDemoLeads);

router.delete("/deleteDemoLead", lead.deleteDemoLead);

router.post("/addStatusLead", lead.insertStatusLead);

router.get("/getStatusLead", lead.fetchStatusLead);

router.post("/updateStatusLead", lead.updateStatusLead);

router.delete("/deleteStatusLead", lead.deleteStatusLead);

router.get("/getPriceLeads", lead.fetchPriceLeads);

router.post("/addPriceLead", lead.insertPriceLead);

router.delete("/deletePriceLead", lead.deletePriceLead);

router.post("/addInvoiceLead", lead.insertInvoiceLead);

router.get("/getInvoiceLeads", lead.fetchInvoiceLeads);

router.get("/deleteInvoiceLead", lead.deleteInvoiceLead);

module.exports = router;
