const express = require('express');
const bcrypt = require('bcryptjs');
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

// Seed test data
router.post('/seed', async (req, res, next) => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Appointment.deleteMany();

    const password = await bcrypt.hash('Password123!', 10);

    const users = [
      {
        name: 'سوبر المدير',
        email: 'super@medibook.com',
        password,
        role: 'super',
        phone: '0500000000',
      },
      {
        name: 'عيادة النخبة الطبية',
        email: 'clinic@medibook.com',
        password,
        role: 'clinic',
        specialization: 'عام',
        phone: '0501111111',
        location: {
          address: 'الرياض، شارع العليا',
          city: 'الرياض',
          country: 'السعودية',
          coordinates: [46.677, 24.713],
        },
        social: {
          facebook: 'https://facebook.com/clinic',
          instagram: 'https://instagram.com/clinic',
        },
        isAvailable: true,
      },
      {
        name: 'صيدلية الرحمة',
        email: 'pharmacy@medibook.com',
        password,
        role: 'pharmacy',
        phone: '0502222222',
        location: {
          address: 'الرياض، طريق الملك فهد',
          city: 'الرياض',
          country: 'السعودية',
          coordinates: [46.676, 24.720],
        },
        isAvailable: true,
      },
      {
        name: 'د. عمر الحربي',
        email: 'doctor@medibook.com',
        password,
        role: 'doctor',
        specialization: 'باطنة',
        phone: '0503333333',
        location: {
          address: 'الرياض، حي الورود',
          city: 'الرياض',
          country: 'السعودية',
          coordinates: [46.690, 24.724],
        },
        social: {
          instagram: 'https://instagram.com/doctor',
        },
        isAvailable: true,
      },
      {
        name: 'عيادة الأسنان الجميلة',
        email: 'dental@medibook.com',
        password,
        role: 'dental',
        specialization: 'أسنان',
        phone: '0504444444',
        location: {
          address: 'الرياض، حي الصحافة',
          city: 'الرياض',
          country: 'السعودية',
          coordinates: [46.658, 24.710],
        },
        isAvailable: true,
      },
      {
        name: 'مستشفى شامل',
        email: 'hospital@medibook.com',
        password,
        role: 'hospital',
        specialization: 'متعدد التخصصات',
        phone: '0505555555',
        location: {
          address: 'الرياض، حي النخيل',
          city: 'الرياض',
          country: 'السعودية',
          coordinates: [46.700, 24.715],
        },
        isAvailable: true,
      },
    ];

    const createdUsers = await User.insertMany(users);
    
    const patient = await User.create({
      name: 'مريض تجريبي',
      email: 'patient@medibook.com',
      password,
      role: 'patient',
      phone: '0505555555',
    });

    // Create appointments
    await Appointment.create([
      {
        patient: patient._id,
        doctor: createdUsers.find((item) => item.role === 'doctor')._id,
        clinic: createdUsers.find((item) => item.role === 'clinic')._id,
        bookingDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'confirmed',
        consultationType: 'in-person',
        patientDetails: {
          age: 34,
          gender: 'ذكر',
          history: 'حساسيات بسيطة',
          currentSymptoms: 'ألم في البطن وتعكر مزاج',
          previousVisits: 'زيارة سابقة قبل 3 أشهر',
        },
        notes: 'حجز أولي لفحص عام',
      },
      {
        patient: patient._id,
        doctor: createdUsers.find((item) => item.role === 'doctor')._id,
        clinic: createdUsers.find((item) => item.role === 'pharmacy')._id,
        bookingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'pending',
        consultationType: 'online',
        patientDetails: {
          age: 34,
          gender: 'ذكر',
          history: 'لا توجد حالات معروفة',
          currentSymptoms: 'صداع متكرر',
          previousVisits: 'لا توجد زيارات سابقة',
        },
        notes: 'استشارة أونلاين',
      },
    ]);

    res.json({
      message: '✅ تم تحميل البيانات الوهمية بنجاح',
      data: {
        users: createdUsers.length + 1,
        appointments: 2,
        credentials: {
          super: { email: 'super@medibook.com', password: 'Password123!' },
          clinic: { email: 'clinic@medibook.com', password: 'Password123!' },
          doctor: { email: 'doctor@medibook.com', password: 'Password123!' },
          patient: { email: 'patient@medibook.com', password: 'Password123!' },
        },
      },
    });
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
