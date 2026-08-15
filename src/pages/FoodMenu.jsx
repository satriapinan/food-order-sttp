import { Link } from "react-router-dom";

function FoodMenu() {
  const foods = [
    {
      id: 1,
      name: "Nasi Goreng Special",
      price: "Rp25.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Mie Goreng",
      price: "Rp20.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Ayam Geprek",
      price: "Rp22.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Burger Beef",
      price: "Rp28.000",
      category: "Makanan",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Kentang Goreng",
      price: "Rp15.000",
      category: "Snack",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      name: "Es Teh Manis",
      price: "Rp8.000",
      category: "Minuman",
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="menu-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          Food-Order
        </div>

        <div className="nav-menu">
          <Link to="/menu" className="active">
            Menu
          </Link>

          <Link to="/login">
            Logout
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="menu-header">
        <div>
          <span>SELAMAT DATANG</span>

          <h1>
            Mau makan apa hari ini?
          </h1>

          <p>
            Pilih makanan dan minuman favoritmu.
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Cari makanan..."
          />
        </div>
      </section>

      {/* Category */}
      <div className="categories">
        <button className="category-active">
          Semua
        </button>

        <button>
          Makanan
        </button>

        <button>
          Snack
        </button>

        <button>
          Minuman
        </button>
      </div>

      {/* Food List */}
      <section className="food-section">
        <div className="section-title">
          <h2>Food Menu</h2>
          <p>Menu pilihan terbaik untuk kamu</p>
        </div>

        <div className="food-grid">
          {foods.map((food) => (
            <div className="food-card" key={food.id}>
              <div className="food-image">
                <img
                  src={food.image}
                  alt={food.name}
                />

                <span>
                  {food.category}
                </span>
              </div>

              <div className="food-content">
                <h3>{food.name}</h3>

                <div className="food-bottom">
                  <strong>{food.price}</strong>

                  <button>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FoodMenu;