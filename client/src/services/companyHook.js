import URL_API from "../config";

export const getCompanies = async () => {
  const res = await fetch(`${URL_API}/company`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const data = await res.json();
  return data;
};

export const uploadImage = async (company, files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  const res = await fetch(`${URL_API}/company/${company.id}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
};

export const getLogoCompany = async (id) => {
  const res = await fetch(`${URL_API}/company/logo/${id}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const data = await res.json();
  return data;
};
