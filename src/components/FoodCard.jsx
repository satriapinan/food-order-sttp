import React from "react";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function FoodCard({ item, onAddToCart }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <span style={styles.badge}>{item.category}</span>
        <span style={styles.rating}>⭐ {item.rating}</span>
      </div>

      <div style={styles.imageWrap}>{item.emoji}</div>

      <div style={styles.cardBody}>
        <h3 style={styles.itemName}>{item.name}</h3>
        <p style={styles.description}>{item.description}</p>

        <div style={styles.metaRow}>
          <span style={styles.metaTime}>⏱ {item.time}</span>
          <strong style={styles.price}>{formatRupiah(item.price)}</strong>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(item)}
          style={styles.addButton}
        >
          + Add to cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "22px",
    border: "1px solid #f3f4f6",
    boxShadow: "0 10px 20px rgba(15, 23, 42, 0.04)",
    padding: "14px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  badge: {
    background: "#fff7ed",
    color: "#f97316",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "11px",
    fontWeight: 700,
  },
  rating: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#f59e0b",
  },
  imageWrap: {
    height: "140px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "64px",
    marginBottom: "14px",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  itemName: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
  },
  description: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: "1.5",
    minHeight: "40px",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaTime: {
    color: "#6b7280",
    fontSize: "12px",
  },
  price: {
    fontSize: "18px",
    color: "#111827",
  },
  addButton: {
    border: "none",
    background: "#111827",
    color: "#fff",
    borderRadius: "12px",
    padding: "12px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },
};