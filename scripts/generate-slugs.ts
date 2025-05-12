// generate-slugs.js
import { generateSlugsJson } from '../src/__samwise/utils/generateSlugs'; // Adjust the path as needed

(async () => {
  try {
    await generateSlugsJson();
    console.log('✅ slugs.json generated successfully!');
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error('❌ Error generating slugs.json:', error.message);
    } else {
      console.error('❌ Unknown error generating slugs.json:', error);
    }
  }
})();
