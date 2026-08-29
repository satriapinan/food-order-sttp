export const foods = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    price: 28000,
    desc: "Nasi goreng dengan telur, ayam, dan bumbu khas Asia yang gurih.",
    category: "Makanan Asia",
    color: "#fef3c7",
    image: new URL("../assets/nasi goreng special.jpg", import.meta.url).href,
  },
  {
    id: 2,
    name: "Rendang Padang",
    price: 34000,
    desc: "Daging rendang yang empuk dengan cita rasa pedas dan kaya rempah.",
    category: "Makanan Asia",
    color: "#fde68a",
    image: new URL("../assets/rendang padang.jpg", import.meta.url).href,
  },
  {
    id: 3,
    name: "Burger Deluxe",
    price: 39000,
    desc: "Burger dengan daging lembut, keju, sayuran segar, dan saus spesial.",
    category: "Makanan Amerika",
    color: "#dbeafe",
    image: new URL("../assets/deluxe-burger.jpg", import.meta.url).href,
  },
  {
    id: 4,
    name: "Chicken Steak",
    price: 42000,
    desc: "Steak ayam dengan saus BBQ dan kentang goreng renyah.",
    category: "Makanan Amerika",
    color: "#e0f2fe",
    image: new URL("../assets/crispy chicken.jpg", import.meta.url).href,
  },
  {
    id: 5,
    name: "Kentang Goreng",
    price: 15000,
    desc: "Kentang goreng renyah dengan saus sambal dan mayones.",
    category: "Makanan Ringan",
    color: "#fef9c3",
    image: new URL("../assets/kentang goreng.jpg", import.meta.url).href,
  },
  {
    id: 6,
    name: "Pisang Keju",
    price: 17000,
    desc: "Pisang goreng dengan taburan keju dan cokelat yang menggoda.",
    category: "Makanan Ringan",
    color: "#f5d0fe",
    image: new URL("../assets/pisang keju.jpg", import.meta.url).href,
  },
  {
    id: 7,
    name: "Brownis Cokelat",
    price: 14000,
    desc: "Brownis lembut dengan rasa cokelat yang manis dan nikmat.",
    category: "Makanan Penutup",
    color: "#f5d0fe",
    image: new URL("../assets/brownis coklat.jpg", import.meta.url).href,
  },
  {
    id: 8,
    name: "Cheesecake",
    price: 22000,
    desc: "Cheesecake lembut dengan rasa susu dan manis yang seimbang.",
    category: "Makanan Penutup",
    color: "#d1fae5",
    image: new URL("../assets/cheesecake.jpg", import.meta.url).href,
  },
  {
    id: 9,
    name: "Roti Bakar Cokelat",
    price: 18000,
    desc: "Roti bakar hangat dengan topping cokelat dan selai kacang.",
    category: "Sarapan Pagi",
    color: "#fcd34d",
    image: new URL("../assets/roti bakar.jpg", import.meta.url).href,
  },
  {
    id: 10,
    name: "Omelet Sayur",
    price: 20000,
    desc: "Omelet dengan sayuran segar dan rasa gurih yang cocok untuk sarapan.",
    category: "Sarapan Pagi",
    color: "#dcfce7",
    image: new URL("../assets/omelet sayur.jpg", import.meta.url).href,
  },
  {
    id: 11,
    name: "Sushi Salmon",
    price: 36000,
    desc: "Sushi dengan potongan salmon segar dan nasi yang lembut.",
    category: "Makanan Asia",
    color: "#e0f2fe",
    image: new URL("../assets/sushi salmon.jpg", import.meta.url).href,
  },
  {
    id: 12,
    name: "Waffles Cokelat",
    price: 26000,
    desc: "Waffles renyah dengan topping cokelat dan whipped cream.",
    category: "Sarapan Pagi",
    color: "#fed7aa",
    image: new URL("../assets/Waffles Cokelat.jpg", import.meta.url).href,
  },
  {
    id: 13,
    name: "Mie Ayam Bakso",
    price: 29000,
    desc: "Mie ayam dengan bakso, sawi, dan kuah kaldu yang kaya rasa.",
    category: "Makanan Asia",
    color: "#fef3c7",
    image: new URL("../assets/mie ayam.jpg", import.meta.url).href,
  },
  {
    id: 14,
    name: "Ayam Geprek",
    price: 31000,
    desc: "Ayam goreng tepung dengan sambal geprek yang pedas dan menggoda.",
    category: "Makanan Asia",
    color: "#fcd34d",
    image: new URL("../assets/ayam geprek.jpg", import.meta.url).href,
  },
  {
    id: 15,
    name: "Pasta Carbonara",
    price: 35000,
    desc: "Pasta creamy dengan keju parmesan, mushroom, dan bawang putih.",
    category: "Makanan Amerika",
    color: "#d1fae5",
    image: new URL("../assets/pasta cabonara.jpg", import.meta.url).href,
  },
  {
    id: 16,
    name: "Lasagna",
    price: 38000,
    desc: "Lasagna dengan saus tomat, daging, dan keju yang lumer.",
    category: "Makanan Amerika",
    color: "#bfdbfe",
    image: new URL("../assets/lasagna.jpg", import.meta.url).href,
  },
  {
    id: 17,
    name: "Tahu Tek",
    price: 18000,
    desc: "Tahu goreng dengan petis, sayuran, dan saus khas Surabaya.",
    category: "Makanan Ringan",
    color: "#fef9c3",
    image: new URL("../assets/tahu tek.jpg", import.meta.url).href,
  },
  {
    id: 18,
    name: "Sate Ayam",
    price: 25000,
    desc: "Sate ayam dengan bumbu kacang yang gurih dan aroma rempah.",
    category: "Makanan Asia",
    color: "#fde68a",
    image: new URL("../assets/sate ayam.jpg", import.meta.url).href,
  },
  {
    id: 19,
    name: "Taco Chicken",
    price: 33000,
    desc: "Taco isi ayam, sayuran segar, dan saus salsa yang nikmat.",
    category: "Makanan Amerika",
    color: "#e0f2fe",
    image: new URL("../assets/taco chicken.jpg", import.meta.url).href,
  },
  {
    id: 20,
    name: "Donat Kentang",
    price: 16000,
    desc: "Donat lembut dengan tekstur kentang yang empuk dan manis.",
    category: "Makanan Penutup",
    color: "#f5d0fe",
    image: new URL("../assets/donat kentang.jpg", import.meta.url).href,
  },
  {
    id: 21,
    name: "Es Cendol",
    price: 12000,
    desc: "Minuman segar dengan campuran cendol, santan, dan gula merah.",
    category: "Minuman",
    color: "#dbeafe",
    image: new URL("../assets/es cendol.jpg", import.meta.url).href,
  },
  {
    id: 22,
    name: "Es Teh Manis",
    price: 8000,
    desc: "Teh dingin yang menyegarkan dengan rasa manis yang pas.",
    category: "Minuman",
    color: "#d1fae5",
    image: new URL("../assets/teh manis.jpg", import.meta.url).href,
  },
  {
    id: 23,
    name: "Jus Alpukat",
    price: 16000,
    desc: "Jus alpukat creamy dengan rasa lembut dan kaya nutrisi.",
    category: "Minuman",
    color: "#bbf7d0",
    image: new URL("../assets/jus alpukat.jpg", import.meta.url).href,
  },
  {
    id: 24,
    name: "Milkshake Cokelat",
    price: 20000,
    desc: "Milkshake cokelat dingin dengan tekstur lembut dan creamy.",
    category: "Minuman",
    color: "#fcd34d",
    image: new URL("../assets/milkshake coklat.jpg", import.meta.url).href,
  },
  {
    id: 25,
    name: "Pisang Goreng Crispy",
    price: 19000,
    desc: "Pisang goreng renyah dengan lapisan tepung yang gurih.",
    category: "Makanan Ringan",
    color: "#fde68a",
    image: new URL("../assets/pisang goreng crispy.jpg", import.meta.url).href,
  },
  {
    id: 26,
    name: "Mochi Matcha",
    price: 21000,
    desc: "Mochi lembut dengan rasa matcha yang khas dan menyegarkan.",
    category: "Makanan Penutup",
    color: "#e0f2fe",
    image: new URL("../assets/mochi matcha.jpg", import.meta.url).href,
  },
];

export const categories = [
  "Semua Kategori",
  "Makanan Asia",
  "Makanan Amerika",
  "Makanan Ringan",
  "Makanan Penutup",
  "Sarapan Pagi",
  "Minuman",
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
