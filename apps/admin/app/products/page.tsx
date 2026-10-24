'use client';

import { useState } from 'react';
import { PRODUCTS } from '../../../../packages/shared';

export default function AdminProductsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Master Product Catalog (50+ Items)</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
            Comprehensive inventory of domestic purifiers, commercial dispensers, booster pumps, membranes, and spares.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-delivered" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            Total Items: {PRODUCTS.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products by model, brand, stage..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="status-tabs">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'purifiers', label: 'RO Purifiers' },
            { id: 'dispensers', label: 'Dispensers' },
            { id: 'pumps', label: 'Booster Pumps' },
            { id: 'filters', label: 'Membranes & Filters' },
            { id: 'spares', label: 'Spare Parts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`status-tab ${selectedCategory === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map(product => {
          const discountPercent = Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100);
          return (
            <div
              key={product.id}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '180px', background: '#f1f5f9' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  {product.category}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#10b981',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {discountPercent}% Wholesale Margin
                </span>
              </div>

              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontWeight: 600 }}>{product.brand}</span>
                  <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 600 }}>★ {product.rating} ({product.reviewsCount})</span>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '8px', minHeight: '38px' }}>
                  {product.name}
                </h3>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px', flex: 1, lineHeight: 1.4 }}>
                  {product.description}
                </p>

                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer Retail:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      ₹{product.retailPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#7e22ce', fontWeight: 600 }}>Dealer Wholesale:</span>
                    <span style={{ fontWeight: 800, color: '#7e22ce', fontSize: '1rem' }}>
                      ₹{product.wholesalePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)', marginTop: '2px', textAlign: 'right' }}>
                    MOQ: {product.minWholesaleQty} units
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                  <span style={{ color: product.inStock ? '#047857' : '#be123c', fontWeight: 600 }}>
                    ● {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
                  </span>
                  <span style={{ color: 'var(--text-sub)', fontFamily: 'JetBrains Mono, monospace' }}>
                    SKU: {product.id}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
