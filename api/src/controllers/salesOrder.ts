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

export const getAllSalesOrdersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const SalesOrders = await getAllSalesOrders();
    if (!SalesOrders)
      res.status(404).json({ message: "SalesOrders not found" });

    res.status(200).json(SalesOrders);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getSalesOrderIDController = async (
  req: Request,
  res: Response
) => {
  try {
    const salesOrder = await getSalesOrderID(req.params.id);
    if (!salesOrder) res.status(404).json({ message: "SalesOrder not found" });

    res.status(200).json(salesOrder);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSalesOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const salesOrderUpdated = await updateSalesOrder(req.body);
    if (!salesOrderUpdated)
      res.status(404).json({ message: "SalesOrder not updated" });
    res.status(200).json(salesOrderUpdated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
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
      res.status(404).json({ message: "SalesOrder not created" });
    /** Crear detalles */

    res.status(200).json(salesOrderCreated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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
