import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuPages.css";

const foods = [
  {
    id: 1,
    name: "Ayam Teriyaki",
    category: "Makanan",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Beef Steak",
    category: "Makanan",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Nasi Goreng Spesial",
    category: "Makanan",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Chicken Burger",
    category: "Makanan",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Kentang Goreng",
    category: "Makanan",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Salad Segar",
    category: "Makanan",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Pasta Carbonara",
    category: "Makanan",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Cake Cokelat",
    category: "Makanan",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Iced Coffee",
    category: "Minuman",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Fresh Lemon Tea",
    category: "Minuman",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Coconut Shake",
    category: "Minuman",
    price: 17000,
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Smoothie Berry",
    category: "Minuman",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
  },
];

const getStoredCart = () => {
  try {
    const savedCart = JSON.parse(localStorage.getItem("food-order-cart") || "[]");
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
};

function MenuPages() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState(getStoredCart);

  useEffect(() => {
    localStorage.setItem("food-order-cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addToCart = (food) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === food.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: food.id,
          name: food.name,
          category: food.category,
          price: food.price,
          image: food.image,
          quantity: 1,
        },
      ];
    });
  };

  const filteredFoods = foods
    .filter((food) => {
      const matchSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || food.category === category;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        <div className="menu-header">
          <div className="menu-heading-row">
            <div className="menu-intro">
              <span className="menu-eyebrow">RasaKita</span>
              <h1>Pesan favoritmu hari ini</h1>
              <p>Makan enak, minum segar, dan nikmati pengalaman pesanan yang lebih cepat.</p>
            </div>

            <button
              type="button"
              className="cart-summary"
              aria-label={`${cartCount} item di keranjang`}
              onClick={() => navigate("/cart")}
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-text">
                <strong>{cartCount}</strong>
                <small> item</small>
              </span>
            </button>
          </div>

          <div className="menu-stats">
            <div className="stat-card">
              <span className="stat-label">Delivery</span>
              <strong>15-25 min</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Popular</span>
              <strong>Top picks</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Rating</span>
              <strong>4.8/5</strong>
            </div>
          </div>

          <div className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>

            <input
              type="text"
              placeholder="Cari nama makanan..."
              aria-label="Cari makanan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="clear-search"
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="filter-area">
            <div className="select-wrapper">
              <label htmlFor="category-filter">Kategori</label>
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">Semua Kategori</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>

            <div className="select-wrapper sort-select">
              <label htmlFor="sort-filter">Urutkan</label>
              <select
                id="sort-filter"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="low">Harga Terendah</option>
                <option value="high">Harga Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>
          </div>

          <div className="result-row">
            <span>
              <strong>{filteredFoods.length}</strong> menu tersedia
            </span>
            {(search || category !== "All" || sort !== "default") && (
              <button
                className="reset-filter"
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSort("default");
                }}
              >
                Reset filter
              </button>
            )}
          </div>
        </div>

        <div className="food-grid">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div className="food-card" key={food.id}>
                <div className="food-image-wrapper">
                  <img src={food.image} alt={food.name} className="food-image" />
                  <span className="food-category">{food.category}</span>
                </div>

                <div className="food-content">
                  <h2>{food.name}</h2>

                  <p className="food-description">
                    Delicious and freshly prepared for you.
                  </p>

                  <div className="food-bottom">
                    <span className="food-price">{formatPrice(food.price)}</span>

                    <button
                      className="order-button"
                      type="button"
                      onClick={() => addToCart(food)}
                    >
                      + Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-food">
              <div className="no-food-icon">🍽️</div>
              <h2>Food tidak ditemukan</h2>
              <p>Coba gunakan kata pencarian atau kategori yang berbeda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPages;