const path = require("path");
const db = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");
const { sendEmailWithInvoice } = require("../../services/mail");
const { creatPDF } = require("../../services/pdfBuilder");

exports.user = {
    fetchAllUsers: (req, res, next) => {
        const userId = req.query.id;
        const sql = userId 
                ? `select * from crm_users where id<>${userId} and active=true`
                : "select * from crm_users where active=true";
        
        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    sendInvoiceEmail: async(req, res, next) => {
        const {userData, isProformaFile} = req.body;
        const publicPath = req.app.locals.publicPath;
        const fileName = isProformaFile ? "Proforma_Invoice":"Invoice";
        const assetPath = `${req.protocol}://${req.get('host')}/public`;

        const mailBody = {
            to: userData?.email,
            subject: "Testing email with attachment",
            html: `<h3>Testing Attachment</h3><br><p>This is the mail testing for attachment file</p>`,
            filename: `${fileName}.pdf`,
            filepath: path.join(publicPath, `${fileName}.pdf`)
        };

        const paths = {filePath: publicPath, assetPath};
        const fileRes = await creatPDF(fileName, paths);
        console.log((((fileRes["filename"]).split("\\")).at(-1)).split(".")[0]);

        const mailResponse = await sendEmailWithInvoice(mailBody, fileName);

        if(mailResponse==true) res.status(200).json({error: false, msg: "Invoice has been sent!"});
        else next(ErrorHandler.internalServerError(mailResponse));
    },

    fetchInvoiceNumber: (req, res, next) => {
        const sql = "select * from crm_tracker";
        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    updateInvoiceNumber: (req, res, next) => {
        const {column} = req.query;
        const sql = "select * from crm_tracker";
        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {
                    const currentNum = result.rows[0][column];
                    const sql2 = `update crm_tracker set ${column}=${currentNum+1}`;

                    db.query(sql2, (err2, result2) => {
                        if(err2) {next(ErrorHandler.internalServerError(err2.message));}
                        else res.status(200).json({error: false, result: result.rows});
                    });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    }
};

