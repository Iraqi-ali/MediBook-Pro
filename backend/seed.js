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
      name: 'عيادات المودة',
      email: 'almoda@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0773 000 0001',
      location: {
        address: 'الزبير، شارع التجارة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7144, 30.3772],
      },
      isAvailable: true,
    },
    {
      name: 'مجمع الحوراء الطبي',
      email: 'alhuraa@medibook.com',
      password,
      role: 'hospital',
      specialization: 'عام',
      phone: '0773 000 0002',
      location: {
        address: 'الزبير، شارع النور',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7160, 30.3788],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات كنوز الصحة',
      email: 'knooz@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0773 000 0003',
      location: {
        address: 'الزبير، قرب مجمع النخلة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7128, 30.3761],
      },
      isAvailable: true,
    },
    {
      name: 'مجمع دار الكندي الطبي',
      email: 'alkindy@medibook.com',
      password,
      role: 'hospital',
      specialization: 'عام',
      phone: '0773 858 2967',
      location: {
        address: 'الزبير، شارع الأطباء',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7134, 30.3748],
      },
      isAvailable: true,
    },
    {
      name: 'عيادة الحياة التمريضية',
      email: 'alhayat@medibook.com',
      password,
      role: 'clinic',
      specialization: 'تمريض',
      phone: '0773 000 0004',
      location: {
        address: 'الزبير، شارع الكورنيش',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7178, 30.3785],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات النور الطبية',
      email: 'alnoor@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0775 600 1117',
      location: {
        address: 'الزبير، شارع البصرة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7151, 30.3729],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات تيفاني لطب وتجميل الأسنان',
      email: 'tifani@medibook.com',
      password,
      role: 'dental',
      specialization: 'تجميل أسنان',
      phone: '0773 000 0005',
      location: {
        address: 'الزبير، شارع الأطباء',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7138, 30.3755],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات الموسوي الطبية',
      email: 'almosawi@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0773 000 0006',
      location: {
        address: 'الزبير، شارع النمو',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7165, 30.3793],
      },
      isAvailable: true,
    },
    {
      name: 'مجمّع عيادات الرسالة الطبي',
      email: 'alresala@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0773 135 2225',
      location: {
        address: 'الزبير، حي الرسالة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7172, 30.3749],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات المدينة المنورة',
      email: 'almadina@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0773 000 0007',
      location: {
        address: 'الزبير، طريق المدينة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7156, 30.3737],
      },
      isAvailable: true,
    },
    {
      name: 'مجمع عيادات المدينة الطبي',
      email: 'almedina@medibook.com',
      password,
      role: 'hospital',
      specialization: 'عام',
      phone: '0773 000 0008',
      location: {
        address: 'الزبير، طريق المدينة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7170, 30.3751],
      },
      isAvailable: true,
    },
    {
      name: 'الدكتور عبدالكريم الدوسري',
      email: 'aldosari@medibook.com',
      password,
      role: 'doctor',
      specialization: 'عام',
      phone: '0773 000 0009',
      location: {
        address: 'الزبير، حي السلام',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7148, 30.3780],
      },
      isAvailable: true,
    },
    {
      name: 'مركز العاج',
      email: 'alaj@medibook.com',
      password,
      role: 'dental',
      specialization: 'أسنان',
      phone: '0771 990 0003',
      location: {
        address: 'الزبير، شارع الأمل',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7132, 30.3767],
      },
      isAvailable: true,
    },
    {
      name: 'مركز ماسة الزبير التخصصي لطب وجراحة الفم والأسنان',
      email: 'masa@medibook.com',
      password,
      role: 'dental',
      specialization: 'أسنان',
      phone: '0772 666 2229',
      location: {
        address: 'الزبير، شارع البزرجية',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7122, 30.3789],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات ابن سينا الطبية',
      email: 'ibnsina@medibook.com',
      password,
      role: 'hospital',
      specialization: 'عام',
      phone: '0773 000 0010',
      location: {
        address: 'الزبير، شارع الرئيسي',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7169, 30.3746],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات الأمل',
      email: 'alamal@medibook.com',
      password,
      role: 'clinic',
      specialization: 'عام',
      phone: '0770 819 5648',
      location: {
        address: 'الزبير، شارع الأمل',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7163, 30.3756],
      },
      isAvailable: true,
    },
    {
      name: 'مركز ابن سينا الجراحي الاستثماري',
      email: 'ibnsina-surgery@medibook.com',
      password,
      role: 'hospital',
      specialization: 'جراحة',
      phone: '0782 444 1222',
      location: {
        address: 'الزبير، شارع النخلة',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7158, 30.3774],
      },
      isAvailable: true,
    },
    {
      name: 'عيادة الدكتورة آلاء الأسدي لطب الأسنان',
      email: 'alesadi@medibook.com',
      password,
      role: 'dental',
      specialization: 'أسنان',
      phone: '0770 625 3974',
      location: {
        address: 'الزبير، شارع الأطباء',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7142, 30.3769],
      },
      isAvailable: true,
    },
    {
      name: 'مركز أوميد',
      email: 'umed@medibook.com',
      password,
      role: 'doctor',
      specialization: 'أسنان',
      phone: '0772 588 9888',
      location: {
        address: 'الزبير، شارع النور',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7155, 30.3797],
      },
      isAvailable: true,
    },
    {
      name: 'عيادات البحرية الطبي',
      email: 'albahria@medibook.com',
      password,
      role: 'clinic',
      specialization: 'جراحة عظام',
      phone: '0773 000 0011',
      location: {
        address: 'الزبير، الطريق الساحلي',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7136, 30.3801],
      },
      isAvailable: true,
    },
    {
      name: 'مركز سما الزبير لطب وتجميل الفم والأسنان',
      email: 'sama@medibook.com',
      password,
      role: 'dental',
      specialization: 'أسنان',
      phone: '0773 888 0111',
      location: {
        address: 'الزبير، شارع البزرجية',
        city: 'البصرة',
        country: 'العراق',
        coordinates: [47.7149, 30.3777],
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
