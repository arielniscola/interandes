import {
  getAllSalesOrders,
  getSalesOrderID,
  updateSalesOrder,
  createSalesOrder,
  createConsignees,
  createContainers,
  getConsignees,
} from "../services/salesOrder.service";
import { Request, Response } from "express";
import { generateSalesOrderPDF } from "../utils/salesOrderPdf";
import { generateInstructivoPDF } from "../utils/instructivoExpo";
import { IContainer } from "../models/container";
import { ResponseApi } from "../utils/responseApi";
import { addHistoryOperation } from "../services/operation.service";
import { ISalesOrder } from "../models/salesOrder";
import { IClient } from "../models/client";
import fs from "fs";

export const getAllSalesOrdersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const salesOrders = await getAllSalesOrders();
    if (!salesOrders.length) {
      res
        .status(200)
        .json(new ResponseApi(0, "No se encontraron ordenes de venta creadas"));
    } else {
      res.status(200).json(new ResponseApi(0, "", salesOrders));
    }
  } catch (error: any) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error en obtener ordenes de venta: ${error}`));
  }
};

export const getSalesOrderIDController = async (
  req: Request,
  res: Response
) => {
  try {
    const salesOrder = await getSalesOrderID(req.params.id);
    if (!salesOrder)
      res.status(200).json(new ResponseApi(1, "No se encontro orden de venta"));

    res.status(200).json(new ResponseApi(0, "", salesOrder));
  } catch (error: any) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error en obetner orden de venta: ${error}`));
  }
};

export const updateSalesOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const salesOrderUpdated = await updateSalesOrder(req.body);
    if (!salesOrderUpdated)
      res
        .status(200)
        .json(new ResponseApi(1, `Error a actualizar orden de venta`));
    res
      .status(200)
      .json(new ResponseApi(0, "Orden de Venta creada correctamente"));
  } catch (error: any) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error a actualizar orden: ${error}`));
  }
};

export const createSalesOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const { saleOrder, consignees, client, containers } = req.body;
    // Asignar cliente
    saleOrder.client_id = client.id;
    const salesOrderCreated = await createSalesOrder(saleOrder);
    if (!salesOrderCreated)
      res.status(404).json(new ResponseApi(1, "Orden de venta no se genero"));
    /** Crear contenedores y consignees */
    consignees.forEach((el: any) => {
      el.salesOrder_id = salesOrderCreated.id;
    });
    containers.forEach((el: any) => {
      el.salesOrder_id = salesOrderCreated.id;
    });
    await createConsignees(consignees);
    await createContainers(containers);
    await addHistoryOperation(
      saleOrder.operation_id,
      "Orden de venta generada"
    );
    res
      .status(200)
      .json(new ResponseApi(0, "Orden de venta generada correctamente"));
  } catch (error: any) {
    res
      .status(400)
      .json(
        new ResponseApi(1, `Error al crear Orden de venta: ${error.message}`)
      );
  }
};

export const pdfSalesOrderController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const sales = (await getSalesOrderID(id)) as ISalesOrder & {
      Containers: IContainer[];
      Client: IClient;
    };
    const pdfStream = await generateSalesOrderPDF(
      sales,
      sales.Containers,
      sales.Client
    );
    pdfStream.on("finish", () => {
      // Configurar encabezados y enviar el archivo como respuesta HTTP
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=BL_${sales.numberSO}.pdf`
      );
      res.setHeader("Content-type", "application/pdf");
      // Crear un nuevo stream para leer el archivo PDF y enviarlo en la respuesta
      const filestream = fs.createReadStream("files/declaracionEmbarque.pdf");
      filestream.pipe(res);
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const generateInstructivoController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const sales = (await getSalesOrderID(id)) as ISalesOrder & {
      Containers: IContainer[];
      Client: IClient;
    };
    const pdfStream = await generateInstructivoPDF(
      sales,
      sales.Containers,
      sales.Client
    );
    pdfStream.on("finish", () => {
      console.log("Escritura en el archivo PDF completada");
      // Configurar encabezados y enviar el archivo como respuesta HTTP
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=instructivo_${sales.numberSO}.pdf`
      );
      res.setHeader("Content-type", "application/pdf");

      // Crear un nuevo stream para leer el archivo PDF y enviarlo en la respuesta
      const filestream = fs.createReadStream("files/instructivo.pdf");
      filestream.pipe(res);
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getConsigneesController = async (_req: Request, res: Response) => {
  try {
    const consignees = await getConsignees();
    res.status(200).json(new ResponseApi(0, "", consignees));
  } catch (error) {
    res
      .status(200)
      .json(new ResponseApi(1, `Error en buscar consignee: ${error}`));
  }
};
