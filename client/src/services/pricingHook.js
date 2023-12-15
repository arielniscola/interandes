import URL_API from "../config";

const notifyError = (message) => {
  console.log(message);
};

export const getPricings = async () => {
  try {
    const res = await fetch(`${URL_API}/pricing`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    notifyError(error);
    return [];
  }
};

export const createPricings = async (pricing) => {
  try {
    const res = await fetch(`${URL_API}/pricing`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pricing),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
export const updatePricings = async (pricing, id) => {
  try {
    const res = await fetch(`${URL_API}/pricing/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pricing),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getPricingServices = async (id) => {
  try {
    const res = await fetch(`${URL_API}/pricing/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    notifyError(error);
    return [];
  }
};
export const generatePdfPricing = async (id) => {
  try {
    const res = await fetch(`${URL_API}/pricing/pdf/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    notifyError(error);
    return [];
  }
};
