import { Pricing } from "../models/pricing";
import { Client } from "../models/client";
import { Detail } from "../models/detail";
// import { IDetail } from "../interfaces/IDetail";

export const getAllPricings = async () => {
  const pricings = await Pricing.findAll({
    attributes: {
      exclude: ["isDeleted"],
    },
  });

  if (!pricings) throw new Error("Not found");

  return pricings;
};

export const getPricingID = async (id: string): Promise<Object> => {
  const pricing = await Pricing.findByPk(id, {
    attributes: {
      exclude: ["deleted"],
    },
    include: [{ model: Client }, { model: Detail }],
  });

  if (!pricing) throw new Error("Not found");
  return pricing;
};

export const createPricing = async (pricing: Pricing) => {
  pricing.pricingnumber = await generateID();
  const pricingCreated = await Pricing.create(pricing);

  if (!pricingCreated) throw new Error("Error in DB");

  return pricingCreated;
};

export const updatePricing = async (pricing: Pricing) => {
  const userUpdated = await Pricing.update(
    {
      totalCost: pricing.totalCost,
    },
    {
      where: {
        id: pricing.id,
      },
    }
  );

  if (!userUpdated) throw "Error at update";
  return userUpdated;
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
