'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from '@phosphor-icons/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  title?: string;
  type?: 'blur' | 'overlay' | 'none';
  showCloseButton?: boolean;
  width?: 'auto' | 'full' | 'responsive';
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '50%',
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 50 },
      opacity: { duration: 0.2, ease: 'easeInOut' },
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 50 },
      opacity: { duration: 0.4, ease: 'easeInOut' },
    },
  },
  exit: {
    opacity: 0,
    y: '50%',
    transition: {
      y: { type: 'spring', stiffness: 300, damping: 30 },
      x: { duration: 0.2, ease: 'easeInOut' },
      opacity: { duration: 0.2, ease: 'easeInOut' },
    },
  },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  title,
  type = 'overlay',
  showCloseButton = true,
  width = 'auto',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Get the current scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      // Save the current padding
      const currentPaddingRight =
        parseInt(getComputedStyle(document.body).paddingRight) || 0;

      // Apply overflow hidden and compensate for scrollbar
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
      document.body.classList.add('overflow-hidden');
    } else {
      // Remove the style and class
      document.body.style.paddingRight = '';
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const getOverlayClasses = () => {
    switch (type) {
      case 'blur':
        return 'bg-primary-foreground/85 backdrop-blur-sm';
      case 'overlay':
        return 'bg-black/50';
      case 'none':
        return 'shadow-xl shadow-primary-foreground';
      default:
        return 'bg-black/50';
    }
  };

  const getModalClasses = () => {
    let baseClasses =
      'bg-background min-w-md text-card-foreground rounded-2xl shadow-lg m-4 relative';

    // Add width classes based on the width prop
    if (width === 'full') {
      baseClasses += ' w-[calc(100%-2rem)]';
    } else if (width === 'responsive') {
      baseClasses += ' w-[90%] md:w-auto md:min-w-[300px]';
    } else {
      baseClasses += ' w-auto';
    }

    return type === 'overlay'
      ? baseClasses
      : `${baseClasses} border border-border`;
  };

  // Only render the modal content if we're in the browser
  if (!mounted) {
    return null;
  }

  // Create the modal content
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto ${getOverlayClasses()}`}
          onClick={handleOverlayClick}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={getModalClasses()}
            onClick={(e) => e.stopPropagation()}
          >
            {title ? (
              // When there is a title, show the title bar with optional close button
              <div className="flex justify-between items-center p-6 border-b border-border">
                <h2 className="text-xl font-semibold">{title}</h2>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-3 rounded-md hover:bg-muted text-foreground transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={16} weight="bold" />
                  </button>
                )}
              </div>
            ) : (
              // If no title but we want a close button, add it in the top right
              showCloseButton && (
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-muted text-foreground transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>
              )
            )}

            {/* Modal content */}
            <div className={`p-6 ${!title && showCloseButton ? 'pt-12' : ''}`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
};

export default Modal;
