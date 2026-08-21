import React, { useMemo, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const menuItems = [
  {
    id: 1,
    name: "Nasi Goreng",
    category: "Indonesian Food",
    price: 25000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Mie Ayam",
    category: "Indonesian Food",
    price: 20000,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Ayam Bakar",
    category: "Western Food",
    price: 35000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Gado-Gado",
    category: "Asian Food",
    price: 18000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Es Krim Vanilla",
    category: "Dessert",
    price: 15000,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  "All",
  "Indonesian Food",
  "Western Food",
  "Asian Food",
  "Dessert",
];
const sortOptions = ["Sort By", "Lowest Price", "Highest Price", "Popular"];

export default function FoodOrder() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Sort By");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "Lowest Price") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Highest Price") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Popular") {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [category, search, sortBy]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "next") {
        return prev < totalPages ? prev + 1 : prev;
      }
      return prev > 1 ? prev - 1 : prev;
    });
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
    titleWrap: {
      textAlign: "center",
      marginBottom: "16px",
    },
    title: {
      margin: 0,
      fontSize: "28px",
      fontWeight: 700,
      color: isDark ? "#f3f4f6" : "#1f2937",
    },
    subtitle: {
      margin: "6px 0 0",
      fontSize: "12px",
      color: isDark ? "#cbd5e1" : "#6b7280",
    },
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
    filterRow: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    selectWrap: {
      flex: 1,
      minWidth: "180px",
    },
    label: {
      display: "block",
      fontSize: "11px",
      color: isDark ? "#d1d5db" : "#6b7280",
      marginBottom: "4px",
      fontWeight: 600,
    },
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
      gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
      gap: "18px",
      marginBottom: "16px",
    },
    card: {
      background: isDark ? "#111827" : "#fff",
      borderRadius: "14px",
      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
      border: isDark ? "1px solid #374151" : "1px solid #edf2f7",
      overflow: "hidden",
    },
    imageWrap: {
      width: "100%",
      height: "180px",
      background: "#e5e7eb",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    cardBody: {
      padding: "12px 14px 14px",
    },
    metaRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    categoryPill: {
      display: "inline-block",
      fontSize: "10px",
      color: isDark ? "#cbd5e1" : "#64748b",
      background: isDark ? "#1f2937" : "#f3f4f6",
      padding: "4px 8px",
      borderRadius: "999px",
    },
    rating: {
      fontSize: "11px",
      color: "#f59e0b",
      fontWeight: 700,
    },
    foodName: {
      margin: "0 0 6px",
      fontSize: "18px",
      fontWeight: 700,
      color: isDark ? "#f3f4f6" : "#1f2937",
    },
    priceRow: {
      marginBottom: "12px",
    },
    priceLabel: {
      fontSize: "14px",
      color: isDark ? "#e5e7eb" : "#334155",
      fontWeight: 700,
    },
    itemFooter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
    },
    starBox: {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "#e0f2fe",
      color: "#2563eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: 700,
    },
    button: {
      flex: 1,
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "10px 12px",
      fontWeight: 700,
      fontSize: "13px",
      cursor: "pointer",
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
    pageControl: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
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
    pageButtonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    pageBox: {
      border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
      background: isDark ? "#111827" : "#fff",
      borderRadius: "8px",
      padding: "4px 10px",
      fontSize: "12px",
      fontWeight: 700,
      color: isDark ? "#f3f4f6" : "#334155",
    },
    footerText: {
      fontSize: "12px",
      color: isDark ? "#cbd5e1" : "#475569",
    },
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search for food..."
              style={styles.searchInput}
            />

            <div style={styles.filterRow}>
              <div style={styles.selectWrap}>
                <label style={styles.label}>Kategori</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={styles.select}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.selectWrap}>
                <label style={styles.label}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.select}
                >
                  {sortOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.cardGrid}>
          {paginatedItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.imageWrap}>
                <img src={item.image} alt={item.name} style={styles.image} />
              </div>

              <div style={styles.cardBody}>
                <div style={styles.metaRow}>
                  <span style={styles.categoryPill}>{item.category}</span>
                  <span style={styles.rating}>★ {item.rating}</span>
                </div>

                <h3 style={styles.foodName}>{item.name}</h3>

                <div style={styles.priceRow}>
                  <span style={styles.priceLabel}>
                    Rp. {item.price.toLocaleString("id-ID")}
                  </span>
                </div>

                <div style={styles.itemFooter}>
                  <div style={styles.starBox}>★</div>
                  <button type="button" style={styles.button}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <div style={styles.pageControl}>
            <button
              type="button"
              style={{
                ...styles.pageButton,
                ...(currentPage === 1 ? styles.pageButtonDisabled : {}),
              }}
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>

            <div style={styles.pageBox}>1</div>

            <button
              type="button"
              style={{
                ...styles.pageButton,
                ...(currentPage === totalPages || totalPages === 0
                  ? styles.pageButtonDisabled
                  : {}),
              }}
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              {">"}
            </button>
          </div>

          <div style={styles.footerText}>
            Showing {filteredItems.length > 0 ? 1 : 0} -{" "}
            {Math.min(filteredItems.length, itemsPerPage)} of {filteredItems.length} items
          </div>
        </div>
      </div>
    </div>
  );
}