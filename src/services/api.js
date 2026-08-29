import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
        localStorage.removeItem("user");
    }

    if (user?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export const getApiErrorMessage = (error, fallbackMessage = "Terjadi kesalahan pada server.") => (
    error.response?.data?.message
    || (error.request
        ? `Backend tidak dapat dihubungi. Pastikan server API berjalan di ${API_BASE_URL}.`
        : fallbackMessage)
);

export const authApi = {
    login: (credentials) => api.post("/user-management/users/sign-in", credentials),
    register: (userData) => api.post("/user-management/users/sign-up", userData),
};

export const foodApi = {
    getCategories: () => api.get("/food-order/categories"),
    getFoods: (params) => api.get("/food-order/foods", { params }),
    getCart: () => api.get("/food-order/foods/cart"),
    addToCart: (foodId) => api.post("/food-order/cart", { foodId }),
};

export default api;