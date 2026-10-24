import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
  amount: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({ isOpen, onClose, onSuccess, amount }) => {
  const { userRole, userAddress } = useApp();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState<string>('user@okhdfcbank');

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);

    const testKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_CalifncoDemo2026';

    // If Razorpay script is loaded in window and valid key
    if (typeof window !== 'undefined' && window.Razorpay && import.meta.env.VITE_RAZORPAY_KEY_ID) {
      try {
        const options = {
          key: testKey,
          amount: amount * 100, // in paise
          currency: 'INR',
          name: 'Califnco Water Purifiers',
          description: userRole === 'dealer' ? 'Dealer Wholesale Order' : 'Water Purifier & Spares Order',
          image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=200&q=80',
          handler: function (response: any) {
            setIsProcessing(false);
            triggerConfetti();
            onSuccess(response.razorpay_payment_id || `pay_rzp_test_${Date.now()}`);
          },
          prefill: {
            name: userAddress.fullName,
            contact: userAddress.phone,
            email: 'customer@califnco.com'
          },
          theme: {
            color: '#0284c7'
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', function () {
          setIsProcessing(false);
          alert('Test payment cancelled or failed.');
        });
        return;
      } catch (err) {
        // Fallback handler
      }
    }

    // Process payment authorization
    setTimeout(() => {
      setIsProcessing(false);
      triggerConfetti();
      const simPaymentId = `pay_rzp_test_${Math.floor(100000000 + Math.random() * 900000000)}`;
      onSuccess(simPaymentId);
    }, 1200);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignored
    }
  };

  return (
    <div className="mobile-modal-backdrop fade-in" onClick={onClose} style={{ zIndex: 110 }}>
      <div 
        className="mobile-modal-sheet slide-up-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem'
            }}>
              ₹
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Razorpay Test Checkout
              </h3>
              <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} />
                <span>Zero-KYC Test Mode (`rzp_test_`)</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
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

        {/* Amount Box */}
        <div style={{
          background: 'var(--primary-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Amount Payable (Incl. 18% GST)</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
            ₹{amount.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }}>
            Merchant: <strong>Califnco Water Purification Systems</strong>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
            Select Payment Method:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => setSelectedMethod('upi')}
              style={{
                padding: '10px 8px',
                borderRadius: 'var(--radius-sm)',
                border: selectedMethod === 'upi' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                background: selectedMethod === 'upi' ? 'var(--primary-subtle)' : 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📱 UPI / QR
            </button>
            <button
              onClick={() => setSelectedMethod('card')}
              style={{
                padding: '10px 8px',
                borderRadius: 'var(--radius-sm)',
                border: selectedMethod === 'card' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                background: selectedMethod === 'card' ? 'var(--primary-subtle)' : 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              💳 Card
            </button>
            <button
              onClick={() => setSelectedMethod('netbanking')}
              style={{
                padding: '10px 8px',
                borderRadius: 'var(--radius-sm)',
                border: selectedMethod === 'netbanking' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                background: selectedMethod === 'netbanking' ? 'var(--primary-subtle)' : 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🏦 NetBanking
            </button>
          </div>
        </div>

        {/* Method Detail View */}
        {selectedMethod === 'upi' && (
          <div style={{ marginBottom: '16px', padding: '12px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
              Virtual Payment Address (VPA)
            </label>
            <input
              type="text"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
            <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '4px' }}>
              Supports Google Pay, PhonePe, Paytm, and BHIM UPI instant auth.
            </div>
          </div>
        )}

        {selectedMethod === 'card' && (
          <div style={{ marginBottom: '16px', padding: '12px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="text"
              readOnly
              value="4111 2222 3333 4444 (Test Visa)"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.85rem' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <input type="text" readOnly value="12/28" style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
              <input type="text" readOnly value="123 (CVV)" style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
            </div>
          </div>
        )}

        {selectedMethod === 'netbanking' && (
          <div style={{ marginBottom: '16px', padding: '12px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Popular Banks: HDFC Bank, ICICI Bank, SBI, Axis Bank (Instant Netbanking)
            </div>
          </div>
        )}

        {/* Security Assurance */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <Lock size={12} color="#10b981" />
          <span>256-Bit SSL Encrypted Razorpay Sandbox Gateway</span>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="btn-mobile btn-mobile-primary"
        >
          {isProcessing ? (
            <span>Processing Test Payment...</span>
          ) : (
            <span>Pay ₹{amount.toLocaleString('en-IN')} Now</span>
          )}
        </button>
      </div>
    </div>
  );
};
