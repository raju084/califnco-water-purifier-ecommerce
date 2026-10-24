import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, CheckCheck, MessageSquare, Mail, Smartphone, ExternalLink, Send } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markNotificationsAsRead, 
    sendSimulatedPush,
    smsLogs,
    emailLogs,
    sendTestSMS,
    sendTestEmail,
    userAddress,
    currentUser
  } = useApp();

  const [activeChannel, setActiveChannel] = useState<'push' | 'sms' | 'email'>('push');
  const [selectedEmailForView, setSelectedEmailForView] = useState<string | null>(null);

  const activePhone = currentUser?.phone || userAddress.phone || '+91 98765 43210';
  const activeName = currentUser?.displayName || 'Customer';
  const activeEmail = currentUser?.email || 'customer@califnco.com';

  if (!isOpen) return null;

  const triggerTestAlert = (type: 'order' | 'service' | 'deal') => {
    if (type === 'order') {
      sendSimulatedPush('🚚 Order Out for Delivery', 'Courier partner BlueDart is out for delivery with your Califnco purifier!');
    } else if (type === 'service') {
      sendSimulatedPush('⚠️ High TDS Water Alert', 'Water TDS detected above 800 ppm. Tap to book priority membrane replacement service.');
    } else {
      sendSimulatedPush('⚡ Flash 20% Off Spares', 'Exclusive 20% discount on all RO booster pumps and solenoid valves today!');
    }
  };

  return (
    <div className="mobile-modal-backdrop fade-in" onClick={onClose} style={{ zIndex: 100 }}>
      <div 
        className="mobile-modal-sheet slide-up-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Bell size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Notification Center
              </h3>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                FCM Push • Telecom SMS • Email Invoices
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeChannel === 'push' && (
              <button
                onClick={markNotificationsAsRead}
                title="Mark all as read"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCheck size={14} />
                <span>Mark Read</span>
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-card-subtle)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-main)'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Channel Switcher Tabs */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '6px', 
          background: 'var(--bg-card-subtle)', 
          padding: '4px', 
          borderRadius: 'var(--radius-md)',
          marginBottom: '14px' 
        }}>
          <button
            onClick={() => setActiveChannel('push')}
            style={{
              padding: '8px 4px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeChannel === 'push' ? 'var(--bg-card)' : 'transparent',
              color: activeChannel === 'push' ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              boxShadow: activeChannel === 'push' ? 'var(--shadow-card)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Bell size={13} />
            <span>Push ({notifications.length})</span>
          </button>

          <button
            onClick={() => setActiveChannel('sms')}
            style={{
              padding: '8px 4px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeChannel === 'sms' ? 'var(--bg-card)' : 'transparent',
              color: activeChannel === 'sms' ? '#16a34a' : 'var(--text-muted)',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              boxShadow: activeChannel === 'sms' ? 'var(--shadow-card)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Smartphone size={13} />
            <span>SMS ({smsLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveChannel('email')}
            style={{
              padding: '8px 4px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeChannel === 'email' ? 'var(--bg-card)' : 'transparent',
              color: activeChannel === 'email' ? '#8b5cf6' : 'var(--text-muted)',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              boxShadow: activeChannel === 'email' ? 'var(--shadow-card)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Mail size={13} />
            <span>Email ({emailLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: PUSH (FCM) */}
        {activeChannel === 'push' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Push triggers */}
            <div style={{ padding: '10px 12px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                Quick Push Alert Triggers:
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => triggerTestAlert('order')}
                  style={{
                    padding: '5px 9px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  📦 Order Out for Delivery
                </button>
                <button
                  onClick={() => triggerTestAlert('service')}
                  style={{
                    padding: '5px 9px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🔧 TDS Service Reminder
                </button>
                <button
                  onClick={() => triggerTestAlert('deal')}
                  style={{
                    padding: '5px 9px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  ⚡ Flash 20% Off
                </button>
              </div>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {notifications.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: item.read ? 'var(--bg-card-subtle)' : 'var(--bg-card)',
                    border: item.read ? '1px solid var(--border-color)' : '1px solid #38bdf8',
                    position: 'relative'
                  }}
                >
                  {!item.read && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--primary)'
                    }} />
                  )}
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '6px' }}>
                    {item.body}
                  </p>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SMS ALERTS (Telecom) */}
        {activeChannel === 'sms' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ 
              padding: '10px 12px', 
              background: '#f0fdf4', 
              border: '1px solid #bbf7d0', 
              borderRadius: 'var(--radius-md)', 
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534' }}>
                  📱 SMS Gateway: Active (DLT Approved)
                </div>
                <div style={{ fontSize: '0.68rem', color: '#15803d' }}>
                  Recipient: <strong>{activePhone}</strong> ({activeName}) • Sender ID: CALFNC
                </div>
              </div>
              <button
                onClick={() => sendTestSMS(activePhone, `CALIFNCO: Hello ${activeName}! Test SMS received at ${new Date().toLocaleTimeString()} on your registered phone ${activePhone}. Toll-free: 1800-CALIFNCO`)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                + Send Test SMS
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {smsLogs.map(sms => (
                <div
                  key={sms.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ 
                        background: '#dcfce7', 
                        color: '#15803d', 
                        padding: '2px 6px', 
                        borderRadius: '4px', 
                        fontSize: '0.68rem', 
                        fontWeight: 800,
                        fontFamily: 'monospace' 
                      }}>
                        {sms.senderId}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        To: {sms.to}
                      </span>
                    </div>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      background: '#ecfdf5', 
                      color: '#047857', 
                      padding: '2px 6px', 
                      borderRadius: '10px', 
                      fontWeight: 700 
                    }}>
                      ✓ {sms.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{
                    background: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px',
                    fontSize: '0.78rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.45,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    borderLeft: '3px solid #16a34a'
                  }}>
                    {sms.message}
                  </div>

                  <div style={{ fontSize: '0.66rem', color: 'var(--text-light)', marginTop: '6px', textAlign: 'right' }}>
                    {new Date(sms.timestamp).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EMAIL INVOICES */}
        {activeChannel === 'email' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ 
              padding: '10px 12px', 
              background: '#faf5ff', 
              border: '1px solid #e9d5ff', 
              borderRadius: 'var(--radius-md)', 
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b21a8' }}>
                  ✉️ Transactional Mailer: Active
                </div>
                <div style={{ fontSize: '0.68rem', color: '#7e22ce' }}>
                  Recipient: <strong>{activeEmail}</strong> ({activeName}) • Sender: accounts@califnco.com
                </div>
              </div>
              <button
                onClick={() => sendTestEmail(activeEmail, `Test Notification for ${activeName}`, `Hello ${activeName},\nYour Califnco registered email is working smoothly.`)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: '#8b5cf6',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                + Send Test Email
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {emailLogs.map(email => (
                <div
                  key={email.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      From: <strong>{email.from}</strong>
                    </span>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      background: '#ede9fe', 
                      color: '#6b21a8', 
                      padding: '2px 6px', 
                      borderRadius: '10px', 
                      fontWeight: 700 
                    }}>
                      ✓ {email.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {email.subject}
                  </h4>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    To: {email.to} • {new Date(email.timestamp).toLocaleString('en-IN')}
                  </div>

                  {/* Toggle Preview Button */}
                  <button
                    onClick={() => setSelectedEmailForView(selectedEmailForView === email.id ? null : email.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--primary)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{selectedEmailForView === email.id ? 'Hide Invoice HTML' : 'View Formatted Email / Invoice'}</span>
                  </button>

                  {/* Rendered HTML card preview */}
                  {selectedEmailForView === email.id && (
                    <div 
                      style={{ 
                        marginTop: '10px', 
                        padding: '10px', 
                        background: '#ffffff', 
                        borderRadius: '8px', 
                        border: '1px solid #cbd5e1',
                        maxHeight: '300px',
                        overflowY: 'auto'
                      }}
                      dangerouslySetInnerHTML={{ __html: email.htmlContent }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
