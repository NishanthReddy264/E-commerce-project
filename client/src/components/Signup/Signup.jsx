import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{document.title="Signup page"},[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/auth/signup', { name, email, mobile, password });
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setMessage('Signup failed');
    }
  };

  return (
    <div className='auth-container'>
      <h2>Signup</h2>
      {message && <Alert variant='danger'>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
        <input type='text' value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Mobile' required />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' required />
        <button type='submit'>Signup</button>
      </form>
      <p>Already have an account? <a href='/login'>Login</a></p>
    </div>
  );
}

export default Signup;
