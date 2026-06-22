const express = require('express');
const router = express.Router();
const { getAllSchools, getAllSchoolsAdmin, getSchoolById, createSchool, updateSchoolStatus, deleteSchool } = require('../controllers/schoolController');

router.get('/', getAllSchools);
router.get('/admin/all', getAllSchoolsAdmin);
router.get('/:id', getSchoolById);
router.post('/', createSchool);
router.put('/:id/status', updateSchoolStatus);
router.delete('/:id', deleteSchool);

module.exports = router;