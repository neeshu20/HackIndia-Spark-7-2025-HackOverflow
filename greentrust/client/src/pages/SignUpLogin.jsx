import React, { useState } from 'react';
import '../style/SignUpLogin.css';
import Navbar from '../components/navbar.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate

const SignUpLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    reenterPassword: '',
    number: ''
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`
        : `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            reenterPassword: formData.reenterPassword,
            number: formData.number
          };

      const response = await axios.post(endpoint, payload);

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        alert(response.data.message);
        navigate('/afterlogin'); // ✅ Redirect after successful login
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  const handleWalletLink = () => {
    window.location.href = '/wallet';
  };

  return (
    <>
      <Navbar />
      <div className="signup-login-page">
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="reenterPassword"
              placeholder="Re-enter Password"
              value={formData.reenterPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>

        <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Log In'}
        </p>

        {/* <button className="wallet-link-button" onClick={handleWalletLink}>
          Link Your Wallet
        </button> */}
      </div>
    </>
  );
};

export default SignUpLogin;
