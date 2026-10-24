import { Product } from './types';

export const PRODUCTS: Product[] = [
  // ==================== 1. WATER PURIFIERS (12 Items) ====================
  {
    id: 'purifier-01',
    name: 'Califnco AquaShield Elite RO+UV+UF+TDS Controller',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 16999,
    wholesalePrice: 10800,
    minWholesaleQty: 3,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Flagship 8-stage domestic RO purifier equipped with active copper technology, UV in-tank sterilization, and digital TDS display.',
    features: ['Active Copper Impregnation', 'In-Tank UV LED Sterilizer', 'Digital Real-time TDS Display', 'Auto-Flushing Membrane'],
    specs: {
      capacity: '10 Litres',
      filtrationStages: 8,
      tdsLimit: 'Up to 2500 ppm',
      powerConsumption: '45 Watts',
      warranty: '1 Year Comprehensive + 2 Years Membrane Free'
    },
    inStock: true,
    stockCount: 85,
    isFeatured: true,
    isDailyDeal: true
  },
  {
    id: 'purifier-02',
    name: 'Califnco Copper Smart RO + Alkaline Mineralizer',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 14499,
    wholesalePrice: 9400,
    minWholesaleQty: 3,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Enriches purified water with essential alkaline minerals and real copper ions to boost immunity and digestive health.',
    features: ['pH Balance 8.0-8.5', '100% Food-Grade Virgin Plastic', 'High Recovery RO Membrane', 'Leak-proof Push-Fit Fittings'],
    specs: {
      capacity: '8.5 Litres',
      filtrationStages: 7,
      tdsLimit: 'Up to 2000 ppm',
      powerConsumption: '40 Watts',
      warranty: '1 Year On-site'
    },
    inStock: true,
    stockCount: 120,
    isFeatured: true
  },
  {
    id: 'purifier-03',
    name: 'Califnco HydroPure Under-Sink Commercial RO System',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 22999,
    wholesalePrice: 14900,
    minWholesaleQty: 2,
    rating: 4.9,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Space-saving under-counter commercial grade RO system featuring a brushed stainless-steel gooseneck faucet and 12L pressurized bladder tank.',
    features: ['Under-the-Counter Sleek Mount', 'Dedicated Gooseneck Designer Faucet', 'Hydrostatic Pressure Tank 12L', 'Super Silent Booster Motor'],
    specs: {
      capacity: '12L Pressure Tank (25 L/hr)',
      filtrationStages: 7,
      tdsLimit: 'Up to 3000 ppm',
      powerConsumption: '60 Watts',
      warranty: '2 Years Comprehensive'
    },
    inStock: true,
    stockCount: 40,
    isFeatured: true
  },
  {
    id: 'purifier-04',
    name: 'Califnco PureWall UV+UF Gravity Water Purifier',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 7999,
    wholesalePrice: 4800,
    minWholesaleQty: 5,
    rating: 4.6,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Ideal for municipal and low TDS water sources. Retains 100% natural minerals while eliminating 99.99% bacteria and viruses via 11W Phillips UV chamber.',
    features: ['Zero Water Wastage', 'High Flow Rate 2 Litres/min', 'Stainless Steel UV Chamber', 'Audible UV Fail Alarm'],
    specs: {
      capacity: '7 Litres',
      filtrationStages: 5,
      tdsLimit: 'Up to 300 ppm',
      powerConsumption: '18 Watts',
      warranty: '1 Year Warranty'
    },
    inStock: true,
    stockCount: 95
  },
  {
    id: 'purifier-05',
    name: 'Califnco Titan Pro 50 LPH Light Commercial RO',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 28999,
    wholesalePrice: 18500,
    minWholesaleQty: 2,
    rating: 4.9,
    reviewsCount: 68,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty 50 Litres Per Hour RO plant designed for cafes, restaurants, clinics, and medium offices.',
    features: ['Dual 300 GPD RO Membranes', 'Heavy Duty Brass Booster Pump', 'Stainless Steel Skid Frame', 'Dual Pressure Gauges'],
    specs: {
      capacity: '50 Litres / Hour',
      filtrationStages: 6,
      tdsLimit: 'Up to 3500 ppm',
      powerConsumption: '120 Watts',
      warranty: '1 Year Comprehensive'
    },
    inStock: true,
    stockCount: 28
  },
  {
    id: 'purifier-06',
    name: 'Califnco AquaCompact Kitchen Countertop RO',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 11999,
    wholesalePrice: 7600,
    minWholesaleQty: 4,
    rating: 4.7,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist compact countertop RO unit with instant touch dispensing, magnetic detachable drip tray, and tool-free quick-twist filter cartridges.',
    features: ['Tool-free Quick Twist Filters', 'Touch Sensitive Dispenser', 'Child Safety Lock', 'Compact 18cm Width'],
    specs: {
      capacity: '6 Litres',
      filtrationStages: 6,
      tdsLimit: 'Up to 1800 ppm',
      powerConsumption: '35 Watts',
      warranty: '1 Year'
    },
    inStock: true,
    stockCount: 65
  },
  {
    id: 'purifier-07',
    name: 'Califnco EcoSmart Zero-Wastage RO + Recirculator',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 18499,
    wholesalePrice: 11900,
    minWholesaleQty: 3,
    rating: 4.8,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Pioneering reject-water recirculator system returning 100% of brine water back to overhead tank for zero domestic water waste.',
    features: ['100% Zero Water Wastage', 'Smart High-Pressure Recirculator', 'TDS Balance Regulator', 'Smart Filter Replacement Indicator'],
    specs: {
      capacity: '9 Litres',
      filtrationStages: 8,
      tdsLimit: 'Up to 2200 ppm',
      powerConsumption: '48 Watts',
      warranty: '2 Years Warranty'
    },
    inStock: true,
    stockCount: 52
  },
  {
    id: 'purifier-08',
    name: 'Califnco Stainless Steel SS304 Storage RO Purifier',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 19999,
    wholesalePrice: 12900,
    minWholesaleQty: 3,
    rating: 4.9,
    reviewsCount: 147,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Hygienic 100% Food-Grade SS-304 surgical grade stainless steel storage tank prevents slime and bacterial contamination indefinitely.',
    features: ['SS-304 Stainless Steel Tank', 'Antimicrobial Nanocoat', 'Post Carbon Polisher', 'Dual Dispense Modes'],
    specs: {
      capacity: '10 Litres SS-304 Tank',
      filtrationStages: 7,
      tdsLimit: 'Up to 2500 ppm',
      powerConsumption: '42 Watts',
      warranty: '3 Years on Tank, 1 Year Electronics'
    },
    inStock: true,
    stockCount: 45
  },
  {
    id: 'purifier-09',
    name: 'Califnco WallMount Slim Mineral RO',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 12499,
    wholesalePrice: 7900,
    minWholesaleQty: 4,
    rating: 4.6,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-thin profile wall-mountable RO purifier designed for modular urban kitchens with limited counter space.',
    features: ['Slim 14cm Wall Mount Design', 'Multi-Layer Spun Pre-Filter', 'Automatic Power Cutoff', 'Mineral Retention Valve'],
    specs: {
      capacity: '7.5 Litres',
      filtrationStages: 6,
      tdsLimit: 'Up to 1500 ppm',
      powerConsumption: '38 Watts',
      warranty: '1 Year On-site'
    },
    inStock: true,
    stockCount: 70
  },
  {
    id: 'purifier-10',
    name: 'Califnco Industrial 100 LPH Double RO System',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 44999,
    wholesalePrice: 29500,
    minWholesaleQty: 1,
    rating: 5.0,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Commercial 100 Litres Per Hour double-stage RO system with automated CIP cleaning port and digital conductivity monitor.',
    features: ['Dual 150 GPD High Flow Membranes', 'SS-304 Heavy Duty Stand', 'Low & High Pressure Automation', 'Raw Water Boost Support'],
    specs: {
      capacity: '100 Litres / Hour',
      filtrationStages: 7,
      tdsLimit: 'Up to 4000 ppm',
      powerConsumption: '180 Watts',
      warranty: '1 Year Industrial Warranty'
    },
    inStock: true,
    stockCount: 15
  },
  {
    id: 'purifier-11',
    name: 'Califnco Crystal Alkaline Glass-Facia RO',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 17499,
    wholesalePrice: 11200,
    minWholesaleQty: 3,
    rating: 4.8,
    reviewsCount: 93,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Toughened mirror-finish glass facia with ambient atmospheric LED glow, mineral fortifier, and active silver anti-microbial barrier.',
    features: ['Toughened Glass Front Panel', 'Ambient Water Quality Glow LED', 'Silver Impregnated Carbon', 'Touchless Auto-fill Sensor'],
    specs: {
      capacity: '9 Litres',
      filtrationStages: 7,
      tdsLimit: 'Up to 2000 ppm',
      powerConsumption: '40 Watts',
      warranty: '1 Year Comprehensive'
    },
    inStock: true,
    stockCount: 38
  },
  {
    id: 'purifier-12',
    name: 'Califnco Gravity Ceramic & Carbon Filter (Non-Electric)',
    category: 'purifiers',
    brand: 'Califnco',
    retailPrice: 3499,
    wholesalePrice: 2100,
    minWholesaleQty: 6,
    rating: 4.5,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Zero-electricity gravity water filter with dual micro-porous ceramic candles and high iodine activated coconut shell carbon.',
    features: ['Zero Electricity Consumption', 'Micro-porous Ceramic Candles (0.2 Micron)', 'Shatter-proof Food Grade Body', 'Easy DIY Assembly'],
    specs: {
      capacity: '18 Litres (9L Upper + 9L Lower)',
      filtrationStages: 3,
      tdsLimit: 'Up to 300 ppm',
      powerConsumption: '0 Watts',
      warranty: '6 Months'
    },
    inStock: true,
    stockCount: 140
  },

  // ==================== 2. WATER DISPENSERS & COOLERS (10 Items) ====================
  {
    id: 'dispenser-01',
    name: 'Califnco Smart Touch Hot & Cold RO Water Dispenser',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 24999,
    wholesalePrice: 16500,
    minWholesaleQty: 2,
    rating: 4.9,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ec602e5b?auto=format&fit=crop&w=800&q=80',
    description: 'Integrated RO filtration with compressor cooling (4°C) and instant tea/coffee heating (92°C). Freestanding floor console.',
    features: ['Compressor Fast Cooling', 'Instant 92°C Boiling Dispense', 'Child Lock Protection', 'Direct Pipeline Water Connection'],
    specs: {
      capacity: 'Hot 2L, Cold 4L, Ambient 5L',
      filtrationStages: 6,
      powerConsumption: 'Cooling 90W, Heating 500W',
      warranty: '1 Year Compressor & Machine'
    },
    inStock: true,
    stockCount: 32,
    isFeatured: true
  },
  {
    id: 'dispenser-02',
    name: 'Califnco Bottom Loading Hot, Cold & Normal Dispenser',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 15999,
    wholesalePrice: 10500,
    minWholesaleQty: 3,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Effortless bottom-loading cabinet eliminates heavy lifting of 20L water cans. Includes LED empty bottle alert.',
    features: ['Bottom Loading Cabinet', 'Empty Bottle Warning Sensor', '3 Faucet Push Buttons', 'Tropicalized High Performance Compressor'],
    specs: {
      capacity: 'Fits standard 20L jar',
      powerConsumption: 'Cooling 85W, Heating 450W',
      warranty: '1 Year Comprehensive'
    },
    inStock: true,
    stockCount: 45
  },
  {
    id: 'dispenser-03',
    name: 'Califnco SS-304 Commercial Water Cooler 40/80 LPH',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 33999,
    wholesalePrice: 22800,
    minWholesaleQty: 2,
    rating: 4.8,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy duty all-stainless steel refrigerated water cooler for corporate offices, colleges, factories, and public waiting areas.',
    features: ['SS-304 Heavy Gauge Tank & Panels', 'Hermetically Sealed Emerson Compressor', 'Twin Push Chrome Faucets', 'R-134a Eco Refrigerant'],
    specs: {
      capacity: 'Cooling 40 L/hr, Storage 80L',
      powerConsumption: '275 Watts',
      warranty: '1 Year Comprehensive'
    },
    inStock: true,
    stockCount: 22
  },
  {
    id: 'dispenser-04',
    name: 'Califnco Tabletop Instant Heating Mini Dispenser',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 6499,
    wholesalePrice: 3999,
    minWholesaleQty: 5,
    rating: 4.6,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Heats water to boiling temperature in 3 seconds. 5 preset temperature modes (Room, 45°C baby milk, 75°C green tea, 85°C coffee, 99°C boiling).',
    features: ['3-Second Instant Ceramic Heat', '5 Temperature Preset Modes', 'Continuous or 250ml/500ml Dispense', 'Self-descaling Feature'],
    specs: {
      capacity: '3 Litres Removable Tank',
      powerConsumption: '2000W Flash Heater',
      warranty: '1 Year Warranty'
    },
    inStock: true,
    stockCount: 60
  },
  {
    id: 'dispenser-05',
    name: 'Califnco Premium Top-Loading Dispenser with Refrigerator Cabinet',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 13999,
    wholesalePrice: 8900,
    minWholesaleQty: 4,
    rating: 4.7,
    reviewsCount: 77,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ec602e5b?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-functional water dispenser featuring a 16L lower cooling compartment for storing canned beverages, juices, and fruits.',
    features: ['Integrated 16L Beverage Mini-Fridge', 'Hot, Cold & Ambient Taps', 'High-Efficiency Cooling Coil', 'Spill-Proof Bottle Piercer'],
    specs: {
      capacity: 'Cold 3L, Hot 1L, Fridge 16L',
      powerConsumption: '550 Watts Max',
      warranty: '1 Year'
    },
    inStock: true,
    stockCount: 35
  },
  {
    id: 'dispenser-06',
    name: 'Califnco Glass Door Luxury Water Dispenser',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 17999,
    wholesalePrice: 11800,
    minWholesaleQty: 3,
    rating: 4.9,
    reviewsCount: 43,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Black tempered glass door concealment for faucets and jar receiver. Gives an ultra-modern aesthetic to executive offices and luxury homes.',
    features: ['Tempered Glass Aesthetic Door', 'Hidden Spigots Protection', 'Low Noise Cooling Motor', 'Child Safety Hot Lock'],
    specs: {
      capacity: 'Direct Line or 20L Jar',
      powerConsumption: '100W Cold / 450W Hot',
      warranty: '1 Year Machine & Compressor'
    },
    inStock: true,
    stockCount: 26
  },
  {
    id: 'dispenser-07',
    name: 'Califnco Heavy Duty SS School Water Cooler 100/150 LPH',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 48999,
    wholesalePrice: 33500,
    minWholesaleQty: 1,
    rating: 4.8,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Commercial 3-tap cold water station with heavy stainless steel construction designed for schools, universities, and industrial campuses.',
    features: ['3 Independent SS Dispense Faucets', '150L Heavy Duty Storage Vat', 'High Ambient Heat Dissipation Condenser', 'Full SS-304 Body'],
    specs: {
      capacity: '100 L/hr Cooling, 150L Storage',
      powerConsumption: '450 Watts',
      warranty: '1 Year Comprehensive'
    },
    inStock: true,
    stockCount: 14
  },
  {
    id: 'dispenser-08',
    name: 'Califnco Automatic Rechargeable Electric Water Bottle Pump',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 899,
    wholesalePrice: 420,
    minWholesaleQty: 12,
    rating: 4.5,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Wireless USB rechargeable pump fits directly onto 20L water cans. 1200mAh battery delivers up to 6 full cans per charge.',
    features: ['One Touch Dispense', '1200mAh USB-C Rechargeable Battery', 'BPA Free Food Grade Silicone Tube', 'Universal 20L Fit'],
    specs: {
      flowRate: '1.5 Litres / min',
      powerConsumption: '4W USB 5V',
      warranty: '6 Months'
    },
    inStock: true,
    stockCount: 300
  },
  {
    id: 'dispenser-09',
    name: 'Califnco Compact Desktop Cold & Normal Dispenser',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 8999,
    wholesalePrice: 5600,
    minWholesaleQty: 4,
    rating: 4.6,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ec602e5b?auto=format&fit=crop&w=800&q=80',
    description: 'Space-conscious countertop electronic water cooler. Whisper-quiet Peltier thermoelectric cooling technology without refrigerant gas.',
    features: ['Thermoelectric Quiet Cooling', 'Compact Tabletop Footprint', 'Removable Drip Tray', 'LED Status Indicators'],
    specs: {
      capacity: 'Cold 1.5L, Ambient Normal',
      powerConsumption: '65 Watts',
      warranty: '1 Year'
    },
    inStock: true,
    stockCount: 50
  },
  {
    id: 'dispenser-10',
    name: 'Califnco HydroBar Wall Mounted Touchless Bottle Filler',
    category: 'dispensers',
    brand: 'Califnco',
    retailPrice: 38999,
    wholesalePrice: 26000,
    minWholesaleQty: 2,
    rating: 4.9,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Commercial touchless infrared bottle filling station with built-in digital green bottle count tracker and NSF certified carbon filter.',
    features: ['Infrared Touchless Dispensing', 'Digital Plastic Bottle Counter', 'Antimicrobial Silver Ion Surface', 'Quick-Chilled Water Delivery'],
    specs: {
      flowRate: '4 Litres / min',
      powerConsumption: '120 Watts',
      warranty: '2 Years Comprehensive'
    },
    inStock: true,
    stockCount: 18
  },

  // ==================== 3. BOOSTER PUMPS & MOTORS (10 Items) ====================
  {
    id: 'pump-01',
    name: 'Califnco 100 GPD Heavy-Duty RO Booster Pump (24V DC)',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 1999,
    wholesalePrice: 1150,
    minWholesaleQty: 8,
    rating: 4.8,
    reviewsCount: 285,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'High-torque 100% pure copper winding diaphragm booster pump delivering steady 120 PSI working pressure for 75 & 100 GPD membranes.',
    features: ['100% Pure Copper Windings', 'High Operating Pressure 120-130 PSI', 'Vibration-Dampening Rubber Bushings', 'Self-Priming up to 2m'],
    specs: {
      flowRate: '1.2 L/min at 80 PSI',
      voltage: '24V DC, 1.2A',
      warranty: '1 Year Replacement'
    },
    inStock: true,
    stockCount: 160,
    isFeatured: true
  },
  {
    id: 'pump-02',
    name: 'Califnco 150 GPD High-Flow RO Booster Pump (36V DC)',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 2499,
    wholesalePrice: 1450,
    minWholesaleQty: 6,
    rating: 4.9,
    reviewsCount: 172,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered for high-TDS domestic and light commercial setups. Sustained pressure output with low noise generation (<45dB).',
    features: ['High Flow 150 GPD Rating', 'Whisper Quiet Operation (<45 dB)', 'Heavy Iron Zinc Die-Cast Body', 'Overheat Cutoff Sensor'],
    specs: {
      flowRate: '1.8 L/min at 90 PSI',
      voltage: '36V DC, 1.5A',
      warranty: '1 Year Replacement'
    },
    inStock: true,
    stockCount: 110
  },
  {
    id: 'pump-03',
    name: 'Califnco 300 GPD Commercial Diaphragm RO Pump (48V DC)',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 4299,
    wholesalePrice: 2650,
    minWholesaleQty: 4,
    rating: 4.9,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial grade 300 GPD booster pump designed to drive dual 150 GPD membranes for 50 LPH commercial water purifiers.',
    features: ['Heavy Duty EPDM Diaphragm', '140 PSI Peak Pressure', 'Continuous Run Duty Cycle', 'Quick 3/8" Push Connect Ports'],
    specs: {
      flowRate: '2.8 L/min at 100 PSI',
      voltage: '48V DC, 2.2A',
      warranty: '1 Year Commercial'
    },
    inStock: true,
    stockCount: 75
  },
  {
    id: 'pump-04',
    name: 'Califnco 75 GPD Budget Copper Booster Pump (24V DC)',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 1599,
    wholesalePrice: 920,
    minWholesaleQty: 10,
    rating: 4.6,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Dependable and affordable booster pump for domestic 50 and 75 GPD water purifiers. Excellent energy efficiency.',
    features: ['Long Life Carbon Brushes', 'Low Power Consumption', 'Universal Mounting Bracket', 'Low Vibration'],
    specs: {
      flowRate: '0.9 L/min at 70 PSI',
      voltage: '24V DC, 0.8A',
      warranty: '1 Year Warranty'
    },
    inStock: true,
    stockCount: 220
  },
  {
    id: 'pump-05',
    name: 'Califnco Vertical SS Multistage High-Pressure RO Pump (0.75 kW)',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 18999,
    wholesalePrice: 13200,
    minWholesaleQty: 2,
    rating: 5.0,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Vertical stainless steel multistage centrifugal pump for 250 LPH and 500 LPH industrial RO plants.',
    features: ['SS-304 Impellers & Chambers', 'Mechanical Carbon/Silicon Carbide Seal', 'TEFC IP55 Rated Motor', 'Flange Connections'],
    specs: {
      flowRate: '1000 L/hr at 12 Bar',
      voltage: '230V Single Phase / 415V 3 Phase',
      warranty: '1 Year Industrial'
    },
    inStock: true,
    stockCount: 16
  },
  {
    id: 'pump-06',
    name: 'Califnco 100 GPD Self-Priming Low Water Pressure Pump',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 2199,
    wholesalePrice: 1290,
    minWholesaleQty: 6,
    rating: 4.7,
    reviewsCount: 102,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Specially engineered for low gravity head where inlet water pressure is near zero. Can suck water from lower overhead tanks effortlessly.',
    features: ['Zero Inlet Pressure Start', 'Suction Lift up to 3 Metres', 'Dry Run Thermal Protection', 'Standard 1/4" NPT Thread'],
    specs: {
      flowRate: '1.1 L/min at 80 PSI',
      voltage: '24V DC, 1.3A',
      warranty: '1 Year'
    },
    inStock: true,
    stockCount: 90
  },
  {
    id: 'pump-07',
    name: 'Califnco 24V DC 2.5A High-Efficiency SMPS Pump Power Adapter',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 799,
    wholesalePrice: 380,
    minWholesaleQty: 15,
    rating: 4.7,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Stabilized SMPS power supply with wide voltage operating range (140V - 300V AC), surge protection, and short circuit cutoff.',
    features: ['Wide Voltage Range 140V-300V', 'Over-Voltage & Surge Suppression', 'Flame-Retardant ABS Enclosure', 'Pure Copper Ferrite Core'],
    specs: {
      voltage: 'Input 230V AC, Output 24V DC 2.5A',
      warranty: '1 Year Replacement'
    },
    inStock: true,
    stockCount: 250
  },
  {
    id: 'pump-08',
    name: 'Califnco 36V DC 3.0A Heavy Duty SMPS Power Adapter',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 999,
    wholesalePrice: 490,
    minWholesaleQty: 12,
    rating: 4.8,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Specially calibrated power adapter for 150 GPD booster pumps and twin solenoid valves with thermal cut-off relay.',
    features: ['Constant Voltage Regulation', 'Thermal Overload Protection', 'Dual Output Terminals', 'Low Ripple Noise'],
    specs: {
      voltage: 'Input 230V AC, Output 36V DC 3.0A',
      warranty: '1 Year Replacement'
    },
    inStock: true,
    stockCount: 180
  },
  {
    id: 'pump-09',
    name: 'Califnco 500 GPD Industrial Water Booster Pump (48V DC)',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 5999,
    wholesalePrice: 3800,
    minWholesaleQty: 3,
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'High capacity pump for 100 LPH RO systems. Continuous operation with oversized ball bearings and silicone seals.',
    features: ['500 GPD Rating', 'Dual Heavy duty Diaphragms', 'Corrosion-Resistant Zinc Head', 'Extended Service Life'],
    specs: {
      flowRate: '3.6 L/min at 110 PSI',
      voltage: '48V DC, 3.2A',
      warranty: '1 Year Commercial'
    },
    inStock: true,
    stockCount: 45
  },
  {
    id: 'pump-10',
    name: 'Califnco Replacement Pump Diaphragm & Valve Head Kit',
    category: 'pumps',
    brand: 'Califnco',
    retailPrice: 499,
    wholesalePrice: 220,
    minWholesaleQty: 20,
    rating: 4.6,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Universal rebuild kit for 75/100 GPD domestic booster pumps. Includes Santoprene diaphragm, valve plate, and stainless steel screws.',
    features: ['Virgin Santoprene Diaphragm', 'Stainless Steel Valve Reeds', 'Restores Factory PSI Output', 'Universal 3-Chamber Fit'],
    specs: {
      warranty: '6 Months'
    },
    inStock: true,
    stockCount: 190
  },

  // ==================== 4. FILTER CARTRIDGES & MEMBRANES (10 Items) ====================
  {
    id: 'filter-01',
    name: 'Califnco 80 GPD Thin Film Composite (TFC) RO Membrane',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 1899,
    wholesalePrice: 950,
    minWholesaleQty: 10,
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'High-rejection 0.0001 micron TFC sheet removes 98% TDS, heavy metals, arsenic, lead, fluorides, and microplastics.',
    features: ['98% Salt & TDS Rejection Rate', '0.0001 Micron Pore Size', 'Anti-Fouling Polyamide Sheet', 'Up to 2500 ppm Inlet TDS'],
    specs: {
      membraneType: 'TFC Dry Sheet 80 GPD',
      flowRate: '12-15 Litres / hour',
      warranty: '1 Year Performance Warranty'
    },
    inStock: true,
    stockCount: 220,
    isFeatured: true
  },
  {
    id: 'filter-02',
    name: 'Califnco 100 GPD Premium Hi-TDS RO Membrane Sheet',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 2299,
    wholesalePrice: 1200,
    minWholesaleQty: 10,
    rating: 4.9,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Specially engineered for hard borewell water handling TDS levels up to 3500 ppm without premature scaling or clogging.',
    features: ['Handles Borewell TDS up to 3500 ppm', 'Fast 100 GPD Output Flow', 'NSF-58 Certified Quality', 'Dry Packing Long Shelf Life'],
    specs: {
      membraneType: 'Polyamide Thin-Film 100 GPD',
      warranty: '1 Year Warranty'
    },
    inStock: true,
    stockCount: 180
  },
  {
    id: 'filter-03',
    name: 'Califnco 5-Micron Spun Polypropylene Sediment Filter (Pack of 4)',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 599,
    wholesalePrice: 220,
    minWholesaleQty: 20,
    rating: 4.7,
    reviewsCount: 610,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: '10-inch standard melt-blown spun polypropylene cartridge. Removes suspended rust, sand, silt, mud, and dirt particles from raw water.',
    features: ['100% Virgin Food-Grade PP', 'Gradient Density Matrix', 'Protects RO Booster Pump & Membrane', 'Standard 10-inch Housing Fit'],
    specs: {
      dimensions: '10 inch length x 2.5 inch diameter',
      weight: '120 grams per cartridge'
    },
    inStock: true,
    stockCount: 500
  },
  {
    id: 'filter-04',
    name: 'Califnco High-Iodine Coconut Shell Activated Carbon Block',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 499,
    wholesalePrice: 210,
    minWholesaleQty: 25,
    rating: 4.8,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: '1100 IV (Iodine Value) virgin coconut shell carbon block. Adsorbs free chlorine, foul odor, insecticides, and volatile organic chemicals.',
    features: ['1100 IV High Iodine Absorption', 'Removes 99% Free Chlorine & Odor', 'Low Carbon Fine Release', 'Standard 10-inch Fit'],
    specs: {
      dimensions: '10" x 2.5"',
      warranty: '6 Months Life'
    },
    inStock: true,
    stockCount: 420
  },
  {
    id: 'filter-05',
    name: 'Califnco Copper + Zinc Alkaline Mineral Post-Carbon Cartridge',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 999,
    wholesalePrice: 480,
    minWholesaleQty: 15,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: '4-in-1 post-membrane inline filter releasing essential Calcium, Magnesium, Copper, and Zinc ions. Elevates pH to 8.0-8.5.',
    features: ['Real Copper & Zinc Media Balls', 'Infuses Ca & Mg Minerals', 'Boosts Water Alkalinity (pH 8+)', 'Improves Natural Taste of Water'],
    specs: {
      dimensions: '11 inch inline with 1/4" push fit'
    },
    inStock: true,
    stockCount: 160,
    isFeatured: true
  },
  {
    id: 'filter-06',
    name: 'Califnco Ultra-Filtration (UF) Hollow Fiber Membrane Inline',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 699,
    wholesalePrice: 320,
    minWholesaleQty: 15,
    rating: 4.6,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: '0.01 micron capillary hollow fiber membrane blocks bacteria, cysts, and colloidal matter without rejecting essential natural minerals.',
    features: ['0.01 Micron Absolute Porosity', 'Retains Beneficial Minerals', 'Washable Hollow Fiber Bundle', 'Zero Electricity Required'],
    specs: {
      dimensions: '11 inch inline tube'
    },
    inStock: true,
    stockCount: 190
  },
  {
    id: 'filter-07',
    name: 'Califnco Complete Annual RO Service Filter Replacement Kit',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 2999,
    wholesalePrice: 1650,
    minWholesaleQty: 5,
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'All-inclusive annual maintenance kit: 80 GPD Membrane, Sediment filter, Carbon block, Post Carbon polisher, Spun candle, and FR 450.',
    features: ['Complete 6-Piece Service Bundle', 'Includes Teflon Tape & 2m RO Pipe', 'Universal Compatibility with all RO brands', 'Saves up to 40% vs Buying Separately'],
    specs: {
      warranty: '1 Year Membrane Warranty'
    },
    inStock: true,
    stockCount: 110,
    isDailyDeal: true
  },
  {
    id: 'filter-08',
    name: 'Califnco 11W Phillips UV Lamp & Quartz Glass Sleeve Set',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 899,
    wholesalePrice: 440,
    minWholesaleQty: 12,
    rating: 4.7,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'Original 4-pin 253.7nm germicidal UV lamp with high-transmittance quartz glass sleeve and waterproof silicone O-rings.',
    features: ['253.7 nm UV-C Germicidal Output', 'Genuine Philips UV Tube', '99.99% Microbial Disinfection', 'High Purity Quartz Sleeve'],
    specs: {
      powerConsumption: '11 Watts UV-C'
    },
    inStock: true,
    stockCount: 140
  },
  {
    id: 'filter-09',
    name: 'Califnco 300 GPD Commercial RO Membrane Sheet 3012',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 3899,
    wholesalePrice: 2350,
    minWholesaleQty: 4,
    rating: 4.8,
    reviewsCount: 57,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: '3012 size dry membrane delivering 45-50 LPH flow for 50 LPH commercial water purifiers in schools and offices.',
    features: ['Size 3012 Commercial Standard', 'Up to 3500 ppm Salt Tolerance', 'High Flux Flow Architecture', 'Long Life Polyamide'],
    specs: {
      flowRate: '45-50 L/hr'
    },
    inStock: true,
    stockCount: 65
  },
  {
    id: 'filter-10',
    name: 'Califnco Anti-Scalant Ball Dispenser & Pre-Filter Cartridge',
    category: 'filters',
    brand: 'Califnco',
    retailPrice: 450,
    wholesalePrice: 190,
    minWholesaleQty: 25,
    rating: 4.6,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Slow-release food-grade polyphosphate silicate anti-scalant balls prevent calcium and magnesium scale crystallization on RO membrane.',
    features: ['Doubles RO Membrane Longevity', 'Food-Grade Sodium Polyphosphate', 'Prevents White Scaling on Faucets', 'Refillable Transparent Housing'],
    specs: {
      weight: '150 grams anti-scalant balls'
    },
    inStock: true,
    stockCount: 210
  },

  // ==================== 5. SPARE PARTS & ACCESSORIES (10 Items) ====================
  {
    id: 'spare-01',
    name: 'Califnco Brass Heavy-Duty Solenoid Valve 24V DC (SV)',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 499,
    wholesalePrice: 240,
    minWholesaleQty: 20,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Forged brass body electromagnetic shut-off valve prevents raw water inlet overflow when the purifier is powered off.',
    features: ['100% Solid Brass Forged Body', 'Zero Leakage Viton Seal', 'Quick 1/4" Push-fit Ports', 'Rated for 100,000 Cycles'],
    specs: {
      voltage: '24V DC, 0.2A',
      pressure: '0.02 - 0.8 MPa'
    },
    inStock: true,
    stockCount: 340,
    isFeatured: true
  },
  {
    id: 'spare-02',
    name: 'Califnco Digital Handheld TDS & Temperature Meter with Backlit LCD',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 699,
    wholesalePrice: 310,
    minWholesaleQty: 15,
    rating: 4.8,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Precise titanium alloy probe measures Total Dissolved Solids (0-9990 ppm) and water temperature with Auto-Hold function.',
    features: ['Titanium Alloy High Precision Sensor', 'Dual Range 0-9990 ppm', 'Backlit Tri-Color LCD (Safe/Warning/Hazard)', 'Auto Temperature Compensation'],
    specs: {
      accuracy: '±2% F.S.',
      warranty: '1 Year Warranty'
    },
    inStock: true,
    stockCount: 280,
    isFeatured: true
  },
  {
    id: 'spare-03',
    name: 'Califnco Heavy Duty 10-Inch Transparent Pre-Filter Housing Bowl',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 599,
    wholesalePrice: 280,
    minWholesaleQty: 12,
    rating: 4.7,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Thick-walled food-grade SAN transparent bowl allows visual inspection of spun candle dirt clogging without opening.',
    features: ['Burst Pressure Tested up to 25 Bar', 'Thick Food-Grade Polypropylene Head', 'Standard 1/4" or 3/8" Female Inlet', 'Includes Spanner & SS Bracket'],
    specs: {
      dimensions: '10 inch bowl standard'
    },
    inStock: true,
    stockCount: 160
  },
  {
    id: 'spare-04',
    name: 'Califnco Low Pressure Switch (LPS) + High Pressure Switch (HPS) Combo',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 399,
    wholesalePrice: 170,
    minWholesaleQty: 25,
    rating: 4.7,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'LPS cuts off power when raw water supply is empty; HPS stops pump when RO storage tank is 100% full.',
    features: ['Protects Booster Pump from Dry Run', 'Automatic Cutoff on Full Tank', 'Push-Fit 1/4" Leakproof Terminals', 'Silver Contact Relays'],
    specs: {
      voltage: '12V - 36V DC'
    },
    inStock: true,
    stockCount: 310
  },
  {
    id: 'spare-05',
    name: 'Califnco Flow Restrictor FR-450 / FR-550 with Quick Connect',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 199,
    wholesalePrice: 65,
    minWholesaleQty: 50,
    rating: 4.6,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Regulates reject water flow to maintain optimal backpressure on the RO membrane for peak purification efficiency.',
    features: ['Calibrated 450 cc/min Backpressure', 'Precision Laser-drilled Orifice', 'Quick Push 1/4" Fit', 'Essential for Membrane Health'],
    specs: {
      flowRate: '450 ml/min'
    },
    inStock: true,
    stockCount: 600
  },
  {
    id: 'spare-06',
    name: 'Califnco Food-Grade 1/4" Blue & White RO Water Pipe Tube (20 Metres)',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 499,
    wholesalePrice: 190,
    minWholesaleQty: 20,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: 'Linear low-density polyethylene (LLDPE) tubing. Odorless, crack-resistant, certified food-safe for domestic & commercial purifiers.',
    features: ['100% Virgin LLDPE Material', 'Burst Pressure up to 280 PSI', 'BPA & Heavy Metal Free', 'Smooth Inner Bore for Low Friction'],
    specs: {
      dimensions: 'Outer Dia 1/4 inch (6.35mm), Length 20m'
    },
    inStock: true,
    stockCount: 220
  },
  {
    id: 'spare-07',
    name: 'Califnco Complete Quick Connect Fitting Assortment Kit (30 Pieces)',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 799,
    wholesalePrice: 340,
    minWholesaleQty: 15,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Includes 10x Elbows, 6x Tees, 4x Straight Connectors, 4x Bulkhead Connectors, 4x Check Valves, and 2x Ball Valves with locking clips.',
    features: ['30 Essential RO Plumbing Fittings', 'POM Food-Grade Polymer', 'Dual O-Ring Anti-Leak Guarantee', 'Includes Blue Locking Clips'],
    specs: {
      warranty: 'Leak-proof Guarantee'
    },
    inStock: true,
    stockCount: 140
  },
  {
    id: 'spare-08',
    name: 'Califnco Stainless Steel Lead-Free Gooseneck Purifier Faucet',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 1199,
    wholesalePrice: 620,
    minWholesaleQty: 8,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    description: '360° swivel arc gooseneck faucet made from food grade SS-304 with quarter-turn ceramic disc valve for under-sink RO purifiers.',
    features: ['SS-304 Brushed Satin Finish', '360-Degree Swivel Neck', 'Drip-Free Ceramic Disc Cartridge', 'Standard 1/2" Sink Hole Mount'],
    specs: {
      dimensions: 'Height 28cm'
    },
    inStock: true,
    stockCount: 85
  },
  {
    id: 'spare-09',
    name: 'Califnco Automatic Auto-Flush Flow Restrictor Valve 18-Second (AFSV)',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 699,
    wholesalePrice: 320,
    minWholesaleQty: 15,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Flushes the membrane surface at high velocity for 18 seconds each time the purifier starts up, washing away mineral scaling.',
    features: ['Automated 18-Second Startup Flush', 'Extends Membrane Life by 50%', 'Integrated Flow Restrictor FR 450', '24V DC Electronic Controller'],
    specs: {
      voltage: '24V DC'
    },
    inStock: true,
    stockCount: 130
  },
  {
    id: 'spare-10',
    name: 'Califnco 12-Litre Hydrostatic Antibacterial Bladder Pressure Tank',
    category: 'spares',
    brand: 'Califnco',
    retailPrice: 2899,
    wholesalePrice: 1750,
    minWholesaleQty: 4,
    rating: 4.9,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Food grade butyl diaphragm water storage tank for under-counter RO systems. Delivers pressurized water up to 50 PSI.',
    features: ['NSF-58 Listed Butyl Diaphragm', 'Stainless Steel 1/4" NPT Thread Port', 'Pre-charged at 7-8 PSI air pressure', 'Rust-resistant Epoxy Coated Steel'],
    specs: {
      capacity: '12 Litres (3.2 Gallons)',
      warranty: '1 Year Warranty'
    },
    inStock: true,
    stockCount: 50
  }
];

// Helper functions for easy filtering & querying
export const getProductsByCategory = (cat: string) => {
  if (cat === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === cat);
};

export const getFeaturedProducts = () => {
  return PRODUCTS.filter(p => p.isFeatured);
};

export const getProductById = (id: string) => {
  return PRODUCTS.find(p => p.id === id);
};
