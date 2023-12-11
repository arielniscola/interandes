import {
  getAllPricings,
  getPricingID,
  updatePricing,
  createPricing,
} from "../services/pricing.service";
import { createDetailPricing } from "../services/detail.service";
import { Request, Response } from "express";
import { generatePDF } from "../utils/pdf";
import { createOperation } from "../services/operation.service";
import { IPricing } from "../models/pricing";
import { IDetail } from "../models/detail";
import { ResponseApi } from "../utils/responseApi";

export const getAllPricingsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const pricings = await getAllPricings();
    if (!pricings) res.status(404).json({ message: "Pricings not found" });

    res.status(200).json(pricings);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getPricingIDController = async (req: Request, res: Response) => {
  try {
    const pricing = await getPricingID(req.params.id);
    if (!pricing) res.status(404).json(new ResponseApi(0, "", pricing));

    res.status(200).json(pricing);
  } catch (error: any) {
    res
      .status(404)
      .json(new ResponseApi(1, `Error al obtener pricing: ${error}`));
  }
};

export const updatePricingController = async (req: Request, res: Response) => {
  try {
    const pricingUpdated = await updatePricing(req.body);
    if (!pricingUpdated)
      res.status(404).json({ message: "Pricing not updated" });
    res.status(200).json(pricingUpdated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createPricingController = async (
  req: Request<{}, {}, { pricing: IPricing; details: IDetail[] }>,
  res: Response
) => {
  try {
    // Crear operacion principal
    const { pricing, details } = req.body;
    const operation = await createOperation(pricing.operationType);
    pricing.operation_id = operation.id;
    const pricingCreated = await createPricing(pricing);
    if (!pricingCreated)
      res.status(200).json(new ResponseApi(1, "Error al crear pricing"));
    /** Crear detalles */
    await createDetailPricing(details, pricingCreated.id);

    res.status(200).json(new ResponseApi(0, "Pricing creado correctamente"));
  } catch (error: any) {
    res
      .status(200)
      .json(
        new ResponseApi(1, `Error en creacion de pricing: ${error.message}`)
      );
  }
};

export const pdfPricingController = async (_req: Request, res: Response) => {
  try {
    // const id = req.params.id;
    // const pricingRes = await getPricingID(id);
    const pricing = {
      pricingnumber: "PRI-1",
      companyname: "Interandes",
      typeServices: "Multimodal",
      revalidate: new Date(),
      totalCost: 300,
      totalTax: 200,
      profit: 100,
      stage: "Aceptado",
      observations: "nada",
      conditions: "nada de nada",
      effectiveDate: new Date(),
      operationType: "asdasda",
      totalSale: 500,
      language: "español",
      deleted: false,
    };
    const items = [
      {
        item: "Item1",
        price: 45,
        currency: "EURO",
        typeItem: "Costo",
        units: 2,
        subtotal: 12,
        base: 20,
        unitType: "sdasd",
      },
    ];
    await generatePDF(pricing, items);
    res.status(200).json({ message: "ok" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
