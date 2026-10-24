import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '@shared/index';
import { Package, Truck, CheckCircle2, Clock, MapPin, Receipt, ChevronDown, ChevronUp } from 'lucide-react';

export const OrderHistoryView: React.FC = () => {
  const { orders, setActiveTab } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(orders[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  const getStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'dispatched': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const steps = [
    { label: 'Placed', icon: Clock },
    { label: 'Processing', icon: Package },
    { label: 'Dispatched', icon: Truck },
    { label: 'Delivered', icon: CheckCircle2 }
  ];

  if (orders.length === 0) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📦</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          No Orders Placed Yet
        </h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: '20px' }}>
          Explore our range of 50+ water purifiers, commercial dispensers, and spares.
        </p>
        <button
          onClick={() => setActiveTab('catalog')}
          className="btn-mobile btn-mobile-primary"
          style={{ maxWidth: '240px', margin: '0 auto' }}
        >
          Start Shopping →
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 18px 30px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Order History & Tracking
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Live shipment status and invoice records for domestic & bulk dealer orders.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {orders.map(order => {
          const isExpanded = expandedOrderId === order.id;
          const currentStep = getStepIndex(order.status);

          return (
            <div
              key={order.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              {/* Header */}
              <div 
                onClick={() => toggleExpand(order.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>
                      {order.orderNumber}
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      background: order.status === 'delivered' ? '#d1fae5' : '#e0f2fe',
                      color: order.status === 'delivered' ? '#047857' : '#0369a1'
                    }}>
                      {order.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      ₹{order.total.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>
                      {order.paymentMethod === 'razorpay' ? 'Razorpay Test' : 'Credit / COD'}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Progress Timeline */}
              {order.status !== 'cancelled' && (
                <div style={{ marginTop: '16px', padding: '12px 6px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    {steps.map((st, idx) => {
                      const Icon = st.icon;
                      const isCompleted = idx <= currentStep;
                      return (
                        <div key={st.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: isCompleted ? '#0284c7' : 'var(--bg-card)',
                            border: `2px solid ${isCompleted ? '#0284c7' : 'var(--border-color)'}`,
                            color: isCompleted ? '#ffffff' : 'var(--text-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon size={13} />
                          </div>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: isCompleted ? 700 : 500,
                            color: isCompleted ? 'var(--text-main)' : 'var(--text-light)',
                            marginTop: '4px'
                          }}>
                            {st.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Collapsible Details */}
              {isExpanded && (
                <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>
                    Purchased Items:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={item.image} alt={item.productName} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.productName}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>
                              {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                        <div style={{ fontWeight: 700 }}>₹{item.totalPrice.toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div style={{ padding: '10px', background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', marginBottom: '12px' }}>
                    <div style={{ fontWeight: 700, marginBottom: '2px', color: 'var(--text-main)' }}>
                      📍 Shipping Destination
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>
                      {order.shippingAddress.fullName} • {order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                    </div>
                    {order.trackingNumber && (
                      <div style={{ marginTop: '4px', color: 'var(--primary)', fontWeight: 600 }}>
                        Waybill / Tracking: {order.trackingNumber}
                      </div>
                    )}
                  </div>

                  {/* Print / View Receipt */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => alert(`Tax Invoice #${order.orderNumber}\nTotal: ₹${order.total}\nPayment: ${order.paymentMethod}\nStatus: Verified`)}
                      style={{
                        background: 'none',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Receipt size={14} />
                      <span>View Tax Invoice</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
