import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceType } from '@shared/index';
import { Wrench, Calendar, Clock, CheckCircle2, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import { AddressMapModal } from '../components/AddressMapModal';

export const ServiceBookingView: React.FC = () => {
  const { serviceTickets, createServiceTicket, userAddress } = useApp();

  const [serviceType, setServiceType] = useState<ServiceType>('Installation');
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 01:00 PM');
  const [purifierModel, setPurifierModel] = useState<string>('Califnco AquaShield Elite RO+UV');
  const [notes, setNotes] = useState<string>('');
  const [isBookedSuccess, setIsBookedSuccess] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const serviceOptions: { type: ServiceType; desc: string; icon: string }[] = [
    { type: 'Installation', desc: 'New machine doorstep wall mount & plumbing', icon: '🛠️' },
    { type: 'Filter Replacement', desc: 'Spun, carbon, sediment or RO membrane renewal', icon: '🧬' },
    { type: 'Leakage Repair', desc: 'Urgent diagnosis of dripping valves or tubing', icon: '💧' },
    { type: 'TDS Water Quality Test', desc: 'Digital titanium probe test & mineral check', icon: '🔬' },
    { type: 'Routine Maintenance', desc: 'Pressure check, sanitization & auto-flush calibration', icon: '✨' },
    { type: 'Booster Pump Replacement', desc: 'Pump diaphragm or SMPS power supply fix', icon: '⚡' }
  ];

  const timeSlots = [
    '10:00 AM - 01:00 PM',
    '02:00 PM - 05:00 PM',
    '05:00 PM - 08:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createServiceTicket({
      serviceType,
      preferredDate,
      timeSlot,
      purifierModel,
      notes
    });
    setIsBookedSuccess(true);
    setNotes('');
  };

  return (
    <div style={{ padding: '16px 18px 32px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Doorstep RO Service Desk
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Certified Califnco water technicians with original parts guarantee.
        </p>
      </div>

      {isBookedSuccess && (
        <div style={{
          background: '#d1fae5',
          border: '1px solid #a7f3d0',
          borderRadius: 'var(--radius-lg)',
          padding: '14px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={24} color="#059669" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#065f46' }}>
              Service Visit Booked Successfully!
            </div>
            <div style={{ fontSize: '0.72rem', color: '#047857' }}>
              Our dispatch officer is assigning a verified technician to your address.
            </div>
          </div>
          <button
            onClick={() => setIsBookedSuccess(false)}
            style={{ background: 'none', border: 'none', color: '#065f46', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '24px'
      }}>
        {/* Step 1: Select Service Type */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', display: 'block' }}>
            1. Select Required Service
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {serviceOptions.map(opt => (
              <div
                key={opt.type}
                onClick={() => setServiceType(opt.type)}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: serviceType === opt.type ? '2px solid #0284c7' : '1px solid var(--border-color)',
                  background: serviceType === opt.type ? 'var(--primary-subtle)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.1rem' }}>{opt.icon}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {opt.type}
                  </span>
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.25 }}>
                  {opt.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Purifier Model */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
            2. Purifier Model / Brand
          </label>
          <input
            type="text"
            value={purifierModel}
            onChange={e => setPurifierModel(e.target.value)}
            placeholder="e.g. Califnco AquaShield, Kent, Livpure, Eureka Forbes"
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-app)',
              color: 'var(--text-main)',
              fontSize: '0.825rem'
            }}
          />
        </div>

        {/* Step 3: Date & Slot */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
              Preferred Date
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={e => setPreferredDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-app)',
                color: 'var(--text-main)',
                fontSize: '0.825rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
              Time Slot
            </label>
            <select
              value={timeSlot}
              onChange={e => setTimeSlot(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-app)',
                color: 'var(--text-main)',
                fontSize: '0.78rem'
              }}
            >
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 4: Address Confirmation */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Visit Destination
            </label>
            <span
              onClick={() => setIsAddressModalOpen(true)}
              style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
            >
              Map Location →
            </span>
          </div>
          <div style={{ padding: '8px 12px', background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            📍 {userAddress.street}, {userAddress.city} (Tel: {userAddress.phone})
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
            Issue Description / Notes for Technician
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Red warning light blinking, low flow rate, or foul taste..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-app)',
              color: 'var(--text-main)',
              fontSize: '0.825rem',
              resize: 'none'
            }}
          />
        </div>

        <button type="submit" className="btn-mobile btn-mobile-primary">
          <Wrench size={16} />
          <span>Confirm Doorstep Service Booking</span>
        </button>
      </form>

      {/* Existing Service Tickets History */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
          Your Service History ({serviceTickets.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {serviceTickets.map(ticket => (
            <div
              key={ticket.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.825rem', color: 'var(--primary)' }}>
                  {ticket.ticketNumber}
                </span>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: ticket.status === 'completed' ? '#d1fae5' : '#e0f2fe',
                  color: ticket.status === 'completed' ? '#047857' : '#0369a1'
                }}>
                  {ticket.status}
                </span>
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '2px' }}>
                {ticket.serviceType}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                📅 Scheduled: {ticket.preferredDate} ({ticket.timeSlot})
              </div>

              {ticket.assignedTechnician && (
                <div style={{
                  background: 'var(--bg-app)',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  👨‍🔧 <strong>{ticket.assignedTechnician}</strong> • {ticket.technicianPhone}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddressMapModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};
