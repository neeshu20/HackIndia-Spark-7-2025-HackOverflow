// routes/walletRoutes.js
const express = require('express');
const router = express.Router();
const { linkWallet,unlinkWallet } = require('../controllers/walletController');

router.post('/link', linkWallet);
router.post('/unlink', unlinkWallet);


module.exports = router;
