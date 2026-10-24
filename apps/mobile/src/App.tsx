import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomTabs } from './components/BottomTabs';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { CartView } from './views/CartView';
import { ServiceBookingView } from './views/ServiceBookingView';
import { OrderHistoryView } from './views/OrderHistoryView';
import { ProfileView } from './views/ProfileView';
import { ImageLightbox } from './components/ImageLightbox';
import { NotificationsModal } from './components/NotificationsModal';
import { AuthModal } from './components/AuthModal';
import './styles/theme.css';

const MainScreen: React.FC = () => {
  const { activeTab, toastAlert, isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home': return <HomeView />;
      case 'catalog': return <CatalogView />;
      case 'cart': return <CartView />;
      case 'services': return <ServiceBookingView />;
      case 'orders': return <OrderHistoryView />;
      case 'profile': return <ProfileView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="mobile-viewport-container" style={{ position: 'relative' }}>
      {/* Real-time Floating Notification Toast */}
      {toastAlert && (
        <div 
          className="slide-down-toast"
          style={{
            position: 'absolute',
            top: '64px',
            left: '12px',
            right: '12px',
            zIndex: 90,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.76rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #38bdf8',
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span>{toastAlert.message}</span>
          <span 
            onClick={() => setIsNotificationsOpen(true)}
            style={{ 
              color: '#38bdf8', 
              cursor: 'pointer', 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              marginLeft: '8px', 
              textDecoration: 'underline' 
            }}
          >
            View
          </span>
        </div>
      )}

      {/* Top Mobile Navbar */}
      <Navbar onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* Main Screen Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {renderActiveView()}
      </main>

      {/* Sticky Bottom Navigation Tabs */}
      <BottomTabs />

      {/* Global Modals */}
      <ImageLightbox />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainScreen />
    </AppProvider>
  );
}
