// config.ts
import configData from '../samwise.config.json' with { type: 'json' };

export const PRODUCTION_URL = configData.PRODUCTION_URL;

export const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : PRODUCTION_URL;

export const AUTHOR = {
  ...configData.AUTHOR,
  url: `${PRODUCTION_URL}/about`,
};

export const SOCIAL_URLS = configData.SOCIAL_URLS;
export const GA_MEASUREMENT_ID = configData.GA_MEASUREMENT_ID;
export const DEFAULT_KEYWORDS = configData.DEFAULT_KEYWORDS;
export const USE_LOGO_IN_NAVBAR = configData.USE_LOGO_IN_NAVBAR;
export const USE_LOGO_FOR_HEADSHOT = configData.USE_LOGO_FOR_HEADSHOT;
export const USE_ARCHIVE = configData.USE_ARCHIVE;
