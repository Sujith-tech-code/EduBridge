const express = require('express');
const router = express.Router();
const { getAllVolunteers, createVolunteer, updateVolunteerStatus } = require('../controllers/volunteerController');

router.get('/', getAllVolunteers);
router.post('/', createVolunteer);
router.put('/:id/status', updateVolunteerStatus);

module.exports = router;