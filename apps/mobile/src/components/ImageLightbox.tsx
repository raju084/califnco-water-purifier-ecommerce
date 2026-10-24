import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ZoomIn, ZoomOut, RotateCcw, CheckCircle, ShieldCheck } from 'lucide-react';

export const ImageLightbox: React.FC = () => {
  const { selectedProductForZoom, setSelectedProductForZoom, addToCart, userRole } = useApp();
  const [scale, setScale] = useState<number>(1);

  if (!selectedProductForZoom) return null;

  const product = selectedProductForZoom;

  const zoomIn = () => setScale(prev => Math.min(prev + 0.35, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.35, 1));
  const resetZoom = () => setScale(1);

  return (
    <div 
      className="mobile-modal-backdrop fade-in"
      onClick={() => setSelectedProductForZoom(null)}
      style={{ zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div 
        className="slide-up-modal"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '420px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              {product.brand} • {product.category}
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.name}
            </div>
          </div>
          <button
            onClick={() => setSelectedProductForZoom(null)}
            style={{
              background: 'var(--bg-card-subtle)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Zoom Area */}
        <div style={{
          position: 'relative',
          background: '#090d16',
          height: '260px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              transform: `scale(${scale})`,
              transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              cursor: scale > 1 ? 'grab' : 'zoom-in'
            }}
            onClick={() => (scale === 1 ? setScale(1.8) : setScale(1))}
          />

          {/* Floating Zoom Controls */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <button onClick={zoomOut} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}>
              <ZoomOut size={16} />
            </button>
            <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}>
              <ZoomIn size={16} />
            </button>
            {scale !== 1 && (
              <button onClick={resetZoom} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: '4px' }}>
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Specifications & Details */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: userRole === 'dealer' ? '#9333ea' : 'var(--primary)' }}>
                ₹{(userRole === 'dealer' ? product.wholesalePrice : product.retailPrice).toLocaleString('en-IN')}
              </span>
              {userRole === 'dealer' && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '8px' }}>
                  ₹{product.retailPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
              ★ {product.rating} ({product.reviewsCount} verified reviews)
            </span>
          </div>

          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '14px' }}>
            {product.description}
          </p>

          {/* Features */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Key Highlights:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {product.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={13} color="#10b981" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specs Table */}
          <div style={{ background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: '0.78rem' }}>
            {product.specs.capacity && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>Capacity:</span>
                <span style={{ fontWeight: 600 }}>{product.specs.capacity}</span>
              </div>
            )}
            {product.specs.filtrationStages && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>Filtration Stages:</span>
                <span style={{ fontWeight: 600 }}>{product.specs.filtrationStages} Stages</span>
              </div>
            )}
            {product.specs.tdsLimit && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>TDS Suitability:</span>
                <span style={{ fontWeight: 600 }}>{product.specs.tdsLimit}</span>
              </div>
            )}
            {product.specs.warranty && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>Warranty:</span>
                <span style={{ fontWeight: 600 }}>{product.specs.warranty}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              addToCart(product, 1);
              setSelectedProductForZoom(null);
            }}
            className={userRole === 'dealer' ? 'btn-mobile btn-mobile-wholesale' : 'btn-mobile btn-mobile-primary'}
          >
            {userRole === 'dealer' ? `Add to Wholesale Bulk Order (MOQ ${product.minWholesaleQty})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
