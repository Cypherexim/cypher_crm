const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");

exports.creatPDF = async(filePath, filename, assetPath) => {
  const htmlFile = fs.readFileSync(path.join(`${filePath}/invoice_template.html`), "utf8");
  const document = {
    html: htmlFile, 
    path: `${filePath}/${filename}.pdf`,
    type: "pdf", 
    data: {
      heroLogo: `${assetPath}/Eximine.png`,
      stampImg: `${assetPath}/stamp1.png`,
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
