'use client';

import { useState, useEffect } from 'react';
import { getStoredOrders, saveStoredOrders } from '../../lib/store';
import { Order, OrderStatus } from '../../../../packages/shared';

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map(ord => 
      ord.id === orderId 
        ? { ...ord, status: newStatus, updatedAt: new Date().toISOString() } 
        : ord
    );
    setOrders(updated);
    saveStoredOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = orders.filter(ord => {
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;
    const matchesRole = roleFilter === 'all' || ord.userRole === roleFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      ord.orderNumber.toLowerCase().includes(query) ||
      ord.customerName.toLowerCase().includes(query) ||
      ord.userEmail.toLowerCase().includes(query) ||
      ord.shippingAddress.city.toLowerCase().includes(query);
    return matchesStatus && matchesRole && matchesSearch;
  });

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Order Fulfillment & Tracking</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
          Inspect, transition statuses, and track domestic customer orders and commercial dealer bulk shipments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by Order #, Customer, City, Email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="status-tabs">
            {['all', 'pending', 'processing', 'dispatched', 'delivered', 'cancelled'].map(tab => (
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

          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              background: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            <option value="all">All Channels</option>
            <option value="customer">Retail Customers</option>
            <option value="dealer">Wholesale Dealers</option>
          </select>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order Details</th>
              <th>Channel & Buyer</th>
              <th>Items & Value</th>
              <th>Delivery Destination</th>
              <th>Status</th>
              <th>Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No orders found matching the filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map(ord => (
                <tr key={ord.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {ord.orderNumber}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                      {new Date(ord.createdAt).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {ord.paymentMethod === 'razorpay' ? '💳 Razorpay Test' : ord.paymentMethod === 'dealer_credit' ? '📝 Credit Terms' : '💵 COD'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{ord.customerName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ord.userEmail}</div>
                    <span className={`badge ${ord.userRole === 'dealer' ? 'badge-dealer' : 'badge-customer'}`} style={{ marginTop: '4px' }}>
                      {ord.userRole === 'dealer' ? 'Dealer Wholesale' : 'Customer'}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹{ord.total.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                      {ord.items.reduce((s, i) => s + i.quantity, 0)} units ({ord.items.length} line items)
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{ord.shippingAddress.city}, {ord.shippingAddress.state}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>PIN: {ord.shippingAddress.pincode}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${ord.status}`}>{ord.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="btn btn-outline btn-sm"
                      >
                        Inspect
                      </button>
                      {ord.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'processing')}
                          className="btn btn-primary btn-sm"
                        >
                          Process
                        </button>
                      )}
                      {ord.status === 'processing' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'dispatched')}
                          className="btn btn-primary btn-sm"
                        >
                          Dispatch
                        </button>
                      )}
                      {ord.status === 'dispatched' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'delivered')}
                          className="btn btn-success btn-sm"
                        >
                          Deliver
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

      {/* Modal for Order Inspection */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  Order #{selectedOrder.orderNumber}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Address */}
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Shipping & Consignee Info
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>{selectedOrder.shippingAddress.fullName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </div>
                <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                  Phone: <strong>{selectedOrder.shippingAddress.phone}</strong> | Email: <strong>{selectedOrder.userEmail}</strong>
                </div>
              </div>

              {/* Items */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>Line Items</div>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.productName} style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.productName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700 }}>₹{item.totalPrice.toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#10b981' }}>
                  <span>Discount:</span>
                  <span>-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}>
                  <span>GST (18%):</span>
                  <span>₹{selectedOrder.tax.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem', borderTop: '1px solid var(--border-light)', paddingTop: '6px' }}>
                  <span>Total Payable:</span>
                  <span style={{ color: 'var(--primary)' }}>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* State Transition Actions */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                  Change Order Status:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['pending', 'processing', 'dispatched', 'delivered', 'cancelled'] as OrderStatus[]).map(st => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`btn btn-sm ${selectedOrder.status === st ? 'btn-primary' : 'btn-outline'}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {st}
                    </button>
                  ))}
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
