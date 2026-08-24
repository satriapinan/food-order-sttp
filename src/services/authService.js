import api from "./api";

export const loginUser = async (credentials) => {
  const response = await api.post(
    "/user-management/users/sign-in",
    credentials
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post(
    "/user-management/users/sign-up",
    userData
  );

  return response.data;
};