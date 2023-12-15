import { IPricing, Pricing } from "../models/pricing";
import { Client } from "../models/client";
import { Detail } from "../models/detail";
import { addHistoryOperation } from "./operation.service";
// import { IDetail } from "../interfaces/IDetail";

export const getAllPricings = async () => {
  try {
    const pricings = await Pricing.findAll({
      attributes: {
        exclude: ["deleted"],
      },
    });

    if (!pricings) throw new Error("Not found");

    return pricings;
  } catch (error) {
    throw error;
  }
};

export const getPricingID = async (id: string): Promise<IPricing> => {
  try {
    const pricing = await Pricing.findByPk(id, {
      attributes: {
        exclude: ["deleted"],
      },
      include: [{ model: Client }, { model: Detail }],
    });

    if (!pricing) throw new Error("Not found");
    return pricing;
  } catch (error) {
    throw error;
  }
};

export const createPricing = async (pricing: IPricing) => {
  try {
    pricing.pricingnumber = await generateID();
    const pricingCreated = await Pricing.create(pricing);

    if (!pricingCreated) throw new Error("Error in DB");

    return pricingCreated;
  } catch (error) {
    throw error;
  }
};

export const updatePricing = async (pricing: IPricing) => {
  try {
    const oldPricing = await Pricing.findOne({
      where: {
        id: pricing.id,
      },
    });
    if (oldPricing.stage !== pricing.stage)
      await addHistoryOperation(
        pricing.operation_id,
        `Modicación de estado a: ${pricing.stage}`
      );
    const pricingUpdated = await Pricing.update(
      {
        totalCost: pricing.totalCost,
      },
      {
        where: {
          id: pricing.id,
        },
      }
    );

    if (!pricingUpdated) throw "Error at update";
    return pricingUpdated;
  } catch (error) {
    throw error;
  }
};

/** generador de ID */
const generateID = async () => {
  try {
    const prefijo = "PRI";
    const lastPricing = await Pricing.findOne({
      order: [["createdAt", "DESC"]],
    });
    if (!lastPricing) return `${prefijo}-1`;
    const sequence = lastPricing.pricingnumber.split("-");
    const id = `${prefijo}-${parseInt(sequence[1]) + 1}`;
    return id;
  } catch (error) {
    throw error;
  }
};
