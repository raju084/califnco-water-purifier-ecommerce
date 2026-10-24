import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, Gift, Moon, Sun, MapPin, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { AddressMapModal } from '../components/AddressMapModal';

export const ProfileView: React.FC = () => {
  const {
    userRole,
    setUserRole,
    dealerStatus,
    setDealerStatus,
    isDarkMode,
    toggleDarkMode,
    referralCode,
    rewardPoints,
    userAddress,
    currentUser,
    setIsAuthModalOpen,
    logout
  } = useApp();

  const [copied, setCopied] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const copyReferral = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '16px 18px 36px' }}>
      {/* Profile Header or Login Prompt */}
      {currentUser ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '16px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: userRole === 'dealer'
              ? 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)'
              : 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: 800
          }}>
            {userRole === 'dealer' ? '🤝' : currentUser.displayName.slice(0, 2).toUpperCase()}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {currentUser.displayName}
              </h3>
              <span style={{
                padding: '2px 7px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                background: userRole === 'dealer' ? '#f3e8ff' : '#e0f2fe',
                color: userRole === 'dealer' ? '#7e22ce' : '#0284c7'
              }}>
                {userRole === 'dealer' ? 'Dealer' : 'Customer'}
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {currentUser.email}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '2px' }}>
              📞 {currentUser.phone || userAddress.phone}
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-app)',
              color: 'var(--text-main)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Manage
          </button>
        </div>
      ) : (
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%)',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-lg)',
          padding: '18px',
          marginBottom: '16px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#166534', marginBottom: '6px' }}>
            🔐 Welcome to Califnco
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#15803d', lineHeight: 1.4, marginBottom: '12px' }}>
            Sign in with your Name & Password, or login instantly with your WhatsApp or Mobile number (no account or password needed)!
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #16a34a 0%, #0284c7 100%)',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Sign In / Quick WhatsApp Login →
          </button>
        </div>
      )}

      {/* Role & Persona Switcher */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Shield size={18} color="#0284c7" />
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
            User Account Persona
          </h4>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Switch between domestic retail buyer and wholesale dealer to test pricing and bulk workflow.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            onClick={() => setUserRole('customer')}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              border: userRole === 'customer' ? '2px solid #0284c7' : '1px solid var(--border-color)',
              background: userRole === 'customer' ? '#e0f2fe' : 'var(--bg-app)',
              color: userRole === 'customer' ? '#0369a1' : 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            👤 Customer View
          </button>
          <button
            onClick={() => setUserRole('dealer')}
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              border: userRole === 'dealer' ? '2px solid #7e22ce' : '1px solid var(--border-color)',
              background: userRole === 'dealer' ? '#f3e8ff' : 'var(--bg-app)',
              color: userRole === 'dealer' ? '#7e22ce' : 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🤝 Dealer View
          </button>
        </div>

        {userRole === 'dealer' && (
          <div style={{ marginTop: '14px', padding: '12px', background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Registered GSTIN:</span>
              <span style={{ fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary)' }}>
                29PQRSX9876K2Z1
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Dealer Verification Status:</span>
              <span style={{ fontWeight: 700, color: '#047857' }}>
                ✓ {dealerStatus.toUpperCase()} (Wholesale Active)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tier Benefit:</span>
              <span style={{ fontWeight: 700, color: '#7e22ce' }}>30% - 40% Catalog Markdown</span>
            </div>
          </div>
        )}
      </div>

      {/* Referral & Rewards Wallet Card */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        color: '#78350f',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Gift size={20} color="#b45309" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>Califnco Rewards Club</h4>
          </div>
          <span style={{
            background: '#b45309',
            color: '#ffffff',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: 800
          }}>
            {rewardPoints} Coins (₹{rewardPoints})
          </span>
        </div>

        <p style={{ fontSize: '0.78rem', lineHeight: 1.35, marginBottom: '12px' }}>
          Invite your friends or neighbors. They get <strong>₹500 OFF</strong> on any purifier, and you earn <strong>250 Califnco Coins</strong> upon installation!
        </p>

        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#92400e', textTransform: 'uppercase', fontWeight: 700 }}>
              Your Unique Referral Code
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.05em', color: '#78350f', fontFamily: 'JetBrains Mono, monospace' }}>
              {referralCode}
            </div>
          </div>
          <button
            onClick={copyReferral}
            style={{
              background: '#b45309',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Account Settings Menu */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '20px'
      }}>
        {/* Dark Mode */}
        <div 
          onClick={toggleDarkMode}
          style={{
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isDarkMode ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#64748b" />}
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Appearance (Dark / Light Mode)
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>

        {/* Saved Addresses (OpenStreetMap) */}
        <div 
          onClick={() => setIsAddressModalOpen(true)}
          style={{
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={18} color="#0284c7" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Default GPS Location & Address
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
            {userAddress.city} →
          </span>
        </div>

        {/* Link to Admin Panel */}
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ExternalLink size={18} color="#10b981" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              Open Admin Control Panel (Port 3001)
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', background: '#d1fae5', color: '#047857', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
            Vercel Ready
          </span>
        </a>
      </div>

      <AddressMapModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};
