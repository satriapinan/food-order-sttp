export const foods = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    price: 28000,
    desc: "Nasi goreng dengan telur, ayam, dan bumbu khas Asia yang gurih.",
    category: "Makanan Asia",
    color: "#fef3c7",
  },
  {
    id: 2,
    name: "Rendang Padang",
    price: 34000,
    desc: "Daging rendang yang empuk dengan cita rasa pedas dan kaya rempah.",
    category: "Makanan Asia",
    color: "#fde68a",
  },
  {
    id: 3,
    name: "Burger Deluxe",
    price: 39000,
    desc: "Burger dengan daging lembut, keju, sayuran segar, dan saus spesial.",
    category: "Makanan Amerika",
    color: "#dbeafe",
  },
  {
    id: 4,
    name: "Chicken Steak",
    price: 42000,
    desc: "Steak ayam dengan saus BBQ dan kentang goreng renyah.",
    category: "Makanan Amerika",
    color: "#e0f2fe",
  },
  {
    id: 5,
    name: "Kentang Goreng",
    price: 15000,
    desc: "Kentang goreng renyah dengan saus sambal dan mayones.",
    category: "Makanan Ringan",
    color: "#fef9c3",
  },
  {
    id: 6,
    name: "Pisang Keju",
    price: 17000,
    desc: "Pisang goreng dengan taburan keju dan cokelat yang menggoda.",
    category: "Makanan Ringan",
    color: "#f5d0fe",
  },
  {
    id: 7,
    name: "Brownis Cokelat",
    price: 14000,
    desc: "Brownis lembut dengan rasa cokelat yang manis dan nikmat.",
    category: "Makanan Penutup",
    color: "#f5d0fe",
  },
  {
    id: 8,
    name: "Cheesecake",
    price: 22000,
    desc: "Cheesecake lembut dengan rasa susu dan manis yang seimbang.",
    category: "Makanan Penutup",
    color: "#d1fae5",
  },
  {
    id: 9,
    name: "Roti Bakar Cokelat",
    price: 18000,
    desc: "Roti bakar hangat dengan topping cokelat dan selai kacang.",
    category: "Sarapan Pagi",
    color: "#fcd34d",
  },
  {
    id: 10,
    name: "Omelet Sayur",
    price: 20000,
    desc: "Omelet dengan sayuran segar dan rasa gurih yang cocok untuk sarapan.",
    category: "Sarapan Pagi",
    color: "#dcfce7",
  },
  {
    id: 11,
    name: "Sushi Salmon",
    price: 36000,
    desc: "Sushi dengan potongan salmon segar dan nasi yang lembut.",
    category: "Makanan Asia",
    color: "#e0f2fe",
  },
  {
    id: 12,
    name: "Waffles Cokelat",
    price: 26000,
    desc: "Waffles renyah dengan topping cokelat dan whipped cream.",
    category: "Sarapan Pagi",
    color: "#fed7aa",
  },
];

export const categories = [
  "Semua Kategori",
  "Makanan Asia",
  "Makanan Amerika",
  "Makanan Ringan",
  "Makanan Penutup",
  "Sarapan Pagi",
];

export const sortOptions = [
  { value: "harga-tertinggi", label: "Harga: Tertinggi" },
  { value: "harga-terendah", label: "Harga: Terendah" },
  { value: "nama", label: "Huruf A-Z" },
];

export const getFilteredFoods = ({ searchTerm = "", category = "Semua Kategori", sortBy = "nama" }) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  let filteredFoods = foods.filter((food) => {
    const matchesCategory = category === "Semua Kategori" || food.category === category;
    const matchesSearch =
      !normalizedSearch ||
      food.name.toLowerCase().includes(normalizedSearch) ||
      food.desc.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  filteredFoods = [...filteredFoods].sort((a, b) => {
    switch (sortBy) {
      case "harga-terendah":
        return a.price - b.price;
      case "harga-tertinggi":
        return b.price - a.price;
      case "nama":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return filteredFoods;
};
