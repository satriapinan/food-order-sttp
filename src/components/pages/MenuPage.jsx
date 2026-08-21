import { useState } from "react";
import "./MenuPages.css";

const foods = [
  {
    id: 1,
    name: "Chicken Teriyaki",
    category: "Main Course",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Beef Steak",
    category: "Main Course",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Fried Rice",
    category: "Main Course",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Chicken Burger",
    category: "Fast Food",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "French Fries",
    category: "Fast Food",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Fresh Salad",
    category: "Healthy",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Pasta Carbonara",
    category: "Main Course",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Iced Coffee",
    category: "Drink",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  },
];

function MenuPages() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [cartCount, setCartCount] = useState(0);

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
            <div>
              <span className="menu-eyebrow">Freshly prepared</span>
              <h1>Choose your meal</h1>
              <p>Temukan makanan favoritmu dan pesan dengan mudah.</p>
            </div>
            <div className="cart-summary" aria-label={`${cartCount} item di keranjang`}>
              <span className="cart-icon">🛒</span>
              <span><strong>{cartCount}</strong><small> item di keranjang</small></span>
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
                <option value="Main Course">Main Course</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Healthy">Healthy</option>
                <option value="Dessert">Dessert</option>
                <option value="Drink">Drink</option>
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
            <span><strong>{filteredFoods.length}</strong> menu tersedia</span>
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
                  <img
                    src={food.image}
                    alt={food.name}
                    className="food-image"
                  />

                  <span className="food-category">
                    {food.category}
                  </span>
                </div>

                <div className="food-content">
                  <h2>{food.name}</h2>

                  <p className="food-description">
                    Delicious and freshly prepared for you.
                  </p>

                  <div className="food-bottom">
                    <span className="food-price">
                      {formatPrice(food.price)}
                    </span>

                    <button
                      className="order-button"
                      type="button"
                      onClick={() => setCartCount((count) => count + 1)}
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
              <p>
                Coba gunakan kata pencarian atau kategori yang berbeda.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default MenuPages;