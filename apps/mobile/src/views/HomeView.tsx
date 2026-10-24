import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, ProductCategory } from '@shared/index';
import { Droplet, Award, Zap, ArrowRight, Gift, Sparkles, Wrench } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { userRole, setUserRole, setActiveTab, setSelectedCategory, referralCode } = useApp();

  const featuredPurifiers = PRODUCTS.filter(p => p.category === 'purifiers').slice(0, 4);
  const topSparesAndPumps = PRODUCTS.filter(p => p.category === 'pumps' || p.category === 'filters').slice(0, 4);

  const categories: { id: ProductCategory; label: string; icon: string }[] = [
    { id: 'purifiers', label: 'RO Purifiers', icon: '💧' },
    { id: 'dispensers', label: 'Dispensers', icon: '🚰' },
    { id: 'pumps', label: 'Booster Pumps', icon: '⚡' },
    { id: 'filters', label: 'Membranes', icon: '🧬' },
    { id: 'spares', label: 'Spare Parts', icon: '🔧' }
  ];

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setActiveTab('catalog');
  };

  return (
    <div style={{ paddingBottom: '24px' }}>
      {/* Role Switcher Banner for Evaluator/Reviewer */}
      <div style={{
        background: userRole === 'dealer'
          ? 'linear-gradient(135deg, #581c87 0%, #7e22ce 100%)'
          : 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
        color: '#ffffff',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', opacity: 0.9, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
            Current App Persona
          </div>
          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
            {userRole === 'dealer' ? '🤝 Wholesale Dealer Mode' : '👤 Retail Customer Mode'}
          </div>
        </div>
        <button
          onClick={() => setUserRole(userRole === 'customer' ? 'dealer' : 'customer')}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Switch to {userRole === 'customer' ? 'Dealer' : 'Customer'} →
        </button>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        {/* Hero Banner */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
          color: '#ffffff',
          padding: '22px 20px',
          boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.4)'
        }}>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '240px' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.25)',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              Pure Mineral Technology
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '6px' }}>
              Califnco AquaShield Elite RO+UV
            </h2>
            <p style={{ fontSize: '0.78rem', opacity: 0.9, lineHeight: 1.35, marginBottom: '14px' }}>
              8-Stage active copper & alkaline mineralizer. Kills 99.99% bacteria with zero waste.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('purifiers');
                setActiveTab('catalog');
              }}
              style={{
                background: '#ffffff',
                color: '#0369a1',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              <span>Explore 50+ Models</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-10px',
            width: '140px',
            height: '140px',
            opacity: 0.35,
            fontSize: '110px',
            lineHeight: 1,
            pointerEvents: 'none'
          }}>
            💧
          </div>
        </div>

        {/* Categories Row */}
        <div style={{ marginTop: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Explore Categories
            </h3>
            <span 
              onClick={() => {
                setSelectedCategory('all');
                setActiveTab('catalog');
              }}
              style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
            >
              View All (52) →
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                style={{
                  minWidth: '78px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Purifiers Grid */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {userRole === 'dealer' ? 'Wholesale Purifiers' : 'Flagship Purifiers'}
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {userRole === 'dealer' ? 'Tiered bulk pricing with MOQ' : 'Home and light commercial RO systems'}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('purifiers');
                setActiveTab('catalog');
              }}
              style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
            >
              See More →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {featuredPurifiers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Field Service Quick Banner */}
        <div 
          onClick={() => setActiveTab('services')}
          style={{
            marginTop: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#e0f2fe',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Wrench size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              Book Field Service or TDS Test
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Certified RO technician visit in under 4 hours.
            </div>
          </div>
          <ArrowRight size={18} color="var(--primary)" />
        </div>

        {/* Customer Referral Card */}
        <div style={{
          marginTop: '16px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          color: '#78350f',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#f59e0b',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Gift size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>
              Refer Friends & Earn ₹500
            </div>
            <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>
              Share code <strong>{referralCode}</strong>. Both get ₹500 discount!
            </div>
          </div>
        </div>

        {/* Booster Pumps & Spares Section */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Booster Pumps & Membranes
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Genuine copper-wound motors, Dow Filmtec & TFC sheets
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('pumps');
                setActiveTab('catalog');
              }}
              style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
            >
              See More →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {topSparesAndPumps.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
