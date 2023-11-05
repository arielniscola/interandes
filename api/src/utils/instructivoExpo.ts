import PDFDocument from "pdfkit";
import fs from "fs";
import { IContainer } from "../models/container";

export const generateInstructivoPDF = async (containers: IContainer[]) => {
  try {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("files/instructivo.pdf"));
    doc.page.margins.bottom = 0;
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("INSTRUCTIVO DE CARGA EXPORTACION", { align: "center" });
    doc.font("Helvetica-Bold").fontSize(10).text(`Fecha: 20/11/23`, 450, 50);
    doc.font("Helvetica-Bold").fontSize(10).text(`Cod. R-IS-02`, 450, 62);
    doc.font("Helvetica-Bold").fontSize(10).text(`Rev. 00`, 450, 74);
    const imagePath = "./assets/allin.png";
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
      align?: string,
      fontType?: string
    ) {
      doc.fontSize(8);
      doc.font(fontType || "Helvetica-Bold");
      doc.lineWidth(1);

      doc.rect(x, y, width, height).stroke();
      doc.text(text, x + 5, y + 5, {
        width: width - 20,
        align: align || "left",
      });
    }
    // Primera fila
    drawCell("Orden de Venta N°", 200, 100, 100, 20, "center");
    drawCell(`SO 1066`, 300, 100, 100, 20, "center");
    drawCell("CUSTOMER", 200, 120, 100, 20, "center");
    drawCell(`TALIA TERRAZAS`, 300, 120, 100, 20, "center");

    //Tabla instructivo
    drawCell(
      "INSTRUCTIVO DE CARGA",
      30,
      150,
      500,
      15,
      "center",
      "Helvetica-Bold"
    );
    drawCell("CLIENTE", 30, 165, 250, 15, "center");
    drawCell(`DASA`, 280, 165, 250, 15, "center", "Helvetica");
    drawCell("DESPACHANTE", 30, 180, 250, 15, "center");
    drawCell("DESPACHANTE", 280, 180, 250, 15, "center", "Helvetica");
    drawCell("FECHA DE CARGA", 30, 195, 250, 15, "center");
    drawCell("FECHA DE CARGA", 280, 195, 250, 15, "center", "Helvetica");
    drawCell("LUGAR DE CARGA", 30, 210, 250, 15, "center");
    drawCell("LUGAR DE CARGA", 280, 210, 250, 15, "center", "Helvetica");
    drawCell("HORARIO DE CARGA", 30, 225, 250, 15, "center");
    drawCell("HORARIO DE CARGA", 280, 225, 250, 15, "center", "Helvetica");
    drawCell("FACTURA", 30, 240, 250, 15, "center");
    drawCell("VX0628", 280, 240, 250, 15, "center", "Helvetica");
    drawCell("DESTINO FINAL", 30, 255, 250, 15, "center");
    drawCell("", 280, 255, 100, 15, "center", "Helvetica");
    drawCell("ETA", 380, 255, 50, 15, "center");
    drawCell("03/11/2023", 430, 255, 100, 15, "center", "Helvetica");
    drawCell("TRANSPORTE", 30, 270, 250, 15, "center");
    drawCell("", 280, 270, 250, 15, "center", "Helvetica");
    drawCell("BANDERA", 30, 285, 250, 15, "center");
    drawCell("", 280, 285, 250, 15, "center", "Helvetica");
    drawCell("ATA/CUIT", 30, 300, 250, 15, "center");
    drawCell("", 280, 300, 250, 15, "center", "Helvetica");
    drawCell("LUGAR DE ADUANA", 30, 315, 250, 15, "center");
    drawCell("", 280, 315, 250, 15, "center", "Helvetica");
    drawCell("ATA MARIT/CUIT", 30, 330, 250, 15, "center");
    drawCell("", 280, 330, 250, 15, "center", "Helvetica");
    drawCell("POL", 30, 345, 250, 15, "center");
    drawCell("", 280, 345, 250, 15, "center", "Helvetica");
    drawCell("NAVIERA", 30, 360, 250, 15, "center");
    drawCell("", 280, 360, 250, 15, "center", "Helvetica");
    drawCell("BUQUE/ETS", 30, 375, 250, 15, "center");
    drawCell("", 280, 375, 250, 15, "center", "Helvetica");
    drawCell("VIAJE/BANDERA", 30, 390, 250, 15, "center");
    drawCell("", 280, 390, 250, 15, "center", "Helvetica");
    drawCell("CUT OFF FISICO", 30, 405, 250, 15, "center");
    drawCell("", 280, 405, 250, 15, "center", "Helvetica");
    drawCell("CUT OFF DOCUMENTAL", 30, 420, 250, 15, "center");
    drawCell("", 280, 420, 250, 15, "center", "Helvetica");
    drawCell("BOOKING", 30, 435, 250, 15, "center");
    drawCell("", 280, 435, 250, 15, "center", "Helvetica");
    drawCell("LUGAR TRAMITE VGM", 30, 450, 250, 15, "center");
    drawCell("", 280, 450, 250, 15, "center", "Helvetica");
    drawCell("TERMINAL ENTREGA", 30, 465, 250, 15, "center");
    drawCell("", 280, 465, 250, 15, "center", "Helvetica");
    drawCell("OBSERVACIONES", 30, 480, 250, 15, "center");
    drawCell("", 280, 480, 250, 15, "center", "Helvetica");
    drawCell("CANTIDAD DE CNTR", 30, 495, 250, 15, "center");
    drawCell("", 280, 495, 250, 15, "center");

    // Iterar por cada contenedor
    let y = 0;
    let count = 1;
    for (const container of containers) {
      console.log(container);
      drawCell("DATOS TRANSPORTE", 30, 560 + y, 500, 20, "center");
      drawCell("CONTENEDOR", 30, 580 + y, 250, 15, "center");
      drawCell(`${count}`, 280, 580 + y, 90, 15, "center");
      drawCell("DE", 370, 580 + y, 70, 15, "center");
      drawCell(`${containers.length}`, 440, 580 + y, 90, 15, "center");
      drawCell("N° CONTENEDOR/TARA", 30, 595 + y, 250, 15, "center");
      drawCell("", 280, 595 + y, 250, 15, "center");
      drawCell("N° CHOFER", 30, 610 + y, 250, 15, "center");
      drawCell("", 280, 610 + y, 250, 15, "center", "Helvetica");
      drawCell("TRANSPORTE", 30, 625 + y, 250, 15, "center", "Helvetica");
      drawCell("", 280, 625 + y, 250, 15, "center");
      drawCell("DNI", 30, 640 + y, 250, 15, "center", "Helvetica");
      drawCell("", 280, 640 + y, 250, 15, "center");
      drawCell("PATENTE TRACTOR", 30, 655 + y, 250, 15, "center", "Helvetica");
      drawCell("", 280, 655 + y, 250, 15, "center");
      drawCell("PATENTE SEMI", 30, 670 + y, 250, 15, "center", "Helvetica");
      drawCell("", 280, 670 + y, 250, 15, "center");
      drawCell("PRECINTO NAVIERA", 30, 685 + y, 250, 15, "center", "Helvetica");
      drawCell("", 280, 685 + y, 250, 15, "center");
      drawCell("PRECINTO ADUAN", 30, 700 + y, 250, 15, "center", "Helvetica");
      drawCell("", 280, 700 + y, 250, 15, "center");
      drawCell("NUMERO DE LOTE", 30, 715 + y, 250, 15, "center", "Helvetica");
      drawCell("", 280, 715 + y, 250, 15, "center");

      y = y + 175; // Sumamos tamaño de tabla
      count++;
    }

    // Finalizar y guardar el PDF
    doc.end();
  } catch (error) {
    throw error;
  }
};
