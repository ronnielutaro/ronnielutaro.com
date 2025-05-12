import Link from 'next/link';
import Image from 'next/image';
import { SocialPlatform } from '@/__samwise/types/SocialPlatform';
import { urlMapping, SocialIcon } from '@/components/social-icon';
import Subscribe from '@/components/subscribe';
import { HR } from '@/app/blog/components/hr';

export const urlMapping: Record<SocialPlatform, string> = {
  github: 'https://github.com/ronnielutaro',
  twitter: 'https://x.com/theronnielutaro',
  instagram: 'https://www.instagram.com/theronnielutaro/',
  reddit: '',
  tiktok: '',
  email: '',
  patreon: '',
  linkedin: 'https://www.linkedin.com/in/ronnie-lutaro-b73240aa/',
  youtube: 'https://www.youtube.com/@RonnieLutaro',
  rss: '/api/rss', // Ensure this points to the correct RSS feed endpoint
};

export default function Footer() {
  return (
    <>
      <footer className={`container max-w-2xl mx-auto py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Swapping order for mobile - Subscribe first, social links second */}
          {/* 1) Newsletter (First on mobile) */}
          <div className="md:order-2 w-full">
            <div className="mb-4 w-full">
              <Subscribe />
            </div>
          </div>

          {/* 2) Stay Connected (Second on mobile) */}
          <div className="md:order-1 w-full">
            <div className="flex flex-wrap w-full">
              {(
                [
                  'github',
                  'twitter',
                  'instagram',
                  'reddit',
                  'tiktok',
                  'email',
                  'patreon',
                  'linkedin',
                  'youtube',
                  'rss',
                ] as SocialPlatform[]
              ).map((platform) =>
                urlMapping[platform] ? (
                  <Link
                    key={platform}
                    href={urlMapping[platform]}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link inline-flex items-center mr-3 mt-2 text-gray-600 dark:text-[#999999]"
                  >
                    <SocialIcon platform={platform} />
                  </Link>
                ) : null,
              )}
            </div>
            {/* © Section */}
            <p className="mt-5 text-xs font-mono text-gray-600 dark:text-[#999999]">
              © {new Date().getFullYear()} Ronnie Lutaro
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
