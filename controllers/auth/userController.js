const path = require("path");
const db = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");
const { sendEmailWithInvoice } = require("../../services/mail");
const { creatPDF } = require("../../services/pdfBuilder");
const { mailSubjects, taxInvoiceTemplate, emailTemplate } = require("../../utils/mailTemplate");

exports.user = {
    fetchAllUsers: (req, res, next) => {
        const userId = req.query.id;
        const sql = userId
            ? `select * from crm_users where id<>${userId} and active=true`
            : "select * from crm_users where active=true";

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    
    sendInvoiceEmail: async (req, res, next) => {
        try {
            const { userData, hasAttachement } = req.body;
            const publicPath = req.app.locals.publicPath;
            const assetPath = `${req.protocol}://${req.get('host')}/public`;
            const mailBody = {};

            if (userData?.isEmailSent) {
                const { clientName, dataType, clientEmail } = userData;
                mailBody["to"] = clientEmail;
                mailBody["subject"] = mailSubjects(dataType);
                mailBody["html"] = dataType == "taxInvoice" ? taxInvoiceTemplate(clientName) : emailTemplate(clientName, dataType);

                if (hasAttachement != "none") {
                    const fileName = hasAttachement == "proforma" ? "Proforma_Invoice" : "Invoice";
                    mailBody["filename"] = `${fileName}.pdf`;
                    mailBody["filepath"] = path.join(publicPath, `${fileName}.pdf`);

                    //------ file is creating here --------//
                    const paths = { filePath: publicPath, assetPath };
                    const fileRes = await creatPDF(userData, fileName, paths, hasAttachement);
                    console.log((((fileRes["filename"]).split("\\")).at(-1)).split(".")[0]);
                }
            }

            const mailResponse = await sendEmailWithInvoice(mailBody, hasAttachement);

            if (mailResponse == true) res.status(200).json({ error: false, msg: "Invoice has been sent!" });
            else next(ErrorHandler.internalServerError(mailResponse));
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    sendTaxInvoiceMail: async (req, res, next) => {
        try {
            const { userData } = req.body;
            const { clientName, clientEmail } = userData;            
            const publicPath = req.app.locals.publicPath;
            const assetPath = `${req.protocol}://${req.get('host')}/public`;
            const mailBody = {
                to: clientEmail,
                subject: mailSubjects("taxInvoice"),
                html: taxInvoiceTemplate(clientName),
                filename: "Invoice.pdf",
                filepath: path.join(publicPath, "Invoice.pdf"),
            };
            
            //------ file is creating here --------//
            const paths = { filePath: publicPath, assetPath };
            const fileRes = await creatPDF(userData, "Invoice", paths, "tax");
            console.log((((fileRes["filename"]).split("\\")).at(-1)).split(".")[0]);
            

            const mailResponse = await sendEmailWithInvoice(mailBody, "tax");

            if (mailResponse == true) res.status(200).json({ error: false, msg: "Tax Invoice has been sent!" });
            else next(ErrorHandler.internalServerError(mailResponse));
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchInvoiceNumber: (req, res, next) => {
        const sql = "select * from crm_tracker";
        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    updateInvoiceNumber: (req, res, next) => {
        const { column } = req.query;
        const sql = "select * from crm_tracker";
        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    const currentNum = result.rows[0][column];
                    const sql2 = `update crm_tracker set "${column}"=${currentNum + 1}`;

                    db.query(sql2, (err2, result2) => {
                        if (err2) { next(ErrorHandler.internalServerError(err2.message)); }
                        else res.status(200).json({ error: false, result: result.rows });
                    });
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    }
};

