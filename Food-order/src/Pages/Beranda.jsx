import { useState, useEffect, useMemo, useContext } from 'react';
import { useTheme } from '../Hooks/useTheme';
import { CartContext } from '../Providers/CartContext';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import AppTextField from '../Components/AppTextField';
import AppSelect from '../Components/AppSelect';
import api from '../Services/api';
import './Beranda.css';

export default function Beranda() {
  const { mode } = useTheme();
  const { addToCart } = useContext(CartContext);
  const isDark = mode === 'dark';
  
  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
  });

  const { search, category, sortBy } = formik.values;
  const [pageSize, setPageSize] = useState(8);

  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    api.get("/food-order/categories").then((res) => {
      setCategories(res.data.data || []);
    });
  }, []);

  useEffect(() => {
    const params = { pageSize: 100 };

    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    api.get("/food-order/foods", { params }).then((res) => {
      setFoods(res.data.data || []);
    });
  }, [search, category, sortBy]);

  const categoryOptions = useMemo(() => {
    return [
      { value: "", label: "Semua" },
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.categoryName,
      })),
    ];
  }, [categories]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp. ');
  };

  return (
    <div className={`food-menu-container ${isDark ? 'dark-mode' : ''}`}>
      <div className="food-menu-content">
        
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Foodie Paradise</h1>
            <p>Discover the best food & drinks in your area, delivered fast to your door.</p>
            <button className="hero-btn">Explore Menu</button>
          </div>
        </div>

        {/* Menu Section */}
        <div className="menu-section">
          <div className="menu-header">
            <h2>Our Popular Menu</h2>
            <p>Choose your favorite meals from our diverse categories</p>
          
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, md: 3 }, 
            mb: 5, 
            mt: 4,
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' } 
          }}>
            <AppTextField
              name="search"
              label="Cari makanan atau minuman..."
              value={formik.values.search}
              onChange={formik.handleChange}
              margin="none"
              size="medium"
              sx={{ 
                flexGrow: 1, 
                mb: 0, 
                backgroundColor: "background.paper", 
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <AppSelect
                label="Kategori"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                options={categoryOptions}
                size="medium"
                sx={{ 
                  flex: 1, 
                  minWidth: { xs: '100%', sm: 160 },
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                }}
              />
              <AppSelect
                label="Urutkan"
                name="sortBy"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
                size="medium"
                options={[
                  { value: "", label: "Default" },
                  { value: "price-asc", label: "Harga Terendah" },
                  { value: "price-desc", label: "Harga Tertinggi" },
                  { value: "name-asc", label: "Nama A-Z" },
                ]}
                sx={{ 
                  flex: 1, 
                  minWidth: { xs: '100%', sm: 180 },
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                }}
              />
            </Box>
          </Box>
        </div>

        {/* Grid Section */}
        <div className="food-grid">
          {foods.map((food) => (
            <div className="food-card" key={food.id}>
              <div className="card-image-container">
                <img 
                  src={food.image || `/images/${food.name}.jpg`} 
                  alt={food.name} 
                  className="food-image" 
                />
              </div>
              <div className="card-body">
                <span className="category-badge">{food.category}</span>
                <h3 className="food-name">{food.name}</h3>
                <p className="food-price">{formatPrice(food.price)}</p>
                
                <div className="card-footer">
                  <div className="availability">
                    <span className="star-icon">☆</span>
                    <span className="available-text">Available</span>
                  </div>
                  <button className="add-to-cart-btn" onClick={() => addToCart(food)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="pagination-bar">
          <div className="page-size-selector">
            <label>Page Size</label>
            <select 
              value={pageSize} 
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
          
          <div className="pagination-controls">
            <button className="page-btn">‹</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">›</button>
          </div>
          
          <div className="pagination-info">
            Showing 1-{foods.length} of {foods.length} items
          </div>
        </div>

        </div> {/* End of menu-section */}

      </div>
    </div>
  );
}
