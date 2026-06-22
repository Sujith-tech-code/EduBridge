const express = require('express');
const router = express.Router();
const { getAllVolunteers, createVolunteer, updateVolunteerStatus, deleteVolunteer, deleteVolunteerByTrackingId } = require('../controllers/volunteerController');

router.get('/', getAllVolunteers);
router.post('/', createVolunteer);
router.put('/:id/status', updateVolunteerStatus);
router.delete('/:id', deleteVolunteer);
router.delete('/track/:trackingId', deleteVolunteerByTrackingId);

module.exports = router;