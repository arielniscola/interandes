import PDFDocument from "pdfkit";
import fs from "fs";

export const generateSalesOrderPDF = async () => {
  try {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("files/declaracioEmbarque.pdf"));
    doc.page.margins.bottom = 0;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("BILL OF LANDING", { align: "center" });
    doc.font("Helvetica-Bold").fontSize(10).text("Draft", { align: "right" });
    const imagePath = "./assets/allin.png"; // Reemplaza con la ruta de tu imagen
    const mx = 10;
    const my = -20;
    doc.image(imagePath, mx, my, {
      fit: [160, 160], // Ancho y alto de la imagen en puntos
      align: "center",
      valign: "center",
    });
    doc.moveDown();

    // Crear una función para dibujar una celda en la tabla
    function drawCell(
      text: string,
      x: number,
      y: number,
      width: number,
      height: number,
      align?: string
    ) {
      doc.fontSize(6);
      doc.lineWidth(0.5);
      doc.rect(x, y, width, height).stroke();
      doc.text(text, x + 5, y + 5, {
        width: width - 20,
        align: align || "left",
      });
    }
    // Primera fila
    drawCell(
      "SHIPPER / EXPORTER (COMPLETE NAME AND ADDRESS)",
      20,
      100,
      350,
      60
    );
    drawCell("BILL OF LADING No.", 370, 100, 220, 20);
    drawCell("BOOKING NRO.:", 370, 120, 220, 20);
    drawCell("EXPORT REFERENCES", 370, 140, 220, 20);
    // Segunda fila
    drawCell("CONSIGNEE (COMPLETE NAME AND ADDRESS)", 20, 160, 350, 60);
    drawCell("FORWARDING AGENT REFERENCES", 370, 160, 220, 30);
    drawCell("POINT AND COUNTRY OF ORIGIN:", 370, 190, 220, 30);
    // Tercer fila
    drawCell("NOTIFY PARTY (COMPLETE NAME AND ADDRESS)", 20, 220, 350, 60);
    drawCell("PLACE OF RECEIPT", 20, 280, 350, 20);
    drawCell("DOCUMENT PRESENTATION", 370, 220, 220, 80);
    // Cuarta fila
    drawCell("OCEAN VESSEL / VOYAGE", 20, 300, 175, 25);
    drawCell("PORT OF LOADING", 20, 325, 175, 25);
    drawCell("PORT OF DISCHARGE", 195, 300, 175, 25);
    drawCell("PLACE OF DELIVERY", 195, 325, 175, 25);
    drawCell("INTERNAL REFERENCE", 370, 300, 220, 50);
    // Quinta fila
    drawCell("PARTICULARS FURNISHED BY SHIPPER", 20, 350, 570, 15, "center");
    // Sexta fila
    drawCell("MARKS NOS./CONTAINER(S) NOS.", 20, 365, 120, 15, "center");
    drawCell("NO. OF PKGS.", 140, 365, 70, 15, "center");
    drawCell("DESCRIPTION OF PACKAGES AND GOODS", 210, 365, 200, 15, "center");
    drawCell("GROSS WEIGHT", 410, 365, 90, 15, "center");
    drawCell("MEASUREMENT", 500, 365, 90, 15, "center");
    // Septima fila
    drawCell("", 20, 380, 120, 100, "center");
    drawCell("", 140, 380, 70, 100, "center");
    drawCell("", 20, 480, 190, 20, "center");
    drawCell("", 210, 380, 200, 120, "center");
    drawCell("", 410, 380, 90, 120, "center");
    drawCell("", 500, 380, 90, 120, "center");
    // Octava fila
    drawCell(
      `
    RECEIVED FOR SHIPMENT from the MERCHANT in
    apparent good order and condition unless otherwise
    stated herein, the GOODS mentioned above to be
    transported as provide herein, by any mode mode of
    transport for all or any part of the Carriage.
    SUBJECT TO ALL THE TERMS AND CONDITIONS
    appearing on the face and back hereof and in the
    CARRIER&#39;S applicable Tariff, to which the Merchant
    agrees by accepting this BILL OF LADING.

    Where applicable law requires and not otherwise, one
    original BILL OF LADING must be surrended, duly
    endorsed, in exchange for the GOODS or
    CONTAINER(S), or other PACKAGE(S), the others to
    stand void. If a &quot;Non-Negotiable&quot; BILL OF LADING is
    issued, neither an original nor a copy need by
    surrended in exchange for delivery unless applicable
    law so requires.`,
      380,
      500,
      210,
      220,
      "center"
    );
    drawCell("DECLARED VALUE $", 20, 500, 360, 15);
    drawCell("CHARGES, INCLUDING FREIGHT", 20, 515, 360, 15);
    drawCell("", 20, 530, 120, 150);
    drawCell("", 140, 530, 80, 150);
    drawCell("", 220, 530, 80, 150);
    drawCell("", 300, 530, 80, 150);

    drawCell("Place and date of issue", 20, 680, 120, 40);
    drawCell("", 140, 680, 80, 40);
    drawCell("", 220, 680, 80, 40);
    drawCell("No. Of Original Bls", 300, 680, 80, 40);

    drawCell("", 20, 720, 570, 15, "center");
    // Otra pagina
    doc.addPage();
    drawCell("B/L No:", 20, 20, 285, 15);
    drawCell("Attachment 1 of 1", 305, 20, 285, 15);
    drawCell("Vessel:", 20, 35, 285, 15);
    drawCell("Port of Loading:", 305, 35, 285, 15);
    drawCell("Voyage:", 20, 50, 285, 15);
    drawCell("Port of Discharge:", 305, 50, 285, 15);

    // 2 fila pag 2
    drawCell("MARKS NOS./CONTAINER(S) NOS.", 20, 65, 120, 15, "center");
    drawCell("NO. OF PKGS.", 140, 65, 70, 15, "center");
    drawCell("DESCRIPTION OF PACKAGES AND GOODS", 210, 65, 200, 15, "center");
    drawCell("GROSS WEIGHT", 410, 65, 90, 15, "center");
    drawCell("MEASUREMENT", 500, 65, 90, 15, "center");
    // Columnas vacias
    drawCell("", 20, 80, 120, 600, "center");
    drawCell("", 140, 80, 70, 600, "center");
    drawCell("", 210, 80, 200, 600, "center");
    drawCell("", 410, 80, 90, 600, "center");
    drawCell("", 500, 80, 90, 600, "center");
    // Ultima fila
    drawCell("Place and Date of Issue of B/L:", 20, 680, 285, 20, "center");
    drawCell(
      "Issued as agent for ALL IN ocean carrier by:",
      305,
      680,
      285,
      20,
      "center"
    );
    // Finalizar y guardar el PDF
    doc.end();
  } catch (error) {
    throw error;
  }
};
