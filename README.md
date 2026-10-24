# Califnco — Smart Water Purifiers & Spares Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0284c7?style=flat-square)](https://razorpay.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, full-stack water purification commerce and service platform. Features an interactive mobile client for domestic customers and wholesale dealers, an enterprise Next.js operations console for fulfillment and technician dispatch, and an automated daily social marketing pipeline.

---

## 🌟 Platform Highlights

### 1. Cross-Platform Mobile Client (`apps/mobile`)
- **Dual Persona Workflows**: Seamlessly switch between retail customer shopping and wholesale dealer purchasing with tiered 30%–40% catalog markdowns and Minimum Order Quantity (MOQ) logic.
- **Flexible Authentication**: Secure credential login, account registration with instant ₹500 welcome credit, and frictionless one-time code verification via WhatsApp or SMS.
- **Smart Cart & Checkout**: Automatic preservation of pending items across login transitions, coupon discount engine (`PUREWATER500`), and integrated Razorpay checkout gateway supporting UPI, Cards, and Netbanking.
- **Field Service Booking**: Schedule doorstep installation, routine maintenance, and TDS purity testing with interactive slot selection.
- **OpenStreetMap Geo-Location**: Draggable pinpoint address selector with GPS location detection and reverse geocoding.
- **Multi-Channel Notification Hub**: Live notification center tracking Web Push alerts, DLT-formatted SMS alerts, and transactional HTML tax invoices.
- **Refined UX**: Smooth micro-animations, high-resolution product image zoom lightbox, persistent Dark/Light mode, and customer referral wallet.

### 2. Enterprise Operations Console (`apps/admin`)
- Built with **Next.js 14 App Router**, optimized for 1-click Vercel deployment.
- **Real-Time Operations Dashboard**: High-level sales revenue metrics, retail vs. wholesale performance breakdowns, and order volume velocity.
- **Order Lifecycle Management**: Order detail inspection, shipping status transitions (Processing → Dispatched → Delivered), and payment verification.
- **Dealer Verification Desk**: Review pending wholesale dealer registrations, verify GSTIN credentials, and approve accounts with a single click.
- **Field Service Desk**: Allocate and dispatch certified RO service technicians to open customer maintenance requests.
- **Master Catalog Management**: Unified catalog browser across all 52 commercial purifiers, pumps, membranes, and replacement filters.

### 3. Automated Social Publishing Engine (`automation`)
- **Daily Scheduled Publishing**: Automated cron workflow triggers daily at 9:00 AM IST locally via `node-cron` or in the cloud using GitHub Actions.
- **Dynamic Content Synthesizer**: Generates engaging promotional captions, technical specifications, and trending hashtags for water purifiers.
- **Photorealistic Visual Engine**: Renders high-resolution commercial product imagery ready for multi-channel broadcast.
- **Instagram Feed Dispatcher**: Publishes directly to Instagram Business & Creator accounts via Meta Graph API containers.
- **WhatsApp Status Automation**: Formats and broadcasts daily status updates via WAHA (WhatsApp HTTP API) with Docker support.

---

## 🏗️ Architecture & Monorepo Structure

