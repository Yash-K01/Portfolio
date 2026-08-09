const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact — store a message sent from the portfolio contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    const saved = await Message.create({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 160),
      message: String(message).slice(0, 4000),
    });

    return res.status(201).json({ ok: true, id: saved._id });
  } catch (err) {
    console.error("Failed to save contact message:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/contact — list stored messages (intended for the site owner only;
// add real auth before exposing this beyond local/admin use)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(200);
    return res.json(messages);
  } catch (err) {
    console.error("Failed to fetch messages:", err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
