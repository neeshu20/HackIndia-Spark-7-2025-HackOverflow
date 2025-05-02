import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = ({ isLoggedIn, userName, onWalletClick }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        GreenTrust
      </div>

      <div className="navbar-center">
        {!isLoggedIn ? (
          <>
            <button className="navbar-btn" onClick={() => navigate('/signup-login')}>Sign Up / Log In</button>
            <button className="navbar-btn" onClick={() => navigate('/marketplace')}>Explore Marketplace</button>
            <button className="navbar-btn" onClick={() => navigate('/how-it-works')}>How It Works</button>
          </>
        ) : (
          <>
          <button onClick={() => window.location.href = '/marketplace'}>🔄 Visit Marketplace</button>
            <button className="navbar-btn" onClick={() => navigate('/how-it-works')}>How It Works</button>
            <button className="navbar-btn" onClick={onWalletClick}>Link Your Wallet</button>
            <span className="navbar-btn greeting">Hi, {userName} 👋</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
