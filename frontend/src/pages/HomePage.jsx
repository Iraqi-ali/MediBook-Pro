import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import ClinicMap from '../components/ClinicMap';
import { API_BASE_URL } from '../config';

const clinicTypeLabel = {
  clinic: 'عيادة',
  hospital: 'مجمع طبي',
  pharmacy: 'صيدلية',
  dental: 'عيادة أسنان',
  doctor: 'طبيب'
};

export default function HomePage() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/clinics`).then((res) => setClinics(res.data)).catch(console.error);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f9ff' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#06283d' }}>
          منصة المواعيد الطبية الذكية
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          احجز بسهولة مع أطباء وعيادات وصيدليات بالقرب منك، مع خريطة تفاعلية وعرض مباشر للحجز.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <ClinicMap clinics={clinics} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Card sx={{ p: 2, mb: 3, borderRadius: 4, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  أسرع بحث للحجز
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  تصفية حسب التخصص، نوع الخدمة، أو المسافة من موقعك.
                </Typography>
                <Button variant="contained" size="large" sx={{ mt: 2 }}>ابحث الآن</Button>
              </CardContent>
            </Card>
            <Card sx={{ p: 2, borderRadius: 4, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>أحدث العيادات</Typography>
                {clinics.slice(0, 4).map((clinic) => (
                  <Box key={clinic._id} sx={{ mb: 2, p: 2, bgcolor: '#fff', borderRadius: 3, border: '1px solid #e0e7ff' }}>
                    <Typography fontWeight={700}>{clinic.name}</Typography>
                    <Typography color="text.secondary" sx={{ fontSize: 13 }}>{clinicTypeLabel[clinic.role] || 'مركز طبي'}</Typography>
                    <Typography color="text.secondary" sx={{ fontSize: 13 }}>{clinic.specialization || 'عام'}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
