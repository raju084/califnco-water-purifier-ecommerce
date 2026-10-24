import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Bell, ShoppingBag, ShieldCheck, User } from 'lucide-react';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const { 
    userRole, 
    setUserRole, 
    dealerStatus, 
    isDarkMode, 
    toggleDarkMode, 
    cartCount, 
    setActiveTab, 
    unreadNotificationsCount,
    currentUser,
    setIsAuthModalOpen
  } = useApp();

  return (
    <header className="app-header">
      {/* Brand & Role Tag */}
      <div 
        onClick={() => setActiveTab('home')}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: userRole === 'dealer'
            ? 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)'
            : 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '1.15rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
        }}>
          💧
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
              Califnco
            </span>
            {userRole === 'dealer' ? (
              <span style={{
                background: '#f3e8ff',
                color: '#7e22ce',
                border: '1px solid #d8b4fe',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                Dealer Wholesale
              </span>
            ) : (
              <span style={{
                background: '#e0f2fe',
                color: '#0369a1',
                border: '1px solid #bae6fd',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                Retail
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {userRole === 'dealer' ? '30-40% Bulk Margin Active' : 'Pure Drinking Water'}
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* User Account / Login Button */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          title={currentUser ? `Account: ${currentUser.displayName}` : 'Sign In / Register'}
          style={{
            background: currentUser ? (userRole === 'dealer' ? '#f3e8ff' : '#e0f2fe') : 'var(--bg-card-subtle)',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            padding: currentUser ? '4px 8px' : '5px 10px',
            borderRadius: '20px',
            color: currentUser ? (userRole === 'dealer' ? '#7e22ce' : '#0284c7') : 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.72rem',
            fontWeight: 700
          }}
        >
          {currentUser ? (
            <>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: userRole === 'dealer' ? '#7e22ce' : '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px'
              }}>
                {currentUser.displayName.slice(0, 1).toUpperCase()}
              </div>
              <span>{currentUser.displayName.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <User size={14} />
              <span>Login</span>
            </>
          )}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isDarkMode ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} color="#64748b" />}
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          aria-label="Notifications"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--text-main)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Bell size={20} />
          {unreadNotificationsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#f43f5e',
              border: '2px solid var(--bg-card)'
            }} />
          )}
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setActiveTab('cart')}
          aria-label="Cart"
          style={{
            background: userRole === 'dealer' ? '#f3e8ff' : '#e0f2fe',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '20px',
            color: userRole === 'dealer' ? '#7e22ce' : '#0284c7',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}
        >
          <ShoppingBag size={18} />
          <span className={cartCount > 0 ? 'bounce-badge' : ''}>{cartCount}</span>
        </button>
      </div>
    </header>
  );
};
