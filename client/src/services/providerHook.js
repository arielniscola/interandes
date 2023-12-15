import URL_API from "../config";

export const createProvider = async (providerData) => {
  try {
    const res = await fetch(`${URL_API}/providers`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(providerData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getProviders = async () => {
  try {
    const res = await fetch(`${URL_API}/providers`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
