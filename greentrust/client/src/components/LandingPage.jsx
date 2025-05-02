// src/components/LandingPage.js
import React from 'react';
import Navbar from './navbar.jsx'; // Import Navbar component
import '../style/LandingPage.css'; // Make sure to style it as per your needs

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar /> 
      <div className="landing-body">
        <h1>Welcome to GreenTrust</h1>
        <p>Buy and Sell Clean Energy Locally with Blockchain</p>
      </div>
    </div>
  );
};

export default LandingPage;
