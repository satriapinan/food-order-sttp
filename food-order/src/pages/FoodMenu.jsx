import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const foods = [
  {
    id: 1,
    category: "Indonesian Food",
    name: "Nasi Goreng",
    price: "Rp. 25.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  },
  {
    id: 2,
    category: "Indonesian Food",
    name: "Mie Ayam",
    price: "Rp. 20.000",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
  },
  {
    id: 3,
    category: "Western Food",
    name: "Ayam Bakar",
    price: "Rp. 35.000",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400",
  },
  {
    id: 4,
    category: "Asian Food",
    name: "Gado-Gado",
    price: "Rp. 18.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  },
  {
    id: 5,
    category: "Desserts",
    name: "Es Krim Vanilla",
    price: "Rp. 15.000",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400",
  },
  {id:6,
    category: "Desserts",
    name: "Es Krim Cokelat",
    price: "Rp. 15.000",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400"
  }
];

function FoodMenuPage() {
  const [search, setSearch] = useState("");

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <Typography variant="h5" align="center" style={{ color: "#1c4b5c" }}>
          Food Menu
        </Typography>
        <Typography variant="body2" align="center" style={{ color: "#888", marginBottom: 16 }}>
          Discover delicious meals just for you
        </Typography>

        <input
          type="text"
          placeholder="Search for food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.filterRow}>
          <select style={styles.select}>
            <option>Kategori</option>
            <option>Indonesian Food</option>
            <option>Western Food</option>
            <option>Asian Food</option>
            <option>Desserts</option>
          </select>
          <select style={styles.select}>
            <option>Sort By</option>
          </select>
        </div>
      </div>

      {/* GRID MAKANAN */}
      <div style={styles.grid}>
        {foods.map((food) => (
          <div key={food.id} style={styles.card}>
            <img src={food.image} alt={food.name} style={styles.cardImage} />
            <div style={styles.cardBody}>
              <span style={styles.category}>{food.category}</span>
              <p style={styles.foodName}>{food.name}</p>
              <p style={styles.price}>{food.price}</p>
              <p style={styles.available}>Available</p>
              <Button
                variant="contained"
                fullWidth
                sx={{ background: "linear-gradient(135deg, #2b7f9a, #4a9b7f)", fontWeight: 600 }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER / PAGINATION */}
      <div style={styles.footer}>
        <div style={styles.pageSize}>
          <span>Page Size</span>
          <select style={styles.select}>
            <option>8</option>
          </select>
        </div>

        <div style={styles.pageNumber}>1</div>

        <span style={styles.showingText}>Showing 1-5 of 5 items</span>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #1e5f66, #3d8f95, #5fada0)",
  },
  header: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px 30px",
    maxWidth: "700px",
    margin: "0 auto 30px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #d8dee8",
    borderRadius: "8px",
    marginBottom: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
  },
  select: {
    padding: "8px",
    border: "1px solid #d8dee8",
    borderRadius: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  },
  cardImage: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "12px",
  },
  category: {
    color: "#2b7f9a",
    fontSize: "11px",
    fontWeight: "bold",
  },
  foodName: {
    fontWeight: "bold",
    margin: "6px 0 2px",
  },
  price: {
    color: "#1c4b5c",
    fontWeight: "bold",
    margin: "0 0 6px",
  },
  available: {
    fontSize: "11px",
    color: "#888",
    marginBottom: "8px",
  },
  footer: {
    maxWidth: "1000px",
    margin: "30px auto 0",
    background: "#fff",
    borderRadius: "16px",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  pageSize: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#888",
  },
  pageNumber: {
    background: "#2b7f9a",
    color: "#fff",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
  },
  showingText: {
    fontSize: "13px",
    color: "#888",
  },
};

export default FoodMenuPage;