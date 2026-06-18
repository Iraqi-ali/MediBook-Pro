const express = require('express');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.get('/dashboard', protect, authorize('super', 'admin'), async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const clinics = await User.countDocuments({ role: { $in: ['doctor', 'clinic', 'hospital', 'pharmacy', 'dental'] } });
    const appointments = await Appointment.countDocuments();
    res.json({ users, clinics, appointments });
  } catch (err) {
    next(err);
  }
});

router.delete('/clinic/:id', protect, authorize('super'), async (req, res, next) => {
  try {
    const clinic = await User.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'غير موجود' });
    await clinic.remove();
    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
