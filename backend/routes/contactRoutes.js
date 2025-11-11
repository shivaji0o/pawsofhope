const express = require("express");
const router = express.Router();
const Donation = require('../../AnimalCharity/models/Contact');

// POST message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all messages (for admin or testing)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ success: false, message: "Error fetching messages" });
  }
});

module.exports = router;