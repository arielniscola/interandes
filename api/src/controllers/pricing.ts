import {
  getAllPricings,
  getPricingID,
  updatePricing,
  createPricing,
} from "../services/pricing.service";
import { Request, Response } from "express";

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
