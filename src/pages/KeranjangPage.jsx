import { useEffect, useState } from "react";

function KeranjangPage() {
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

  const tambahJumlah = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const kurangJumlah = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const hapusItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const totalHarga = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: 20 }}>🛒 Keranjang</h2>

      {cart.length === 0 ? (
        <p>Keranjang masih kosong</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                padding: "16px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: "6px 0 0" }}>
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button type="button" onClick={() => kurangJumlah(item.id)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => tambahJumlah(item.id)}>
                  +
                </button>
                <button
                  type="button"
                  onClick={() => hapusItem(item.id)}
                  style={{ marginLeft: 10 }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          <hr />

          <h3>Total: Rp {totalHarga.toLocaleString("id-ID")}</h3>

          <button type="button" onClick={() => alert("Checkout berhasil!")}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default KeranjangPage;
