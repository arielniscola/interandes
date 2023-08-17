import toast from "react-hot-toast";
import URL_API from "../config";

const notify = (message) => {
  toast.success(message, {
    duration: 2000,
    position: "bottom-right",
  });
};
const notifyError = (message) => {
  toast.error(message, {
    duration: 3000,
    position: "bottom-right",
  });
};

export const getSalesOrders = async () => {
  try {
    const res = await fetch(`${URL_API}/salesOrder`, {
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

export const createSalesOrders = async (salesOrder) => {
  try {
    const res = await fetch(`${URL_API}/salesOrder`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(salesOrder),
    });
    const data = res.json();
    if (data) notify("Orden de venta creada");
    return data;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};

export const getsalesOrder = async (id) => {
  try {
    const res = await fetch(`${URL_API}/salesOrder/${id}`, {
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
