import React from 'react';
import { Link } from 'react-router-dom';
import { FcCamera } from "react-icons/fc";
import './Header.css'; // Import CSS

const Header = ({ onLogout }) => {
  return (
    <div className='header'>
      <h1>
        <FcCamera size={90} />
        E-commerce Website
      </h1>
      <ul className='nav'>
        <li><Link className='nav-link' to={'/'}>Home</Link></li>
        <li><Link className='nav-link' to={'/products'}>Products</Link></li>
        <li><Link className='nav-link' to={'/cart'}>Cart</Link></li>
        <li><Link className='nav-link' onClick={onLogout}>Sign Out</Link></li>
      </ul>
    </div>
  );
}

export default Header;
