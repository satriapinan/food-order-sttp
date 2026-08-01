const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 8080;

// JWT Secret key for token signing and verification
const JWT_SECRET =
  "f1ba3ee703af751d5c4b75353fde547912086bfeae8044362d9400634e52d1a035d0cfb44f7544658fc0dc866ac68dd999cdd522d1b5448eb6a1647b07a1382e";

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// In-memory data storage (replace with database in production)
let users = []; // Store user accounts
let foods = [
  {
    id: 54,
    name: "Nasi Goreng",
    price: 25000,
    categoryId: 1,
    description: "Nasi goreng spesial dengan telur",
  },
  {
    id: 55,
    name: "Mie Ayam",
    price: 20000,
    categoryId: 1,
    description: "Mie ayam dengan bakso",
  },
  {
    id: 56,
    name: "Ayam Bakar",
    price: 35000,
    categoryId: 2,
    description: "Ayam bakar bumbu kecap",
  },
];
let carts = []; // Store cart items
let favorites = []; // Store user favorite foods
let orders = []; // Store completed orders
let cartIdCounter = 1; // Auto-increment counter for cart items
let orderIdCounter = 1; // Auto-increment counter for orders

// Authentication middleware - validates JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers?.["authorization"];
  const token = authHeader?.split(" ")?.[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  // Verify JWT token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user; // Attach user info to request object
    next();
  });
};

// ===== USER MANAGEMENT ROUTES =====

