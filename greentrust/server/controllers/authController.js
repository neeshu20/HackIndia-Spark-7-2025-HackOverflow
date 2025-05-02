// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signupUser = async (req, res) => {
  const { name, email, password, reenterPassword, number, walletAddress } = req.body;
  console.log('Signup Request Body:', req.body);

  // Validate password match
  if (password !== reenterPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user with email already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      number,
      walletAddress: walletAddress || '',  // Store wallet address if provided
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err.message); // Log the error message
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, walletAddress: user.walletAddress },
    });
    
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = { signupUser, loginUser };
