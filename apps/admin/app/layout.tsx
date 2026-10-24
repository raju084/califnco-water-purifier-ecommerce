import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Califnco Admin | Water Purifier Enterprise Portal',
  description: 'Enterprise Order Management, Dealer Verification, and Service Desk for Califnco Water Purifiers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}>
                C
              </div>
              <div className="logo-text">
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0f172a', letterSpacing: '-0.02em' }}>Califnco</div>
                <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>WATER PURIFIERS</div>
              </div>
            </div>

            <nav style={{ padding: '16px 0', flex: 1 }}>
              <div style={{ padding: '8px 24px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Management
              </div>
              <Link href="/" className="nav-item">
                <span style={{ fontSize: '1.1rem' }}>📊</span>
                <span className="nav-label">Dashboard</span>
              </Link>
              <Link href="/orders" className="nav-item">
                <span style={{ fontSize: '1.1rem' }}>📦</span>
                <span className="nav-label">Orders</span>
              </Link>
              <Link href="/dealers" className="nav-item">
                <span style={{ fontSize: '1.1rem' }}>🤝</span>
                <span className="nav-label">Dealer Approvals</span>
              </Link>
              <Link href="/services" className="nav-item">
                <span style={{ fontSize: '1.1rem' }}>🔧</span>
                <span className="nav-label">Service Desk</span>
              </Link>
              <Link href="/products" className="nav-item">
                <span style={{ fontSize: '1.1rem' }}>💧</span>
                <span className="nav-label">50+ Products</span>
              </Link>
            </nav>

            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  AD
                </div>
                <div className="user-info">
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Admin Control</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                    Live Vercel Ready
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Area */}
          <div className="main-content">
            <header className="glass-header" style={{ height: '70px', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Califnco Enterprise Cloud</span>
                <span style={{ color: 'var(--border-light)' }}>/</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>Admin Operations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="badge badge-delivered" style={{ fontSize: '0.75rem', padding: '5px 12px' }}>
                  Firebase Sync Active
                </span>
                <a 
                  href="https://vercel.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  🚀 Deploy on Vercel
                </a>
              </div>
            </header>

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
