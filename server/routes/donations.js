const express = require('express');
const router = express.Router();
const { getAllDonations, createDonation } = require('../controllers/donationController');

router.get('/', getAllDonations);
router.post('/', createDonation);

module.exports = router;