'use client';

import React, { useEffect, useRef, useState } from 'react';
import Subscribe from './subscribe';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NewsletterProps {
  title?: string;
  subtitle?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  title = 'Hold Up',
  subtitle = "Like what you're reading? Subscribe to get notified when I publish new posts.",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }, // Trigger when 95% of the element is visible
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const currentRef = ref.current;

    return () => {
      // Use the stable reference
      if (currentRef) {
        // Cleanup logic here
      }
    };
  }, [ref]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.7, // Quicker animation (0.7 second)
        scale: { type: 'spring', bounce: 0.4, duration: 0.8 },
      }}
      className="
        p-0 sm:py-6 sm:px-5 rounded-xl
        border border-border 
        relative overflow-hidden
        bg-accent dark:bg-secondary
        text-accent-foreground dark:text-secondary-foreground
        shadow-sm
      "
    >
      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className="w-full mx-auto flex flex-col sm:flex-row sm:gap-5 items-start sm:items-center relative z-10">
        {/* Image - full width on mobile with 200px height, side-by-side on desktop */}
        <div className="w-full h-[200px] sm:w-1/3 sm:h-auto flex-shrink-0 overflow-hidden sm:rounded-lg sm:shadow-md">
          <Image
            src="/images/newsletter/giraffes.webp"
            alt="Newsletter image"
            width={600}
            height={400}
            priority
            className="w-full h-full object-cover sm:rounded-lg"
          />
        </div>

        {/* Content - padding only on mobile */}
        <div className="flex-1 flex flex-col justify-center items-start text-left p-4 sm:p-0">
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 sm:mb-2">
            {title}
          </h2>
          {/* Description */}
          <p className="mb-3 sm:mb-6 text-base text-muted-foreground">
            {subtitle}
          </p>
          {/* Subscribe Form */}
          <Subscribe
            className="w-full"
            stackButtonOnMobile={true}
            inputClassName="
              bg-accent-foreground/5 dark:bg-transparent
              text-accent-foreground dark:text-white
              border-accent-foreground/20 dark:border-white/30
              placeholder-accent-foreground/50 dark:placeholder-white/50
              text-md sm:text-sm
            "
            buttonClassName="
              bg-black text-white
              border-black hover:bg-black/90
              dark:bg-white dark:text-black
              dark:border-white dark:hover:bg-white/90
              px-3 sm:px-5
              text-sm sm:text-sm
              mt-1 sm:mt-0
            "
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
