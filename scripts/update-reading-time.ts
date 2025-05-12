import { updateAllReadingTimes } from '../src/__samwise/utils/updateReadingTime'; // Adjust the path as needed

(async () => {
  try {
    updateAllReadingTimes();
    console.log('✅ Reading times updated successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error updating reading times:', error.message);
    } else {
      console.error('❌ Unknown error occurred while updating reading times.');
    }
  }
})();
