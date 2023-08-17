import { Detail } from "../models/detail";

export const createDetailPricing = async (
  details: Detail[],
  pricingId: string
) => {
  try {
    const createdDetails = await Promise.all(
      details.map((detail) => {
        return Detail.create({ ...detail, pricingId: pricingId });
      })
    );
    return createdDetails;
  } catch (error) {
    throw error;
  }
};
