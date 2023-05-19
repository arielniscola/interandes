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
    const data = res.json();
    if (data) notify("Pricing creado");
    return data;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};
