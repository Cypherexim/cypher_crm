const nodemailer = require("nodemailer");
const fs = require("fs");

const transport = nodemailer.createTransport({
    host: "mail.myeximpanel.com",
    port: 465,
    auth: {
        user: "no-reply@myeximpanel.com",
        pass: "Dollar$1234@"
    }
});


exports.sendEmailWithInvoice = (emailBody) => {
    return new Promise((resolve, reject) => {
        try {
            const {to, subject, html, filename, filepath} = emailBody;
            const mailOptions = {
                from: "no-reply@myeximpanel.com",
                to, subject, html: mailBodyContent(html),
                attachments: [ { filename, path: filepath } ]
            };

            transport.sendMail(mailOptions, async(error, info) => {
                if (error) {return reject(error);} 
                else {
                    fs.unlinkSync(filepath);
                    return resolve(true);
                }
            });
        } catch (error) {return reject(error);}
    });
}

const mailBodyContent = (body) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <title>Email</title>
        </head>
        <body>${body}</body>
        </html>
    `;
}


