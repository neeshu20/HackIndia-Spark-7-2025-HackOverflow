// server/index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/walletRoutes');
const userRoutes = require('./routes/AfterLogin'); 
const addResource=require('./routes/AddResources');
const weatherRoute = require('./routes/weather');
const energylisting=require('./routes/ListEnergy');

dotenv.config();

const app = express();
const cors = require('cors');

// Allow requests from frontend (Vite dev server)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Middleware
app.use(express.json());

// Connect MongoDB
connectDB();



app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/wallet', walletRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user', addResource);
app.use('/api', weatherRoute);
app.use('/api', energylisting);

// Use the routes defined in predictionRoutes.js




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
