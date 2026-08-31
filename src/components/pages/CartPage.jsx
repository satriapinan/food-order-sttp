import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const getStoredCart = () => {
  try {
    const savedCart = JSON.parse(localStorage.getItem("food-order-cart") || "[]");
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
};

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getStoredCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    localStorage.setItem("food-order-cart", JSON.stringify(cart));
  }, [cart]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("food-order-cart", JSON.stringify([]));
  };

  const handleCheckout = () => {
    const nextOrderNumber = `RASA-${Date.now().toString().slice(-6)}`;
    setOrderNumber(nextOrderNumber);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <p style={styles.successLabel}>Pesanan berhasil dibuat</p>
          <h1 style={styles.successTitle}>Terima kasih, pesanan Anda sedang diproses.</h1>
          <p style={styles.successText}>
            Nomor pesanan Anda: <strong>{orderNumber}</strong>
          </p>
          <button
            type="button"
            style={styles.primaryButton}
            onClick={() => navigate("/food-order")}
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <p style={styles.eyebrow}>Keranjang</p>
            <h1 style={styles.title}>Pesanan Anda</h1>
          </div>

          <button type="button" style={styles.backButton} onClick={() => navigate("/food-order")}>
            ← Kembali
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>🛒</div>
            <h2 style={styles.emptyTitle}>Keranjang masih kosong</h2>
            <p style={styles.emptyText}>Tambahkan menu favorit Anda untuk memulai pesanan.</p>
            <button type="button" style={styles.primaryButton} onClick={() => navigate("/food-order")}>
              Pilih Menu
            </button>
          </div>
        ) : (
          <>
            <div style={styles.summaryRow}>
              <span>{totalItems} item</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <div style={styles.list}>
              {cart.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />

                  <div style={styles.itemInfo}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemMeta}>{item.category}</p>
                    <p style={styles.itemMeta}>Qty: {item.quantity}</p>
                  </div>

                  <div style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div style={styles.footerRow}>
              <button type="button" style={styles.secondaryButton} onClick={clearCart}>
                Kosongkan Keranjang
              </button>
              <button type="button" style={styles.primaryButton} onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "var(--page-bg)",
    color: "var(--text-primary)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    background: "var(--surface)",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 8px 24px var(--shadow-color)",
    boxSizing: "border-box",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  eyebrow: {
    margin: 0,
    color: "#369fc1",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  title: {
    margin: "8px 0 0",
    fontSize: "32px",
  },
  backButton: {
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-primary)",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "var(--surface-muted)",
    color: "var(--text-primary)",
  },
  list: {
    display: "grid",
    gap: "16px",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "14px",
    border: "1px solid var(--border-color)",
    borderRadius: "14px",
    background: "var(--surface)",
  },
  itemImage: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  itemInfo: {
    flex: 1,
    textAlign: "left",
  },
  itemName: {
    margin: "0 0 6px",
    fontSize: "20px",
  },
  itemMeta: {
    margin: "4px 0",
    color: "var(--text-secondary)",
    fontSize: "13px",
  },
  itemPrice: {
    fontWeight: 700,
    color: "#369fc1",
    fontSize: "16px",
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginTop: "26px",
  },
  primaryButton: {
    border: "none",
    background: "linear-gradient(90deg, #369fc1, #76a699)",
    color: "#fff",
    borderRadius: "10px",
    padding: "12px 20px",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-primary)",
    borderRadius: "10px",
    padding: "12px 20px",
    fontWeight: 700,
    cursor: "pointer",
  },
  emptyCard: {
    textAlign: "center",
    padding: "40px 20px",
    border: "1px dashed var(--border-color)",
    borderRadius: "16px",
    background: "var(--surface-muted)",
  },
  emptyIcon: {
    fontSize: "50px",
    marginBottom: "16px",
  },
  emptyTitle: {
    margin: "0 0 8px",
  },
  emptyText: {
    margin: "0 0 20px",
    color: "var(--text-secondary)",
  },
  successCard: {
    maxWidth: "620px",
    margin: "80px auto",
    background: "linear-gradient(180deg, #ffffff 0%, #f4fbff 100%)",
    borderRadius: "22px",
    border: "1px solid rgba(54, 159, 193, 0.14)",
    padding: "36px 32px",
    textAlign: "center",
    boxShadow: "0 18px 45px rgba(54, 159, 193, 0.12)",
  },
  successIcon: {
    width: "72px",
    height: "72px",
    lineHeight: "72px",
    borderRadius: "50%",
    margin: "0 auto 18px",
    background: "linear-gradient(135deg, #2d8fa8 0%, #7fb2a5 100%)",
    color: "#fff",
    fontSize: "36px",
    fontWeight: 800,
  },
  successLabel: {
    margin: 0,
    color: "#2d8fa8",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  successTitle: {
    margin: "16px 0 10px",
    color: "var(--text-primary)",
    fontSize: "28px",
  },
  successText: {
    margin: "0 0 24px",
    color: "var(--text-secondary)",
    fontSize: "16px",
  },
};

export default CartPage;
