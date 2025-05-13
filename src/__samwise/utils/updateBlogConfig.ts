import { promises as fs } from 'fs';
import path from 'path';
import { BlogConfigData } from '../types/BlogConfig';
import { v4 as uuidv4 } from 'uuid';

const configPath = path.resolve(process.cwd(), 'samwise.config.json');

export async function updateBlogConfig(body: BlogConfigData) {
  // Read the existing configuration file
  const configData = await fs.readFile(configPath, 'utf8');
  const config = JSON.parse(configData);

  // Update the configuration with the received data
  config.PRODUCTION_URL = body.vercelUrl;
  config.AUTHOR = {
    ...config.AUTHOR,
    name: body.fullName,
    publisherName: body.fullName,
    bio: body.bio,
    description: body.description,
    headshot: body.headshotData || config.AUTHOR.headshot,
  };
  config.USE_LOGO_IN_NAVBAR = body.useLogoInNavbar;
  config.USE_LOGO_FOR_HEADSHOT = body.useLogoForHeadshot;
  config.USE_ARCHIVE = body.useArchive;
  config.ARCHIVE_ITEMS_TO_SHOW = body.archiveItemsToShow;
  config.CTA_SOCIAL_PLATFORM = body.ctaSocialPlatform;

  // Map socialLinks to SOCIAL_URLS while preserving existing keys
  config.SOCIAL_URLS = {
    ...config.SOCIAL_URLS,
    ...Object.fromEntries(
      body.socialLinks.map((link) => [link.type, link.url]),
    ),
    email: body.email || config.SOCIAL_URLS.email,
  };

  // Update analytics and keywords
  config.GA_MEASUREMENT_ID = body.googleAnalyticsId || '';
  config.VERCEL_ANALYTICS = body.vercelAnalyticsEnabled || '';
  config.DEFAULT_KEYWORDS = body.keywords;
  if (!config.IS_BLOG_USER_CONFIGURED) {
    config.DEFAULT_COUNTER_ID = uuidv4();
  }
  config.IS_BLOG_USER_CONFIGURED = true;

  // Write the updated configuration back to the file
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));

  return { success: true, message: 'Configuration updated successfully.' };
}
