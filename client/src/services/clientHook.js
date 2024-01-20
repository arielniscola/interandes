import URL_API from "../config";

export const createCliente = async (clientData) => {
  try {
    const res = await fetch(`${URL_API}/clients`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(clientData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
export const updateCliente = async (clientData) => {
  try {
    const res = await fetch(`${URL_API}/clients`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(clientData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getClients = async () => {
  try {
    const res = await fetch(`${URL_API}/clients`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getClientID = async (id) => {
  try {
    const res = await fetch(`${URL_API}/clients/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
