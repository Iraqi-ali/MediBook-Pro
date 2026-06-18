const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const clinicRoutes = require('./routes/clinics');
const appointmentRoutes = require('./routes/appointments');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();

connectDB();
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://medibook-pro-frontend.onrender.com',
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('منع CORS: origin غير مسموح'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'MediBook Pro API' }));
// Friendly root route so visiting the service root doesn't return "Cannot GET /"
app.get('/', (req, res) => {
  const clientUrl = process.env.CLIENT_URL;
  if (clientUrl) {
    return res.send(`MediBook Pro API running. Frontend: <a href="${clientUrl}">${clientUrl}</a>`);
  }
  return res.send('MediBook Pro API running. Use the /api routes.');
});
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
