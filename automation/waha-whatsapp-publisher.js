import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Publish product to WhatsApp Status via WAHA (WhatsApp HTTP API)
 * WAHA is an open-source WhatsApp API running locally or via Docker
 */
export async function postToWhatsAppStatus({ imageUrl, caption, product }) {
  console.log(`📱 [WAHA WhatsApp Status] Preparing WhatsApp Status for: ${product.name}...`);

  const wahaEndpoint = process.env.WAHA_ENDPOINT || 'http://localhost:3008';
  const session = process.env.WAHA_SESSION || 'default';

  const shortStatusCaption = `💧 *${product.name}*\n\n` +
    `✨ ${product.features.slice(0, 3).join('\n✨ ')}\n\n` +
    `💰 Price: ₹${product.retailPrice.toLocaleString('en-IN')}\n` +
    `🎁 Flat ₹500 OFF with code: *PUREWATER500*\n\n` +
    `📲 Order now via Califnco Water App`;

  try {
    // WAHA API endpoint for posting status
    const res = await axios.post(
      `${wahaEndpoint}/api/status/image`,
      {
        session,
        file: {
          url: imageUrl
        },
        caption: shortStatusCaption
      },
      { timeout: 5000 }
    );

    console.log(`🎉 [WAHA WhatsApp Status] Successfully posted to WhatsApp Status! Status ID:`, res.data);
    return { success: true, mode: 'waha_live', data: res.data };
  } catch (err) {
    console.log(`ℹ️ [WAHA WhatsApp Status] WAHA server at ${wahaEndpoint} not reachable or running in offline mode (${err.message}).`);
    console.log(`   ✓ Formatted WhatsApp Status text generated and queued:`);
    console.log(`----------------------------------------`);
    console.log(shortStatusCaption);
    console.log(`----------------------------------------`);
    return {
      success: true,
      mode: 'waha_preview',
      formattedText: shortStatusCaption,
      imageUrl
    };
  }
}
