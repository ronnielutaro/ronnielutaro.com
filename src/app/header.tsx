import ThemeSwitcher from '@/components/theme-switcher';
import { Logo } from './logo';
import { SOCIAL_URLS, CTA_SOCIAL_PLATFORM } from '@/config';
import { SocialIcon } from '@/components/social-icon';
import type { SocialPlatform } from '@/__samwise/types/SocialPlatform';
import ActiveLink from './active-link';

// Mappings
const ctaLabels: Record<SocialPlatform, string> = {
  twitter: 'Follow me',
  instagram: 'Follow me',
  github: 'Source code',
  linkedin: 'Connect now',
  youtube: 'Subscribe',
  strava: 'Follow me',
  reddit: 'Join me',
  patreon: 'Support me',
  tiktok: 'Follow me',
  rss: 'Subscribe',
};

const urlMapping: Record<SocialPlatform, string> = {
  github: SOCIAL_URLS.github,
  twitter: SOCIAL_URLS.twitter,
  linkedin: SOCIAL_URLS.linkedin,
  reddit: SOCIAL_URLS.reddit,
  strava: SOCIAL_URLS.strava,
  instagram: SOCIAL_URLS.instagram,
  tiktok: SOCIAL_URLS.tiktok,
  youtube: SOCIAL_URLS.youtube,
  patreon: SOCIAL_URLS.patreon,
  rss: SOCIAL_URLS.rss,
};

// Main server component
export default function Header() {
  const ctaPlatform = CTA_SOCIAL_PLATFORM as SocialPlatform;
  const ctaUrl = urlMapping[ctaPlatform];
  const ctaLabel = ctaLabels[ctaPlatform];

  // Split the CTA label so we can hide extra words on mobile
  const words = ctaLabel?.split(' ') ?? [];
  const [firstWord, ...rest] = words;

  return (
    <header className="z-10 bg-background">
      <div className="max-w-2xl mx-auto flex items-center ">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right: Navbar Links */}
        <nav className="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
          <ThemeSwitcher />
          <ActiveLink href="/blog">Blog</ActiveLink>

          {/* CTA Social Icon Link */}
          {ctaUrl && ctaLabel && (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-after inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-2 rounded-md transition-[background-color] whitespace-nowrap -mr-2"
            >
              <SocialIcon
                platform={ctaPlatform}
                width="13"
                height="13"
                className="mr-1.5 w-4 h-4 text-[#222222] dark:text-[#fcfcfc]"
              />
              {/* Render first word always, additional words only on sm+ */}
              {firstWord}
              {rest.length > 0 && (
                <span className="hidden sm:inline ml-2">{rest.join(' ')}</span>
              )}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
