
// routes/forecast.js
const express = require('express');
const EnergyListing  = require('../models/EnergyList.js');
const verifyToken = require('../middleware/VerifyToken');



const router = express.Router();

router.post('/list-energy', verifyToken, async (req, res) => {
  try {
    const { energyAmount, price } = req.body;

    const newListing = new EnergyListing({
      userId: req.user.id,
      energyAmount,
      price
    });

    await newListing.save();
    res.status(201).json({ message: 'Listing created', earnings: energyAmount * price });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list energy' });
  }
});

router.get('/list-energy', async (req, res) => {
  try {
    const listings = await EnergyListing.find().populate('userId', 'name');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

module.exports=router;