import axios from "axios";

const api = axios.create({
  baseURL: "https://api-food-order.example.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;