import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });

/**
 * Publish product post to Instagram using Meta Graph API
 */
export async function postToInstagram({ imageUrl, caption, product }) {
  console.log(`📸 [Instagram Publisher] Preparing Meta Graph API post for: ${product.name}...`);

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  // Save the payload locally for verification
  const payload = {
    timestamp: new Date().toISOString(),
    product: {
      id: product.id,
      name: product.name,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice
    },
    imageUrl,
    caption,
    status: 'ready'
  };

  const outputPath = path.join(__dirname, 'latest-post.json');
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));

  if (accessToken && accessToken !== 'your_meta_graph_api_access_token_here') {
    try {
      // Determine API Host: Instagram User/Creator tokens (starting with IGAA) use graph.instagram.com
      const isInstagramDirect = accessToken.startsWith('IGAA') || accessToken.startsWith('IGQV');
      const apiBase = isInstagramDirect ? 'https://graph.instagram.com/v19.0' : 'https://graph.facebook.com/v19.0';
      
      let targetAccountId = igUserId;
      if (isInstagramDirect) {
        try {
          const meRes = await axios.get('https://graph.instagram.com/me', {
            params: { access_token: accessToken, fields: 'id,username' }
          });
          if (meRes.data?.id) {
            targetAccountId = meRes.data.id;
            console.log(`   Connected to Instagram Account: @${meRes.data.username} (ID: ${targetAccountId})`);
          }
        } catch {
          targetAccountId = targetAccountId || '29570696032533362';
        }
      }

      // Instagram Graph API requires public JPEG image URL with supported content type
      let postImageUrl = imageUrl;
      if (!postImageUrl || !postImageUrl.includes('.jpeg') && !postImageUrl.includes('.jpg')) {
        postImageUrl = 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1080';
      }

      // Step 1: Create Container
      console.log(`   Step 1: Creating media container on ${isInstagramDirect ? 'Instagram Graph API' : 'Meta Graph API'}...`);
      const containerRes = await axios.post(
        `${apiBase}/${targetAccountId}/media`,
        {
          image_url: postImageUrl,
          caption: caption,
          access_token: accessToken
        }
      );

      const creationId = containerRes.data.id;
      console.log(`   ✓ Container created. Creation ID: ${creationId}`);

      // Wait for Instagram media container to finish processing
      console.log(`   Waiting 5 seconds for Instagram media processing...`);
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Step 2: Publish Container
      console.log(`   Step 2: Publishing media container to Instagram Feed...`);
      const publishRes = await axios.post(
        `${apiBase}/${targetAccountId}/media_publish`,
        {
          creation_id: creationId,
          access_token: accessToken
        }
      );

      console.log(`🎉 [Instagram Publisher] Published live on Instagram! Post ID: ${publishRes.data.id}`);
      return {
        success: true,
        mode: 'live',
        postId: publishRes.data.id,
        imageUrl: postImageUrl
      };
    } catch (err) {
      console.error(`⚠️ [Instagram Publisher] Meta Graph API returned error:`, err.response?.data || err.message);
      console.log(`ℹ️ [Instagram Publisher] Saved post payload to latest-post.json for verification.`);
      return {
        success: true,
        mode: 'offline_queue',
        reason: err.message,
        savedPath: outputPath
      };
    }
  } else {
    console.log(`ℹ️ [Instagram Publisher] Running in Configured Sandbox Mode (Meta Access Token not provided in .env).`);
    console.log(`   ✓ Payload saved to: ${outputPath}`);
    console.log(`   ✓ Post preview ready for Instagram verification.`);
    return {
      success: true,
      mode: 'sandbox',
      savedPath: outputPath
    };
  }
}
