import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, Tag, MapPin, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { RazorpayModal } from '../components/RazorpayModal';
import { AddressMapModal } from '../components/AddressMapModal';

export const CartView: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartWholesaleSavings,
    userRole,
    dealerStatus,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    userAddress,
    createOrder,
    setActiveTab
  } = useApp();

  const [couponInput, setCouponInput] = useState<string>('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);

  const gstAmount = Math.round((cartSubtotal - discountAmount) * 0.18);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + gstAmount);

  const handleApplyCoupon = () => {
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setIsRazorpayOpen(false);
    const order = createOrder({
      paymentMethod: 'razorpay',
      paymentId
    });
    setPlacedOrderNumber(order.orderNumber);
  };

  if (placedOrderNumber) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: '#d1fae5',
          color: '#059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          margin: '0 auto 16px'
        }}>
          ✓
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
          Payment & Order Confirmed!
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Thank you for choosing Califnco. Your order has been placed in Razorpay Test Mode.
        </p>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          marginBottom: '20px',
          textAlign: 'left',
          fontSize: '0.825rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Order Number:</span>
            <span style={{ fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary)' }}>
              {placedOrderNumber}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Delivering To:</span>
            <span style={{ fontWeight: 600 }}>{userAddress.city}, {userAddress.state}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Est. Delivery:</span>
            <span style={{ fontWeight: 600, color: '#10b981' }}>2-3 Business Days</span>
          </div>
        </div>

        <button
          onClick={() => {
            setPlacedOrderNumber(null);
            setActiveTab('orders');
          }}
          className="btn-mobile btn-mobile-primary"
        >
          Track in Order History →
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛒</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Your Cart is Empty
        </h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: '20px' }}>
          Browse our catalog of 50+ domestic water purifiers, commercial dispensers, and genuine RO components.
        </p>
        <button
          onClick={() => setActiveTab('catalog')}
          className="btn-mobile btn-mobile-primary"
          style={{ maxWidth: '240px', margin: '0 auto' }}
        >
          Browse Products →
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 18px 30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
          {userRole === 'dealer' ? 'Wholesale Bulk Cart' : 'Shopping Cart'} ({cart.length})
        </h2>
        <button
          onClick={clearCart}
          style={{ background: 'none', border: 'none', color: '#f43f5e', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {cart.map(item => {
          const isUnderMOQ = userRole === 'dealer' && item.quantity < item.product.minWholesaleQty;
          return (
            <div
              key={item.product.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '12px',
                display: 'flex',
                gap: '12px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }}
              />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3, maxWidth: '170px' }}>
                    {item.product.name}
                  </h4>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: '2px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: userRole === 'dealer' ? '#7e22ce' : 'var(--primary)' }}>
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      ₹{item.unitPrice.toLocaleString('en-IN')} / unit
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--bg-card-subtle)',
                    borderRadius: '20px',
                    padding: '2px 6px',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', padding: '4px' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', padding: '4px' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {isUnderMOQ && (
                  <div style={{ fontSize: '0.68rem', color: '#f43f5e', fontWeight: 600, marginTop: '4px' }}>
                    ⚠️ Minimum wholesale order quantity for this item is {item.product.minWholesaleQty} units.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Address Card with OpenStreetMap Modal Trigger */}
      <div
        onClick={() => setIsAddressModalOpen(true)}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px',
          marginBottom: '16px',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
            <MapPin size={16} color="#0284c7" />
            <span>Delivery Destination (OpenStreetMap)</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
            Change →
          </span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
          {userAddress.street}, {userAddress.city}, {userAddress.state} - {userAddress.pincode}
        </div>
      </div>

      {/* Coupon Box */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
          <Tag size={16} color="#f59e0b" />
          <span>Apply Referral Coupon / Promo Code</span>
        </div>

        {appliedCoupon ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#d1fae5', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 700 }}>
              ✓ Code {appliedCoupon} active (₹{discountAmount} off)
            </span>
            <button
              onClick={removeCoupon}
              style={{ background: 'none', border: 'none', color: '#b91c1c', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="e.g. PUREWATER500"
              value={couponInput}
              onChange={e => setCouponInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-app)',
                color: 'var(--text-main)',
                fontSize: '0.825rem',
                textTransform: 'uppercase'
              }}
            />
            <button
              onClick={handleApplyCoupon}
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Apply
            </button>
          </div>
        )}

        {couponMsg && !appliedCoupon && (
          <div style={{ fontSize: '0.72rem', color: couponMsg.isError ? '#f43f5e' : '#10b981', marginTop: '6px' }}>
            {couponMsg.text}
          </div>
        )}
      </div>

      {/* Bill Breakdown */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        marginBottom: '20px',
        boxShadow: 'var(--shadow-card)',
        fontSize: '0.85rem'
      }}>
        <div style={{ fontWeight: 800, marginBottom: '10px', fontSize: '0.9rem' }}>Price Details</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}>
          <span>Cart Subtotal</span>
          <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
        </div>

        {cartWholesaleSavings > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#7e22ce', fontWeight: 700 }}>
            <span>Dealer Wholesale Benefit</span>
            <span>-₹{cartWholesaleSavings.toLocaleString('en-IN')}</span>
          </div>
        )}

        {discountAmount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#10b981', fontWeight: 700 }}>
            <span>Referral Coupon Discount</span>
            <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-muted)' }}>
          <span>GST (18% Statutory)</span>
          <span>₹{gstAmount.toLocaleString('en-IN')}</span>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '10px',
          fontWeight: 800,
          fontSize: '1.05rem',
          color: 'var(--text-main)'
        }}>
          <span>Total Payable</span>
          <span style={{ color: userRole === 'dealer' ? '#7e22ce' : 'var(--primary)' }}>
            ₹{finalTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => setIsRazorpayOpen(true)}
        className={userRole === 'dealer' ? 'btn-mobile btn-mobile-wholesale' : 'btn-mobile btn-mobile-primary'}
      >
        <span>Proceed to Razorpay (Test Mode)</span>
        <ArrowRight size={18} />
      </button>

      {/* Modals */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={finalTotal}
      />

      <AddressMapModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};
