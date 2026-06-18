import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClinicMap from '../components/ClinicMap';
import { API_BASE_URL } from '../config';

const clinicTypeLabel = {
  clinic: { label: 'عيادة', icon: MedicalServicesIcon, color: '#38bdf8' },
  hospital: { label: 'مجمع طبي', icon: LocalHospitalIcon, color: '#818cf8' },
  pharmacy: { label: 'صيدلية', icon: PharmacyIcon, color: '#34d399' },
  dental: { label: 'عيادة أسنان', icon: HealthAndSafetyIcon, color: '#f472b6' },
  doctor: { label: 'طبيب', icon: HealthAndSafetyIcon, color: '#fb923c' },
};

export default function HomePage() {
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/clinics`)
      .then((res) => setClinics(res.data))
      .catch(console.error);
  }, []);

  const filteredClinics = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return clinics;
    return clinics.filter((clinic) =>
      [clinic.name, clinic.specialization, clinic.role, clinic.location?.city]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [search, clinics]);

  const stats = useMemo(() => ({
    total: clinics.length,
    available: clinics.filter((clinic) => clinic.isAvailable).length,
    clinics: clinics.filter((clinic) => clinic.role === 'clinic').length,
    doctors: clinics.filter((clinic) => clinic.role === 'doctor').length,
    pharmacies: clinics.filter((clinic) => clinic.role === 'pharmacy').length,
  }), [clinics]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(180deg, #020617 0%, #081b34 48%, #081b34 100%)', color: '#eef7ff' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
          <Box sx={{ maxWidth: 640 }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2.4rem', md: '3.5rem' } }}>
              حجز مواعيد العيادات بسرعة وذكاء
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: '#a5b4fc', lineHeight: 1.8 }}>
              اعرض طبيبك أو صيدليتك، واستقبل الحجوزات مباشرةً بنظام احترافي يناسب المستخدم العربي والعيادات المتطورة.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={Link} to="/register" variant="contained" size="large" sx={{ bgcolor: '#22c55e', color: '#08120f', fontWeight: 800, px: 4, py: 1.7 }}>
                تسجيل منشأة جديدة
              </Button>
              <Button component={Link} to="/" variant="outlined" size="large" sx={{ borderColor: '#7dd3fc', color: '#cbd5e1', px: 4, py: 1.7 }}>
                استعرض العيادات الآن
              </Button>
            </Stack>
          </Box>
          <Paper sx={{ flex: 1, bgcolor: '#0d1728', borderRadius: 4, p: 3, boxShadow: '0 30px 60px rgba(0,0,0,0.35)' }}>
            <Typography variant="subtitle2" color="#94a3b8" sx={{ mb: 2 }}>
              أحدث بيانات المنصة
            </Typography>
            <Grid container spacing={2}>
              {[
                { name: 'العيادات', value: stats.total },
                { name: 'متاحة الآن', value: stats.available },
                { name: 'أطباء', value: stats.doctors },
                { name: 'صيدليات', value: stats.pharmacies },
              ].map((item) => (
                <Grid item xs={6} key={item.name}>
                  <Box sx={{ bgcolor: '#112240', borderRadius: 3, p: 2 }}>
                    <Typography color="#94a3b8" variant="caption">{item.name}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>{item.value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} xl={8}>
            <Card sx={{ bgcolor: '#07101d', borderRadius: 4, boxShadow: '0 30px 70px rgba(0,0,0,0.25)' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="ابحث عن اسم، تخصص، أو مدينة"
                    variant="filled"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: '#94a3b8', mr: 1 }} />,
                      disableUnderline: true,
                      sx: { bgcolor: '#0b1b2b', color: '#eef7ff' },
                    }}
                  />
                  <Button variant="contained" sx={{ bgcolor: '#38bdf8', color: '#081b27', fontWeight: 700, minWidth: 180 }}>
                    عرض الأقرب
                  </Button>
                </Stack>
                <ClinicMap clinics={filteredClinics} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} xl={4}>
            <Stack spacing={3}>
              <Card sx={{ bgcolor: '#07101d', borderRadius: 4, boxShadow: '0 30px 70px rgba(0,0,0,0.25)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>العيادات الأكثر زيارة</Typography>
                  <List sx={{ p: 0 }}>
                    {filteredClinics.slice(0, 5).map((clinic, index) => {
                      const type = clinicTypeLabel[clinic.role] || clinicTypeLabel.clinic;
                      const Icon = type.icon;
                      return (
                        <Box key={clinic._id}>
                          <ListItem sx={{ bgcolor: index % 2 === 0 ? '#081622' : 'transparent', borderRadius: 3, mb: 1 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: type.color }}>
                                <Icon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={clinic.name}
                              secondary={`${type.label} • ${clinic.specialization || 'عام'}`}
                              primaryTypographyProps={{ color: '#eef7ff', fontWeight: 700 }}
                              secondaryTypographyProps={{ color: '#94a3b8' }}
                            />
                          </ListItem>
                        </Box>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ bgcolor: '#07101d', borderRadius: 4, boxShadow: '0 30px 70px rgba(0,0,0,0.25)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>الموقع على الخريطة</Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AddLocationAltIcon sx={{ color: '#38bdf8' }} />
                      <Typography color="#94a3b8">عرض كل المواقع الجغرافية للعيادات المتاحة.</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ color: '#34d399' }} />
                      <Typography color="#94a3b8">خريطة تفاعلية تُظهر العيادات القريبة والمفتوحة الآن.</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
