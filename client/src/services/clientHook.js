import toast from "react-hot-toast";
import URL_API from "../config";

const notify = (message) => {
  toast.success(message, {
    duration: 1000,
    position: "bottom-right",
  });
};
const notifyError = (message) => {
  toast.error(message, {
    duration: 3000,
    position: "bottom-right",
  });
};

export const createCliente = async (clientData) => {
  try {
    const res = await fetch(`${URL_API}/clients`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(clientData),
    });
    const data = res.json();
    if (data) notify("Cliente creado");
    return data;
  } catch (error) {
    notifyError(error.message);
    return null;
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
    notifyError(error);
    return [];
  }
};
