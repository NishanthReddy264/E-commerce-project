import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css'

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(()=>{document.title="Your Cart"},[])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('Please login to view your cart');
          return;
        }
        const response = await axios.get(`http://localhost:5000/cart/${userId}`);
        setCart(response.data); // Assuming response.data is an array of cart items
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

 
  const filteredProducts = products.filter(product =>
    cart.some(cartItem => cartItem.productId == product.id)
  );

  const totalPrice = filteredProducts.reduce((sum, product) => {
    const quantity = cart.find(item => item.productId === product.id)?.quantity || 1;
    return sum + product.price * quantity;
  }, 0);

  return (
    <div>
      <h1 className='cart-title'>Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="product-list">
            {filteredProducts.map((product) => (
              <li key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-details">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p className="price">Price: ${product.price}</p>
                  <p className="category">Category: {product.category}</p>
                  <p className="rating">Rating: {product.rating}</p>
                  <p className="quantity">
                    Quantity: {cart.find(item => item.productId === product.id)?.quantity || 1}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <h2 className='price'>Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
