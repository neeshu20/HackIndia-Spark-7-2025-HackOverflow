import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import '../style/HomeAfterLogin.css';
import AddRenewableSource from '../components/AddRenewableSources.jsx';
import EnergyInsights from '../components/EnergyPredictionInsight.jsx';

const HomeAfterLogin = () => {
  const [userName, setUserName] = useState('');
  const [selectedOption, setSelectedOption] = useState('🖊️ Add Your Renewable Source');
  const [surplusEnergy, setSurplusEnergy] = useState(0);
  const [energyPrice, setEnergyPrice] = useState(null);
  const [energyForecast, setEnergyForecast] = useState(null); // This will now be available to everyone
  const [earnings, setEarnings] = useState(0);
  const [greenScore, setGreenScore] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchUserName = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${storedUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Stored User:', storedUser);
        console.log('Token:', token);
        const data = await res.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (storedUser && token) {
      fetchUserName();
    }
  }, []);

  useEffect(() => {

    const fetchEnergyForecast = async () => {
      const token = localStorage.getItem('token');
      console.log('Token used for forecast:', token);
    
      try {
        const response = await fetch('http://localhost:5000/api/forecast-energy', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`API call failed: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log('Energy Forecast Array:', data.forecast);
        setEnergyForecast(data.forecast || []);
      } catch (error) {
        console.error(error.message);
      }
    };
    

    
    
    fetchEnergyForecast();
  }, []); // Runs once when the component is mounted

  const handleWalletLink = () => {
    window.location.href = '/wallet';
  };

  const handleEnergyListing = async () => {
    // Get the energy amount and demand index
    const energyAmount = surplusEnergy;  // Amount of energy user wants to sell
    const demandIndex = 1.0;  // Set or calculate demand index, you can adjust this based on your UI
  
    // Call the backend API to predict the price based on energy amount and demand index
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ energyAmount, demandIndex }),
      });
  
      const data = await res.json();
      const predictedPrice = data.predictedPrice;
  
      // Update the UI with the predicted price
      setEnergyPrice(predictedPrice);  // This updates the price to display to the user
  
      alert(`Predicted Price: ₹${predictedPrice} per kWh`);
  
      // Proceed with the listing logic
      const price = predictedPrice; // Use the predicted price for the listing
      const listRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/list-energy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ energyAmount, price }),
      });
  
      const listData = await listRes.json();
      setEarnings(listData.earnings);  // Update earnings after successful listing
      alert('Energy listed successfully!');
    } catch (error) {
      console.error('Failed to list energy:', error);
    }
  };
  

  const renderCard = () => {
    switch (selectedOption) {
        case '🖊️ Add Your Renewable Source':
          return <AddRenewableSource />;

      case '🧠 AI Forecast':
        return <EnergyInsights energyForecast={energyForecast} />;

      case '📤 List Extra Energy for Sale':
        return (
          <div className="card">
            <h3>📤 List Extra Energy for Sale</h3>
            <label>Energy to Sell (kWh): <input type="number" value={surplusEnergy} onChange={(e) => setSurplusEnergy(e.target.value)} /></label>
            <label>Set Price (per kWh): <input type="number" value={energyPrice} onChange={(e) => setEnergyPrice(e.target.value)} /></label>
            <button onClick={handleEnergyListing}>List Energy</button>
          </div>
        );
      case '🔐 Smart Contract Setup':
        return (
          <div className="card">
            <h3>🔐 Smart Contract Setup</h3>
            <p>Automatically handles the deal with buyer paying in $GREEN tokens. You receive tokens after the deal is done.</p>
          </div>
        );
      case '💰 View Earnings':
        return (
          <div className="card">
            <h3>💰 View Earnings</h3>
            <p>Total energy sold: {surplusEnergy} kWh</p>
            <p>Tokens earned: {earnings} $GREEN</p>
          </div>
        );
    
      case 'Personal Green Score':
        return (
          <div className="card">
            <h3>Personal Green Score</h3>
            <p>Your personal green score is based on your usage of clean energy. This score helps you track your contribution to a more sustainable world.</p>
            <p>Green Score: {greenScore}</p>
          </div>
        );
      default:
        return <div className="card">Select an option to see details.</div>;
    }
  };

  return (
    <>
      <Navbar isLoggedIn={true} userName={userName} onWalletClick={handleWalletLink} />
      <div className="dashboard-container">
        <div className="sidebar">
          <button onClick={() => setSelectedOption('🖊️ Add Your Renewable Source')}>🖊️ Add Your Renewable Source</button>
          <button onClick={() => setSelectedOption('🧠 AI Forecast')}>🧠 AI Forecast</button>
          <button onClick={() => setSelectedOption('📤 List Extra Energy for Sale')}>📤 List Extra Energy for Sale</button>
          <button onClick={() => setSelectedOption('🔐 Smart Contract Setup')}>🔐 Smart Contract Setup</button>
          <button onClick={() => setSelectedOption('💰 View Earnings')}>💰 View Earnings</button>
          <button onClick={() => setSelectedOption('🌞 AI-Powered Energy Insights')}>🌞 AI-Powered Energy Insights</button>
          <button onClick={() => setSelectedOption('Personal Green Score')}>Personal Green Score</button>
        </div>
        <div className="card-display">
          <h2>{selectedOption}</h2>
          {renderCard()}
        </div>
      </div>
    </>
  );
};

export default HomeAfterLogin;
