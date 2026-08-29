import { useMemo, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../components/hooks/useAuth";
import { categories, getFilteredFoods, sortOptions } from "./foodMenuData";

const FoodMenu = ({ onNavigate }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [sortBy, setSortBy] = useState("nama");
  const [lastOrdered, setLastOrdered] = useState("");
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  const navItems = isAuthenticated
    ? [
        { label: "🏠 Home", page: "home" },
        { label: "📋 Menu", page: "menu" },
        { label: `👤 Profil (${user?.username || "User"})`, page: "profile" },
      ]
    : [
        { label: "🏠 Home", page: "home" },
        { label: "📋 Menu", page: "menu" },
        { label: "🔐 Login", page: "login" },
        { label: "📝 Register", page: "register" },
      ];

  const handleNavAction = (page) => {
    onNavigate(page);
  };

  const filteredFoods = useMemo(
    () =>
      getFilteredFoods({
        searchTerm,
        category: selectedCategory,
        sortBy,
      }),
    [searchTerm, selectedCategory, sortBy]
  );

  const handleOrder = (food) => {
    if (!isAuthenticated) {
      onNavigate("login");
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === food.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prevCart, { ...food, qty: 1 }];
    });

    setLastOrdered(`${food.name} ditambahkan ke keranjang.`);
  };

  const updateQty = (foodId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === foodId ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <AppLayout
      title="Menu Makanan"
      actions={
        <>
          <button
            type="button"
            style={{
              border: "none",
              background: "#f97316",
              color: "white",
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span aria-hidden="true">🛒</span>
            <span>Keranjang ({cartCount})</span>
          </button>
          {navItems.map(({ label, page }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavAction(page)}
              style={{
                border: "none",
                background: page === "menu" || page === "logout" ? "#2563eb" : "#e0e7ff",
                color: page === "menu" || page === "logout" ? "white" : "#1e3a8a",
                padding: "10px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span aria-hidden="true">{label.split(" ")[0]}</span>
              <span>{label.replace(/^[^\s]+\s/, "")}</span>
            </button>
          ))}
        </>
      }
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <p style={{ margin: 0, color: "#f97316", fontWeight: "bold", letterSpacing: "2px" }}>
          MENU MAKANAN
        </p>
        <h1 style={{ margin: "12px 0 8px", color: "#0f172a", fontSize: "36px" }}>
          Pilihan Makanan Favorit
        </h1>
        <p style={{ margin: 0, color: "#475569" }}>
          Rasa enak, harga terjangkau, dan siap diantar cepat.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "26px",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "16px",
        }}
      >
        <div style={{ flex: "1 1 240px", minWidth: "220px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#000000", fontWeight: 700 }}>
            Search food
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Cari makanan atau minuman"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ flex: "1 1 180px", minWidth: "160px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#000000", fontWeight: 700 }}>
            Semua kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #000000",
              background: "white",
              color: "#000000",
              boxSizing: "border-box",
              fontWeight: 600,
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: "1 1 180px", minWidth: "160px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#000000", fontWeight: 700 }}>
            Short by
          </label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #000000",
              background: "white",
              color: "#000000",
              boxSizing: "border-box",
              fontWeight: 600,
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", gap: "12px", flexWrap: "wrap" }}>
        <p style={{ margin: 0, color: "#475569", fontWeight: 600 }}>
          Menampilkan {filteredFoods.length} item
        </p>
        {lastOrdered && (
          <p
            style={{
              margin: 0,
              color: "#15803d",
              background: "#dcfce7",
              border: "1px solid #86efac",
              padding: "8px 12px",
              borderRadius: "999px",
              fontWeight: 700,
            }}
          >
            {lastOrdered}
          </p>
        )}
      </div>

      {cart.length > 0 && (
        <div
          style={{
            background: "#fff7ed",
            border: "1px solid #fdba74",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "22px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
            <h3 style={{ margin: 0, color: "#9a4d00" }}>Keranjang Saya</h3>
            <span style={{ color: "#9a4d00", fontWeight: 700 }}>Total: {cartCount} item</span>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #fdba74",
              borderRadius: "12px",
              padding: "12px 14px",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span style={{ fontWeight: 700, color: "#9a4d00" }}>Jumlah Total Biaya</span>
            <strong style={{ color: "#7c2d12", fontSize: "18px" }}>
              Rp {totalPrice.toLocaleString("id-ID")}
            </strong>
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {cart.map((item) => {
              const subtotal = item.price * item.qty;

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    background: "white",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <div>
                    <strong style={{ display: "block" }}>{item.name}</strong>
                    <span style={{ color: "#64748b", fontSize: "14px" }}>
                      {item.qty} item × Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <div style={{ color: "#9a4d00", fontWeight: 700, marginTop: "4px" }}>
                      Rp {subtotal.toLocaleString("id-ID")}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "4px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#fecaca",
                        color: "#7f1d1d",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "18px",
                        lineHeight: 1,
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: "22px",
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#bbf7d0",
                        color: "#166534",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "18px",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredFoods.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "32px 20px",
            background: "#fff",
            borderRadius: "16px",
            border: "1px dashed #cbd5e1",
            color: "#475569",
          }}
        >
          Tidak ada menu yang sesuai dengan pencarian Anda.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              style={{
                background: "white",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  background: food.color,
                  height: "120px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={food.image}
                  alt={food.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div style={{ padding: "18px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#0f172a", fontSize: "22px" }}>
                    {food.name}
                  </h3>
                  <span style={{ color: "#f97316", fontWeight: "bold" }}>
                    Rp {food.price.toLocaleString("id-ID")}
                  </span>
                </div>

                <p style={{ margin: "0 0 10px", color: "#64748b", fontSize: "12px", fontWeight: 700 }}>
                  {food.category}
                </p>

                <p style={{ margin: "0 0 16px", color: "#475569", lineHeight: 1.6 }}>
                  {food.desc}
                </p>

                <button
                  type="button"
                  onClick={() => handleOrder(food)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#2563eb",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <span aria-hidden="true">🛒</span>
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default FoodMenu;
