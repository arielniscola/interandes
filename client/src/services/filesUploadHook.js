import URL_API from "../config";

export const uploadFiles = async (id, files) => {
  try {
    const formData = new FormData();
    formData.append("files", files);
    const res = await fetch(`${URL_API}/files/${id}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getFilesOperation = async (id) => {
  try {
    const res = await fetch(`${URL_API}/files/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const downloadFile = async (id) => {
  try {
    const res = await fetch(`${URL_API}/files/download/${id}`, {
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

export const deleteFile = async (id) => {
  try {
    const res = await fetch(`${URL_API}/files/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
