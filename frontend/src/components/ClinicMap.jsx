import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const icons = {
  doctor: new L.Icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png', iconSize: [36, 36], iconAnchor: [18, 36] }),
  clinic: new L.Icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/2965/2965567.png', iconSize: [36, 36], iconAnchor: [18, 36] }),
  pharmacy: new L.Icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/2424/2424458.png', iconSize: [36, 36], iconAnchor: [18, 36] }),
  dental: new L.Icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/955/955163.png', iconSize: [36, 36], iconAnchor: [18, 36] }),
  hospital: new L.Icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448443.png', iconSize: [36, 36], iconAnchor: [18, 36] }),
  default: new L.Icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [36, 36], iconAnchor: [18, 36] }),
};

export default function ClinicMap({ clinics }) {
  const center = useMemo(() => [24.7136, 46.6753], []);

  return (
    <MapContainer center={center} zoom={11} style={{ minHeight: '75vh', borderRadius: 24, overflow: 'hidden' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      {clinics.map((clinic) => {
        const coords = clinic.location?.coordinates;
        if (!coords || coords.length !== 2) return null;
        const icon = icons[clinic.role] || icons.default;
        return (
          <Marker key={clinic._id} position={[coords[1], coords[0]]} icon={icon}>
            <Popup>
              <div>
                <h3>{clinic.name}</h3>
                <p>{clinic.specialization || 'اختصاص عام'}</p>
                <p>{clinic.isAvailable ? 'متاح الآن' : 'غير متاح'}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
