import api from "./api";

export const downloadUsersReport = async () => {
  const response = await api.get("/reports/users", {
    responseType: "blob",
  });

  return response.data;
};

export const downloadBooksReport = async () => {
  const response = await api.get("/reports/books", {
    responseType: "blob",
  });

  return response.data;
};

export const downloadIssuedBooksReport = async () => {
  const response = await api.get("/reports/issues", {
    responseType: "blob",
  });

  return response.data;
};

export const downloadFinesReport = async () => {
  const response = await api.get("/reports/fines", {
    responseType: "blob",
  });

  return response.data;
};