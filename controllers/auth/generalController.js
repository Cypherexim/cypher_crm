const db = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

exports.general = {
    fetchCompanies: (req, res, next) => {
        const sql = 'select id, company_name from "crm_masterLeads" where active=true';

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    
    fetchSingleCompanyData: (req, res, next) => {
        const sql = `select id, company_name, name, designation, department, address, contact, email, location, 
        gst_num, pan_num, iec_num, source, transaction_time, active, source_detail from "crm_masterLeads" 
        where id=${req.query?.leadId} and active=true`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchEmailExistance: (req, res, next) => {
        const sql = `select * from "crm_masterLeads" where email='${req.query.email}'`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { 
                    if(result.rows.length>0) { res.status(200).json({ error: false, flag: "EXIST" }); }
                    else { res.status(200).json({ error: false, flag: "NOT EXIST" }); }
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchAllEmails: (req, res, next) => {
        const sql = `select distinct email from "crm_masterLeads" where active=true`;
        
        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    }
}
