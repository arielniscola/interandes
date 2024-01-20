import URL_API from "../config";

export const getPricings = async () => {
  const res = await fetch(`${URL_API}/pricing`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const data = await res.json();
  return data;
};

export const createPricings = async (pricing) => {
  const res = await fetch(`${URL_API}/pricing`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(pricing),
  });
  const data = await res.json();
  return data;
};
export const updatePricings = async (pricing, id) => {
  const res = await fetch(`${URL_API}/pricing/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(pricing),
  });
  const data = await res.json();
  return data;
};

export const getPricingServices = async (id) => {
  const res = await fetch(`${URL_API}/pricing/${id}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const data = await res.json();
  return data;
};
export const generatePdfPricing = async (id) => {
  const res = await fetch(`${URL_API}/pricing/pdf/${id}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  return url;
};

export const deletePricing = async (id) => {
  const res = await fetch(`${URL_API}/pricing/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
  const data = await res.json();
  return data;
};
