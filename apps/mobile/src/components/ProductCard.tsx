import React from 'react';
import { Product } from '@shared/index';
import { useApp } from '../context/AppContext';
import { Maximize2, ShoppingCart, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { userRole, dealerStatus, addToCart, setSelectedProductForZoom, cart } = useApp();

  const isDealer = userRole === 'dealer' && dealerStatus === 'approved';
  const displayPrice = isDealer ? product.wholesalePrice : product.retailPrice;
  const originalPrice = product.retailPrice;
  const discountPercent = Math.round(((originalPrice - product.wholesalePrice) / originalPrice) * 100);

  const cartItem = cart.find(i => i.product.id === product.id);
  const inCart = !!cartItem;

  return (
    <div className="product-card">
      {/* Product Image Box */}
      <div style={{ position: 'relative', height: '170px', background: '#e2e8f0', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Zoom Lightbox Trigger */}
        <button
          onClick={() => setSelectedProductForZoom(product)}
          aria-label="Zoom Product"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Maximize2 size={15} />
        </button>

        {/* Category Badge */}
        <span style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '2px 7px',
          borderRadius: '4px',
          textTransform: 'uppercase'
        }}>
          {product.category}
        </span>

        {/* Dealer Wholesale Discount Tag */}
        {isDealer ? (
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#7e22ce',
            color: '#ffffff',
            fontSize: '0.65rem',
            fontWeight: 800,
            padding: '2px 7px',
            borderRadius: '4px'
          }}>
            {discountPercent}% OFF
          </span>
        ) : product.isDailyDeal ? (
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#f43f5e',
            color: '#ffffff',
            fontSize: '0.65rem',
            fontWeight: 800,
            padding: '2px 7px',
            borderRadius: '4px'
          }}>
            DAILY DEAL
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600 }}>{product.brand}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700 }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h4 
          onClick={() => setSelectedProductForZoom(product)}
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1.35,
            marginBottom: '8px',
            minHeight: '34px',
            cursor: 'pointer',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </h4>

        {/* Pricing Box */}
        <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: isDealer ? '#9333ea' : 'var(--primary)'
            }}>
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
            {isDealer && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {isDealer ? (
            <div style={{ fontSize: '0.68rem', color: '#7e22ce', fontWeight: 600, marginTop: '2px' }}>
              Dealer Tier • MOQ: {product.minWholesaleQty} units
            </div>
          ) : (
            <div style={{ fontSize: '0.68rem', color: 'var(--text-light)', marginTop: '2px' }}>
              Free Delivery & Installation
            </div>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product, 1)}
          className="btn-mobile btn-mobile-outline"
          style={{
            padding: '7px 12px',
            fontSize: '0.78rem',
            borderRadius: 'var(--radius-sm)',
            borderColor: inCart ? '#10b981' : (isDealer ? '#d8b4fe' : 'var(--border-color)'),
            background: inCart ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
            color: inCart ? '#10b981' : (isDealer ? '#7e22ce' : 'var(--text-main)')
          }}
        >
          {inCart ? (
            <>
              <Check size={14} color="#10b981" />
              <span>In Cart ({cartItem?.quantity})</span>
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              <span>{isDealer ? `Bulk Add (Min ${product.minWholesaleQty})` : 'Add to Cart'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
