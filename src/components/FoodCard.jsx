import React from "react";
import { useTheme } from "../hooks/useTheme";

// Import gambar-gambar dari folder assets
import nasgorImg from "../assets/nasgor.jpg";
import sotoImg from "../assets/soto.jpg";
import burgerImg from "../assets/burger.png";
import ramenImg from "../assets/ramen.png";

// Objek pemetaan (mapping) nama file / ID / nama makanan ke variabel import
const imageMap = {
  "nasgor.jpg": nasgorImg,
  "soto.jpg": sotoImg,
  "burger.jpg": burgerImg,
  "ramen.jpg": ramenImg,
  // Boleh juga gunakan nama item sebagai key
  "Nasi Goreng Spesial": nasgorImg,
  "Soto Ayam Kampung": sotoImg,
  "Beef Burger Deluxe": burgerImg,
  "Ramen Chicken Miso": ramenImg,
};

export default function FoodCard({ item, onAddToCart }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Fungsi untuk mendapatkan gambar dari folder assets
  const getAssetImage = (imageProp, nameProp) => {
    if (!imageProp && !nameProp) return null;

    // 1. Cek jika imageProp berupa URL lengkap (http/https)
    if (typeof imageProp === "string" && (imageProp.startsWith("http://") || imageProp.startsWith("https://"))) {
      return imageProp;
    }

    // 2. Bersihkan string path (misal "/images/nasgor.jpg" menjadi "nasgor.jpg")
    const fileName = typeof imageProp === "string" ? imageProp.split("/").pop() : "";

    // 3. Cari gambar berdasarkan nama file atau nama makanan di imageMap
    return imageMap[fileName] || imageMap[nameProp] || null;
  };

  const imageUrl = getAssetImage(item.image, item.name);

  const styles = {
    card: {
      background: isDark ? "#1f2937" : "#ffffff",
      borderRadius: "16px",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: isDark
        ? "0 4px 12px rgba(0,0,0,0.3)"
        : "0 4px 12px rgba(0,0,0,0.05)",
      border: isDark ? "1px solid #374151" : "1px solid #f1f5f9",
      transition: "all 0.2s ease",
    },
    topRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    categoryBadge: {
      background: isDark ? "rgba(249, 115, 22, 0.2)" : "#fff7ed",
      color: "#f97316",
      fontSize: "10px",
      fontWeight: 700,
      padding: "4px 8px",
      borderRadius: "12px",
    },
    rating: {
      fontSize: "11px",
      fontWeight: 700,
      color: "#eab308",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    imageContainer: {
      width: "100%",
      height: "120px",
      background: isDark ? "#111827" : "#ffedd5",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginBottom: "10px",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    emoji: {
      fontSize: "48px",
    },
    title: {
      margin: "0 0 4px",
      fontSize: "15px",
      fontWeight: 700,
      color: isDark ? "#f3f4f6" : "#1e293b",
    },
    description: {
      margin: "0 0 10px",
      fontSize: "11px",
      color: isDark ? "#9ca3af" : "#64748b",
      lineHeight: "1.4",
      height: "30px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    metaRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    time: {
      fontSize: "10px",
      color: isDark ? "#9ca3af" : "#94a3b8",
    },
    price: {
      fontSize: "14px",
      fontWeight: 700,
      color: isDark ? "#f3f4f6" : "#0f172a",
    },
    button: {
      width: "100%",
      padding: "8px",
      background: isDark ? "#3b82f6" : "#0f172a",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background 0.2s ease",
    },
  };

  return (
    <div style={styles.card}>
      <div>
        <div style={styles.topRow}>
          <span style={styles.categoryBadge}>{item.category}</span>
          <span style={styles.rating}>★ {item.rating}</span>
        </div>

        <div style={styles.imageContainer}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={item.name}
              style={styles.img}
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = "block";
                }
              }}
            />
          ) : null}
          <span
            style={{
              ...styles.emoji,
              display: imageUrl ? "none" : "block",
            }}
          >
            {item.emoji || "🍲"}
          </span>
        </div>

        <h3 style={styles.title}>{item.name}</h3>
        <p style={styles.description}>{item.description}</p>
      </div>

      <div>
        <div style={styles.metaRow}>
          <span style={styles.time}>⏱ {item.time}</span>
          <span style={styles.price}>
            Rp {Number(item.price).toLocaleString("id-ID")}
          </span>
        </div>

        <button
          type="button"
          style={styles.button}
          onClick={() => onAddToCart(item)}
        >
          + Add to cart
        </button>
      </div>
    </div>
  );
}