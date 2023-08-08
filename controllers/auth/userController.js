const path = require("path");
const db = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");
const { sendEmailWithInvoice } = require("../../services/mail");
const { creatPDF } = require("../../services/pdfBuilder");

exports.user = {
    fetchAllUsers: (req, res, next) => {
        const userId = req.query.id;
        const sql = `select * from crm_users where id<>${userId} and active=true`;
        
        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },

    sendInvoiceEmail: async(req, res, next) => {
        const {email, isProformaFile} = req.body;
        const publicPath = req.app.locals.publicPath;
        const fileName = isProformaFile ? "Proforma_Invoice":"Invoice";
        const assetPath = `${req.protocol}://${req.get('host')}/public`;

        const mailBody = {
            to: email,
            subject: "Testing email with attachment",
            html: `<h3>Testing Attachment</h3><br><p>This is the mail testing for attachment file</p>`,
            filename: `${fileName}.pdf`,
            filepath: path.join(publicPath, `${fileName}.pdf`)
        }
        
        const fileRes = await creatPDF(publicPath, fileName, assetPath);
        console.log((((fileRes["filename"]).split("\\")).at(-1)).split(".")[0]);
        const mailResponse = await sendEmailWithInvoice(mailBody, fileName);

        if(mailResponse==true) res.status(200).json({error: false, msg: "Invoice has been sent!"});
        else next(ErrorHandler.interServerError(mailResponse));
    }
};

