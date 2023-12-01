import {
  getAllSalesOrders,
  getSalesOrderID,
  updateSalesOrder,
  createSalesOrder,
} from "../services/salesOrder.service";
import { Request, Response } from "express";
import { generateSalesOrderPDF } from "../utils/salesOrderPdf";
import { generateInstructivoPDF } from "../utils/instructivoExpo";
import { IContainer } from "../models/container";
import { ResponseApi } from "../utils/responseApi";

export const getAllSalesOrdersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const salesOrders = await getAllSalesOrders();
    if (!salesOrders.length) {
      res
        .status(200)
        .json(new ResponseApi(0, "No se encontraron tareas creadas"));
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
    const { salesOrder } = req.body;
    const salesOrderCreated = await createSalesOrder(salesOrder);
    if (!salesOrderCreated)
      res.status(404).json(new ResponseApi(1, "SalesOrder not created"));
    /** Crear detalles */

    res
      .status(200)
      .json(new ResponseApi(0, "Orden de venta generada correctamente"));
  } catch (error: any) {
    res
      .status(400)
      .json(new ResponseApi(1, `Error al crear Orden de venta: ${error}`));
  }
};

export const pdfSalesOrderController = async (_req: Request, res: Response) => {
  try {
    // const id = req.params.id;
    // const pricingRes = await getPricingID(id);
    await generateSalesOrderPDF();
    res.status(200).json({ message: "ok" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const generateInstructivoController = async (
  _req: Request,
  res: Response
) => {
  try {
    // const id = req.params.id;
    const container: IContainer[] = [
      {
        containerNumber: "NASA23",
        ptoLinea: "sdad",
        ptoAduana: "asdddddg",
        otherSeals: "asdggg1",
        poRef: "gcina",
        driver: "gustabo",
        dni: "3621912",
        truckPlate: "asdasd",
        semiPlate: "asdfa",
        containerType: "asdad",
        hasTemp: false,
      },
    ];
    // const pricingRes = await getPricingID(id);
    await generateInstructivoPDF(container);
    res.status(200).json({ message: "ok" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