// User Registration Endpoint
app.post("/user-management/users/sign-up", async (req, res) => {
  try {
    const { username, fullname, password, retypePassword } = req.body || {};

    // Input validation
    if (!username || !fullname || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Password confirmation check
    if (password !== retypePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if username already exists
    const existingUser = users.find((user) => user?.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
      id: users.length + 1,
      username,
      fullname,
      password: hashedPassword,
    };

    users.push(newUser);

    // Return success response without password
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        fullname: newUser.fullname,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// User Login Endpoint
app.post("/user-management/users/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    // Input validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find user by username
    const user = users.find((u) => u?.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password against hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with 24-hour expiration
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return token and user info
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, fullname: user.fullname },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// ===== FOOD ORDER ROUTES =====

// Get Food List with filtering, sorting, and pagination
app.get("/food-order/foods", authenticateToken, (req, res) => {
  try {
    const {
      pageNumber = 1,
      pageSize = 10,
      sortBy,
      foodName,
      categoryId,
    } = req.query || {};

    let filteredFoods = [...foods];

    // Filter by food name (case-insensitive search)
    if (foodName) {
      filteredFoods = filteredFoods.filter((food) =>
        food?.name?.toLowerCase()?.includes(foodName.toLowerCase())
      );
    }

    // Filter by category ID
    if (categoryId) {
      filteredFoods = filteredFoods.filter(
        (food) => food?.categoryId === parseInt(categoryId)
      );
    }

    // Apply sorting (format: "field,order" e.g., "price,desc")
    if (sortBy) {
      const [field, order] = sortBy.split(",");
      filteredFoods.sort((a, b) => {
        if (order === "desc") {
          return b?.[field] > a?.[field] ? 1 : -1;
        }
        return a?.[field] > b?.[field] ? 1 : -1;
      });
    }

    // Apply pagination
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedFoods = filteredFoods.slice(startIndex, endIndex);

    // Add favorite status for current user
    const foodsWithFavorites = paginatedFoods.map((food) => ({
      ...food,
      isFavorite: favorites.some(
        (fav) => fav?.userId === req.user?.id && fav?.foodId === food?.id
      ),
    }));

    // Return paginated results with metadata
    res.json({
      data: foodsWithFavorites,
      pagination: {
        currentPage: parseInt(pageNumber),
        pageSize: parseInt(pageSize),
        totalItems: filteredFoods.length,
        totalPages: Math.ceil(filteredFoods.length / pageSize),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Get Food Detail by ID
app.get("/food-order/foods/:id", authenticateToken, (req, res) => {
  try {
    const foodId = parseInt(req.params?.id);
    const food = foods.find((f) => f?.id === foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // Check if this food is in user's favorites
    const isFavorite = favorites.some(
      (fav) => fav?.userId === req.user?.id && fav?.foodId === foodId
    );

    res.json({
      ...food,
      isFavorite,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Add Food Item to Cart
app.post("/food-order/cart", authenticateToken, (req, res) => {
  try {
    const { foodId } = req.body || {};

    if (!foodId) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    // Verify food exists
    const food = foods.find((f) => f?.id === foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // Check if item already exists in user's cart
    const existingCartItem = carts.find(
      (cart) =>
        cart?.userId === req.user?.id &&
        cart?.foodId === foodId &&
        !cart?.isOrdered
    );

    if (existingCartItem) {
      // Increment quantity if item already in cart
      existingCartItem.quantity += 1;
      existingCartItem.totalPrice = existingCartItem.quantity * food.price;
    } else {
      // Create new cart item
      const newCartItem = {
        id: cartIdCounter++,
        userId: req.user?.id,
        foodId,
        foodName: food.name,
        price: food.price,
        quantity: 1,
        totalPrice: food.price,
        isOrdered: false, // Track if item has been ordered
        createdAt: new Date(),
      };
      carts.push(newCartItem);
    }

    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Get User's Cart Items
app.get("/food-order/foods/cart", authenticateToken, (req, res) => {
  try {
    // Get only unordered cart items for current user
    const userCarts = carts.filter(
      (cart) => cart?.userId === req.user?.id && !cart?.isOrdered
    );

    // Calculate total amount and item count
    const totalAmount = userCarts.reduce(
      (sum, cart) => sum + (cart?.totalPrice || 0),
      0
    );

    res.json({
      data: userCarts,
      totalAmount,
      totalItems: userCarts.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Update Cart Item Quantity
app.put("/food-order/cart/qty/:cartId", authenticateToken, (req, res) => {
  try {
    const cartId = parseInt(req.params?.cartId);
    const { quantity } = req.body || {};

    // Validate quantity input
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    // Find cart item belonging to current user
    const cartItem = carts.find(
      (cart) => cart?.id === cartId && cart?.userId === req.user?.id
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Update quantity and recalculate total price
    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.quantity * cartItem.price;

    res.json({ message: "Cart quantity updated successfully", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Delete Cart Item
app.delete("/food-order/cart/:cartId", authenticateToken, (req, res) => {
  try {
    const cartId = parseInt(req.params?.cartId);

    // Find and remove cart item belonging to current user
    const cartIndex = carts.findIndex(
      (cart) => cart?.id === cartId && cart?.userId === req.user?.id
    );
    if (cartIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    carts.splice(cartIndex, 1);
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Checkout Cart Items (Convert to Order)
app.post("/food-order/cart/checkout", authenticateToken, (req, res) => {
  try {
    const { cartId } = req.body || {};

    // Validate cart IDs array
    if (!cartId || !Array.isArray(cartId)) {
      return res.status(400).json({ message: "Cart IDs array is required" });
    }

    // Get specified cart items for current user
    const cartItems = carts.filter(
      (cart) =>
        cartId.includes(cart?.id) &&
        cart?.userId === req.user?.id &&
        !cart?.isOrdered
    );

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No valid cart items found" });
    }

    // Calculate order totals
    const totalAmount = cartItems.reduce(
      (sum, cart) => sum + (cart?.totalPrice || 0),
      0
    );
    const totalItems = cartItems.reduce(
      (sum, cart) => sum + (cart?.quantity || 0),
      0
    );

    // Create new order record
    const newOrder = {
      orderid: orderIdCounter++,
      userId: req.user?.id,
      totalItem: totalItems,
      totalOrder: totalAmount,
      tanggalOrder: new Date().toISOString().split("T")[0], // Current date
      items: cartItems.map((item) => ({ ...item })), // Copy cart items
    };

    orders.push(newOrder);

    // Mark cart items as ordered (soft delete)
    cartItems.forEach((item) => {
      if (item) item.isOrdered = true;
    });

    // Return order confirmation
    res.json({
      message: "Checkout successful",
      order: {
        orderid: newOrder.orderid,
        totalItem: newOrder.totalItem,
        totalOrder: newOrder.totalOrder,
        tanggalOrder: newOrder.tanggalOrder,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Add or Remove Food from Favorites
app.put("/food-order/foods/:id/favorites", authenticateToken, (req, res) => {
  try {
    const foodId = parseInt(req.params?.id);

    // Verify food exists
    const food = foods.find((f) => f?.id === foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // Check if food is already in user's favorites
    const existingFavorite = favorites.find(
      (fav) => fav?.userId === req.user?.id && fav?.foodId === foodId
    );

    if (existingFavorite) {
      // Remove from favorites
      const favoriteIndex = favorites.indexOf(existingFavorite);
      favorites.splice(favoriteIndex, 1);
      res.json({ message: "Removed from favorites", isFavorite: false });
    } else {
      // Add to favorites
      favorites.push({
        userId: req.user?.id,
        foodId,
        createdAt: new Date(),
      });
      res.json({ message: "Added to favorites", isFavorite: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Get User's Favorite Foods with filtering and pagination
app.get(
  "/food-order/foods/my-favorite-foods",
  authenticateToken,
  (req, res) => {
    try {
      const {
        pageNumber = 1,
        pageSize = 10,
        sortBy,
        foodName,
        categoryId,
      } = req.query || {};

      // Get user's favorite food IDs
      const userFavorites = favorites.filter(
        (fav) => fav?.userId === req.user?.id
      );

      // Map favorites to actual food objects
      const favoriteFood = userFavorites
        .map((fav) => {
          const food = foods.find((f) => f?.id === fav?.foodId);
          return food ? { ...food, isFavorite: true } : null;
        })
        .filter(Boolean); // Remove null values

      let filteredFoods = [...favoriteFood];

      // Apply same filtering logic as main food list
      if (foodName) {
        filteredFoods = filteredFoods.filter((food) =>
          food?.name?.toLowerCase()?.includes(foodName.toLowerCase())
        );
      }

      if (categoryId) {
        filteredFoods = filteredFoods.filter(
          (food) => food?.categoryId === parseInt(categoryId)
        );
      }

      // Apply sorting
      if (sortBy) {
        const [field, order] = sortBy.split(",");
        filteredFoods.sort((a, b) => {
          if (order === "desc") {
            return b?.[field] > a?.[field] ? 1 : -1;
          }
          return a?.[field] > b?.[field] ? 1 : -1;
        });
      }

      // Apply pagination
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + parseInt(pageSize);
      const paginatedFoods = filteredFoods.slice(startIndex, endIndex);

      res.json({
        data: paginatedFoods,
        pagination: {
          currentPage: parseInt(pageNumber),
          pageSize: parseInt(pageSize),
          totalItems: filteredFoods.length,
          totalPages: Math.ceil(filteredFoods.length / pageSize),
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error?.message });
    }
  }
);

// Get User's Order History
app.get("/food-order/foods/history", authenticateToken, (req, res) => {
  try {
    // Get all orders for current user
    const userOrders = orders.filter((order) => order?.userId === req.user?.id);

    // Return order summary (without detailed items)
    res.json({
      data: userOrders.map((order) => ({
        orderid: order?.orderid,
        totalItem: order?.totalItem,
        totalOrder: order?.totalOrder,
        tanggalOrder: order?.tanggalOrder,
      })),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err?.stack);
  res.status(500).json({
    timestamp: new Date().toISOString(),
    status: 500,
    error: "Internal Server Error",
    message: err?.message,
    path: req?.path,
  });
});

// Handle 404 routes
app.all("/{*any}", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Food Order API server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("POST /user-management/users/sign-up - Register user");
  console.log("POST /user-management/users/sign-in - Login user");
  console.log("GET /food-order/foods - Get food list");
  console.log("GET /food-order/foods/:id - Get food detail");
  console.log("POST /food-order/cart - Add to cart");
  console.log("GET /food-order/foods/cart - Get my cart");
  console.log("PUT /food-order/cart/qty/:cartId - Update cart quantity");
  console.log("DELETE /food-order/cart/:cartId - Delete cart item");
  console.log("POST /food-order/cart/checkout - Checkout");
  console.log("PUT /food-order/foods/:id/favorites - Add/Remove favorite");
  console.log("GET /food-order/foods/my-favorite-foods - Get favorite foods");
  console.log("GET /food-order/foods/history - Get order history");
});
