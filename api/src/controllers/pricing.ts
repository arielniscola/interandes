import {
  getAllPricings,
  getPricingID,
  updatePricing,
  createPricing,
} from "../services/pricing.service";
import { Request, Response } from "express";
import { generatePDF } from "../utils/pdf";

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
    if (!pricing) res.status(404).json({ message: "Pricing not found" });

    res.status(200).json(pricing);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
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

export const createPricingController = async (req: Request, res: Response) => {
  try {
    const pricingCreated = await createPricing(req.body);
    if (!pricingCreated)
      res.status(404).json({ message: "Pricing not created" });
    res.status(200).json(pricingCreated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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
