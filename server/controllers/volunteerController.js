const Volunteer = require('../models/Volunteer');

const generateTrackingId = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `EDU-TUT-${random}`;
};

const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVolunteer = async (req, res) => {
  try {
    const trackingId = generateTrackingId();
    const volunteer = new Volunteer({ ...req.body, trackingId });
    const saved = await volunteer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVolunteerStatus = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
    res.json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVolunteerByTrackingId = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOneAndDelete({ trackingId: req.params.trackingId });
    if (!volunteer) return res.status(404).json({ message: 'No tutor registration found with this tracking ID.' });
    res.json({ message: 'Tutor registration deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllVolunteers, createVolunteer, updateVolunteerStatus, deleteVolunteer, deleteVolunteerByTrackingId };