import { Pricing } from "../db";
import { IPricing } from "../interfaces/IPricing";
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

export const getPricingID = async (id: string) => {
  const pricing = await Pricing.findByPk(id, {
    attributes: {
      exclude: ["deleted"],
    },
  });

  if (!pricing) throw new Error("Not found");
  return pricing;
};

export const createPricing = async (pricing: any) => {
  const pricingCreated = await Pricing.create(pricing);

  if (!pricingCreated) throw new Error("Error in DB");

  return pricingCreated;
};

export const updatePricing = async (pricing: IPricing) => {
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
