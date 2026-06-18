const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Appointment = require('./models/Appointment');

dotenv.config();

const seed = async () => {
  await connectDB();
  await Appointment.deleteMany();
  await User.deleteMany();

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
  ];

  const createdUsers = await User.insertMany(users);
  const patient = await User.create({
    name: 'مريض تجريبي',
    email: 'patient@medibook.com',
    password,
    role: 'patient',
    phone: '0505555555',
  });

  await Appointment.create({
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
  });

  console.log('Seeding completed successfully.');
  process.exit();
};

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
