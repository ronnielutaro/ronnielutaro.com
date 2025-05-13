'use client';

import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { CheckCircle } from '../../node_modules/@phosphor-icons/react';
import { cn } from '../lib/utils';

interface SubscribeProps {
  redisApiEndpoint?: string;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  stackButtonOnMobile?: boolean;
}

const Subscribe: React.FC<SubscribeProps> = ({
  redisApiEndpoint = '/api/subscribe',
  className = '',
  containerClassName = '',
  inputClassName = '',
  buttonClassName = '',
  stackButtonOnMobile = false,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showSubscribedMessage, setShowSubscribedMessage] =
    useState<boolean>(false);

  // Check if user is already subscribed when component mounts
  useEffect(() => {
    const subscriptionStatus = localStorage.getItem('isSubscribed');
    if (subscriptionStatus === 'true') {
      setIsSubscribed(true);
      // We don't show the message on initial load, only after submission
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('Email cannot be empty.');
      return;
    }

    setLoading(true);
    setMessage('');
    setFadeOut(false);
    setShowSubscribedMessage(false); // Reset the message visibility

    try {
      const response = await fetch(redisApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.alreadySubscribed) {
        setMessage('You are already subscribed!');
        setIsSubscribed(true);
        setShowSubscribedMessage(false); // Message is shown in the regular message area
      } else {
        setMessage('Thank you for subscribing!');
        setEmail('');
        setIsSubscribed(true);
        setShowSubscribedMessage(false); // Message is shown in the regular message area
      }

      localStorage.setItem('isSubscribed', 'true');
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);

      // Clear the message after 5 seconds with fade-out effect
      setTimeout(() => setFadeOut(true), 4000);
      setTimeout(() => {
        setMessage('');
        // Only show the persistent subscribed message after form submission
        // and after the temporary message fades out
        if (isSubscribed) {
          setShowSubscribedMessage(true);
        }
      }, 5000);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <form
        onSubmit={handleSubmit}
        className={cn('flex flex-col gap-2', containerClassName)}
      >
        <div
          className={cn(
            stackButtonOnMobile
              ? 'flex flex-col sm:flex-row gap-1 sm:gap-2'
              : 'flex gap-2',
          )}
        >
          <input
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className={cn(
              `
              w-full
              px-4
              py-2.5
              rounded-md
              text-md
              sm:text-base
              border
              border-border
              bg-input
              text-foreground
              placeholder-muted-foreground/60
              dark:placeholder-[#999999]
              focus:outline-none
              focus:ring-1
              focus:ring-ring
              disabled:opacity-70
              transition-colors
            `,
              inputClassName,
            )}
          />
          <button
            type="submit"
            disabled={loading}
            className={cn(
              `
              px-5
              py-2.5
              bg-primary
              text-primary-foreground
              hover:bg-primary-hover
              active:bg-primary-hover
              active:scale-96
              rounded-md
              text-md
              sm:text-base
              font-semibold
              border
              border-primary
              transition-colors
              transition-transform
              duration-200
              ease-in-out
              whitespace-nowrap
              disabled:opacity-70
              min-w-[100px]
              flex
              justify-center
              items-center
              flex-shrink-0
              ${stackButtonOnMobile ? 'w-full sm:w-auto' : ''}
            `,
              buttonClassName,
            )}
          >
            {loading ? (
              <ClipLoader size={15} color="currentColor" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
        {!isSubscribed && (
          <p className="text-xs font-mono mt-3 sm:mt-0 text-left text-gray-600 dark:text-[#999999]">
            * Unsubscribe anytime
          </p>
        )}
        {isSubscribed && !message && (
          <p className="text-xs font-mono mt-3 sm:mt-0 text-left text-green-700 dark:text-green-500 flex items-center gap-1">
            <CheckCircle size={14} />
            You are already subscribed
          </p>
        )}
        {message && (
          <p
            className={`
              text-xs font-mono mt-3 sm:mt-0 text-left
              ${
                message.includes('Thank you') ||
                message.includes('already subscribed')
                  ? 'text-green-700 dark:text-green-500'
                  : 'text-red-600 dark:text-red-400'
              } transition-opacity duration-1000 ease-out
              ${fadeOut ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {message}
          </p>
        )}
        {isSubscribed && !message && showSubscribedMessage && (
          <p className="text-action text-sm">You are already subscribed!</p>
        )}
      </form>
    </div>
  );
};

export default Subscribe;
