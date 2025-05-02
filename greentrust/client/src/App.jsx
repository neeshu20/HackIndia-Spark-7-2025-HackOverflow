import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpLogin from './pages/SignUpLogin';
import Wallet from './pages/Wallet';
import HomeAfterLogin from './pages/HomeAfterLogin';
import AddResources from './components/AddRenewableSources'; // <-- import it
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup-login" element={<SignUpLogin />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/afterlogin" element={<HomeAfterLogin />} />
        <Route path="/addresources" element={<AddResources />} /> {/* <-- add route */}
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
