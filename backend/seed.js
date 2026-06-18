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
      name: 'مركز الزهراء الطبي',
      email: 'alzahraa@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0770 123 4567',
      location: {
        address: 'البصرة، شارع 15 أيار',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9825, 30.5100],
      },
      isAvailable: true,
    },
    {
      name: 'مجمع البصرة الطبي',
      email: 'basra-hospital@medibook.com',
      password,
      role: 'hospital',
      specialization: 'عام',
      phone: '0770 234 5678',
      location: {
        address: 'البصرة، شارع النصر',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9938, 30.4976],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات الشفاء',
      email: 'alshifa@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0770 345 6789',
      location: {
        address: 'البصرة، شارع الجامعة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9788, 30.4815],
      },
      isAvailable: true,
    },
    {
      name: 'مستوصف الخليج',
      email: 'alkhaleej@medibook.com',
      password,
      role: 'clinic',
      specialization: 'أمراض باطنية',
      phone: '0770 456 7890',
      location: {
        address: 'البصرة، شارع البحر',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9979, 30.4912],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات الأمل',
      email: 'alamal@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0770 567 8901',
      location: {
        address: 'البصرة، شارع 14 رمضان',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9950, 30.5030],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات النور الطبية',
      email: 'alnoor@medibook.com',
      password,
      role: 'clinic',
      specialization: 'أمراض جهاز التنفس',
      phone: '0770 678 9012',
      location: {
        address: 'البصرة، طريق الكورنيش',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [48.0098, 30.5078],
      },
      isAvailable: true,
    },
    {
      name: 'عيادة بلسم لطب الأسنان',
      email: 'balsam@medibook.com',
      password,
      role: 'dental',
      specialization: 'أسنان',
      phone: '0770 789 0123',
      location: {
        address: 'البصرة، شارع 14 رمضان',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9954, 30.5027],
      },
      isAvailable: true,
    },
    {
      name: 'مستشفى النصر التعليمي',
      email: 'alnasr@medibook.com',
      password,
      role: 'hospital',
      specialization: 'عام',
      phone: '0770 890 1234',
      location: {
        address: 'البصرة، حي الزهور',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9861, 30.4954],
      },
      isAvailable: true,
    },
    {
      name: 'مجمع الرشيد الطبي',
      email: 'alrasheed@medibook.com',
      password,
      role: 'clinic',
      specialization: 'أمراض قلبية',
      phone: '0770 901 2345',
      location: {
        address: 'البصرة، شارع 29 تموز',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [48.0015, 30.4980],
      },
      isAvailable: true,
    },
    {
      name: 'مركز دار الحكمة الطبي',
      email: 'daralkhickma@medibook.com',
      password,
      role: 'clinic',
      specialization: 'نسائية وتوليد',
      phone: '0771 012 3456',
      location: {
        address: 'البصرة، شارع الحرية',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9917, 30.4932],
      },
      isAvailable: true,
    },
    {
      name: 'عيادة الأطفال الحديثة',
      email: 'alatefal@medibook.com',
      password,
      role: 'clinic',
      specialization: 'أطفال',
      phone: '0771 123 4567',
      location: {
        address: 'البصرة، شارع 14 فبراير',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9990, 30.5005],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات عيون البصرة',
      email: 'aloyoun@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عيون',
      phone: '0771 234 5678',
      location: {
        address: 'البصرة، شارع المصرف',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [48.0034, 30.4958],
      },
      isAvailable: true,
    },
    {
      name: 'الدكتور أحمد الجبوري',
      email: 'ajbouri@medibook.com',
      password,
      role: 'doctor',
      specialization: 'أنف وأذن وحنجرة',
      phone: '0771 345 6789',
      location: {
        address: 'البصرة، شارع القصر',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.9835, 30.4899],
      },
      isAvailable: true,
    },
    {
      name: 'مركز سما الأسنان',
      email: 'sama-dental@medibook.com',
      password,
      role: 'dental',
      specialization: 'أسنان',
      phone: '0771 456 7890',
      location: {
        address: 'البصرة، شارع المعقل',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [48.0105, 30.4988],
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
