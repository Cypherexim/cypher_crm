const { currentGreeting } = require("./timeConvertor");

exports.mailSubjects = (subjectType) => {
    const subjects = {
        online: "PROFORMA INVOICE- FOR ONLINE PORTAL",
        offline: "PROFORMA INVOICE FOR OFFLINE REPORTS",
        taxInvoice: "THIS MESSAGE FOR TAX INVOICES"
    };
    return subjects[subjectType];
}

exports.taxInvoiceTemplate = (clientName) => `
<div>Dear ${clientName},</div>
<br><br><br>
<div>Thanks for dealing with us</div>
<br><br>
<div>Please find the attached TAX INVOICE.</div>
<br><br><br><br>
<div style="font-size:15pt;"><b>---</b></div>
<div style="font-family:Arial,Helvetica,sans-serif;color:#3d85c6;font-weight:700;font-size:18px;letter-spacing:-0.5px;margin-bottom:-5px;">Thanks & Regards</div>
<div style="font-size:14pt;letter-spacing:0.2px;"><b>Shobhna Dhakoliya</b></div>
<div><b style="font-size:10pt;">Accountant</b></div>
<div><b style="font-size:10pt;">Email Id:-</b> <a href="#" style="font-weight:bold;letter-spacing:0.2px;">accounnts.eximine@gmail.com</a></div>
<br>
`;

exports.emailTemplate = (clientName, mediumType, sellerName) => `
<div>Dear ${clientName},</div>
<br>
<div>Good ${currentGreeting} !!!</div>
<br><br>
<div>Thanks for the dealing with us,</div>
<br>
<div>This mail is regarding ${mediumType=="online"?"Online Portal":"offline report"}.</div>
<br><br>
<div>As per your discussion with Ms. ${sellerName}, Here I am sending you the Proforma Invoice for the same (please find the attachment) . Kindly do the needful, so we can proceed further.</div>
<br>
<div>As soon as your Payment will be received in the company account, We will share the tax invoice with you, and ${mediumType=="online" ? "your login details will be released within 1 or 2": "we will send you the reports within 24"} working hours after receiving the payment.</div>
<div>So request you to be patient with us.</div>
<br><br>
<div><b>Bank Details:</b></div>
<div>Eximine Private Limited</div>
<div><span style="font-weight:600;">Bank Name:</span> ICICI BANK LIMITED</div>
<div><span style="font-weight:600;">Branch:</span> PARLIAMENT STREET, NEW DELHI-01</div>
<div><span style="font-weight:600;">Account No.:</span> 663705600902</div>
<div><span style="font-weight:600;">IFSC:</span> ICIC0006637</div>
<br>
<div><b>Payment Terms:</b></div>
<div>100% Advance</div>
<div>If you have any query please feel free to contact us</div>
<br><br><br><br><br>
<div style="font-size:15pt;"><b>---</b></div>
<div style="font-family:Arial,Helvetica,sans-serif;color:#3d85c6;font-weight:700;font-size:18px;letter-spacing:-0.5px;margin-bottom:-5px;">Thanks & Regards</div>
<div style="font-size:14pt;letter-spacing:0.2px;"><b>Shobhna Dhakoliya</b></div>
<div><b style="font-size:10pt;">Accountant</b></div>
<div><b style="font-size:10pt;">Email Id:-</b> <a href="#" style="font-weight:bold;letter-spacing:0.2px;">accounnts.eximine@gmail.com</a></div>
<br>
`;



