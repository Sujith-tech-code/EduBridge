const express = require('express');
const router = express.Router();
const { getAllDonations, createDonation, updateDonationStatus, trackDonation, deleteDonation, deleteDonationByTrackingId } = require('../controllers/donationController');

router.get('/', getAllDonations);
router.post('/', createDonation);
router.put('/:id/status', updateDonationStatus);
router.get('/track/:trackingId', trackDonation);
router.delete('/:id', deleteDonation);
router.delete('/track/:trackingId', deleteDonationByTrackingId);

module.exports = router;