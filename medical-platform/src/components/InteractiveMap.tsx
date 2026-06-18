'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for different facility types
const createCustomIcon = (type: string, color: string) => {
  const icons: Record<string, string> = {
    HOSPITAL: '🏥',
    CLINIC: '🏥',
    DENTAL_CLINIC: '🦷',
    PHARMACY: '💊',
    MEDICAL_CENTER: '⚕️',
    SPECIALTY_CENTER: '🔬',
  };
  
  const iconEmoji = icons[type] || '📍';
  
  return L.divIcon({
    html: `<div style="font-size: 24px; background: ${color}; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white;">${iconEmoji}</div>`,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

interface Facility {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  address?: string;
  phone?: string;
  rating?: number;
  isAvailable: boolean;
  description?: string;
}

interface InteractiveMapProps {
  facilities: Facility[];
  center?: [number, number];
  zoom?: number;
  onFacilityClick?: (facility: Facility) => void;
}

function MapController({ center, zoom }: { center?: [number, number]; zoom?: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function InteractiveMap({ 
  facilities, 
  center = [33.3152, 44.3661] as [number, number], 
  zoom = 12,
  onFacilityClick 
}: InteractiveMapProps) {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  
  const getColorForType = (type: string): string => {
    const colors: Record<string, string> = {
      HOSPITAL: '#ef4444',
      CLINIC: '#3b82f6',
      DENTAL_CLINIC: '#ec4899',
      PHARMACY: '#22c55e',
      MEDICAL_CENTER: '#8b5cf6',
      SPECIALTY_CENTER: '#f59e0b',
    };
    return colors[type] || '#6b7280';
  };

  const handleMarkerClick = (facility: Facility) => {
    setSelectedFacility(facility);
    onFacilityClick?.(facility);
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        className="z-0"
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={center} zoom={zoom} />
        
        {facilities.map((facility) => (
          <Marker
            key={facility.id}
            position={[facility.latitude, facility.longitude]}
            icon={createCustomIcon(facility.type, getColorForType(facility.type))}
            eventHandlers={{
              click: () => handleMarkerClick(facility),
            }}
          >
            <Popup className="custom-popup" maxWidth={300}>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{facility.type === 'PHARMACY' ? '💊' : facility.type === 'DENTAL_CLINIC' ? '🦷' : '🏥'}</span>
                  <h3 className="font-bold text-lg text-gray-800">{facility.name}</h3>
                </div>
                
                {facility.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{facility.description}</p>
                )}
                
                <div className="space-y-1 text-sm">
                  {facility.address && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <span>📍</span>
                      <span>{facility.address}</span>
                    </div>
                  )}
                  
                  {facility.phone && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <span>📞</span>
                      <span>{facility.phone}</span>
                    </div>
                  )}
                  
                  {facility.rating !== undefined && (
                    <div className="flex items-center gap-2">
                      <span>⭐</span>
                      <span className="font-semibold">{facility.rating.toFixed(1)}</span>
                    </div>
                  )}
                  
                  <div className={`mt-2 px-2 py-1 rounded-full text-xs font-semibold inline-block ${
                    facility.isAvailable 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {facility.isAvailable ? 'متوفر' : 'غير متوفر'}
                  </div>
                </div>
                
                <Link 
                  href={`/facilities/${facility.id}`}
                  className="mt-3 block w-full bg-gradient-to-l from-primary-600 to-primary-500 text-white text-center py-2 rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 font-semibold shadow-md"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
