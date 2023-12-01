import { Detail, IDetail } from "../models/detail";

export const createDetailPricing = async (
  details: IDetail[],
  pricingId: string
) => {
  try {
    const createdDetails = await Promise.all(
      details.map((detail) => {
        return Detail.create({ ...detail, pricing_id: pricingId });
      })
    );
    return createdDetails;
  } catch (error) {
    throw error;
  }
};
