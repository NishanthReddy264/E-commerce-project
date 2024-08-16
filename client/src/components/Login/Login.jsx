import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{document.title="Login page"},[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('userId', response.data.userId);
      alert("successful")
      onLogin();
      navigate('/'); 
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className='auth-container'>
      <h2>Login</h2>
      {message && <Alert variant='danger'>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
        <button type='submit'>Login</button>
      </form>
      <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
    </div>
  );
}

export default Login;
