import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../hooks/useAuth";
import "./Beranda.css";

const menuItems = [
  { id: 1, name: "Nasi Goreng Kampung", category: "Makanan Utama", price: 25000, rating: 4.9, time: "15-20 min", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=85" },
  { id: 2, name: "Mie Goreng Jawa", category: "Makanan Utama", price: 20000, rating: 4.8, time: "15-20 min", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85" },
  { id: 3, name: "Ayam Bakar Madu", category: "Makanan Utama", price: 35000, rating: 4.9, time: "25-30 min", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85" },
  { id: 4, name: "Gado-Gado Nusantara", category: "Sehat & Salad", price: 18000, rating: 4.7, time: "10-15 min", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85" },
  { id: 5, name: "Es Krim Vanilla", category: "Dessert", price: 15000, rating: 4.8, time: "5-10 min", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=700&q=85" },
  { id: 6, name: "Soto Ayam Lamongan", category: "Makanan Utama", price: 22000, rating: 4.8, time: "20-25 min", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85" },
];

const categories = ["Semua Menu", "Makanan Utama", "Sehat & Salad", "Dessert"];
const formatPrice = (price) => `Rp ${price.toLocaleString("id-ID")}`;

function BerandaPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua Menu");
  const [sort, setSort] = useState("Rekomendasi");

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("dapur-kita-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dapur-kita-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredItems = useMemo(() => {
    const result = menuItems.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "Semua Menu" || item.category === category;
      return matchesQuery && matchesCategory;
    });

    return [...result].sort((first, second) => {
      if (sort === "Harga terendah") return first.price - second.price;
      if (sort === "Harga tertinggi") return second.price - first.price;
      return second.rating - first.rating;
    });
  }, [category, query, sort]);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const addToCart = (item) => {
    setCart((current) => {
      const existingItem = current.find((entry) => entry.id === item.id);

      if (!existingItem) {
        return [...current, { ...item, qty: 1 }];
      }

      return current.map((entry) =>
        entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry
      );
    });
  };

  return (
    <main className="beranda-page">
      <nav className="topbar" aria-label="Navigasi utama">
        <a className="brand" href="/" aria-label="DAPUR KITA beranda">
          <span className="brand-mark">ay</span>
          <span>
            AMPERA<span className="brand-accent">YUL</span>
          </span>
        </a>

        <div className="topbar-actions">
          <span className="open-status"><i /> Buka sekarang</span>
          <button
            className="cart-button"
            type="button"
            aria-label={`${cartCount} menu di keranjang`}
            onClick={() => navigate("/keranjang")}
          >
            <ShoppingBagOutlinedIcon />
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
          <div className="profile-actions">
            <button className="avatar" type="button" aria-label={`Profil ${user?.fullname || user?.username || "pengguna"}`}>
              {(user?.fullname || user?.username || "AR")
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </button>
            <Tooltip title="Keluar">
              <IconButton className="logout-button" onClick={logout} aria-label="Keluar dari akun" size="small">
                <LogoutRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </nav>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">SELAMAT DATANG DI AMPERA YUL</p>
          <h1>
            Makan enak,<br />
            <em>mood</em> pun naik.
          </h1>
          <p className="welcome-copy">
            Hidangan rumahan hangat yang dibuat dengan bahan terbaik, langsung diantar ke pintu rumahmu.
          </p>
          <a className="browse-link" href="#menu">
            Lihat menu hari ini <span>↗</span>
          </a>
        </div>

        <div className="hero-plate" aria-hidden="true">
          <div className="hero-ring" />
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=90"
            alt=""
          />
          <span className="hero-note">
            made fresh<br />
            <strong>every day</strong>
          </span>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PILIHAN HARI INI</p>
            <h2>Temukan favoritmu</h2>
          </div>
          <span className="menu-count">{filteredItems.length} menu tersedia</span>
        </div>

        <div className="filter-bar">
          <label className="search-box">
            <SearchRoundedIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari makanan favoritmu..."
            />
          </label>

          <div className="category-list" role="tablist" aria-label="Kategori makanan">
            {categories.map((item) => (
              <button
                className={category === item ? "category active" : "category"}
                type="button"
                key={item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="sort-box">
            <span>Urutkan:</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option>Rekomendasi</option>
              <option>Harga terendah</option>
              <option>Harga tertinggi</option>
            </select>
            <KeyboardArrowDownRoundedIcon />
          </label>
        </div>

        {filteredItems.length > 0 ? (
          <div className="menu-grid">
            {filteredItems.map((item) => {
              const isAdded = cart.some((entry) => entry.id === item.id);

              return (
                <article className="food-card" key={item.id}>
                  <div className="food-image-wrap">
                    <img src={item.image} alt={item.name} />
                    <span className="rating">★ {item.rating}</span>
                  </div>

                  <div className="food-content">
                    <p className="food-category">{item.category}</p>
                    <h3>{item.name}</h3>
                    <p className="food-meta">
                      {item.time} <span>•</span> siap diantar
                    </p>

                    <div className="food-footer">
                      <strong>{formatPrice(item.price)}</strong>
                      <button
                        className={isAdded ? "add-button added" : "add-button"}
                        onClick={() => addToCart(item)}
                        type="button"
                      >
                        {isAdded ? <CheckRoundedIcon /> : <AddRoundedIcon />}
                        <span>{isAdded ? "Ditambahkan" : "Tambah"}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">Menu yang kamu cari belum tersedia. Coba kata kunci lain.</div>
        )}

        <div className="pagination">
          <span>Menampilkan {filteredItems.length} dari {menuItems.length} menu</span>
          <div>
            <button type="button" disabled>←</button>
            <button type="button">1</button>
            <button type="button" disabled>→</button>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 DapurKita</span>
        <span>Dibuat dengan bahan segar setiap hari.</span>
      </footer>
    </main>
  );
}

export default BerandaPage;
