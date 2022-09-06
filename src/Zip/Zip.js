
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const ZipFiles = (pdfData, worker) => {
    var zip = new JSZip();
    var pdf = zip.folder("reports");
    console.log(pdfData)
    pdf.file(worker + ".pdf", pdfData, { base64: true });
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // see FileSaver.js
            // saveAs(content, "reports.zip");
        });
}

export default ZipFiles