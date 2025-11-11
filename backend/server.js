const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, '../AnimalCharity')));

// Routes
const donationRoutes = require('./routes/donationRoutes');
app.use('/api/donations', donationRoutes);

// ✅ Temporary Login Route (for testing frontend)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    console.log(`Login attempt: ${email}`);
    return res.json({
      success: true,
      message: 'Login successful!',
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../AnimalCharity/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
