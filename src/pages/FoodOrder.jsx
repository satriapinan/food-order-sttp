import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import api from "../services/api";
import { useTheme } from "../hooks/useTheme";
import FoodCard from "../components/FoodCard";

const categories = [
  "All",
  "Indonesian Food",
  "Western Food",
  "Asian Food",
  "Dessert",
];

const sortOptions = ["Sort By", "Lowest Price", "Highest Price", "Popular"];

// Data Cadangan (Mock Data) jika Server Backend Lokal Error
const dummyMenu = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    category: "Indonesian Food",
    rating: 4.8,
    emoji: "🍛",
    description: "Nasi goreng dengan telur, ayam suwir, dan kerupuk renyah.",
    time: "10-15 min",
    price: 25000,
  },
  {
    id: 2,
    name: "Soto Ayam Kampung",
    category: "Indonesian Food",
    rating: 4.7,
    emoji: "🍲",
    description: "Soto ayam gurih hangat dengan koya dan emping.",
    time: "15-20 min",
    price: 22000,
  },
  {
    id: 3,
    name: "Beef Burger Deluxe",
    category: "Western Food",
    rating: 4.6,
    emoji: "🍔",
    description: "Burger daging sapi juicy dengan keju melted.",
    time: "20 min",
    price: 35000,
  },
  {
    id: 4,
    name: "Ramen Chicken Miso",
    category: "Asian Food",
    rating: 4.9,
    emoji: "🍜",
    description: "Ramen khas Jepang dengan kuah miso kental.",
    time: "15 min",
    price: 32000,
  },
];

