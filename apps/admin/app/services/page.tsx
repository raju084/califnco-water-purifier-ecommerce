'use client';

import { useState, useEffect } from 'react';
import { getStoredServices, saveStoredServices } from '../../lib/store';
import { ServiceTicket, ServiceStatus } from '../../../../packages/shared';

export default function ServiceDeskPage() {
  const [services, setServices] = useState<ServiceTicket[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<ServiceTicket | null>(null);
  const [techNameInput, setTechNameInput] = useState<string>('');
  const [techPhoneInput, setTechPhoneInput] = useState<string>('');

  useEffect(() => {
    setServices(getStoredServices());
  }, []);

  const handleUpdateStatus = (ticketId: string, newStatus: ServiceStatus) => {
    const updated = services.map(s => s.id === ticketId ? { ...s, status: newStatus, updatedAt: new Date().toISOString() } : s);
    setServices(updated);
    saveStoredServices(updated);
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  const handleAssignTechnician = (ticketId: string) => {
    if (!techNameInput) return;
    const updated = services.map(s => s.id === ticketId ? {
      ...s,
      assignedTechnician: techNameInput,
      technicianPhone: techPhoneInput || '+91 98800 11223',
      status: 'assigned' as ServiceStatus,
      updatedAt: new Date().toISOString()
    } : s);
    setServices(updated);
    saveStoredServices(updated);
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        assignedTechnician: techNameInput,
        technicianPhone: techPhoneInput || '+91 98800 11223',
        status: 'assigned'
      });
    }
    setTechNameInput('');
    setTechPhoneInput('');
  };

  const filteredTickets = services.filter(s => {
    if (filterStatus === 'all') return true;
    return s.status === filterStatus;
  });

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Field Service & Maintenance Desk</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
          Triage customer water purifier service bookings, schedule technician visits, and track filter maintenance.
        </p>
      </div>

      {/* Tabs */}
      <div className="filter-bar">
        <div className="status-tabs">
          {['all', 'open', 'assigned', 'in_progress', 'completed', 'cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`status-tab ${filterStatus === tab ? 'active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticket # & Date</th>
              <th>Service Category</th>
              <th>Customer & Address</th>
              <th>Purifier Model</th>
              <th>Assigned Specialist</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No service tickets found in this status.
                </td>
              </tr>
            ) : (
              filteredTickets.map(srv => (
                <tr key={srv.id}>
                  <td>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--primary)' }}>
                      {srv.ticketNumber}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Preferred: <strong>{srv.preferredDate}</strong>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>{srv.timeSlot}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{srv.serviceType}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {srv.notes || 'Routine service'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{srv.customerName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📞 {srv.phone}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                      {srv.address.street}, {srv.address.city}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                      {srv.purifierModel || 'Califnco RO Unit'}
                    </span>
                  </td>
                  <td>
                    {srv.assignedTechnician ? (
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0369a1' }}>
                          👨‍🔧 {srv.assignedTechnician}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {srv.technicianPhone}
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--accent-amber)', fontSize: '0.8rem', fontWeight: 600 }}>
                        ⚠️ Unassigned
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`badge badge-${srv.status}`}>{srv.status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedTicket(srv)}
                      className="btn btn-outline btn-sm"
                    >
                      Assign / Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Ticket Details & Assignment Modal */}
      {selectedTicket && (
        <div className="modal-backdrop" onClick={() => setSelectedTicket(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  Service Ticket: {selectedTicket.ticketNumber}
                </h3>
                <span className={`badge badge-${selectedTicket.status}`} style={{ marginTop: '4px' }}>
                  {selectedTicket.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Service Info */}
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Service Category:</span>
                    <div style={{ fontWeight: 600 }}>{selectedTicket.serviceType}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Purifier Model:</span>
                    <div style={{ fontWeight: 600 }}>{selectedTicket.purifierModel || 'Standard RO'}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Preferred Date & Slot:</span>
                    <div style={{ fontWeight: 600 }}>{selectedTicket.preferredDate} ({selectedTicket.timeSlot})</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Customer Contact:</span>
                    <div style={{ fontWeight: 600 }}>{selectedTicket.customerName} ({selectedTicket.phone})</div>
                  </div>
                </div>

                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Customer Notes:</span>
                  <div style={{ fontSize: '0.875rem', marginTop: '2px', fontWeight: 500 }}>
                    "{selectedTicket.notes || 'None provided'}"
                  </div>
                </div>
              </div>

              {/* Technician Assignment Form */}
              <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
                  Assign Field Service Engineer
                </div>
                {selectedTicket.assignedTechnician ? (
                  <div style={{ fontSize: '0.85rem', color: '#047857', marginBottom: '10px' }}>
                    Currently assigned to <strong>{selectedTicket.assignedTechnician}</strong> ({selectedTicket.technicianPhone})
                  </div>
                ) : null}

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Technician Name (e.g. Anand Rao)"
                    value={techNameInput}
                    onChange={e => setTechNameInput(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Mobile (+91...)"
                    value={techPhoneInput}
                    onChange={e => setTechPhoneInput(e.target.value)}
                    style={{ width: '160px', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                  />
                  <button
                    onClick={() => handleAssignTechnician(selectedTicket.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Assign Tech
                  </button>
                </div>
              </div>

              {/* State Transitions */}
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                  Update Ticket Status:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['open', 'assigned', 'in_progress', 'completed', 'cancelled'] as ServiceStatus[]).map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedTicket.id, st)}
                      className={`btn btn-sm ${selectedTicket.status === st ? 'btn-primary' : 'btn-outline'}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedTicket(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
