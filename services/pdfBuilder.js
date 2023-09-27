const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");

exports.creatPDF = async(userData, filename, path) => {
  const htmlFile = fs.readFileSync(path.join(`${path?.filePath}/invoice_template.html`), "utf8");
  const document = {
    html: htmlFile, 
    path: `${path?.filePath}/${filename}.pdf`,
    type: "pdf", 
    data: {
      invoiceTitle: filename.includes("Proforma") ? "PROFORMA INVOICE" : "INVOICE",      
      orderNum: "11488",
      invoiceNum: "10-Feb-2023",
      userName: "Mr. Kamal Middha",
      companyName: "Rocktek infra Service pvt. ltd",
      shippingAddLine1: "302/23, Gaurav Tower, Pvr Sonia Complex, Vikas Puri, New Delhi-110018",
      shippingAddLine2: "NEW DELHI, Delhi-110018",
      billingAddLine1: "302/23, Gaurav Tower, Pvr Sonia Complex, Vikas Puri, New Delhi-110018",
      billingAddLine2: "NEW DELHI, Delhi-110018",
      clientGstNum: "07AADCR2313K1ZJ",
      phoneNum: "9711202504",
      reportType: "MARKET ANALYSIS REPORT OF 6 MONTHS",
      duration: "6 Months (Feb-23 to 15th Aug-23)",
      hsnSac: "998371",
      quantity: "1",
      unit: "no.s",
      amtBeforeTax: "15,000",
      taxAmt: "9,000",
      cgst: "9.00%",
      cgstAmt: "1,350.0",
      sgst: "9.00%",
      sgstAmt: "1,350.0",
      igst: "18.00%",
      amtAfterTax: "24,000",
      amtInWords: "Rupees Seventeen Thousand Seven Hundred only",
      bankName: "ICICI BANK LIMITED",
      bankBranch: "PARLIAMENT STREET, NEW DELHI-01",
      bankAccount: "663705600902",
      bankIfsc: "ICIC0006637",
      heroLogo: `${path?.assetPath}/Eximine.png`,
      stampImg: `${path?.assetPath}/stamp1.png`,
    }
  };
  const options = {
    format: "A4",
    orientation: "portrait",
    border: "2mm"
  };
  
  const response = await pdf.create(document, options);
  return response;
}
