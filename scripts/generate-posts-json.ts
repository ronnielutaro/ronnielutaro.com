// scripts/generate-posts-json.ts
import { generatePostsJson } from '../src/__samwise/utils/generatePostsJson'; // Adjust the path as needed

(async () => {
  console.log('🚀 Starting posts.json generation...');
  try {
    await generatePostsJson();
    console.log('🎉 posts.json generation completed successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error during posts.json generation:', error.message);
    } else {
      console.error('❌ Unknown error during posts.json generation:', error);
    }
  }
})();
