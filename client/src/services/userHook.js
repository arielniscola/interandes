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

export const getUsers = async () => {
  try {
    const res = await fetch(`${URL_API}/users`, {
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

export const createUser = async (user) => {
  try {
    const res = await fetch(`${URL_API}/users`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = res.json();
    if (data) notify("Usuario creado correctamente");
    return data;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};

export const getUser = async (id) => {
  try {
    const res = await fetch(`${URL_API}/users/${id}`, {
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

export const getRoles = async () => {
  try {
    const res = await fetch(`${URL_API}/role/${id}`, {
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

export const getRol = async (id) => {
  try {
    const res = await fetch(`${URL_API}/role/${id}`, {
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

export const createRole = async (user) => {
  try {
    const res = await fetch(`${URL_API}/role`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = res.json();
    if (data) notify("Role creado correctamente");
    return data;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};
