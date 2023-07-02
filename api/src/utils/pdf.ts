import PDFDocument from "pdfkit";
import fs from "fs";
import { Detail } from "../models/detail";

export const generatePDF = async (data: any, items: Detail[] | any) => {
  try {
    console.log(items);

    // Stream para escribir en un archivo
    const doc = new PDFDocument();

    // Stream for writing to a file
    const stream = fs.createWriteStream("files/invoice.pdf");

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
      .text("Invoice", { align: "center" });
    const imagePath = "./assets/allin.png"; // Reemplaza con la ruta de tu imagen
    const mx = -8;
    const my = -20;
    doc.image(imagePath, mx, my, {
      fit: [180, 180], // Ancho y alto de la imagen en puntos
      align: "center",
      valign: "center",
    });
    doc.moveDown();

    // Invoice details
    doc.font("Helvetica").fontSize(12).text(`Fecha: ${data.effectiveDate}`);
    doc.text(`Vigencia: ${data.revalidate}`, { align: "left" });
    doc.moveDown();

    // Definir los estilos de la tabla
    doc.font("Helvetica-Bold").fontSize(12);
    const margenSuperior = 200;
    const margenIzquierdo = 50;
    const margenDerecho = 50;

    // Definir los datos de la tabla
    const data2 = [
      ["Cliente", "BODEGA LUIGI BOSCA	"],
      ["Tipo de Servicio", "Flete Terrestre Container Full Expo"],
      ["Cantidad", "20DC / 40DC / 40HC carga general NO IMO	"],
      ["Sale Term", "CPT CHILE"],
      ["Origen", "Mendoza City Limits"],
      ["Destino Final", "San Antonio o Valparaiso"],
      ["Transit Time", "2"],
    ];
    const data3 = [
      ["Costo", ""],
      ["Tipo de Servicio", "Flete Terrestre Container Full Expo"],
      ["Cantidad", "20DC / 40DC / 40HC carga general NO IMO	"],
      ["Sale Term", "CPT CHILE"],
      ["Origen", "Mendoza City Limits"],
      ["Destino Final", "San Antonio o Valparaiso"],
      ["Transit Time", "2"],
    ];

    // Definir la posición inicial de la tabla
    let y = margenSuperior;

    // Definir el ancho de cada columna
    const columnWidth = (doc.page.width - margenIzquierdo - margenDerecho) / 2;
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Presupuesto: N° 2`, { align: "right" });
    // Definir los estilos de la tabla
    doc.font("Helvetica-Bold").fontSize(12);

    // Recorrer los datos y dibujar la tabla
    data3.forEach((row) => {
      let x = margenIzquierdo;

      row.forEach((cell) => {
        // Dibujar el texto en la celda
        doc.text(cell, x + 5, y + 5, {
          width: columnWidth - 10,
          align: "left",
        });

        // Dibujar los bordes de la celda
        doc.rect(x, y, columnWidth, 20).stroke();

        x += columnWidth;
      });

      y += 20; // Espacio entre filas
    });

    let yt2 = 400;

    // Definir el ancho de cada columna
    const columnWidth2 = (doc.page.width - margenIzquierdo - margenDerecho) / 2;

    // Recorrer los datos y dibujar la tabla
    data2.forEach((row) => {
      let x = margenIzquierdo;

      row.forEach((cell) => {
        // Dibujar el texto en la celda
        doc.text(cell, x + 5, yt2 + 5, {
          width: columnWidth2 - 10,
          align: "left",
        });

        // Dibujar los bordes de la celda
        doc.rect(x, yt2, columnWidth2, 20).stroke();

        x += columnWidth;
      });

      yt2 += 20; // Espacio entre filas
    });

    doc.moveDown();

    // Invoice total
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Total: $${data.profit.toFixed(2)}`, { align: "right" });
    doc.moveDown();
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(`Observaciones: $${data.observations}`, { align: "left" });
    doc.moveDown(2);
    doc
      .font("Times-Italic")
      .fontSize(11)
      .text(
        ` Carril Rodriguez Peña 2354
          interandes@is-sa.ar
          Tel: 2615-54554545
          www.is-sa.com.ar
        `,
        { align: "center" }
      );
    // Save and close the PDF
    doc.end();
    console.log("Plantilla de PDF de factura generada correctamente.");
  } catch (error) {
    throw error;
  }
};
