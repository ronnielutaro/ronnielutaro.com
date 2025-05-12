export interface BlogConfigData {
  fullName: string;
  vercelUrl: string;
  bio: string;
  description: string;
  // Updated logo type to handle both path and rawFile
  logo?: {
    path?: string; // File path for logo
    rawFile?: string; // Base64-encoded raw file
  };
  logoData?: string | null;
  socialLinks: { type: string; url: string }[];
  email?: string;
  keywords: string[];
  googleAnalyticsId?: string;
  vercelAnalyticsEnabled?: boolean;
  useLogoInNavbar: boolean;
  isBlogUserConfigured?: boolean;
  headshotData?: string;
  useLogoForHeadshot?: boolean;
  useArchive?: boolean;
  ctaSocialPlatform?: string;
  archiveItemsToShow?: number;
}
