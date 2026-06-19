const express = require('express');
const router = express.Router();
const { getAllSchools, getSchoolById } = require('../controllers/schoolController');

router.get('/', getAllSchools);
router.get('/:id', getSchoolById);

module.exports = router;