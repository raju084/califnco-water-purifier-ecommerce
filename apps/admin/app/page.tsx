'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredOrders, getStoredDealers, getStoredServices, saveStoredOrders } from '../lib/store';
import { Order } from '../../../packages/shared';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dealers, setDealers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getStoredOrders());
    setDealers(getStoredDealers());
    setServices(getStoredServices());
  }, []);

  // Compute metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const dealerRevenue = orders.filter(o => o.userRole === 'dealer').reduce((sum, ord) => sum + ord.total, 0);
  const customerRevenue = orders.filter(o => o.userRole === 'customer').reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const pendingDealersCount = dealers.filter(d => d.dealerStatus === 'pending').length;
  const openServicesCount = services.filter(s => s.status === 'open' || s.status === 'assigned').length;

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o);
    setOrders(updated);
    saveStoredOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="page-wrapper">
      {/* Top Banner */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Executive Operations Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
            Real-time monitoring of customer orders, dealer wholesale pipelines, and field service requests.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/orders" className="btn btn-primary">
            Manage Orders ({pendingOrdersCount} pending)
          </Link>
          <Link href="/dealers" className="btn btn-outline">
            Review Dealers {pendingDealersCount > 0 && `(${pendingDealersCount})`}
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Revenue</span>
            <div className="metric-icon-box" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              💰
            </div>
          </div>
          <div className="metric-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="metric-trend" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: '#0284c7', fontWeight: 600 }}>₹{dealerRevenue.toLocaleString('en-IN')}</span> wholesale + <span style={{ color: '#10b981', fontWeight: 600 }}>₹{customerRevenue.toLocaleString('en-IN')}</span> retail
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Active Orders</span>
            <div className="metric-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
              📦
            </div>
          </div>
          <div className="metric-value">{orders.length} Orders</div>
          <div className="metric-trend" style={{ color: '#d97706', fontWeight: 600 }}>
            {pendingOrdersCount} requiring fulfillment / dispatch
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Pending Dealers</span>
            <div className="metric-icon-box" style={{ background: '#f3e8ff', color: '#9333ea' }}>
              🤝
            </div>
          </div>
          <div className="metric-value">{pendingDealersCount} Applications</div>
          <div className="metric-trend" style={{ color: pendingDealersCount > 0 ? '#9333ea' : '#64748b', fontWeight: 600 }}>
            {pendingDealersCount > 0 ? 'Action required for wholesale pricing' : 'All dealers vetted'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Service Desk</span>
            <div className="metric-icon-box" style={{ background: '#d1fae5', color: '#059669' }}>
              🔧
            </div>
          </div>
          <div className="metric-value">{openServicesCount} Tickets</div>
          <div className="metric-trend" style={{ color: '#059669', fontWeight: 600 }}>
            Installations & Filter Maintenance
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
        {/* Left: Recent Orders */}
        <div className="data-table-container">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Live Purifier & Spares Orders</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Latest customer & bulk dealer transactions</p>
            </div>
            <Link href="/orders" className="btn btn-outline btn-sm">
              View All Orders →
            </Link>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client / Channel</th>
                <th>Total (INR)</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(ord => (
                <tr key={ord.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {ord.orderNumber}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{ord.customerName}</div>
                    <span className={`badge ${ord.userRole === 'dealer' ? 'badge-dealer' : 'badge-customer'}`}>
                      {ord.userRole === 'dealer' ? 'Wholesale Dealer' : 'Retail Customer'}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>₹{ord.total.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{ord.items.length} items</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {ord.paymentMethod === 'razorpay' ? '💳 Razorpay' : ord.paymentMethod === 'dealer_credit' ? '📝 Credit Note' : '💵 COD'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${ord.status}`}>{ord.status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="btn btn-outline btn-sm"
                    >
                      Details & Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Quick Action Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Dealer Verification Queue */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Dealer Verification Queue</h3>
              <Link href="/dealers" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                All Dealers →
              </Link>
            </div>
            
            {pendingDealersCount === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>No pending applications</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>All dealer accounts verified</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dealers.filter(d => d.dealerStatus === 'pending').slice(0, 3).map(dealer => (
                  <div key={dealer.uid} style={{ padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{dealer.companyName || dealer.displayName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>GST: {dealer.gstNumber || 'Pending verification'}</div>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                      <Link href="/dealers" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                        Verify & Approve
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Service Desk Feed */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Active Field Services</h3>
              <Link href="/services" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                Service Desk →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.slice(0, 3).map(srv => (
                <div key={srv.id} style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: '#f8fafc', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{srv.serviceType}</span>
                    <span className={`badge badge-${srv.status}`}>{srv.status}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {srv.customerName} • {srv.address.city}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail & Status Update Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  Order Details: {selectedOrder.orderNumber}
                </h3>
                <span className={`badge badge-${selectedOrder.status}`} style={{ marginTop: '6px' }}>
                  {selectedOrder.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Customer Info */}
              <div style={{ marginBottom: '20px', padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>Shipping Address & Recipient</div>
                <div style={{ fontSize: '0.875rem' }}>{selectedOrder.shippingAddress.fullName} ({selectedOrder.customerName})</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  📞 {selectedOrder.shippingAddress.phone} | ✉️ {selectedOrder.userEmail}
                </div>
              </div>

              {/* Items List */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 600, marginBottom: '10px' }}>Purchased Products</div>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.productName} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.productName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Update Quick Action */}
              <div style={{ padding: '16px', background: '#e0f2fe', borderRadius: 'var(--radius-md)', marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0369a1', marginBottom: '8px' }}>
                  Update Fulfillment Status:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'processing')}
                    className={`btn btn-sm ${selectedOrder.status === 'processing' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'dispatched')}
                    className={`btn btn-sm ${selectedOrder.status === 'dispatched' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Dispatched / Shipped
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'delivered')}
                    className={`btn btn-sm ${selectedOrder.status === 'delivered' ? 'btn-success' : 'btn-outline'}`}
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                    className={`btn btn-sm ${selectedOrder.status === 'cancelled' ? 'btn-danger' : 'btn-outline'}`}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedOrder(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
