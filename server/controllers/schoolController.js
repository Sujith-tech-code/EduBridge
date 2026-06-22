const School = require('../models/School');

const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find({ status: 'approved' });
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSchoolsAdmin = async (req, res) => {
  try {
    const schools = await School.find().sort({ createdAt: -1 });
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSchool = async (req, res) => {
  try {
    const school = new School(req.body);
    const saved = await school.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSchoolStatus = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllSchools, getAllSchoolsAdmin, getSchoolById, createSchool, updateSchoolStatus, deleteSchool };