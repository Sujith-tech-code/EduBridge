const Feedback = require('../models/Feedback');

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const saved = await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!', data: saved });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createFeedback, getAllFeedback };