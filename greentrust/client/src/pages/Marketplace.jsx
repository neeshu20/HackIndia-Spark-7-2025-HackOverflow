import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import '../style/Marketplace.css';
import { Button } from "../components/ui/button.jsx";


const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [filterKWh, setFilterKWh] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/list-energy`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching marketplace listings:', error);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) =>
    filterKWh === '' ? true : listing.energyAmount >= parseInt(filterKWh)
  );

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="marketplace-container">
        <h2 className="text-2xl font-semibold mb-4">🔄 Marketplace: Buy Renewable Energy</h2>

        <div className="mb-6">
          <label className="text-sm font-medium mr-2">Filter by Min kWh:</label>
          <input
            type="number"
            className="filter-input"
            placeholder="e.g. 50"
            value={filterKWh}
            onChange={(e) => setFilterKWh(e.target.value)}
          />
        </div>

        <div className="listing-grid">
          {filteredListings.map((listing) => (
            <div className="listing-card" key={listing._id}>
              <h4 className="font-semibold">{listing.userId?.name}'s Energy</h4>
              <p><strong>Amount:</strong> {listing.energyAmount} kWh</p>
              <p><strong>Price:</strong> ₹{listing.price} / kWh</p>
              <p><strong>Total:</strong> ₹{listing.price * listing.energyAmount}</p>
              <Button className="mt-3 w-full">Buy Now</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