export default function FoodOrder() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        // Panggil endpoint backend
        const response = await api.get("/menu");
        const data = response.data.data || response.data;

        if (Array.isArray(data) && data.length > 0) {
          const formattedData = data.map((item) => ({
            id: item.id || Math.random(),
            name: item.name || "Menu Makanan",
            category: item.category || "General",
            rating: item.rating || 4.5,
            emoji: item.emoji || "🍲",
            image: item.image,
            description: item.description || "Hidangan lezat disajikan segar.",
            time: item.time || "15-20 min",
            price: item.price || 25000,
          }));
          setMenuItems(formattedData);
        } else {
          setMenuItems(dummyMenu); // Pakai dummy jika response kosong
        }
        setError(null);
      } catch (err) {
        console.warn("Backend error, memuat data lokal cadangan:", err);
        // Jika API Backend Error / Mati, tampilkan dummy menu agar tidak blank
        setMenuItems(dummyMenu);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const formik = useFormik({
    initialValues: {
      search: "",
      category: "All",
      sortBy: "Sort By",
    },
  });

  const { search, category, sortBy } = formik.values;

  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "Lowest Price") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Highest Price") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Popular") {
      items = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return items;
  }, [menuItems, category, search, sortBy]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "next") return prev < totalPages ? prev + 1 : prev;
      return prev > 1 ? prev - 1 : prev;
    });
  };

  const handleInputChange = (e) => {
    formik.handleChange(e);
    setCurrentPage(1);
  };

  const handleAddToCart = (item) => {
    alert(`Berhasil menambahkan ${item.name} ke keranjang!`);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isDark ? "#0f172a" : "#a7d9e8",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      transition: "all 0.3s ease",
    },
    menuWrap: {
      width: "100%",
      maxWidth: "980px",
      background: isDark ? "#111827" : "#f2f2f2",
      borderRadius: "18px",
      padding: "18px 18px 16px",
      boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
      border: isDark ? "1px solid #374151" : "none",
    },
    topBox: {
      background: isDark ? "#1f2937" : "#ffffff",
      borderRadius: "14px",
      padding: "18px 18px 12px",
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
      marginBottom: "18px",
    },
    titleWrap: { textAlign: "center", marginBottom: "16px" },
    title: { margin: 0, fontSize: "28px", fontWeight: 700, color: isDark ? "#f3f4f6" : "#1f2937" },
    subtitle: { margin: "6px 0 0", fontSize: "12px", color: isDark ? "#cbd5e1" : "#6b7280" },
    filterPanel: {
      background: isDark ? "#0f172a" : "#f8fafc",
      border: `1px solid ${isDark ? "#374151" : "#dfe7ee"}`,
      borderRadius: "12px",
      padding: "10px 12px",
    },
    searchInput: {
      width: "100%",
      border: `1px solid ${isDark ? "#374151" : "#dfe7ee"}`,
      borderRadius: "10px",
      padding: "10px 12px",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: "10px",
      background: isDark ? "#111827" : "#fff",
      color: isDark ? "#f3f4f6" : "#111827",
    },
    filterRow: { display: "flex", gap: "12px", flexWrap: "wrap" },
    selectWrap: { flex: 1, minWidth: "180px" },
    label: { display: "block", fontSize: "11px", color: isDark ? "#d1d5db" : "#6b7280", marginBottom: "4px", fontWeight: 600 },
    select: {
      width: "100%",
      border: `1px solid ${isDark ? "#374151" : "#dfe7ee"}`,
      borderRadius: "10px",
      padding: "10px 12px",
      fontSize: "14px",
      background: isDark ? "#111827" : "#fff",
      color: isDark ? "#f3f4f6" : "#374151",
      outline: "none",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "18px",
      marginBottom: "16px",
    },
    statusText: {
      textAlign: "center",
      padding: "40px",
      color: isDark ? "#cbd5e1" : "#475569",
      fontWeight: 600,
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: isDark ? "#0f172a" : "#f8fafc",
      border: `1px solid ${isDark ? "#374151" : "#e2e8f0"}`,
      borderRadius: "12px",
      padding: "10px 12px",
      color: isDark ? "#cbd5e1" : "#475569",
      fontSize: "12px",
    },
    pageControl: { display: "flex", alignItems: "center", gap: "8px" },
    pageButton: {
      border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
      background: isDark ? "#111827" : "#fff",
      color: isDark ? "#f3f4f6" : "#334155",
      borderRadius: "8px",
      width: "28px",
      height: "28px",
      cursor: "pointer",
      fontWeight: 700,
    },
    pageButtonDisabled: { opacity: 0.5, cursor: "not-allowed" },
    pageBox: {
      border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
      background: isDark ? "#111827" : "#fff",
      borderRadius: "8px",
      padding: "4px 10px",
      fontSize: "12px",
      fontWeight: 700,
      color: isDark ? "#f3f4f6" : "#334155",
    },
    footerText: { fontSize: "12px", color: isDark ? "#cbd5e1" : "#475569" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.menuWrap}>
        <div style={styles.topBox}>
          <div style={styles.titleWrap}>
            <h2 style={styles.title}>Food Menu</h2>
            <p style={styles.subtitle}>Discover delicious meals just for you</p>
          </div>

          <div style={styles.filterPanel}>
            <input
              type="text"
              name="search"
              value={formik.values.search}
              onChange={handleInputChange}
              placeholder="Search for food..."
              style={styles.searchInput}
            />

            <div style={styles.filterRow}>
              <div style={styles.selectWrap}>
                <label style={styles.label}>Kategori</label>
                <select name="category" value={formik.values.category} onChange={handleInputChange} style={styles.select}>
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div style={styles.selectWrap}>
                <label style={styles.label}>Sort By</label>
                <select name="sortBy" value={formik.values.sortBy} onChange={handleInputChange} style={styles.select}>
                  {sortOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={styles.statusText}>Memuat menu makanan...</div>
        ) : error ? (
          <div style={{ ...styles.statusText, color: "#ef4444" }}>{error}</div>
        ) : (
          <div style={styles.cardGrid}>
            {paginatedItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}

        <div style={styles.footer}>
          <div style={styles.pageControl}>
            <button
              type="button"
              style={{ ...styles.pageButton, ...(currentPage === 1 ? styles.pageButtonDisabled : {}) }}
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <div style={styles.pageBox}>{currentPage}</div>
            <button
              type="button"
              style={{ ...styles.pageButton, ...(currentPage === totalPages || totalPages === 0 ? styles.pageButtonDisabled : {}) }}
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              {">"}
            </button>
          </div>

          <div style={styles.footerText}>
            Showing {filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} items
          </div>
        </div>
      </div>
    </div>
  );
}