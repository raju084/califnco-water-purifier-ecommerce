import { Order, ServiceTicket } from '@shared/index';

export interface SMSAlert {
  id: string;
  to: string;
  senderId: string;
  message: string;
  type: 'order' | 'service' | 'dealer' | 'promo';
  status: 'delivered' | 'sent';
  timestamp: string;
}

export interface EmailNotification {
  id: string;
  to: string;
  from: string;
  subject: string;
  htmlContent: string;
  type: 'order_invoice' | 'service_confirmation' | 'dealer_welcome' | 'promo';
  status: 'delivered';
  timestamp: string;
}

const SMS_STORAGE_KEY = 'califnco_sms_logs';
const EMAIL_STORAGE_KEY = 'califnco_email_logs';

export const getStoredSMS = (): SMSAlert[] => {
  try {
    const data = localStorage.getItem(SMS_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'sms-init-1',
      to: '+91 98765 43210',
      senderId: 'CALFNC',
      message: 'CALIFNCO: Welcome to Califnco Water Solutions! Use code PUREWATER500 for flat Rs 500 off on your first RO Purifier order. califnco.com',
      type: 'promo',
      status: 'delivered',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ];
};

export const getStoredEmails = (): EmailNotification[] => {
  try {
    const data = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'email-init-1',
      to: 'vikram.sharma@example.com',
      from: 'welcome@califnco.com',
      subject: '🌟 Welcome to Califnco Water Purifiers & Spares',
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 580px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0284c7; margin-bottom: 8px;">Welcome to Califnco! 🚰</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.5;">
            Thank you for choosing Califnco for your family's daily pure water needs. You now have access to 52+ commercial water purifiers, RO booster pumps, membrane replacements, and zero-downtime doorstep technician services.
          </p>
          <div style="background: #f0fdf4; border: 1px dashed #22c55e; border-radius: 6px; padding: 12px; margin: 16px 0; text-align: center;">
            <span style="font-size: 12px; color: #166534; font-weight: bold;">YOUR WELCOME COUPON:</span><br/>
            <strong style="font-size: 18px; color: #15803d; letter-spacing: 1px;">PUREWATER500</strong>
          </div>
          <p style="color: #64748b; font-size: 12px;">Califnco Water Technologies India Pvt Ltd.</p>
        </div>
      `,
      type: 'promo',
      status: 'delivered',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ];
};

export const saveSMSLog = (sms: SMSAlert) => {
  const current = getStoredSMS();
  const updated = [sms, ...current];
  localStorage.setItem(SMS_STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
};

export const saveEmailLog = (email: EmailNotification) => {
  const current = getStoredEmails();
  const updated = [email, ...current];
  localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
};

/**
 * Dispatches Order Confirmation SMS & Tax Invoice Email
 */
export const dispatchOrderNotifications = (order: Order): { sms: SMSAlert; email: EmailNotification } => {
  // 1. Telecom DLT Compliant SMS Alert
  const sms: SMSAlert = {
    id: `sms-${Date.now()}`,
    to: order.shippingAddress.phone || '+91 98765 43210',
    senderId: 'CALFNC',
    message: `CALIFNCO: Order #${order.orderNumber} for Rs.${order.total.toLocaleString('en-IN')} confirmed! Courier partner: BlueDart (AWB: ${order.trackingNumber}). Delivery expected in 2-3 business days. Toll-free: 1800-CALIFNCO.`,
    type: 'order',
    status: 'delivered',
    timestamp: new Date().toISOString()
  };
  saveSMSLog(sms);

  // 2. High Polish HTML Order Invoice Email
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px;">${item.productName}</td>
      <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; text-align: right;">₹${item.unitPrice.toLocaleString('en-IN')}</td>
      <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; text-align: right; font-weight: bold;">₹${item.totalPrice.toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  const email: EmailNotification = {
    id: `email-${Date.now()}`,
    to: order.userEmail || 'customer@califnco.com',
    from: 'orders@califnco.com',
    subject: `🧾 Order Confirmed #${order.orderNumber} — Califnco Water Purifiers`,
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 24px; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">Califnco Water Technologies</h1>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Official Tax Invoice & Order Confirmation</p>
        </div>

        <div style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
              <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Order Reference</p>
              <h2 style="margin: 2px 0 0; font-size: 18px; color: #0f172a; font-family: monospace;">${order.orderNumber}</h2>
              <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Date: ${new Date().toLocaleDateString('en-IN')}</p>
            </div>
            <div style="text-align: right;">
              <span style="background: #e0f2fe; color: #0284c7; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                ✓ Payment Verified (${order.paymentMethod.toUpperCase()})
              </span>
              <p style="margin: 4px 0 0; font-size: 11px; color: #64748b; font-family: monospace;">Ref: ${order.paymentId}</p>
            </div>
          </div>

          <div style="background: #f8fafc; border-radius: 8px; padding: 14px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 6px; font-size: 12px; color: #64748b; font-weight: bold; text-transform: uppercase;">Shipping To</p>
            <p style="margin: 0; font-size: 13px; font-weight: bold; color: #1e293b;">${order.shippingAddress.fullName}</p>
            <p style="margin: 2px 0 0; font-size: 12px; color: #475569;">${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
            <p style="margin: 2px 0 0; font-size: 12px; color: #475569;">📞 ${order.shippingAddress.phone}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #f1f5f9; text-align: left; font-size: 12px; color: #475569;">
                <th style="padding: 10px; border-top-left-radius: 6px; border-bottom-left-radius: 6px;">Item Description</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Unit Price</th>
                <th style="padding: 10px; text-align: right; border-top-right-radius: 6px; border-bottom-right-radius: 6px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="border-top: 2px solid #e2e8f0; padding-top: 12px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 13px; color: #64748b;">
              <span>Subtotal:</span>
              <span>₹${order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            ${order.discount ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 13px; color: #15803d; font-weight: bold;">
                <span>Discount / Promo:</span>
                <span>- ₹${order.discount.toLocaleString('en-IN')}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #64748b;">
              <span>GST (18% Included):</span>
              <span>₹${order.tax.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #0f172a; border-top: 1px dashed #cbd5e1; padding-top: 8px;">
              <span>Grand Total:</span>
              <span style="color: #0284c7;">₹${order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div style="background: #ecfeff; border-left: 4px solid #06b6d4; padding: 12px; border-radius: 4px;">
            <p style="margin: 0; font-size: 12px; color: #0e7490; font-weight: bold;">🚚 Free Express Shipping & Standard Doorstep Installation</p>
            <p style="margin: 2px 0 0; font-size: 11px; color: #155e75;">BlueDart Courier AWB: ${order.trackingNumber}. A Califnco service partner will visit within 24 hours of delivery for free mounting & water TDS calibration.</p>
          </div>
        </div>

        <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">Califnco Water Technologies India Pvt Ltd. • 24/7 Support: 1800-CALIFNCO • support@califnco.com</p>
        </div>
      </div>
    `,
    type: 'order_invoice',
    status: 'delivered',
    timestamp: new Date().toISOString()
  };
  saveEmailLog(email);

  return { sms, email };
};

/**
 * Dispatches Doorstep Service Ticket SMS & Email confirmation
 */
export const dispatchServiceNotifications = (ticket: ServiceTicket): { sms: SMSAlert; email: EmailNotification } => {
  const sms: SMSAlert = {
    id: `sms-${Date.now()}`,
    to: ticket.phone || '+91 98765 43210',
    senderId: 'CALFNC',
    message: `CALIFNCO: Service Ticket #${ticket.ticketNumber} for ${ticket.serviceType} booked for ${ticket.preferredDate} (${ticket.timeSlot}). Califnco verified technician will call before arrival. Help: 1800-CALIFNCO.`,
    type: 'service',
    status: 'delivered',
    timestamp: new Date().toISOString()
  };
  saveSMSLog(sms);

  const email: EmailNotification = {
    id: `email-${Date.now()}`,
    to: ticket.userEmail || 'customer@califnco.com',
    from: 'service@califnco.com',
    subject: `🔧 Doorstep Service Booked #${ticket.ticketNumber} — Califnco`,
    htmlContent: `
      <div style="font-family: sans-serif; max-width: 580px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0284c7; margin-top: 0;">Doorstep Service Appointment Confirmed 🚰</h2>
        <p style="font-size: 14px; color: #475569;">
          Your service request for <strong>${ticket.purifierModel}</strong> has been logged into the Califnco Field Service dispatch grid.
        </p>
        <div style="background: #f8fafc; border-radius: 6px; padding: 14px; margin: 16px 0; border: 1px solid #e2e8f0; font-size: 13px;">
          <p style="margin: 0 0 6px;"><strong>Ticket Number:</strong> <span style="font-family: monospace; color: #0284c7;">${ticket.ticketNumber}</span></p>
          <p style="margin: 0 0 6px;"><strong>Service Type:</strong> ${ticket.serviceType}</p>
          <p style="margin: 0 0 6px;"><strong>Preferred Date:</strong> ${ticket.preferredDate}</p>
          <p style="margin: 0 0 6px;"><strong>Time Window:</strong> ${ticket.timeSlot}</p>
          <p style="margin: 0;"><strong>Address:</strong> ${ticket.address.street}, ${ticket.address.city}</p>
        </div>
        <p style="font-size: 12px; color: #64748b;">
          A Califnco technician carrying certified Califnco ID and TDS calibration equipment will arrive during your chosen time slot.
        </p>
      </div>
    `,
    type: 'service_confirmation',
    status: 'delivered',
    timestamp: new Date().toISOString()
  };
  saveEmailLog(email);

  return { sms, email };
};

/**
 * Dispatches Login or Create Account confirmation SMS & Email
 */
export const dispatchAuthNotifications = (
  name: string,
  phone: string,
  email: string,
  actionType: 'login' | 'register'
): { sms: SMSAlert; email: EmailNotification } => {
  const cleanPhone = phone.trim();
  const cleanEmail = email.trim();

  // 1. Telecom DLT Compliant SMS Alert
  const sms: SMSAlert = {
    id: `sms-auth-${Date.now()}`,
    to: cleanPhone,
    senderId: 'CALFNC',
    message: actionType === 'register'
      ? `CALIFNCO: Welcome ${name}! Your account is registered with ${cleanPhone}. Use coupon code PUREWATER500 for flat Rs.500 off. Toll-free: 1800-CALIFNCO.`
      : `CALIFNCO: Hello ${name}! Login confirmed from mobile ${cleanPhone}. Your account is active. Toll-free: 1800-CALIFNCO.`,
    type: 'promo',
    status: 'delivered',
    timestamp: new Date().toISOString()
  };
  saveSMSLog(sms);

  // 2. Personalized HTML Email Alert
  const emailNotif: EmailNotification = {
    id: `email-auth-${Date.now()}`,
    to: cleanEmail,
    from: 'accounts@califnco.com',
    subject: actionType === 'register'
      ? `🎉 Welcome to Califnco Water Solutions, ${name}!`
      : `🔐 Security Alert: Successful Login to Califnco — ${name}`,
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 18px; border-radius: 8px; color: #ffffff; margin-bottom: 16px;">
          <h2 style="margin: 0; font-size: 18px;">${actionType === 'register' ? 'Welcome to Califnco! 🚰' : 'Account Login Confirmed 🔐'}</h2>
          <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Smart Water Purifiers & Commercial Spares</p>
        </div>

        <p style="font-size: 14px; color: #334155; line-height: 1.5;">
          Hello <strong>${name}</strong>, your account profile has been successfully verified and ${actionType === 'register' ? 'registered' : 'logged in'}.
        </p>

        <div style="background: #f8fafc; border-radius: 8px; padding: 14px; margin: 16px 0; border: 1px solid #e2e8f0; font-size: 13px;">
          <p style="margin: 0 0 6px;"><strong>Account Name:</strong> ${name}</p>
          <p style="margin: 0 0 6px;"><strong>Registered Mobile:</strong> <span style="font-family: monospace; color: #0284c7;">${cleanPhone}</span></p>
          <p style="margin: 0;"><strong>Registered Email:</strong> <span style="font-family: monospace; color: #0284c7;">${cleanEmail}</span></p>
        </div>

        <div style="background: #f0fdf4; border: 1px dashed #22c55e; border-radius: 8px; padding: 14px; margin: 16px 0; text-align: center;">
          <span style="font-size: 12px; color: #166534; font-weight: bold; text-transform: uppercase;">Your Welcome Offer Code:</span><br/>
          <strong style="font-size: 20px; color: #15803d; letter-spacing: 2px;">PUREWATER500</strong>
          <p style="margin: 4px 0 0; font-size: 11px; color: #166534;">Apply at checkout for flat ₹500 discount on any RO purifier.</p>
        </div>

        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 20px;">
          Califnco Water Technologies India Pvt Ltd. • 24/7 Helpline: 1800-CALIFNCO • support@califnco.com
        </p>
      </div>
    `,
    type: 'promo',
    status: 'delivered',
    timestamp: new Date().toISOString()
  };
  saveEmailLog(emailNotif);

  return { sms, email: emailNotif };
};
