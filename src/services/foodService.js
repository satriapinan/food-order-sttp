import api from "./api";

// =========================
// GET FOOD LIST
// =========================

export const getFoods = async () => {
  const response = await api.get("/food-order/foods");

  return response.data;
};

// =========================
// GET FOOD DETAIL
// =========================

export const getFoodById = async (id) => {
  const response = await api.get(
    `/food-order/foods/${id}`
  );

  return response.data;
};

// =========================
// GET CATEGORIES
// =========================

export const getCategories = async () => {
  const response = await api.get(
    "/food-order/categories"
  );

  return response.data;
};

// =========================
// ADD TO CART
// =========================

export const addToCart = async (foodId, qty = 1) => {
  const response = await api.post(
    "/food-order/cart",
    {
      foodId,
      qty,
    }
  );

  return response.data;
};

// =========================
// GET CART
// =========================

export const getCart = async () => {
  const response = await api.get(
    "/food-order/foods/cart"
  );

  return response.data;
};

// =========================
// UPDATE CART QTY
// =========================

export const updateCartQty = async (
  cartId,
  qty
) => {
  const response = await api.put(
    `/food-order/cart/qty/${cartId}`,
    {
      qty,
    }
  );

  return response.data;
};

// =========================
// DELETE CART BY FOOD ID
// =========================

export const removeCartByFoodId = async (foodId) => {
  const response = await api.delete(
    `/food-order/cart/${foodId}`
  );

  return response.data;
};

// =========================
// DELETE CART BY CART ID
// =========================

export const removeCartByCartId = async (cartId) => {
  const response = await api.delete(
    `/food-order/cart/${cartId}`
  );

  return response.data;
};

// =========================
// CHECKOUT
// =========================

export const checkout = async () => {
  const response = await api.post(
    "/food-order/cart/checkout"
  );

  return response.data;
};

// =========================
// FAVORITE
// =========================

export const toggleFavorite = async (foodId) => {
  const response = await api.put(
    `/food-order/foods/${foodId}/favorites`
  );

  return response.data;
};

// =========================
// MY FAVORITES
// =========================

export const getFavoriteFoods = async () => {
  const response = await api.get(
    "/food-order/foods/my-favorite-foods"
  );

  return response.data;
};

// =========================
// ORDER HISTORY
// =========================

export const getOrderHistory = async () => {
  const response = await api.get(
    "/food-order/foods/history"
  );

  return response.data;
};