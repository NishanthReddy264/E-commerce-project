import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(()=>{document.title="Product page"},[])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on price, category, rating, and search term
    const applyFilters = () => {
      let filtered = products;

      if (priceFilter) {
        filtered = filtered.filter(product => {
          if (priceFilter === '4') return product.price > 3;
          return product.price <= priceFilter;
        });
      }

      if (categoryFilter) {
        filtered = filtered.filter(product => product.category === categoryFilter);
      }

      if (ratingFilter) {
        filtered = filtered.filter(product => product.rating >= ratingFilter);
      }

      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [priceFilter, categoryFilter, ratingFilter, searchTerm, products]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login to add items to the cart');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/cart/update', {
        userId,
        productId,
        quantity: 1,
      });

      if (response.status === 200) {
        alert('Product added to cart successfully');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding the product to the cart');
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      setPriceFilter(value);
    } else if (name === 'category') {
      setCategoryFilter(value);
    } else if (name === 'rating') {
      setRatingFilter(value);
    }
  };

  return (
    <div className="product-container">
      <h1 className='text-center'>Products</h1>

      {/* Search Bar */}
      <div className="search-bar text-center mb-3">
        <input
          className='w-50 p-2'
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters mb-4">FILTERS
        <div className="selectcontainer">
          <select name="price" onChange={handleSelectChange}>
            <option value="">Price Range</option>
            <option value="1">Below $1</option>
            <option value="2">Below $2</option>
            <option value="3">Below $3</option>
            <option value="4">Above $3</option>
          </select>

          <select name="category" onChange={handleSelectChange}>
            <option value="">Category</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>

          <select name="rating" onChange={handleSelectChange}>
            <option value="">Rating</option>
            <option value="1">Above 1</option>
            <option value="2">Above 2</option>
            <option value="3">Above 3</option>
            <option value="4">Above 4</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p className="price">Price: ${product.price}</p>
              <p className="category">Category: {product.category}</p>
              <p className="stock">Stock: {product.stock}</p>
              <p className="rating">Rating: {product.rating}</p>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
