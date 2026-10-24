'use client';

import { useState, useEffect } from 'react';
import { getStoredDealers, saveStoredDealers } from '../../lib/store';
import { UserProfile, DealerStatus } from '../../../../packages/shared';

export default function DealerManagementPage() {
  const [dealers, setDealers] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all'>('pending');
  const [selectedDealer, setSelectedDealer] = useState<UserProfile | null>(null);

  useEffect(() => {
    setDealers(getStoredDealers());
  }, []);

  const handleUpdateDealerStatus = (uid: string, status: DealerStatus) => {
    const updated = dealers.map(d => d.uid === uid ? { ...d, dealerStatus: status } : d);
    setDealers(updated);
    saveStoredDealers(updated);
    if (selectedDealer && selectedDealer.uid === uid) {
      setSelectedDealer({ ...selectedDealer, dealerStatus: status });
    }
  };

  const filteredDealers = dealers.filter(d => {
    if (activeTab === 'all') return true;
    return d.dealerStatus === activeTab;
  });

  const pendingCount = dealers.filter(d => d.dealerStatus === 'pending').length;
  const approvedCount = dealers.filter(d => d.dealerStatus === 'approved').length;

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Dealer Verification & Wholesale Access</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
          Evaluate commercial water purifier dealership applications, verify GST identification, and grant bulk pricing privileges.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div className="status-tabs">
          <button
            onClick={() => setActiveTab('pending')}
            className={`status-tab ${activeTab === 'pending' ? 'active' : ''}`}
          >
            Pending Review ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`status-tab ${activeTab === 'approved' ? 'active' : ''}`}
          >
            Approved Partners ({approvedCount})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`status-tab ${activeTab === 'all' ? 'active' : ''}`}
          >
            All Dealers ({dealers.length})
          </button>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Approved dealers automatically receive <strong>30-40% wholesale discount</strong> in the mobile app.
        </div>
      </div>

      {/* Dealers Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Enterprise / Dealer Name</th>
              <th>GSTIN & Business Proof</th>
              <th>Contact Details</th>
              <th>Registered Location</th>
              <th>Approval Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDealers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No dealer applications in this category.
                </td>
              </tr>
            ) : (
              filteredDealers.map(dealer => (
                <tr key={dealer.uid}>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {dealer.companyName || dealer.displayName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Contact: {dealer.displayName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>
                      Applied: {new Date(dealer.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem' }}>
                      {dealer.gstNumber || 'NOT PROVIDED'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>GST Verified Entity</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{dealer.phone || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dealer.email}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem' }}>
                      {dealer.address ? `${dealer.address.city}, ${dealer.address.state}` : 'Bengaluru, Karnataka'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                      PIN: {dealer.address?.pincode || '560001'}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${dealer.dealerStatus}`}>
                      {dealer.dealerStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {dealer.dealerStatus === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleUpdateDealerStatus(dealer.uid, 'approved')}
                            className="btn btn-success btn-sm"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleUpdateDealerStatus(dealer.uid, 'rejected')}
                            className="btn btn-danger btn-sm"
                          >
                            ✕ Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleUpdateDealerStatus(
                            dealer.uid, 
                            dealer.dealerStatus === 'approved' ? 'rejected' : 'approved'
                          )}
                          className="btn btn-outline btn-sm"
                        >
                          {dealer.dealerStatus === 'approved' ? 'Revoke Access' : 'Re-Approve'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
