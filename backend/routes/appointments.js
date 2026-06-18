const express = require('express');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, async (req, res, next) => {
  try {
    const { doctorId, clinicId, bookingDate, consultationType, patientDetails, notes } = req.body;
    const doctor = await User.findById(doctorId);
    if (!doctor || !doctor.isAvailable) return res.status(400).json({ message: 'المختص غير متاح حالياً' });

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      clinic: clinicId,
      bookingDate,
      consultationType,
      patientDetails,
      notes,
    });
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
});

router.get('/', protect, async (req, res, next) => {
  try {
    const query = req.user.role === 'patient'
      ? { patient: req.user._id }
      : req.user.role === 'doctor'
        ? { doctor: req.user._id }
        : {};
    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialization clinicType location');
    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
