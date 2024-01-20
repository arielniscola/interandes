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
export const updateProvider = async (providerData) => {
  try {
    const res = await fetch(`${URL_API}/providers`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(providerData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getProviderID = async (id) => {
  try {
    const res = await fetch(`${URL_API}/providers/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
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

export const downloadExcel = async () => {
  try {
    const res = await fetch(`${URL_API}/providers/export`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    return error;
  }
};
