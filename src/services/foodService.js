import api from "./api";
// =========================
// FOODS
// =========================

export const getFoods = async () => {
  const response = await api.get("/food-order/foods");

  return response.data;
};

// =========================
// FOOD DETAIL
// =========================

export const getFoodById = async (id) => {
  const response = await api.get(`/food-order/foods/${id}`);

  return response.data;
};

// =========================
// CATEGORIES
// =========================

export const getCategories = async () => {
  const response = await api.get("/food-order/categories");

  return response.data;
};

// =========================
// ADD TO CART
// =========================

export const addToCart = async (foodId, quantity = 1) => {
  const response = await api.post("/food-order/cart", {
    foodId,
    quantity,
  });

  return response.data;
};

// =========================
// GET MY CART
// =========================

export const getCart = async () => {
  const response = await api.get("/food-order/foods/cart");

  return response.data;
};

// =========================
// UPDATE CART QUANTITY
// =========================

export const updateCartQuantity = async (cartId, quantity) => {
  const response = await api.put(
    `/food-order/cart/qty/${cartId}`,
    {
      quantity,
    }
  );

  return response.data;
};

// =========================
// DELETE CART BY FOOD ID
// =========================

export const removeFromCart = async (foodId) => {
  const response = await api.delete(
    `/food-order/cart/${foodId}`
  );

  return response.data;
};

// =========================
// DELETE CART BY CART ID
// =========================

export const deleteCartItem = async (cartId) => {
  const response = await api.delete(
    `/food-order/cart/${cartId}`
  );

  return response.data;
};

// =========================
// CHECKOUT
// =========================

export const checkoutCart = async (cartIds) => {
  const response = await api.post(
    "/food-order/cart/checkout",
    {
      cartId: cartIds,
    }
  );

  return response.data;
};