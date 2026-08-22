import { Link } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "../hooks/useTheme";

function FoodMenu() {
  // =========================
  // USER LOGIN
  // =========================
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return savedUser;
    }
  });

  const username =
    typeof user === "object"
      ? user?.name || user?.username
      : user;

  // =========================
  // THEME
  // =========================
  const { mode } = useTheme();
  const isDark = mode === "dark";

  // =========================
  // FOOD DATA
  // =========================
  const foods = [
    {
      id: 1,
      name: "Nasi Goreng Special",
      price: "Rp25.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Mie Goreng",
      price: "Rp20.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Ayam Geprek",
      price: "Rp22.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Burger Beef",
      price: "Rp28.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Kentang Goreng",
      price: "Rp15.000",
      category: "Snack",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      name: "Es Teh Manis",
      price: "Rp8.000",
      category: "Minuman",
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <Box
      className={`menu-page ${isDark ? "dark" : "light"}`}
      sx={{
        minHeight: "100vh",

        // SAMA DENGAN LOGIN
        backgroundColor: isDark
          ? "#06140c"
          : "#f5f5f5",

        color: isDark
          ? "#ffffff"
          : "#111111",

        transition:
          "background-color 0.3s ease, color 0.3s ease",

        boxSizing: "border-box",
      }}
    >
      {/* =========================
          NAVBAR
      ========================= */}
      <nav
        className="navbar"
        style={{
          backgroundColor: isDark
            ? "#151515"
            : "#ffffff",

          borderBottom: isDark
            ? "1px solid #22c55e"
            : "1px solid #dddddd",
        }}
      >
        {/* KIRI */}
        <div className="navbar-left">
          <span
            className="user-greeting"
            style={{
              color: isDark
                ? "#ffffff"
                : "#111111",
            }}
          >
            Hii, {username || "User"} 👋
          </span>
        </div>

        {/* KANAN */}
        <div className="navbar-right">

          {/* BRAND */}
          <div
            className="brand"
            style={{
              color: "#22c55e",
            }}
          >
            Food-Order
          </div>

          {/* MENU */}
          <div className="nav-menu">

            <Link
              to="/menu"
              className="active"
              style={{
                color: "#22c55e",
              }}
            >
              Menu
            </Link>

            <Link
              to="/login"
              style={{
                color: isDark
                  ? "#ffffff"
                  : "#111111",
              }}
            >
              Logout
            </Link>

          </div>
        </div>
      </nav>

      {/* =========================
          HEADER
      ========================= */}
      <section className="menu-header">

        <div>

          <span
            style={{
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            SELAMAT DATANG
          </span>

          <h1
            style={{
              color: isDark
                ? "#ffffff"
                : "#111111",
            }}
          >
            Mau makan apa hari ini?
          </h1>

          <p
            style={{
              color: isDark
                ? "#aaaaaa"
                : "#666666",
            }}
          >
            Pilih makanan dan minuman favoritmu.
          </p>

        </div>

        {/* SEARCH */}
        <div className="search-box">

          <input
            type="text"
            placeholder="Cari makanan..."
            style={{
              backgroundColor: isDark
                ? "#222222"
                : "#ffffff",

              color: isDark
                ? "#ffffff"
                : "#111111",

              border: isDark
                ? "1px solid #444444"
                : "1px solid #cccccc",

              outline: "none",
            }}
          />

        </div>

      </section>

      {/* =========================
          CATEGORY
      ========================= */}
      <div className="categories">

        {/* SEMUA */}
        <button
          className="category-active"
          style={{
            backgroundColor: "#22c55e",
            color: "#ffffff",
            border: "1px solid #22c55e",
          }}
        >
          Semua
        </button>

        {/* MAKANAN */}
        <button
          style={{
            backgroundColor: isDark
              ? "#151515"
              : "#ffffff",

            color: isDark
              ? "#ffffff"
              : "#111111",

            border: isDark
              ? "1px solid #444444"
              : "1px solid #cccccc",
          }}
        >
          Makanan
        </button>

        {/* SNACK */}
        <button
          style={{
            backgroundColor: isDark
              ? "#151515"
              : "#ffffff",

            color: isDark
              ? "#ffffff"
              : "#111111",

            border: isDark
              ? "1px solid #444444"
              : "1px solid #cccccc",
          }}
        >
          Snack
        </button>

        {/* MINUMAN */}
        <button
          style={{
            backgroundColor: isDark
              ? "#151515"
              : "#ffffff",

            color: isDark
              ? "#ffffff"
              : "#111111",

            border: isDark
              ? "1px solid #444444"
              : "1px solid #cccccc",
          }}
        >
          Minuman
        </button>

      </div>

      {/* =========================
          FOOD SECTION
      ========================= */}
      <section className="food-section">

        <div className="section-title">

          <h2
            style={{
              color: isDark
                ? "#ffffff"
                : "#111111",
            }}
          >
            Food Menu
          </h2>

          <p
            style={{
              color: isDark
                ? "#aaaaaa"
                : "#666666",
            }}
          >
            Menu pilihan terbaik untuk kamu
          </p>

        </div>

        {/* =========================
            FOOD GRID
        ========================= */}
        <div className="food-grid">

          {foods.map((food) => (

            <div
              className="food-card"
              key={food.id}
              style={{
                backgroundColor: isDark
                  ? "#151515"
                  : "#ffffff",

                border: isDark
                  ? "1px solid #22c55e"
                  : "1px solid #dddddd",

                color: isDark
                  ? "#ffffff"
                  : "#111111",

                transition:
                  "background-color 0.3s ease, border-color 0.3s ease",
              }}
            >

              {/* IMAGE */}
              <div className="food-image">

                <img
                  src={food.image}
                  alt={food.name}
                />

                <span
                  style={{
                    backgroundColor: "#22c55e",
                    color: "#ffffff",
                  }}
                >
                  {food.category}
                </span>

              </div>

              {/* CONTENT */}
              <div className="food-content">

                <h3
                  style={{
                    color: isDark
                      ? "#ffffff"
                      : "#111111",
                  }}
                >
                  {food.name}
                </h3>

                <div className="food-bottom">

                  <strong
                    style={{
                      color: "#22c55e",
                    }}
                  >
                    {food.price}
                  </strong>

                  <button
                    style={{
                      backgroundColor: "#22c55e",
                      color: "#ffffff",
                      border: "none",
                    }}
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>
    </Box>
  );
}

export default FoodMenu;