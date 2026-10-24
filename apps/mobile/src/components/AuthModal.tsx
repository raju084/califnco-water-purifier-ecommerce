import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, User, Phone, Mail, MessageCircle, Send, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    loginWithPassword, 
    createAccount, 
    sendOtp, 
    verifyOtpAndLogin, 
    logout,
    userRole,
    pendingCartItem
  } = useApp();

  // Mode: 'login' (Name & Password), 'otp' (WhatsApp/SMS without account), 'register' (New Account)
  const [authMode, setAuthMode] = useState<'login' | 'otp' | 'register'>('otp');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState<string>('vikram.sharma@example.com');
  const [loginPassword, setLoginPassword] = useState<string>('Califnco@2026');

  // OTP state
  const [otpPhone, setOtpPhone] = useState<string>('+91 98765 43210');
  const [otpChannel, setOtpChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [otpStep, setOtpStep] = useState<'input_phone' | 'verify_otp'>('input_phone');
  const [otpError, setOtpError] = useState<string | null>(null);

  // Register state
  const [regName, setRegName] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('+91 ');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regRole, setRegRole] = useState<'customer' | 'dealer'>('customer');
  const [regGst, setRegGst] = useState<string>('');

  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  // Handle Name & Password Login
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setFeedbackMsg({ text: 'Please enter your username/email and password.', type: 'error' });
      return;
    }
    const res = loginWithPassword(loginIdentifier, loginPassword);
    if (res.success) {
      setFeedbackMsg({ text: res.message, type: 'success' });
      setTimeout(() => {
        setFeedbackMsg(null);
        onClose();
      }, 1000);
    } else {
      setFeedbackMsg({ text: res.message, type: 'error' });
    }
  };

  // Handle Send OTP (WhatsApp or SMS without creating an account)
  const handleSendOtp = () => {
    if (!otpPhone.trim() || otpPhone.replace(/\D/g, '').length < 10) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpError(null);
    const res = sendOtp(otpPhone, otpChannel);
    if (res.success) {
      setGeneratedOtp(res.otp);
      setOtpStep('verify_otp');
      setFeedbackMsg({ 
        text: `Code sent via ${otpChannel === 'whatsapp' ? 'WhatsApp' : 'SMS'} to ${otpPhone}`, 
        type: 'success' 
      });
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredOtp.trim()) {
      setOtpError('Please enter the verification code.');
      return;
    }
    const res = verifyOtpAndLogin(otpPhone, enteredOtp.trim());
    if (res.success) {
      setFeedbackMsg({ text: 'Verified successfully! Welcome to Califnco.', type: 'success' });
      setTimeout(() => {
        setFeedbackMsg(null);
        onClose();
      }, 1000);
    } else {
      setOtpError(res.message);
    }
  };

  // Handle Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPassword.trim() || !regPhone.trim()) {
      setFeedbackMsg({ text: 'Please fill in name, phone, and password.', type: 'error' });
      return;
    }
    const res = createAccount(regName, regPhone, regEmail, regPassword, regRole);
    if (res.success) {
      setFeedbackMsg({ text: 'Account registered and logged in!', type: 'success' });
      setTimeout(() => {
        setFeedbackMsg(null);
        onClose();
      }, 1000);
    } else {
      setFeedbackMsg({ text: res.message, type: 'error' });
    }
  };

  return (
    <div className="mobile-modal-backdrop fade-in" onClick={onClose} style={{ zIndex: 120 }}>
      <div 
        className="mobile-modal-sheet slide-up-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '18px'
            }}>
              💧
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {currentUser ? 'User Account' : 'Califnco Login & Access'}
              </h3>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {currentUser ? `Signed in as ${currentUser.displayName}` : 'Password or WhatsApp / SMS Number Login'}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-card-subtle)',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Pending Cart Item Banner if triggered by Add to Cart */}
        {pendingCartItem && (
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <img 
              src={pendingCartItem.product.image} 
              alt={pendingCartItem.product.name}
              style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>
                🛒 Sign in to add this item:
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.25 }}>
                {pendingCartItem.product.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 800 }}>
                ₹{pendingCartItem.product.retailPrice.toLocaleString('en-IN')} (Qty: {pendingCartItem.quantity})
              </div>
            </div>
          </div>
        )}

        {/* If already logged in, show current session info & Logout button */}
        {currentUser ? (
          <div style={{ padding: '10px 0' }}>
            <div style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  {currentUser.displayName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {currentUser.displayName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {currentUser.email || 'No email provided'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                    📞 {currentUser.phone || 'Phone verified'}
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '8px 12px', 
                background: 'var(--bg-app)', 
                borderRadius: '6px',
                fontSize: '0.75rem'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>Account Persona:</span>
                <span style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                setFeedbackMsg({ text: 'Logged out successfully.', type: 'success' });
                setTimeout(() => setFeedbackMsg(null), 1500);
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: '#fee2e2',
                color: '#dc2626',
                border: '1px solid #fca5a5',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Sign Out of Account
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* 3 Authentication Modes Selector */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '4px',
              background: 'var(--bg-card-subtle)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '16px'
            }}>
              <button
                onClick={() => { setAuthMode('otp'); setFeedbackMsg(null); }}
                style={{
                  padding: '8px 4px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: authMode === 'otp' ? 'var(--bg-card)' : 'transparent',
                  color: authMode === 'otp' ? '#16a34a' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  boxShadow: authMode === 'otp' ? 'var(--shadow-card)' : 'none'
                }}
              >
                <MessageCircle size={13} />
                <span>WhatsApp / SMS</span>
              </button>

              <button
                onClick={() => { setAuthMode('login'); setFeedbackMsg(null); }}
                style={{
                  padding: '8px 4px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: authMode === 'login' ? 'var(--bg-card)' : 'transparent',
                  color: authMode === 'login' ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  boxShadow: authMode === 'login' ? 'var(--shadow-card)' : 'none'
                }}
              >
                <Lock size={13} />
                <span>Name & Password</span>
              </button>

              <button
                onClick={() => { setAuthMode('register'); setFeedbackMsg(null); }}
                style={{
                  padding: '8px 4px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: authMode === 'register' ? 'var(--bg-card)' : 'transparent',
                  color: authMode === 'register' ? '#7e22ce' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  boxShadow: authMode === 'register' ? 'var(--shadow-card)' : 'none'
                }}
              >
                <Sparkles size={13} />
                <span>Create Account</span>
              </button>
            </div>

            {/* Feedback Banner */}
            {feedbackMsg && (
              <div style={{
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '14px',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: feedbackMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
                color: feedbackMsg.type === 'success' ? '#15803d' : '#b91c1c',
                border: feedbackMsg.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca'
              }}>
                {feedbackMsg.text}
              </div>
            )}

            {/* TAB 1: NO ACCOUNT? WHATSAPP / SMS OTP NUMBER LOGIN */}
            {authMode === 'otp' && (
              <div>
                <div style={{
                  padding: '12px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 800, fontSize: '0.8rem', marginBottom: '4px' }}>
                    <MessageCircle size={15} />
                    <span>No Account Needed — Instant Login</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#15803d', lineHeight: 1.4 }}>
                    Don't have an account or password? Enter your mobile number to receive a verification code directly via <strong>WhatsApp</strong> or <strong>SMS</strong>.
                  </p>
                </div>

                {otpStep === 'input_phone' ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Mobile / WhatsApp Number
                    </label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                      <input
                        type="tel"
                        value={otpPhone}
                        onChange={e => setOtpPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-app)',
                          color: 'var(--text-main)',
                          fontSize: '0.88rem',
                          fontFamily: 'monospace'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Choose Verification Channel:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setOtpChannel('whatsapp')}
                          style={{
                            padding: '10px',
                            borderRadius: 'var(--radius-md)',
                            border: otpChannel === 'whatsapp' ? '2px solid #25D366' : '1px solid var(--border-color)',
                            background: otpChannel === 'whatsapp' ? '#dcfce7' : 'var(--bg-app)',
                            color: otpChannel === 'whatsapp' ? '#15803d' : 'var(--text-main)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <span style={{ fontSize: '15px' }}>🟢</span>
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setOtpChannel('sms')}
                          style={{
                            padding: '10px',
                            borderRadius: 'var(--radius-md)',
                            border: otpChannel === 'sms' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                            background: otpChannel === 'sms' ? '#e0f2fe' : 'var(--bg-app)',
                            color: otpChannel === 'sms' ? '#0369a1' : 'var(--text-main)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <span style={{ fontSize: '15px' }}>💬</span>
                          <span>SMS Text</span>
                        </button>
                      </div>
                    </div>

                    {otpError && (
                      <div style={{ fontSize: '0.75rem', color: '#dc2626', marginBottom: '12px' }}>
                        ⚠️ {otpError}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: otpChannel === 'whatsapp' 
                          ? 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' 
                          : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Send size={15} />
                      <span>Send Code via {otpChannel === 'whatsapp' ? 'WhatsApp' : 'SMS'}</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtp}>
                    <div style={{
                      background: 'var(--bg-card-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      marginBottom: '14px',
                      fontSize: '0.75rem'
                    }}>
                      <div style={{ color: 'var(--text-muted)' }}>Code dispatched to:</div>
                      <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.88rem' }}>
                        {otpPhone} ({otpChannel === 'whatsapp' ? 'WhatsApp' : 'SMS'})
                      </div>
                    </div>

                    {generatedOtp && (
                      <div style={{
                        padding: '8px 12px',
                        background: '#fef3c7',
                        border: '1px dashed #d97706',
                        borderRadius: '6px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: 600 }}>
                          Test Code: <strong>{generatedOtp}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setEnteredOtp(generatedOtp)}
                          style={{
                            background: '#d97706',
                            color: '#ffffff',
                            border: 'none',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Auto Fill
                        </button>
                      </div>
                    )}

                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Enter 4-Digit Security Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={enteredOtp}
                      onChange={e => setEnteredOtp(e.target.value)}
                      placeholder="••••"
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-app)',
                        color: 'var(--text-main)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        letterSpacing: '0.3em',
                        textAlign: 'center',
                        marginBottom: '12px'
                      }}
                    />

                    {otpError && (
                      <div style={{ fontSize: '0.75rem', color: '#dc2626', marginBottom: '12px' }}>
                        ⚠️ {otpError}
                      </div>
                    )}

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        marginBottom: '8px'
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Verify & Access Account</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpStep('input_phone')}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.72rem',
                        cursor: 'pointer'
                      }}
                    >
                      ← Change Mobile Number
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: NAME & PASSWORD LOGIN */}
            {authMode === 'login' && (
              <form onSubmit={handlePasswordLogin}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    User Name or Email
                  </label>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={e => setLoginIdentifier(e.target.value)}
                    placeholder="Enter name or email"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Account Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '10px'
                  }}
                >
                  <Lock size={15} />
                  <span>Sign In with Password</span>
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setAuthMode('otp')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#16a34a',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Don't have an account? Sign in with WhatsApp or Phone →
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: CREATE ACCOUNT */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    Mobile Number (for SMS & WhatsApp Alerts)
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    Email Address (for Invoices)
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="ramesh@example.com"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    Set Password
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Account Type
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setRegRole('customer')}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border: regRole === 'customer' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                        background: regRole === 'customer' ? '#e0f2fe' : 'var(--bg-app)',
                        color: regRole === 'customer' ? '#0369a1' : 'var(--text-main)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      👤 Retail Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('dealer')}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border: regRole === 'dealer' ? '2px solid #7e22ce' : '1px solid var(--border-color)',
                        background: regRole === 'dealer' ? '#f3e8ff' : 'var(--bg-app)',
                        color: regRole === 'dealer' ? '#7e22ce' : 'var(--text-main)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      🤝 Wholesale Dealer
                    </button>
                  </div>
                </div>

                {regRole === 'dealer' && (
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                      GSTIN (for Wholesale Tax Invoicing)
                    </label>
                    <input
                      type="text"
                      value={regGst}
                      onChange={e => setRegGst(e.target.value)}
                      placeholder="29AAAAA0000A1Z5"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-app)',
                        color: 'var(--text-main)',
                        fontSize: '0.82rem',
                        fontFamily: 'monospace'
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={15} />
                  <span>Create Account & Get ₹500 Bonus</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
