import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const roles = [
  { value: 'clinic', label: 'عيادة' },
  { value: 'doctor', label: 'طبيب' },
  { value: 'pharmacy', label: 'صيدلية' },
  { value: 'dental', label: 'عيادة أسنان' },
  { value: 'hospital', label: 'مجمع طبي' },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'clinic',
    specialization: '',
    address: '',
    city: '',
    country: 'السعودية',
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        specialization: formData.specialization,
        location: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          coordinates: [46.6753, 24.7136],
        },
      });
      setMessage('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.');
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'clinic',
        specialization: '',
        address: '',
        city: '',
        country: 'السعودية',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء التسجيل');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ bgcolor: '#ffffff', p: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          تسجيل عيادة أو مقدم خدمة
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          سجل منشأتك الطبية بسهولة وابدأ في تلقي المواعيد عبر منصة MediBook Pro.
        </Typography>
        {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="اسم المنشأة أو الطبيب" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="كلمة المرور" name="password" type="password" value={formData.password} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="رقم الجوال" name="phone" value={formData.phone} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth select label="نوع الحساب" name="role" value={formData.role} onChange={handleChange} sx={{ mb: 2 }}>
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="التخصص" name="specialization" value={formData.specialization} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="العنوان" name="address" value={formData.address} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="المدينة" name="city" value={formData.city} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="الدولة" name="country" value={formData.country} onChange={handleChange} sx={{ mb: 3 }} />
          <Button type="submit" variant="contained" size="large" fullWidth>
            تسجيل
          </Button>
        </form>
      </Box>
    </Container>
  );
}
