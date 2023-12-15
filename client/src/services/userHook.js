import URL_API from "../config";

export const getUsers = async () => {
  try {
    const res = await fetch(`${URL_API}/users`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (user) => {
  try {
    const res = await fetch(`${URL_API}/users`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
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
    return error;
  }
};

export const getRoles = async (id) => {
  try {
    const res = await fetch(`${URL_API}/role/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
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
    return error;
  }
};

export const createRole = async (user) => {
  try {
    const res = await fetch(`${URL_API}/role`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
