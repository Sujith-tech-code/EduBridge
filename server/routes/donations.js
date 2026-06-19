const express = require('express');
const router = express.Router();
const { getAllDonations, createDonation, updateDonationStatus, trackDonation } = require('../controllers/donationController');

router.get('/',                    getAllDonations);
router.post('/',                   createDonation);
router.put('/:id/status',          updateDonationStatus);
router.get('/track/:trackingId',   trackDonation);

module.exports = router;