const User = require('../models/User');

// In your wallet controller
const linkWallet = async (req, res) => {
    const { userId, walletAddress } = req.body;
    try {
      // Check if the wallet is already linked
      const user = await User.findById(userId);
      if (user.walletAddress) {
        return res.status(400).json({ message: 'Wallet already linked to this account' });
      }
  
      user.walletAddress = walletAddress;
      await user.save();
  
      res.status(200).json({ message: 'Wallet linked successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  // Unlink Wallet
  const unlinkWallet = async (req, res) => {
    const { userId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.walletAddress = ''; // Or set it to null
      await user.save();
  
      res.status(200).json({ message: 'Wallet unlinked successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
module.exports={linkWallet,unlinkWallet};
