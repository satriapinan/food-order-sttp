import React, { useState, useMemo } from 'react';
import './App.css';

// Data Dummy Menu Makanan
const initialMenus = [
  { id: 1, name: 'Nasi Goreng Spesial', price: 25000, category: 'Rice', image: 'https://images.unsplash.com/photo-1645177628172-a94c1f80e63a?auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Mie Ayam Bakso', price: 20000, category: 'Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f6b4?auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'Ayam Geprek Sambal Matah', price: 23000, category: 'Chicken', image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5b?auto=format&fit=crop&w=500&q=60' },
  { id: 4, name: 'Sate Ayam Madura', price: 30000, category: 'Chicken', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a904bd?auto=format&fit=crop&w=500&q=60' },
  { id: 5, name: 'Bubur Ayam', price: 15000, category: 'Rice', image: 'https://images.unsplash.com/photo-1626804475297-41608f546849?auto=format&fit=crop&w=500&q=60' },
  { id: 6, name: 'Kwetiaw Siram Seafood', price: 35000, category: 'Noodles', image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=500&q=60' },
];

const categories = ['All', 'Rice', 'Noodles', 'Chicken'];

function App() {
  const [menus] = useState(initialMenus);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [cartCount, setCartCount] = useState(0);

  // Logika Filter, Search, dan Sort
  const filteredMenus = useMemo(() => {
    let result = [...menus];

    // Filter Search
    if (search) {
      result = result.filter(menu => 
        menu.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter Kategori
    if (category !== 'All') {
      result = result.filter(menu => menu.category === category);
    }

    // Sorting
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [menus, search, category, sort]);

  // Format harga ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-top">
          <h1>Food Menu</h1>
          <div className="cart-icon">
            🛒 Cart: <span>{cartCount}</span>
          </div>
        </div>
        
        <div className="controls">
          <input 
            type="text" 
            placeholder="Search food..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="sort-dropdown"
          >
            <option value="default">Sort by Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="categories">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`category-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="menu-grid">
        {filteredMenus.length > 0 ? (
          filteredMenus.map(menu => (
            <div key={menu.id} className="menu-card">
              <img src={menu.image} alt={menu.name} className="menu-image" />
              <div className="menu-info">
                <h3>{menu.name}</h3>
                <p className="menu-category">{menu.category}</p>
                <div className="menu-footer">
                  <span className="menu-price">{formatRupiah(menu.price)}</span>
                  <button className="add-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No food items found.</p>
        )}
      </main>

      <footer className="footer">
        <p>Showing 1 - {filteredMenus.length} of {filteredMenus.length} items</p>
        <div className="pagination">
          <button className="page-btn disabled">Prev</button>
          <button className="page-btn active">1</button>
          <button className="page-btn disabled">Next</button>
        </div>
      </footer>
    </div>
  );
}

export default App;