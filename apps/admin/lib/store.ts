import { Order, ServiceTicket, UserProfile, PRODUCTS } from '../../../packages/shared';

// Pre-seeded initial data so Admin Panel looks alive and fully populated on first launch
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'CAL-2026-8901',
    userId: 'cust-401',
    userEmail: 'rohit.sharma@example.com',
    customerName: 'Rohit Sharma',
    userRole: 'customer',
    items: [
      {
        productId: 'purifier-01',
        productName: 'Califnco AquaShield Elite RO+UV+UF+TDS Controller',
        quantity: 1,
        unitPrice: 16999,
        totalPrice: 16999,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'spare-02',
        productName: 'Califnco Digital Handheld TDS & Temperature Meter',
        quantity: 1,
        unitPrice: 699,
        totalPrice: 699,
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 17698,
    discount: 500,
    tax: 3095,
    total: 20293,
    status: 'processing',
    paymentMethod: 'razorpay',
    paymentId: 'pay_rzp_test_983274291',
    shippingAddress: {
      fullName: 'Rohit Sharma',
      phone: '+91 98765 43210',
      street: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103'
    },
    trackingNumber: 'DELHIVERY-BLR-9021',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'ord-1002',
    orderNumber: 'CAL-2026-8902',
    userId: 'dealer-702',
    userEmail: 'watertech.enterprises@gmail.com',
    customerName: 'Anil Gupta (WaterTech Solutions)',
    userRole: 'dealer',
    items: [
      {
        productId: 'pump-01',
        productName: 'Califnco 100 GPD Heavy-Duty RO Booster Pump (24V DC)',
        quantity: 10,
        unitPrice: 1150,
        totalPrice: 11500,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'filter-01',
        productName: 'Califnco 80 GPD Thin Film Composite (TFC) RO Membrane',
        quantity: 15,
        unitPrice: 950,
        totalPrice: 14250,
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'spare-01',
        productName: 'Califnco Brass Heavy-Duty Solenoid Valve 24V DC',
        quantity: 20,
        unitPrice: 240,
        totalPrice: 4800,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 30550,
    discount: 1500,
    tax: 5229,
    total: 34279,
    status: 'pending',
    paymentMethod: 'dealer_credit',
    paymentId: 'PO-CR-7829',
    shippingAddress: {
      fullName: 'WaterTech Solutions Warehouse',
      phone: '+91 91234 56789',
      street: 'Plot 18, Phase 2 Industrial Area, Peenya',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560058'
    },
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'ord-1003',
    orderNumber: 'CAL-2026-8898',
    userId: 'cust-405',
    userEmail: 'priya.nair@outlook.com',
    customerName: 'Priya Nair',
    userRole: 'customer',
    items: [
      {
        productId: 'dispenser-01',
        productName: 'Califnco Smart Touch Hot & Cold RO Water Dispenser',
        quantity: 1,
        unitPrice: 24999,
        totalPrice: 24999,
        image: 'https://images.unsplash.com/photo-1517646287270-a5a9ec602e5b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 24999,
    discount: 1000,
    tax: 4319,
    total: 28318,
    status: 'dispatched',
    paymentMethod: 'razorpay',
    paymentId: 'pay_rzp_test_481092182',
    shippingAddress: {
      fullName: 'Priya Nair',
      phone: '+91 99887 76655',
      street: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066'
    },
    trackingNumber: 'BLUEDART-WY-5541',
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'ord-1004',
    orderNumber: 'CAL-2026-8885',
    userId: 'cust-408',
    userEmail: 'vikram.singh@gmail.com',
    customerName: 'Vikram Singh',
    userRole: 'customer',
    items: [
      {
        productId: 'filter-07',
        productName: 'Califnco Complete Annual RO Service Filter Replacement Kit',
        quantity: 1,
        unitPrice: 2999,
        totalPrice: 2999,
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 2999,
    discount: 0,
    tax: 539,
    total: 3538,
    status: 'delivered',
    paymentMethod: 'cod',
    shippingAddress: {
      fullName: 'Vikram Singh',
      phone: '+91 94432 11009',
      street: '14/B, Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034'
    },
    trackingNumber: 'DELHIVERY-BLR-8109',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export const INITIAL_DEALERS: UserProfile[] = [
  {
    uid: 'dealer-701',
    email: 'apex.purifiers@gmail.com',
    displayName: 'Kavitha Ramesh',
    companyName: 'Apex Water Purification Tech',
    gstNumber: '29ABCDE1234F1Z5',
    phone: '+91 98450 12345',
    role: 'dealer',
    dealerStatus: 'approved',
    address: {
      fullName: 'Apex Water Systems',
      phone: '+91 98450 12345',
      street: 'Shop 4, Commercial Street',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001'
    },
    createdAt: '2026-09-15T10:00:00.000Z'
  },
  {
    uid: 'dealer-702',
    email: 'watertech.enterprises@gmail.com',
    displayName: 'Anil Gupta',
    companyName: 'WaterTech Solutions & Spares',
    gstNumber: '29PQRSX9876K2Z1',
    phone: '+91 91234 56789',
    role: 'dealer',
    dealerStatus: 'approved',
    address: {
      fullName: 'WaterTech Solutions',
      phone: '+91 91234 56789',
      street: 'Plot 18, Phase 2 Industrial Area, Peenya',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560058'
    },
    createdAt: '2026-10-01T14:30:00.000Z'
  },
  {
    uid: 'dealer-703',
    email: 'shree.jal.infra@yahoo.com',
    displayName: 'Suresh Patel',
    companyName: 'Shree Jal Infrastructure Pvt Ltd',
    gstNumber: '24AAACT1029L1ZA',
    phone: '+91 98251 77890',
    role: 'dealer',
    dealerStatus: 'pending',
    address: {
      fullName: 'Shree Jal Infrastructure',
      phone: '+91 98251 77890',
      street: 'GIDC Estate, Odhav',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382415'
    },
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    uid: 'dealer-704',
    email: 'delhi.ro.mart@gmail.com',
    displayName: 'Manish Verma',
    companyName: 'Delhi RO Component Mart',
    gstNumber: '07BBBBB4321M1Z8',
    phone: '+91 99110 54321',
    role: 'dealer',
    dealerStatus: 'pending',
    address: {
      fullName: 'Delhi RO Mart',
      phone: '+91 99110 54321',
      street: 'Bhagirath Palace, Chandni Chowk',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110006'
    },
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

export const INITIAL_SERVICE_TICKETS: ServiceTicket[] = [
  {
    id: 'srv-3001',
    ticketNumber: 'SRV-2026-441',
    userId: 'cust-401',
    customerName: 'Rohit Sharma',
    userEmail: 'rohit.sharma@example.com',
    phone: '+91 98765 43210',
    serviceType: 'Installation',
    purifierModel: 'Califnco AquaShield Elite RO+UV',
    preferredDate: '2026-10-24',
    timeSlot: '10:00 AM - 01:00 PM',
    address: {
      fullName: 'Rohit Sharma',
      phone: '+91 98765 43210',
      street: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103'
    },
    notes: 'New kitchen sink installation. Please bring 1/4" diverter brass valve adapter.',
    status: 'assigned',
    assignedTechnician: 'Ramesh Kumar (Tech #104)',
    technicianPhone: '+91 98800 11223',
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'srv-3002',
    ticketNumber: 'SRV-2026-442',
    userId: 'cust-412',
    customerName: 'Meera Iyer',
    userEmail: 'meera.iyer@gmail.com',
    phone: '+91 97411 22334',
    serviceType: 'Filter Replacement',
    purifierModel: 'Califnco Copper Smart RO',
    preferredDate: '2026-10-25',
    timeSlot: '02:00 PM - 05:00 PM',
    address: {
      fullName: 'Meera Iyer',
      phone: '+91 97411 22334',
      street: '22, 1st Cross, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    notes: 'Red filter alert buzzer beeping. TDS input is high.',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'srv-3003',
    ticketNumber: 'SRV-2026-440',
    userId: 'cust-415',
    customerName: 'Deepak Rao',
    userEmail: 'deepak.rao@corp.in',
    phone: '+91 96200 99887',
    serviceType: 'Leakage Repair',
    purifierModel: 'Califnco HydroPure Under-Sink',
    preferredDate: '2026-10-23',
    timeSlot: '04:00 PM - 07:00 PM',
    address: {
      fullName: 'Deepak Rao',
      phone: '+91 96200 99887',
      street: 'B-304, Prestige Shantiniketan, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560048'
    },
    notes: 'Urgent: Water dripping steadily from pre-filter housing bowl elbow connector.',
    status: 'in_progress',
    assignedTechnician: 'Ganesh M (Senior Specialist)',
    technicianPhone: '+91 97400 33445',
    createdAt: new Date(Date.now() - 3600000 * 16).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];

// Local storage key constants for browser client state
export const STORAGE_KEYS = {
  ORDERS: 'califnco_admin_orders',
  DEALERS: 'califnco_admin_dealers',
  SERVICES: 'califnco_admin_services'
};

export const getStoredOrders = (): Order[] => {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_ORDERS;
  }
};

export const saveStoredOrders = (orders: Order[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const getStoredDealers = (): UserProfile[] => {
  if (typeof window === 'undefined') return INITIAL_DEALERS;
  const stored = localStorage.getItem(STORAGE_KEYS.DEALERS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.DEALERS, JSON.stringify(INITIAL_DEALERS));
    return INITIAL_DEALERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEALERS;
  }
};

export const saveStoredDealers = (dealers: UserProfile[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.DEALERS, JSON.stringify(dealers));
};

export const getStoredServices = (): ServiceTicket[] => {
  if (typeof window === 'undefined') return INITIAL_SERVICE_TICKETS;
  const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICE_TICKETS));
    return INITIAL_SERVICE_TICKETS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_SERVICE_TICKETS;
  }
};

export const saveStoredServices = (services: ServiceTicket[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
};
