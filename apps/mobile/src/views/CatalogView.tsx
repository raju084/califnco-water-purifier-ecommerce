import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, ProductCategory } from '@shared/index';
import { Search, SlidersHorizontal } from 'lucide-react';

export const CatalogView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, userRole } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All (52)' },
    { id: 'purifiers', label: 'Purifiers (12)' },
    { id: 'dispensers', label: 'Dispensers (10)' },
    { id: 'pumps', label: 'Pumps (10)' },
    { id: 'filters', label: 'Filters (10)' },
    { id: 'spares', label: 'Spares (10)' }
  ];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priceA = userRole === 'dealer' ? a.wholesalePrice : a.retailPrice;
    const priceB = userRole === 'dealer' ? b.wholesalePrice : b.retailPrice;
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div style={{ paddingBottom: '30px' }}>
      {/* Search Header */}
      <div style={{ padding: '14px 18px 8px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} color="var(--text-light)" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Search 50+ purifiers, pumps, filters..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-app)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-pills-row">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort & Results Bar */}
      <div style={{ padding: '6px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredProducts.length}</strong> products
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SlidersHorizontal size={14} color="var(--text-muted)" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>No products match your criteria</div>
            <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>Try searching for "pump", "membrane", or "dispenser"</div>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
