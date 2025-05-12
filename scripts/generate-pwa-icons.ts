import { generatePwaIcons } from '../src/__samwise/utils/generateIcons'; // Adjust the path as needed
import path from 'path';

(async () => {
  try {
    // Call the generatePwaIcons function
    await generatePwaIcons('public/icon.webp');

    console.log('✅ PWA icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating PWA icons:', error);
  }
})();
