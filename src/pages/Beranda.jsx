import { useMemo, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
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
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua Menu");
  const [sort, setSort] = useState("Rekomendasi");
  const [cart, setCart] = useState([]);
  const filteredItems = useMemo(() => {
    const result = menuItems.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (category === "Semua Menu" || item.category === category));
    return [...result].sort((first, second) => sort === "Harga terendah" ? first.price - second.price : sort === "Harga tertinggi" ? second.price - first.price : second.rating - first.rating);
  }, [category, query, sort]);
  const addToCart = (id) => setCart((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);

  return <main className="beranda-page">
    <nav className="topbar" aria-label="Navigasi utama"><a className="brand" href="/" aria-label="Dapur Kita beranda"><span className="brand-mark">dk</span><span>Dapur<span className="brand-accent">Kita</span></span></a><div className="topbar-actions"><span className="open-status"><i /> Buka sekarang</span><button className="cart-button" type="button" aria-label={`${cart.length} menu di keranjang`}><ShoppingBagOutlinedIcon />{cart.length > 0 && <b>{cart.length}</b>}</button><button className="avatar" type="button" aria-label="Buka profil">AR</button></div></nav>
    <section className="welcome-section"><div><p className="eyebrow">SELAMAT DATANG DI DAPUR KITA</p><h1>Makan enak,<br /><em>mood</em> pun naik.</h1><p className="welcome-copy">Hidangan rumahan hangat yang dibuat dengan bahan terbaik, langsung diantar ke pintu rumahmu.</p><a className="browse-link" href="#menu">Lihat menu hari ini <span>↗</span></a></div><div className="hero-plate" aria-hidden="true"><div className="hero-ring" /><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=90" alt="" /><span className="hero-note">made fresh<br /><strong>every day</strong></span></div></section>
    <section className="menu-section" id="menu"><div className="section-heading"><div><p className="eyebrow">PILIHAN HARI INI</p><h2>Temukan favoritmu</h2></div><span className="menu-count">{filteredItems.length} menu tersedia</span></div><div className="filter-bar"><label className="search-box"><SearchRoundedIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari makanan favoritmu..." /></label><div className="category-list" role="tablist" aria-label="Kategori makanan">{categories.map((item) => <button className={category === item ? "category active" : "category"} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="sort-box"><span>Urutkan:</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Rekomendasi</option><option>Harga terendah</option><option>Harga tertinggi</option></select><KeyboardArrowDownRoundedIcon /></label></div>{filteredItems.length > 0 ? <div className="menu-grid">{filteredItems.map((item) => { const isAdded = cart.includes(item.id); return <article className="food-card" key={item.id}><div className="food-image-wrap"><img src={item.image} alt={item.name} /><span className="rating">★ {item.rating}</span></div><div className="food-content"><p className="food-category">{item.category}</p><h3>{item.name}</h3><p className="food-meta">{item.time} <span>•</span> siap diantar</p><div className="food-footer"><strong>{formatPrice(item.price)}</strong><button className={isAdded ? "add-button added" : "add-button"} onClick={() => addToCart(item.id)} type="button">{isAdded ? <CheckRoundedIcon /> : <AddRoundedIcon />}<span>{isAdded ? "Ditambahkan" : "Tambah"}</span></button></div></div></article>; })}</div> : <div className="empty-state">Menu yang kamu cari belum tersedia. Coba kata kunci lain.</div>}<div className="pagination"><span>Menampilkan {filteredItems.length} dari {menuItems.length} menu</span><div><button type="button" disabled>←</button><button className="page-current" type="button">1</button><button type="button" disabled>→</button></div></div></section>
    <footer><span>© 2026 DapurKita</span><span>Dibuat dengan bahan segar setiap hari.</span></footer>
  </main>;
}

export default BerandaPage;
