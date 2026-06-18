'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">جاري تحميل الخريطة...</p>
      </div>
    </div>
  )
});

const mockFacilities = [
  { id: '1', name: 'مستشفى بغداد التعليمي', type: 'HOSPITAL', latitude: 33.3152, longitude: 44.3661, address: 'الكرادة، بغداد', phone: '07701234567', rating: 4.5, isAvailable: true },
  { id: '2', name: 'عيادة الشفاء', type: 'CLINIC', latitude: 33.3200, longitude: 44.3800, address: 'المنصور، بغداد', phone: '07701234568', rating: 4.2, isAvailable: true },
  { id: '3', name: 'مركز الأسنان الحديث', type: 'DENTAL_CLINIC', latitude: 33.3100, longitude: 44.3500, address: 'أبو غريب، بغداد', phone: '07701234569', rating: 4.7, isAvailable: true },
  { id: '4', name: 'صيدلية الحياة', type: 'PHARMACY', latitude: 33.3250, longitude: 44.3700, address: 'الأعظمية، بغداد', phone: '07701234570', rating: 4.3, isAvailable: true },
  { id: '5', name: 'المركز الطبي الدولي', type: 'MEDICAL_CENTER', latitude: 33.3050, longitude: 44.3900, address: 'زيونة، بغداد', phone: '07701234571', rating: 4.6, isAvailable: false },
  { id: '6', name: 'مركز القلب التخصصي', type: 'SPECIALTY_CENTER', latitude: 33.3300, longitude: 44.3600, address: 'الجادرية، بغداد', phone: '07701234572', rating: 4.8, isAvailable: true },
];

const facilityTypes = [
  { value: 'ALL', label: 'الكل', icon: '🗺️' },
  { value: 'HOSPITAL', label: 'مستشفيات', icon: '🏥' },
  { value: 'CLINIC', label: 'عيادات', icon: '🩺' },
  { value: 'DENTAL_CLINIC', label: 'أسنان', icon: '🦷' },
  { value: 'PHARMACY', label: 'صيدليات', icon: '💊' },
  { value: 'MEDICAL_CENTER', label: 'مراكز طبية', icon: '⚕️' },
  { value: 'SPECIALTY_CENTER', label: 'مراكز متخصصة', icon: '🔬' },
];

export default function MapPage() {
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFacilities = mockFacilities.filter(facility => {
    const matchesType = selectedType === 'ALL' || facility.type === selectedType;
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-primary-600 to-accent-600 bg-clip-text text-transparent">خريطة المرافق الطبية</span>
          </h1>
          <p className="text-gray-600 text-lg">اعثر على أقرب العيادات، المستشفيات، والصيدليات بسهولة</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <input type="text" placeholder="ابحث عن اسم المكان..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all text-lg" />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {facilityTypes.map((type) => (
              <button key={type.value} onClick={() => setSelectedType(type.value)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${selectedType === type.value ? 'bg-gradient-to-l from-primary-600 to-primary-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200'}`}>
                <span className="ml-2">{type.icon}</span>{type.label}
              </button>
            ))}
          </div>
          <div className="text-center text-gray-600 font-medium">تم العثور على {filteredFacilities.length} مرفق طبي</div>
        </div>

        <div className="h-[600px] md:h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
          <InteractiveMap facilities={filteredFacilities} center={[33.3152, 44.3661]} zoom={12} />
        </div>
      </div>
    </div>
  );
}
