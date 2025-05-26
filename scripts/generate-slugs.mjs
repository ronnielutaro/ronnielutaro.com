// generate-slugs.js
import fs from 'fs';
import path from 'path';

(async () => {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const slugs = fs
    .readdirSync(postsDirectory)
    .filter((name) => fs.statSync(path.join(postsDirectory, name)).isDirectory());

  const outputPath = path.join(postsDirectory, 'slugs.json');
  fs.writeFileSync(outputPath, JSON.stringify(slugs, null, 2));

  console.log('✅ slugs.json regenerated successfully!');
})();
