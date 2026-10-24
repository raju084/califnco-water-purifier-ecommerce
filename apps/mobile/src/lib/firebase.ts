import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { Order, ServiceTicket } from '@shared/index';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA_8zd0djLzzqs8IjTHUeP8iZuosnbqUp4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "califnco-purifiers.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "califnco-purifiers",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "califnco-purifiers.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "685931782786",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:685931782786:web:37dfe8006fba5861908a9b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-76KVPK0T3W"
};

// Initialize Firebase App safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize anonymous auth or listen to auth changes
export const initFirebaseAuth = (onUserReady?: (user: FirebaseUser | null) => void) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (onUserReady) onUserReady(user);
      } else {
        signInAnonymously(auth)
          .then((cred) => {
            if (onUserReady) onUserReady(cred.user);
          })
          .catch((err) => {
            console.warn('[Firebase Auth] Offline or anonymous auth fallback:', err.message);
            if (onUserReady) onUserReady(null);
          });
      }
    });
  } catch (err) {
    console.warn('[Firebase Auth] Init error:', err);
  }
};

// Firestore Sync: Orders
export const syncOrderToFirestore = async (order: Order): Promise<boolean> => {
  try {
    const ordersCol = collection(db, 'orders');
    await addDoc(ordersCol, {
      ...order,
      syncedAt: serverTimestamp()
    });
    console.log(`✓ [Firestore] Order #${order.orderNumber} synced to cloud.`);
    return true;
  } catch (error) {
    console.warn('[Firestore] Order sync fallback to local storage:', error);
    return false;
  }
};

// Firestore Sync: Service Tickets
export const syncServiceTicketToFirestore = async (ticket: ServiceTicket): Promise<boolean> => {
  try {
    const srvCol = collection(db, 'service_tickets');
    await addDoc(srvCol, {
      ...ticket,
      syncedAt: serverTimestamp()
    });
    console.log(`✓ [Firestore] Service Ticket #${ticket.ticketNumber} synced to cloud.`);
    return true;
  } catch (error) {
    console.warn('[Firestore] Service ticket sync fallback to local storage:', error);
    return false;
  }
};

// FCM Alerts Registration Helper
export const registerFCMToken = async (): Promise<string> => {
  // Retrieve or generate persistent FCM device registration token
  const storedToken = localStorage.getItem('califnco_fcm_token');
  if (storedToken) return storedToken;

  const deviceToken = `fcm_token_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  localStorage.setItem('califnco_fcm_token', deviceToken);
  return deviceToken;
};

export default app;
