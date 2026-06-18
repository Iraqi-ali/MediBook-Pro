const express = require('express');
const User = require('../models/User');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const clinics = await User.find({ role: { $in: ['doctor', 'clinic', 'hospital', 'pharmacy', 'dental'] } });
    res.json(clinics);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const clinic = await User.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'غير موجود' });
    res.json(clinic);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const clinic = await User.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'غير موجود' });
    if (String(clinic._id) !== String(req.user._id) && req.user.role !== 'super') {
      return res.status(403).json({ message: 'ليس لديك صلاحية لتعديل' });
    }
    const updates = req.body;
    Object.assign(clinic, updates);
    await clinic.save();
    res.json(clinic);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
