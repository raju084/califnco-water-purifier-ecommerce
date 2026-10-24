export type ProductCategory = 
  | 'purifiers' 
  | 'dispensers' 
  | 'pumps' 
  | 'filters' 
  | 'spares';

export interface ProductSpecs {
  capacity?: string;
  filtrationStages?: number;
  tdsLimit?: string;
  powerConsumption?: string;
  warranty?: string;
  flowRate?: string;
  voltage?: string;
  membraneType?: string;
  dimensions?: string;
  weight?: string;
  pressure?: string;
  accuracy?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  retailPrice: number;        // Customer Price (INR)
  wholesalePrice: number;     // Dealer Price (INR, typically 30-40% lower)
  minWholesaleQty: number;    // Minimum order quantity for wholesale pricing
  rating: number;             // e.g. 4.8
  reviewsCount: number;
  image: string;              // Primary clean realistic image
  additionalImages?: string[];
  description: string;
  features: string[];
  specs: ProductSpecs;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isDailyDeal?: boolean;
}

export type UserRole = 'customer' | 'dealer' | 'admin';

export type DealerStatus = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  address?: Address;
  dealerStatus?: DealerStatus;
  companyName?: string;
  gstNumber?: string;
  referralCode?: string;
  referredBy?: string;
  rewardPoints?: number;
  createdAt: string;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number; // dynamically calculated based on role and quantity
}

export type OrderStatus = 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  customerName: string;
  userRole: UserRole;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'razorpay' | 'cod' | 'dealer_credit';
  paymentId?: string;
  shippingAddress: Address;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export type ServiceType = 
  | 'Installation' 
  | 'Filter Replacement' 
  | 'Leakage Repair' 
  | 'Routine Maintenance' 
  | 'TDS Water Quality Test'
  | 'Booster Pump Replacement';

export interface ServiceTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  customerName: string;
  userEmail: string;
  phone: string;
  serviceType: ServiceType;
  preferredDate: string;
  timeSlot: string;
  address: Address;
  notes?: string;
  purifierModel?: string;
  status: ServiceStatus;
  assignedTechnician?: string;
  technicianPhone?: string;
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
}