```
Califnco/
├── apps/
│   ├── admin/                    # Next.js 14 Operations Console (Vercel-ready)
│   │   ├── app/
│   │   │   ├── page.tsx          # Executive Dashboard & Sales Metrics
│   │   │   ├── orders/page.tsx   # Order Tracking & Status Transition
│   │   │   ├── dealers/page.tsx  # Dealer Verification & Wholesale Approvals
│   │   │   ├── services/page.tsx # Field Service Desk & Tech Assignment
│   │   │   └── products/page.tsx # Master Catalog Viewer (52+ SKUs)
│   │   └── lib/                  # Unified Data Store & Firestore Connectors
│   │
│   └── mobile/                   # React Cross-Platform Mobile Client
│       ├── src/
│       │   ├── components/       # AuthModal, NotificationsModal, RazorpayModal, Map
│       │   ├── context/          # AppContext (Auth, Cart, Orders, Notifications)
│       │   ├── services/         # SMS & Email Transactional Dispatchers
│       │   ├── views/            # Home, Catalog, Cart, Services, Orders, Profile
│       │   └── styles/theme.css  # CSS Token Design System & Dark Mode
│       └── index.html            # Leaflet & Razorpay SDK Embeds
│
├── packages/
│   └── shared/                   # Shared TypeScript Core
│       ├── types.ts              # Canonical Interfaces (Product, Order, Ticket)
│       └── products.ts           # 52 Handcrafted Products across 5 categories
│
├── automation/                   # Social Publishing & WhatsApp Pipeline
│   ├── ai-generator.js           # Visual & Caption Synthesis Engine
│   ├── instagram-publisher.js    # Meta Graph API Container & Feed Publisher
│   ├── waha-whatsapp-publisher.js# WhatsApp Status Publisher via WAHA
│   ├── daily-scheduler.js        # Scheduled Cron Engine
│   └── docker-compose.yml        # WAHA WhatsApp API Docker Stack
│
└── .github/
    └── workflows/
        └── daily-social-post.yml # Automated Cloud Cron via GitHub Actions
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node v20.x & v22.x)
- npm 9+ or pnpm / yarn

### Installation
Clone the repository and install dependencies for each service:
```bash
git clone https://github.com/your-username/califnco.git
cd califnco

# Install mobile client dependencies
npm install --prefix apps/mobile

# Install admin console dependencies
npm install --prefix apps/admin

# Install automation dependencies
npm install --prefix automation
```

---

### Running Locally

#### 1. Start the Mobile Client (Port 3000)
```bash
npm run dev:mobile
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
- Toggle between **Retail Customer** and **Wholesale Dealer** modes directly from the header or profile tab.
- Add purifiers or spare filters to your cart.
- Test the one-click WhatsApp/SMS verification flow or use standard password authentication.

#### 2. Start the Admin Operations Console (Port 3001)
```bash
npm run dev:admin
```
Open [http://localhost:3001](http://localhost:3001) in your browser.
- Access live orders, approve wholesale dealer GST applications, and assign technicians to service tickets.

#### 3. Run the Social Automation Pipeline
Execute an immediate run:
```bash
npm run automation:post
```
Or start the continuous background scheduler:
```bash
npm run automation:start
```

---

## ⚙️ Environment Configuration

### Root / Automation (`automation/.env`)
Copy `.env.example` to `.env`:
```env
# Gemini API Key (optional for dynamic copy generation)
GEMINI_API_KEY=your_gemini_api_key

# Meta Graph API (Instagram Business/Creator Account)
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_ACCESS_TOKEN=your_access_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_id

# WAHA Endpoint for WhatsApp Status
WAHA_ENDPOINT=http://localhost:3008
WAHA_SESSION=default

# Cron Schedule Expression
CRON_SCHEDULE=0 9 * * *
```

### Mobile Client (`apps/mobile/.env`)
```env
VITE_RAZORPAY_KEY_ID=rzp_test_CalifncoDemo2026
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=califnco-purifiers.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=califnco-purifiers
```

---

## 📱 WhatsApp Status Automation Setup (WAHA)

To enable automated WhatsApp Status updates using the included Docker configuration:

```bash
cd automation
docker compose up -d
```
1. Navigate to [http://localhost:3008/dashboard](http://localhost:3008/dashboard).
2. Scan the provided QR code with WhatsApp (*Linked Devices* on your mobile phone).
3. The automated scheduler will now dispatch daily product updates directly to your WhatsApp Status.

---

## ☁️ Deployment

### Admin Console on Vercel
1. Link your GitHub repository in the [Vercel Dashboard](https://vercel.com/new).
2. Set the **Root Directory** to `apps/admin`.
3. Choose the **Next.js** framework preset.
4. Click **Deploy**.

### Mobile Client Static Production Build
```bash
npm run build:mobile
```
The optimized production bundle will be generated inside `apps/mobile/dist/`, ready for hosting on Firebase Hosting, Netlify, Cloudflare Pages, or AWS S3/CloudFront.

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
