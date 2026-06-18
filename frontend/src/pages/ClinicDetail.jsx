import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Paper, Chip, Button, Grid } from '@mui/material';
import { API_BASE_URL } from '../config';

const ClinicDetail = () => {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/clinics/${id}`).then((res) => setClinic(res.data)).catch(console.error);
  }, [id]);

  if (!clinic) return <Container sx={{ py: 8 }}>جارٍ التحميل...</Container>;

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 5 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>{clinic.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>{clinic.specialization || 'اختصاص عام'}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>العنوان: {clinic.location?.address || 'غير محدد'}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>الحالة: {clinic.isAvailable ? 'متاح الآن' : 'غير متاح حالياً'}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>الهاتف: {clinic.phone || 'غير متوفر'}</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {clinic.social?.facebook && <Chip label="فيسبوك" color="primary" />}
              {clinic.social?.instagram && <Chip label="انستجرام" color="secondary" />}
            </Box>
            <Button variant="contained" sx={{ mt: 3 }}>احجز موعد</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 5, minHeight: 320 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>معلومات إضافية</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>نوع الصفحة: {clinic.role}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>التخصص: {clinic.specialization || 'عام'}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>العمر الافتراضي: 3 أشكال للعرض</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>خيار نشر وخلفية مخصصة متاحة</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClinicDetail;
