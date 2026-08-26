const FoodCard = ({ food, onOrder }) => {
  return (
    <div
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
        {food.category === "Minuman" ? "🥤" : "🍽️"}
      </div>

      <div style={{ padding: "18px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            gap: "10px",
          }}
        >
          <h3 style={{ margin: 0, color: "#0f172a", fontSize: "22px" }}>{food.name}</h3>
          <span style={{ color: "#f97316", fontWeight: "bold" }}>
            Rp {food.price.toLocaleString("id-ID")}
          </span>
        </div>

        <p style={{ margin: "0 0 10px", color: "#64748b", fontSize: "12px", fontWeight: 700 }}>
          {food.category}
        </p>

        <p style={{ margin: "0 0 16px", color: "#475569", lineHeight: 1.6 }}>{food.desc}</p>

        <button
          type="button"
          onClick={() => onOrder(food)}
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
  );
};

export default FoodCard;
