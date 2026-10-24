import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Address } from '@shared/index';
import { X, MapPin, Navigation, Check } from 'lucide-react';
import L from 'leaflet';

interface AddressMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddressMapModal: React.FC<AddressMapModalProps> = ({ isOpen, onClose }) => {
  const { userAddress, setUserAddress } = useApp();
  const [formData, setFormData] = useState<Address>(userAddress);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(userAddress);
    }
  }, [isOpen, userAddress]);

  // Initialize Leaflet OpenStreetMap when modal is open
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    const lat = formData.latitude || 12.9279;
    const lng = formData.longitude || 77.6771;

    // Small delay to ensure modal container has rendered size
    const timer = setTimeout(() => {
      if (mapContainerRef.current && !mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current).setView([lat, lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Custom pin icon
        const icon = L.divIcon({
          className: 'custom-map-pin',
          html: '<div style="background:#0284c7;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,0.3);font-size:16px;">📍</div>',
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });

        const marker = L.marker([lat, lng], { draggable: true, icon }).addTo(map);

        marker.on('dragend', async () => {
          const pos = marker.getLatLng();
          setFormData(prev => ({ ...prev, latitude: pos.lat, longitude: pos.lng }));
          reverseGeocode(pos.lat, pos.lng);
        });

        map.on('click', (e) => {
          marker.setLatLng(e.latlng);
          setFormData(prev => ({ ...prev, latitude: e.latlng.lat, longitude: e.latlng.lng }));
          reverseGeocode(e.latlng.lat, e.latlng.lng);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;

        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 150);
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 450);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen]);

  // OpenStreetMap Nominatim reverse geocode (Free, no credit card)
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data && data.address) {
        setFormData(prev => ({
          ...prev,
          street: data.display_name.split(',').slice(0, 3).join(', '),
          city: data.address.city || data.address.town || data.address.suburb || prev.city,
          state: data.address.state || prev.state,
          pincode: data.address.postcode || prev.pincode
        }));
      }
    } catch {
      // Fallback silently if offline
    }
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setFormData(prev => ({ ...prev, latitude, longitude }));
          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 15);
            markerRef.current.setLatLng([latitude, longitude]);
            mapInstanceRef.current.invalidateSize();
          }
          reverseGeocode(latitude, longitude);
          setIsDetecting(false);
        },
        err => {
          console.warn('Geolocation error or permission denied:', err);
          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
          setIsDetecting(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setIsDetecting(false);
    }
  };

  const handleSave = () => {
    setUserAddress(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-modal-backdrop fade-in" onClick={onClose} style={{ zIndex: 100 }}>
      <div 
        className="mobile-modal-sheet slide-up-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#0284c7" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Delivery & Service Address (OpenStreetMap)
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-card-subtle)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free OpenStreetMap Container */}
        <div style={{ position: 'relative', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
          
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              zIndex: 999,
              background: '#ffffff',
              color: '#0284c7',
              border: '1px solid #bae6fd',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Navigation size={14} />
            <span>{isDetecting ? 'Detecting...' : 'Use My GPS'}</span>
          </button>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', display: 'block' }}>
              Full Name / Business Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', display: 'block' }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', display: 'block' }}>
              Street Address & Flat / Door No.
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={e => setFormData({ ...formData, street: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', display: 'block' }}>
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', display: 'block' }}>
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={handleSave}
            className="btn-mobile btn-mobile-primary"
          >
            <Check size={18} />
            <span>Confirm Delivery Address</span>
          </button>
        </div>
      </div>
    </div>
  );
};
