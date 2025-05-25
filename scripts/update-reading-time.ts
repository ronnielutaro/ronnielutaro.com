import 'dotenv/config';
import { updateAllReadingTimes } from '../src/__samwise/utils/updateReadingTime';

(async () => {
  try {
    await updateAllReadingTimes();
    console.log('✅ Reading times updated successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error updating reading times:', error.message);
    } else {
      console.error('❌ Unknown error occurred while updating reading times.');
    }
    process.exit(1);
  }
})();
