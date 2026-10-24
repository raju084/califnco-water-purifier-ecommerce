import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Droplets, Wrench, Package, User } from 'lucide-react';

export const BottomTabs: React.FC = () => {
  const { activeTab, setActiveTab, orders, serviceTickets } = useApp();

  const openTicketsCount = serviceTickets.filter(s => s.status === 'open' || s.status === 'assigned').length;
  const activeOrdersCount = orders.filter(o => o.status === 'processing' || o.status === 'dispatched').length;

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'catalog', label: 'Products', icon: Droplets },
    { id: 'services', label: 'Services', icon: Wrench, badge: openTicketsCount },
    { id: 'orders', label: 'Orders', icon: Package, badge: activeOrdersCount },
    { id: 'profile', label: 'Account', icon: User }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
          >
            <div className="nav-icon-container" style={{ position: 'relative' }}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {tab.badge && tab.badge > 0 ? (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-6px',
                  background: '#f43f5e',
                  color: '#ffffff',
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
