import React, { useEffect } from 'react';
import './Home.css';
import download from "./download.jpeg"

const Home = () => {
  useEffect(()=>{document.title="Home page"},[])
  return (
    <div className='home-container'>
      <h1>Welcome to E-commerce Website</h1>
      <p>Enjoy our wide range of products and great deals!</p>
      <img src={download} alt="intro image"></img>
    </div>
  );
}

export default Home;
