const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
const PORT = 8080;

const JWT_SECRET =
  "f1ba3ee703af751d5c4b75353fde547912086bfeae8044362d9400634e52d1a035d0cfb44f7544658fc0dc866ac68dd999cdd522d1b5448eb6a1647b07a1382e";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Order API",
      version: "1.0.0",
      description: "API for food ordering system with authentication",
      contact: {
        name: "API Support",
        email: "support@foodorder.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "fullname", "password"],
          properties: {
            id: {
              type: "integer",
              description: "User ID",
            },
            username: {
              type: "string",
              description: "Unique username",
            },
            fullname: {
              type: "string",
              description: "Full name of user",
            },
            password: {
              type: "string",
              description: "User password",
            },
          },
        },
        Food: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Food ID",
            },
            name: {
              type: "string",
              description: "Food name",
            },
            price: {
              type: "integer",
              description: "Food price in rupiah",
            },
            categoryId: {
              type: "integer",
              description: "Category ID",
            },
            description: {
              type: "string",
              description: "Food description",
            },
            isFavorite: {
              type: "boolean",
              description: "Is this food in user favorites",
            },
            isCart: {
              type: "boolean",
              description: "Is this food in user cart",
            },
            categories: {
              type: "object",
              properties: {
                categoryName: {
                  type: "string",
                },
              },
            },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Category ID",
            },
            categoryName: {
              type: "string",
              description: "Category name",
            },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Cart item ID",
            },
            userId: {
              type: "integer",
              description: "User ID",
            },
            foodId: {
              type: "integer",
              description: "Food ID",
            },
            foodName: {
              type: "string",
              description: "Food name",
            },
            price: {
              type: "integer",
              description: "Food price",
            },
            quantity: {
              type: "integer",
              description: "Quantity",
            },
            totalPrice: {
              type: "integer",
              description: "Total price for this item",
            },
            isOrdered: {
              type: "boolean",
              description: "Is this item already ordered",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            orderid: {
              type: "integer",
              description: "Order ID",
            },
            userId: {
              type: "integer",
              description: "User ID",
            },
            totalItem: {
              type: "integer",
              description: "Total items in order",
            },
            totalOrder: {
              type: "integer",
              description: "Total order amount",
            },
            tanggalOrder: {
              type: "string",
              format: "date",
              description: "Order date",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./server.js"],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

let users = [];
let categories = [
  { id: 1, categoryName: "Indonesian Food" },
  { id: 2, categoryName: "Western Food" },
  { id: 3, categoryName: "Asian Food" },
  { id: 4, categoryName: "Desserts" },
];
let foods = [
  {
    id: 54,
    name: "Nasi Goreng",
    price: 25000,
    categoryId: 1,
    description: "Nasi goreng spesial dengan telur",
    categories: { categoryName: "Indonesian Food" },
  },
  {
    id: 55,
    name: "Mie Ayam",
    price: 20000,
    categoryId: 1,
    description: "Mie ayam dengan bakso",
    categories: { categoryName: "Indonesian Food" },
  },
  {
    id: 56,
    name: "Ayam Bakar",
    price: 35000,
    categoryId: 2,
    description: "Ayam bakar bumbu kecap",
    categories: { categoryName: "Western Food" },
  },
  {
    id: 57,
    name: "Gado-Gado",
    price: 18000,
    categoryId: 3,
    description: "Gado-gado dengan bumbu kacang",
    categories: { categoryName: "Asian Food" },
  },
  {
    id: 58,
    name: "Es Krim Vanilla",
    price: 15000,
    categoryId: 4,
    description: "Es krim vanilla premium",
    categories: { categoryName: "Desserts" },
  },
];
let carts = [];
let favorites = [];
let orders = [];
let cartIdCounter = 1;
let orderIdCounter = 1;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers?.["authorization"];
  const token = authHeader?.split(" ")?.[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

/**
 * @swagger
 * /user-management/users/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [User Management]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - fullname
 *               - password
 *               - retypePassword
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username
 *               fullname:
 *                 type: string
 *                 description: Full name of user
 *               password:
 *                 type: string
 *                 description: Password
 *               retypePassword:
 *                 type: string
 *                 description: Password confirmation
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/user-management/users/sign-up", async (req, res) => {
  try {
    const { username, fullname, password, retypePassword } = req.body || {};

    if (!username || !fullname || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== retypePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = users.find((user) => user?.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      fullname,
      password: hashedPassword,
    };

    users.push(newUser);

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

/**
 * @swagger
 * /user-management/users/sign-in:
 *   post:
 *     summary: Login user
 *     tags: [User Management]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/user-management/users/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = users.find((u) => u?.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

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

/**
 * @swagger
 * /food-order/foods:
 *   get:
 *     summary: Get list of foods with pagination and filters
 *     tags: [Food Management]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., "name,asc" or "price,desc")
 *       - in: query
 *         name: foodName
 *         schema:
 *           type: string
 *         description: Filter by food name
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: List of foods retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Food'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
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

    if (sortBy) {
      const [field, order] = sortBy.split(",");
      filteredFoods.sort((a, b) => {
        if (order === "desc") {
          return b?.[field] > a?.[field] ? 1 : -1;
        }
        return a?.[field] > b?.[field] ? 1 : -1;
      });
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedFoods = filteredFoods.slice(startIndex, endIndex);

    const foodsWithStatus = paginatedFoods.map((food) => {
      const isFavorite = favorites.some(
        (fav) => fav?.userId === req.user?.id && fav?.foodId === food?.id
      );

      const isCart = carts.some(
        (cart) =>
          cart?.userId === req.user?.id &&
          cart?.foodId === food?.id &&
          !cart?.isOrdered
      );

      return {
        ...food,
        isFavorite,
        isCart,
      };
    });

    res.json({
      data: foodsWithStatus,
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

/**
 * @swagger
 * /food-order/foods/{id}:
 *   get:
 *     summary: Get food detail by ID
 *     tags: [Food Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Food detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/food-order/foods/:id", authenticateToken, (req, res) => {
  try {
    const foodId = parseInt(req.params?.id);
    const food = foods.find((f) => f?.id === foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const isFavorite = favorites.some(
      (fav) => fav?.userId === req.user?.id && fav?.foodId === foodId
    );

    const isCart = carts.some(
      (cart) =>
        cart?.userId === req.user?.id &&
        cart?.foodId === foodId &&
        !cart?.isOrdered
    );

    res.json({
      ...food,
      isFavorite,
      isCart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

/**
 * @swagger
 * /food-order/cart:
 *   post:
 *     summary: Add food to cart
 *     tags: [Cart Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foodId
 *             properties:
 *               foodId:
 *                 type: integer
 *                 description: Food ID to add to cart
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Food not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/food-order/cart", authenticateToken, (req, res) => {
  try {
    const { foodId } = req.body || {};

    if (!foodId) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const food = foods.find((f) => f?.id === foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const existingCartItem = carts.find(
      (cart) =>
        cart?.userId === req.user?.id &&
        cart?.foodId === foodId &&
        !cart?.isOrdered
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      existingCartItem.totalPrice = existingCartItem.quantity * food.price;
    } else {
      const newCartItem = {
        id: cartIdCounter++,
        userId: req.user?.id,
        foodId,
        foodName: food.name,
        price: food.price,
        quantity: 1,
        totalPrice: food.price,
        isOrdered: false,
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

/**
 * @swagger
 * /food-order/cart/{foodId}:
 *   delete:
 *     summary: Remove food from cart by food ID
 *     tags: [Cart Management]
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Food ID to remove from cart
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete("/food-order/cart/:foodId", authenticateToken, (req, res) => {
  try {
    const foodId = parseInt(req.params?.foodId);

    const cartIndex = carts.findIndex(
      (cart) =>
        cart?.foodId === foodId &&
        cart?.userId === req.user?.id &&
        !cart?.isOrdered
    );

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    carts.splice(cartIndex, 1);
    res.json({ message: "Cart item removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

/**
 * @swagger
 * /food-order/foods/cart:
 *   get:
 *     summary: Get user's cart items
 *     tags: [Cart Management]
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *                 totalAmount:
 *                   type: integer
 *                   description: Total amount of cart
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of items in cart
 */
app.get("/food-order/foods/cart", authenticateToken, (req, res) => {
  try {
    const userCarts = carts.filter(
      (cart) => cart?.userId === req.user?.id && !cart?.isOrdered
    );

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

/**
 * @swagger
 * /food-order/cart/qty/{cartId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart Management]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 description: New quantity
 *     responses:
 *       200:
 *         description: Cart quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cartItem:
 *                   $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put("/food-order/cart/qty/:cartId", authenticateToken, (req, res) => {
  try {
    const cartId = parseInt(req.params?.cartId);
    const { quantity } = req.body || {};

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const cartItem = carts.find(
      (cart) => cart?.id === cartId && cart?.userId === req.user?.id
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.quantity * cartItem.price;

    res.json({ message: "Cart quantity updated successfully", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

/**
 * @swagger
 * /food-order/cart/{cartId}:
 *   delete:
 *     summary: Delete cart item by cart ID
 *     tags: [Cart Management]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart item ID to delete
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete("/food-order/cart/:cartId", authenticateToken, (req, res) => {
  try {
    const cartId = parseInt(req.params?.cartId);

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

/**
 * @swagger
 * /food-order/cart/checkout:
 *   post:
 *     summary: Checkout cart items
 *     tags: [Cart Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartId
 *             properties:
 *               cartId:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of cart item IDs to checkout
 *     responses:
 *       200:
 *         description: Checkout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No valid cart items found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/food-order/cart/checkout", authenticateToken, (req, res) => {
  try {
    const { cartId } = req.body || {};

    if (!cartId || !Array.isArray(cartId)) {
      return res.status(400).json({ message: "Cart IDs array is required" });
    }

    const cartItems = carts.filter(
      (cart) =>
        cartId.includes(cart?.id) &&
        cart?.userId === req.user?.id &&
        !cart?.isOrdered
    );

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No valid cart items found" });
    }

    const totalAmount = cartItems.reduce(
      (sum, cart) => sum + (cart?.totalPrice || 0),
      0
    );
    const totalItems = cartItems.reduce(
      (sum, cart) => sum + (cart?.quantity || 0),
      0
    );

    const newOrder = {
      orderid: orderIdCounter++,
      userId: req.user?.id,
      totalItem: totalItems,
      totalOrder: totalAmount,
      tanggalOrder: new Date().toISOString().split("T")[0],
      items: cartItems.map((item) => ({ ...item })),
    };

    orders.push(newOrder);

    cartItems.forEach((item) => {
      if (item) item.isOrdered = true;
    });

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

/**
 * @swagger
 * /food-order/foods/{id}/favorites:
 *   put:
 *     summary: Add or remove food from favorites
 *     tags: [Favorites Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Favorite status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isFavorite:
 *                   type: boolean
 *       404:
 *         description: Food not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put("/food-order/foods/:id/favorites", authenticateToken, (req, res) => {
  try {
    const foodId = parseInt(req.params?.id);

    const food = foods.find((f) => f?.id === foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const existingFavorite = favorites.find(
      (fav) => fav?.userId === req.user?.id && fav?.foodId === foodId
    );

    if (existingFavorite) {
      const favoriteIndex = favorites.indexOf(existingFavorite);
      favorites.splice(favoriteIndex, 1);
      res.json({ message: "Removed from favorites", isFavorite: false });
    } else {
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

/**
 * @swagger
 * /food-order/foods/my-favorite-foods:
 *   get:
 *     summary: Get user's favorite foods with pagination and filters
 *     tags: [Favorites Management]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., "name,asc" or "price,desc")
 *       - in: query
 *         name: foodName
 *         schema:
 *           type: string
 *         description: Filter by food name
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: Favorite foods retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Food'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
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

      const userFavorites = favorites.filter(
        (fav) => fav?.userId === req.user?.id
      );

      const favoriteFood = userFavorites
        .map((fav) => {
          const food = foods.find((f) => f?.id === fav?.foodId);
          if (!food) return null;

          const isCart = carts.some(
            (cart) =>
              cart?.userId === req.user?.id &&
              cart?.foodId === food?.id &&
              !cart?.isOrdered
          );

          return { ...food, isFavorite: true, isCart };
        })
        .filter(Boolean);

      let filteredFoods = [...favoriteFood];

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

      if (sortBy) {
        const [field, order] = sortBy.split(",");
        filteredFoods.sort((a, b) => {
          if (order === "desc") {
            return b?.[field] > a?.[field] ? 1 : -1;
          }
          return a?.[field] > b?.[field] ? 1 : -1;
        });
      }

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

/**
 * @swagger
 * /food-order/foods/history:
 *   get:
 *     summary: Get user's order history
 *     tags: [Order Management]
 *     responses:
 *       200:
 *         description: Order history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
app.get("/food-order/foods/history", authenticateToken, (req, res) => {
  try {
    const userOrders = orders.filter((order) => order?.userId === req.user?.id);

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

/**
 * @swagger
 * /food-order/categories:
 *   get:
 *     summary: Get all food categories
 *     tags: [Category Management]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 */
app.get("/food-order/categories", authenticateToken, (req, res) => {
  try {
    res.json({
      data: categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
});

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

app.all("/{*any}", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Food Order API server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  console.log("\nAvailable endpoints:");
  console.log("POST /user-management/users/sign-up - Register user");
  console.log("POST /user-management/users/sign-in - Login user");
  console.log("GET /food-order/foods - Get food list");
  console.log("GET /food-order/foods/:id - Get food detail");
  console.log("POST /food-order/cart - Add to cart");
  console.log("GET /food-order/foods/cart - Get my cart");
  console.log("PUT /food-order/cart/qty/:cartId - Update cart quantity");
  console.log("DELETE /food-order/cart/:foodId - Remove from cart by food ID");
  console.log("DELETE /food-order/cart/:cartId - Delete cart item by cart ID");
  console.log("POST /food-order/cart/checkout - Checkout");
  console.log("PUT /food-order/foods/:id/favorites - Add/Remove favorite");
  console.log("GET /food-order/foods/my-favorite-foods - Get favorite foods");
  console.log("GET /food-order/foods/history - Get order history");
  console.log("GET /food-order/categories - Get categories");
});
