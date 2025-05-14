// config.ts
import configData from '../samwise.config.json';

export const PRODUCTION_URL = configData.PRODUCTION_URL;

export const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : PRODUCTION_URL;

export const AUTHOR = {
  ...configData.AUTHOR,
  url: `${PRODUCTION_URL}/about`,
};

export const USE_LOGO_IN_NAVBAR = configData.USE_LOGO_IN_NAVBAR;

export const SOCIAL_URLS = configData.SOCIAL_URLS;

export const GA_MEASUREMENT_ID = configData.GA_MEASUREMENT_ID;
export const VERCEL_ANALYTICS = configData.VERCEL_ANALYTICS;
export const DEFAULT_KEYWORDS = configData.DEFAULT_KEYWORDS;
export const DEFAULT_COUNTER_ID = configData.DEFAULT_COUNTER_ID; // Include this line
export const IS_BLOG_USER_CONFIGURED =
  configData.IS_BLOG_USER_CONFIGURED || true;

export const USE_LOGO_FOR_HEADSHOT = configData.USE_LOGO_FOR_HEADSHOT;
export const USE_ARCHIVE = configData.USE_ARCHIVE;
export const ARCHIVE_ITEMS_TO_SHOW = configData.ARCHIVE_ITEMS_TO_SHOW;
export const CTA_SOCIAL_PLATFORM = configData.CTA_SOCIAL_PLATFORM;
