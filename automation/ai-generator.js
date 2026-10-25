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
 * Clean up markdown headers, image descriptions, and enforce Instagram's 2,200 character limit
 */
function cleanInstagramCaption(rawText) {
  let text = (rawText || '').trim();
  // Remove markdown intro like "Here's an engaging..."
  text = text.replace(/^(?:Here's|Here is|Sure,|Certainly|Below is)[\s\S]*?(?:\n\n|---)/i, '');
  // Remove image/video prompts like "(Image/Video: ...)" or "**(Image: ...)**"
  text = text.replace(/\*{0,2}\(?Image\/Video:[\s\S]*?\)?\*{0,2}/gi, '');
  text = text.replace(/\*{0,2}\(?Image:[\s\S]*?\)?\*{0,2}/gi, '');
  text = text.replace(/^---+\s*/gm, '');
  text = text.trim();

  // Instagram strict limit is 2,200 characters. Keep it under 2,000 for safety.
  if (text.length > 2000) {
    const cutoff = text.slice(0, 1950);
    const lastSpace = cutoff.lastIndexOf(' ');
    text = (lastSpace > 1600 ? cutoff.slice(0, lastSpace) : cutoff) + '\n\n#Califnco';
  }
  return text;
}

/**
 * Generate high-converting AI caption and hashtags using Google Gemini API
 */
export async function generateProductCaption(product) {
  console.log(`✍️ [AI Caption Engine] Generating engaging caption & hashtags for: ${product.name}...`);

  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey && geminiApiKey !== 'your_gemini_api_key_here') {
    const candidateModels = [
      process.env.GEMINI_MODEL,
      'gemini-2.5-flash',
      'gemini-3.8-flash',
      'gemini-2.5-pro'
    ].filter(Boolean);

    const prompt = `You are a social media copywriter for Califnco Water Purifiers.
Write a punchy, high-converting Instagram caption for:
Product Name: ${product.name}
Category: ${product.category}
Key Features: ${product.features.join(', ')}
Specs: ${JSON.stringify(product.specs)}
Price: ₹${product.retailPrice} (Dealer wholesale price: ₹${product.wholesalePrice})
Special Offer: Use code PUREWATER500 for flat ₹500 off!

Format requirements:
1. Direct opening hook or health insight
2. Why mineral-rich water matters for Indian families
3. 4-5 key technical bullet points with emojis
4. Clear Call to Action to download Califnco App
5. 10-15 relevant hashtags

CRITICAL RULES:
- Output ONLY the ready-to-post caption.
- Do NOT include any intro like "Here is your post" or "Sure!".
- Do NOT include image descriptions like "(Image: ...)" or markdown horizontal dividers (---).
- Maximum total length must be UNDER 1,400 characters (Instagram limit is 2,200).`;

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);

      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          let text = result.response.text();
          
          // Clean any conversational filler or image descriptions from AI response
          text = cleanInstagramCaption(text);
          console.log(`✓ [AI Caption Engine] Generated via Gemini AI API (${modelName}, ${text.length} chars).`);
          return text;
        } catch (err) {
          const errMsg = err.message || '';
          if (
            errMsg.includes('API_KEY_INVALID') ||
            errMsg.includes('API key not valid') ||
            errMsg.includes('denied access') ||
            errMsg.includes('403 Forbidden')
          ) {
            console.warn(`⚠️ [AI Caption Engine] Gemini API access denied with current GEMINI_API_KEY (${errMsg.split('\n')[0]}).`);
            console.warn(`ℹ️ [AI Caption Engine] To enable live AI generation, create a free API key at https://aistudio.google.com/app/apikey (keys start with "AIzaSy...") and paste it into automation/.env`);
            break;
          }
          console.warn(`⚠️ [AI Caption Engine] Model "${modelName}" call failed (${errMsg.split('\n')[0]}). Trying fallback...`);
        }
      }
    } catch (err) {
      console.warn(`⚠️ [AI Caption Engine] Gemini initialization error: ${err.message}`);
    }

    console.warn(`⚠️ [AI Caption Engine] Using smart fallback synthesizer.`);
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
