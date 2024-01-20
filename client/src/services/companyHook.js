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
  formData.append("files", files);
  const res = await fetch(`${URL_API}/company/${company.id}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
};
