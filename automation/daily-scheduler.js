import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateProductImage, generateProductCaption } from './ai-generator.js';
import { postToInstagram } from './instagram-publisher.js';
import { postToWhatsAppStatus } from './waha-whatsapp-publisher.js';
import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });

// Read products catalog from packages/shared/products.ts or JSON
async function getDailyProduct() {
  const sharedProductsPath = path.resolve(__dirname, '../packages/shared/products.ts');
  const fileContent = fs.readFileSync(sharedProductsPath, 'utf8');

  // Parse product list or IDs from file
  const idMatches = [...fileContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const nameMatches = [...fileContent.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const retailPriceMatches = [...fileContent.matchAll(/retailPrice:\s*(\d+)/g)].map(m => parseInt(m[1]));
  const wholesalePriceMatches = [...fileContent.matchAll(/wholesalePrice:\s*(\d+)/g)].map(m => parseInt(m[1]));

  const productsCount = idMatches.length || 52;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const selectedIndex = dayOfYear % productsCount;

  return {
    id: idMatches[selectedIndex] || 'purifier-01',
    name: nameMatches[selectedIndex] || 'Califnco AquaShield Elite RO+UV+UF+TDS Controller',
    category: 'purifiers',
    retailPrice: retailPriceMatches[selectedIndex] || 16999,
    wholesalePrice: wholesalePriceMatches[selectedIndex] || 10800,
    features: [
      'Active Copper Mineral Infusion',
      'In-Tank UV LED Disinfection',
      'Digital Real-time TDS Display',
      'Auto-Flushing RO Membrane'
    ],
    specs: {
      capacity: '10 Litres',
      filtrationStages: 8,
      tdsLimit: 'Up to 2500 ppm',
      warranty: '1 Year Comprehensive'
    }
  };
}

/**
 * Main Daily Execution Workflow
 */
export async function runDailySocialAutomation() {
  console.log(`\n======================================================`);
  console.log(`🚀 Califnco AI Social Media Pipeline Running`);
  console.log(`⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
  console.log(`======================================================\n`);

  try {
    // Step 1: Select Today's Featured Product
    const product = await getDailyProduct();
    console.log(`📦 Today's Product: ${product.name}`);
    console.log(`   Price: ₹${product.retailPrice} (Wholesale: ₹${product.wholesalePrice})\n`);

    // Step 2: Generate AI Image
    const imageUrl = await generateProductImage(product);

    // Step 3: Generate AI Caption & Hashtags
    const caption = await generateProductCaption(product);

    // Step 4: Publish to Instagram (Meta Graph API)
    console.log(`\n--- Step 4: Instagram Publishing ---`);
    const igResult = await postToInstagram({ imageUrl, caption, product });

    // Step 5: Publish to WhatsApp Status via WAHA
    console.log(`\n--- Step 5: WhatsApp Status Publishing ---`);
    const waResult = await postToWhatsAppStatus({ imageUrl, caption, product });

    console.log(`\n======================================================`);
    console.log(`✅ Daily AI Social Workflow Completed Successfully!`);
    console.log(`   Instagram Status: ${igResult.mode}`);
    console.log(`   WhatsApp Status:  ${waResult.mode}`);
    console.log(`   AI Image URL:     ${imageUrl}`);
    console.log(`======================================================\n`);

    return {
      success: true,
      product,
      imageUrl,
      caption,
      igResult,
      waResult
    };
  } catch (error) {
    console.error(`❌ Error in Daily Automation Pipeline:`, error);
    return { success: false, error: error.message };
  }
}

// Check if running directly with --now flag
const isImmediateRun = process.argv.includes('--now');

if (isImmediateRun) {
  console.log(`⚡ Immediate test run triggered via --now flag.`);
  runDailySocialAutomation().then(() => {
    process.exit(0);
  });
} else {
  // Schedule to run every morning at 09:00 AM IST
  const cronSchedule = process.env.CRON_SCHEDULE || '0 9 * * *';
  console.log(`⏰ Daily automation scheduler initialized with cron expression: "${cronSchedule}"`);
  console.log(`   Will trigger automatically every morning at 9:00 AM.`);
  console.log(`   (Tip: Run 'npm run post-now' to execute immediately for testing)\n`);

  cron.schedule(cronSchedule, () => {
    console.log(`\n⏰ Cron trigger fired for daily post!`);
    runDailySocialAutomation();
  });
}
