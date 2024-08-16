import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import './index.css';

const Home = lazy(() => import('./components/Home/Home'));
const Product = lazy(() => import('./components/Product/Product'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Login = lazy(() => import('./components/Login/Login'));
const Signup = lazy(() => import('./components/Signup/Signup'));

const App = () => {
  const [products, setProducts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        console.log(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Header onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={authenticated ? <Home /> : <Navigate to='/login' />} />
          <Route path='/products' element={authenticated ? <Product items={products} /> : <Navigate to='/login' />} />
          <Route path='/cart' element={authenticated ? <Cart /> : <Navigate to='/login' />} />
          <Route path='/login' element={!authenticated ? <Login onLogin={handleLogin} /> : <Navigate to='/' />} />
          <Route path='/signup' element={!authenticated ? <Signup /> : <Navigate to='/' />} />
          <Route path='*' element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
