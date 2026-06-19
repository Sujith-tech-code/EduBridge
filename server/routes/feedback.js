const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');

router.get('/', getAllFeedback);
router.post('/', createFeedback);

module.exports = router;