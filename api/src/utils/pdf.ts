import PDFDocument from "pdfkit";
import fs from "fs";
import { IDetail } from "../models/detail";
import moment from "moment";
import { getCompanyByName } from "../services/company";
import path from "path";

export const generatePDF = async (data: any, items: IDetail[] | any) => {
  try {
    // Stream para escribir en un archivo
    const doc = new PDFDocument();
    // Stream for writing to a file
    const stream = fs.createWriteStream("files/cotizacion.pdf");
    doc.page.margins.bottom = 0;
    // Document setup
    doc.pipe(stream);
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Definir las coordenadas de los puntos del triángulo
    const x1 = pageWidth;
    const y1 = 0;
    const x2 = pageWidth - 250;
    const y2 = 0;
    const x3 = pageWidth;
    const y3 = 100;

    const colorAzul = "#008FEB";
    // Dibujar el triángulo
    doc
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .lineTo(x3, y3)
      .lineTo(x1, y1)
      .fill(colorAzul, "even-odd");

    doc
      .moveTo(0, 0)
      .lineTo(450, 0)
      .lineTo(0, 100)
      .lineTo(0, 0)
      .fill("#E6E6EA", "even-odd");
    doc
      .moveTo(0, pageHeight)
      .lineTo(200, pageHeight)
      .lineTo(0, pageHeight - 200)
      .lineTo(0, pageHeight)
      .fill("#00416B", "even-odd");
    doc
      .moveTo(0, pageHeight)
      .lineTo(pageWidth, pageHeight)
      .lineTo(0, pageHeight - 120)
      .lineTo(0, pageHeight)
      .fill(colorAzul, "even-odd");
    // doc.rect(200, 0, 100, 50).fill("#008FEB");
    // Add content to the PDF
    doc.fillColor("black");
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("Cotización", { align: "center" });
    // const imagePath = "./assets/allin.png";
    /** Buscar logo de la empresa */
    const company = await getCompanyByName(data.companyname);
    const imagePathSplit = company.logo.split("\\");
    const imagePath = path.join("uploads", imagePathSplit.at(-1));
    const mx = 0;
    const my = -20;
    doc.image(imagePath, mx, my, {
      fit: [180, 180], // Ancho y alto de la imagen en puntos
      align: "center",
      valign: "center",
    });
    function drawCell(
      text: string,
      x: number,
      y: number,
      width: number,
      height: number,
      align?: string,
      fontType?: string
    ) {
      doc.fontSize(8);
      doc.font(fontType || "Helvetica-Bold");
      doc.lineWidth(0.5);
      doc.rect(x, y, width, height).stroke();
      doc.text(text, x + 5, y + 5, {
        width: width - 20,
        align: align || "left",
      });
    }
    doc.moveDown();

    // Invoice details
    doc
      .font("Helvetica")
      .fontSize(12)
      .text(
        `Fecha: ${moment(data.effectiveDate).format("DD/MM/YYYY")}`,
        30,
        140
      );
    doc
      .font("Helvetica")
      .fontSize(12)
      .text(
        `Vigencia: ${moment(data.revalidate).format("DD/MM/YYYY")}`,
        350,
        140
      );

    // Definir los estilos de la tabla
    doc.font("Helvetica-Bold").fontSize(10);

    drawCell("CLIENTE", 30, 170, 250, 15, "left");
    drawCell(
      `${data.Client.companyname}`,
      280,
      170,
      250,
      15,
      "center",
      "Helvetica"
    );
    drawCell("TIPO DE SERVICIO", 30, 185, 250, 15, "left");
    drawCell(`${data.operationType}`, 280, 185, 250, 15, "center", "Helvetica");
    drawCell("CANTIDAD", 30, 200, 250, 15, "left");
    drawCell(`${data.qty}`, 280, 200, 250, 15, "center", "Helvetica");
    drawCell("SALE TERM", 30, 215, 250, 15, "left");
    drawCell(`${data.saleTerm}`, 280, 215, 250, 15, "center", "Helvetica");
    drawCell("ORIGEN", 30, 230, 250, 15, "left");
    drawCell(`${data.origin}`, 280, 230, 250, 15, "center", "Helvetica");
    drawCell("ADUANA DESTINO", 30, 245, 250, 15, "left");
    drawCell(`${data.customDestiny}`, 280, 245, 250, 15, "center", "Helvetica");
    drawCell("DESTINO FINAL", 30, 260, 250, 15, "left");
    drawCell(`${data.finalDestiny}`, 280, 260, 250, 15, "center", "Helvetica");
    drawCell("TRANSIT TIME ESTIMADO", 30, 275, 250, 15, "left");
    drawCell(
      `${data.estimateTransitTime}`,
      280,
      275,
      90,
      15,
      "center",
      "Helvetica"
    );
    drawCell("TRASBORDO", 370, 275, 90, 15, "left");
    drawCell(`${data.transshipment}`, 460, 275, 70, 15, "center", "Helvetica");
    drawCell("", 30, 290, 500, 20);
    // Items
    drawCell("TARIFA", 30, 310, 500, 15, "left");
    drawCell("Concepto", 30, 325, 125, 15, "center", "Helvetica");
    drawCell("Unitario", 155, 325, 125, 15, "center", "Helvetica");
    drawCell("Cantidad", 280, 325, 125, 15, "center", "Helvetica");
    drawCell("Total", 405, 325, 125, 15, "center", "Helvetica");

    // Calcular el total
    let total = 0;
    let currency = "";
    let line = 0;
    items.forEach((item: IDetail) => {
      // if(item.typeItem === "sale")
      drawCell(item.item, 30, 340 + line, 125, 15, "center", "Helvetica");
      drawCell(
        `${item.currency}  ${item.price}`,
        155,
        340 + line,
        125,
        15,
        "center",
        "Helvetica"
      );
      drawCell(
        `${item.units}`,
        280,
        340 + line,
        125,
        15,
        "center",
        "Helvetica"
      );
      drawCell(
        `${item.currency}  ${item.subtotal}`,
        405,
        340 + line,
        125,
        15,
        "center",
        "Helvetica"
      );
      total += item.subtotal;
      currency = item.currency;
      line += 15;
    });

    // drawCell("Emisión MIC /CRT", 30, 355, 125, 15, "center", "Helvetica");
    // drawCell("USD 50,00", 155, 355, 125, 15, "center", "Helvetica");
    // drawCell("1", 280, 355, 125, 15, "center", "Helvetica");
    // drawCell("USD 50,00", 405, 355, 125, 15, "center", "Helvetica");
    // drawCell("", 30, 370, 500, 20);
    drawCell("MONTO TOTAL", 30, 390 + line - 30, 250, 20, "", "Helvetica-Bold");
    drawCell(
      `${currency} ${total}`,
      280,
      390 + line - 30,
      250,
      20,
      "center",
      "Helvetica-Bold"
    );
    //Incluye y no Incluye
    drawCell("INCLUYE", 30, 410 + line - 30, 500, 20);
    drawCell(data.observations, 30, 430 + line - 30, 500, 100);
    drawCell("NO INCLUYE", 30, 530 + line - 30, 500, 20);
    drawCell(data.conditions, 30, 550 + line - 30, 500, 100);
    doc
      .font("Times-Italic")
      .fontSize(11)
      .text(
        ` Carril Rodriguez Peña 2354
          interandes@is-sa.ar
          Tel: 2615-54554545
          www.is-sa.com.ar
        `,
        350,
        680 + line - 30,
        { align: "right" }
      );
    // Save and close the PDF
    doc.end();
    return stream;
  } catch (error) {
    throw error;
  }
};
