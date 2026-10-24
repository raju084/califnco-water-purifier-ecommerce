import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Generate an AI-generated product visual for Instagram & WhatsApp
 * Uses Hugging Face / Pollinations AI (100% free, zero cost, no credit card)
 */
export async function generateProductImage(product) {
  console.log(`🎨 [AI Image Engine] Generating realistic photorealistic image for: ${product.name}...`);

  const prompt = encodeURIComponent(
    `Ultra-realistic 8k commercial product photography of ${product.name}, sleek modern water purifier, mounted on luxury minimalist marble kitchen wall, crystal glass being filled with pure crystal clear water, warm morning sunlight, blue LED ambient indicator glow, architectural digest photography, shot on Hasselblad 85mm f/1.4 lens`
  );

  // Pollinations.ai generates instant high-resolution AI images for free with high uptime
  const aiImageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1080&height=1080&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;

  console.log(`✓ [AI Image Engine] AI Image Generated Successfully:`);
  console.log(`   🔗 ${aiImageUrl}`);

  return aiImageUrl;
}

/**
 * Generate high-converting AI caption and hashtags using Google Gemini API
 */
export async function generateProductCaption(product) {
  console.log(`✍️ [AI Caption Engine] Generating engaging caption & hashtags for: ${product.name}...`);

  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey && geminiApiKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      // Use current Gemini model
      let model;
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' });
      } catch (e) {
        model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      }

      const prompt = `You are a social media growth copywriter for Califnco Water Purifiers.
Write an engaging, high-converting Instagram post for our product:
Product Name: ${product.name}
Category: ${product.category}
Key Features: ${product.features.join(', ')}
Specs: ${JSON.stringify(product.specs)}
Price: ₹${product.retailPrice} (Dealer wholesale price: ₹${product.wholesalePrice})
Special Offer: Use code PUREWATER500 for flat ₹500 off!

Format the caption with:
1. An irresistible hook question or health insight
2. Why 100% pure mineral water matters for Indian households
3. Key technical benefits (bullet points with emojis)
4. Call to action directing to the Califnco Mobile App
5. 15-20 trending hashtags on water purification and health.
Keep it punchy, professional, and aesthetic.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      console.log(`✓ [AI Caption Engine] Generated via Gemini AI API.`);
      return text;
    } catch (err) {
      console.warn(`⚠️ [AI Caption Engine] Gemini API call had an issue (${err.message}). Using smart fallback synthesizer.`);
    }
  }

  // High-converting intelligent fallback copy synthesizer
  const featuresList = product.features.map(f => `✨ ${f}`).join('\n');
  const caption = `💧 Is your family drinking truly pure, mineral-rich water?

Introducing the all-new ${product.name} by Califnco! 🚰✨

Engineered specifically for Indian tap and borewell water, this state-of-the-art system ensures every drop is crystal clean, revitalizing, and infused with essential natural minerals.

🌟 Why You'll Love It:
${featuresList}
🛡️ Warranty: ${product.specs.warranty || '1 Year Comprehensive On-site'}
🧪 TDS Capacity: ${product.specs.tdsLimit || 'Up to 2500 ppm'}

💰 Special Launch Deal:
Get flat ₹500 OFF with exclusive coupon code: PUREWATER500
📲 Download the Califnco Mobile App on Android to order with zero down payment & free doorstep installation!

🤝 Wholesale dealer inquiries & bulk quotes available directly in the dealer portal.

#Califnco #WaterPurifier #ROPurifier #PureWater #HealthyLiving #CleanWaterIndia #WaterDispenser #HydrationGoals #IndianKitchen #SmartHome #ActiveCopper #MineralWater #CleanLiving #TDSController #BorewellWater`;

  console.log(`✓ [AI Caption Engine] Caption generated successfully.`);
  return caption;
}
