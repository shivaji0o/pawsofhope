const express = require('express');
const router = express.Router();
const Donation = require('../../AnimalCharity/models/Donation');

// POST /donations - Create new donation
router.post('/', async (req, res) => {
  try {
    const { name, email, amount, message } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newDonation = new Donation({ name, email, amount, message });
    await newDonation.save();

    res.status(201).json({ success: true, message: 'Donation successful!' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /donations - Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json({ success: true, donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
