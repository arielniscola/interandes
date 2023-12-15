import URL_API from "../config";

export const getOperations = async () => {
  try {
    const res = await fetch(`${URL_API}/operations`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getOperationID = async (id) => {
  try {
    const res = await fetch(`${URL_API}/operations/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateTaskList = async (tasklist) => {
  try {
    const res = await fetch(`${URL_API}/operations/tasklist/${tasklist.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(tasklist),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
