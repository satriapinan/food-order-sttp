const foods = [
  {
    name: "Nasi Goreng",
    price: "Rp 25.000",
    desc: "Nasi goreng spesial dengan telur dan ayam panggang.",
    color: "#fef3c7",
  },
  {
    name: "Mie Ayam",
    price: "Rp 20.000",
    desc: "Mie dengan ayam, pangsit, dan sawi segar.",
    color: "#dbeafe",
  },
  {
    name: "Bakso",
    price: "Rp 22.000",
    desc: "Bakso kenyal dengan kuah gurih dan bawang goreng.",
    color: "#dcfce7",
  },
  {
    name: "Sate Ayam",
    price: "Rp 30.000",
    desc: "Sate ayam bumbu khas dengan lontong dan sambal.",
    color: "#fee2e2",
  },
];

const FoodMenu = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff7ed 0%, #e0f2fe 100%)",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <p style={{ margin: 0, color: "#f97316", fontWeight: "bold", letterSpacing: "2px" }}>
            MENU MAKANAN
          </p>
          <h1 style={{ margin: "12px 0 8px", color: "#0f172a", fontSize: "36px" }}>
            Pilihan Makanan Favorit
          </h1>
          <p style={{ margin: 0, color: "#475569" }}>
            Rasa enak, harga terjangkau, dan siap diantar cepat.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {foods.map((food) => (
            <div
              key={food.name}
              style={{
                background: "white",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  background: food.color,
                  height: "120px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "40px",
                }}
              >
                🍽️
              </div>

              <div style={{ padding: "18px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#0f172a", fontSize: "22px" }}>
                    {food.name}
                  </h3>
                  <span style={{ color: "#f97316", fontWeight: "bold" }}>{food.price}</span>
                </div>

                <p style={{ margin: "0 0 16px", color: "#475569", lineHeight: 1.6 }}>
                  {food.desc}
                </p>

                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#2563eb",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
