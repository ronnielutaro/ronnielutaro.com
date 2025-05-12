'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { markdown } from '@codemirror/lang-markdown';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify'; // Keep the toast import
import { compile } from '@mdx-js/mdx'; // MDX compiler

// Dynamically import CodeMirror
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
});

interface EditPostClientProps {
  slug: string;
  initialContent?: string;
}

export default function EditPostClient({
  slug,
  initialContent = '',
}: EditPostClientProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const AUTO_SAVE_TOAST_ID = 'auto-save-toast';
  const SYNTAX_ERROR_TOAST_ID = 'syntax-error-toast';

  // Function to validate MDX content
  const validateMDXContent = async (content: string) => {
    try {
      // Use MDX compiler to detect syntax issues
      await compile(content, { format: 'mdx' });
      toast.dismiss(SYNTAX_ERROR_TOAST_ID); // Clear any existing syntax error toast
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Syntax Error:', err.message);
        toast.error(
          `MDX Syntax Error: ${err.message}. Content will not be saved until the JavaScript/JSX syntax issue is resolved.`,
          {
            toastId: SYNTAX_ERROR_TOAST_ID,
            autoClose: false, // Keep the error toast visible until resolved
          },
        );
      } else {
        console.error('Unknown error:', err);
        toast.error(
          `An unexpected error occurred while validating MDX content.`,
          {
            toastId: SYNTAX_ERROR_TOAST_ID,
            autoClose: false,
          },
        );
      }
      return false;
    }
  };

  // Create the debounced save function
  const debouncedSave = useDebouncedCallback(
    async (currentContent) => {
      const isValid = await validateMDXContent(currentContent);

      if (!isValid) {
        return; // Do not save if content has syntax errors
      }

      setIsSaving(true);
      try {
        await axios.post(`/api/blog/save-post`, {
          slug,
          content: currentContent,
        });
        setIsSaving(false);
        toast.success('All changes saved.', {
          toastId: AUTO_SAVE_TOAST_ID,
        });
      } catch (error) {
        console.error('Error saving post:', error);
        setIsSaving(false);
        toast.error('Failed to save changes.', {
          toastId: AUTO_SAVE_TOAST_ID,
        });
      }
    },
    500, // Delay in milliseconds
  );

  // Flush pending saves on unmount
  useEffect(() => {
    return () => {
      debouncedSave.flush();
    };
  }, [debouncedSave]);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full border-none">
        <CodeMirror
          value={content}
          extensions={[markdown()]}
          onChange={(value) => {
            setContent(value);
            debouncedSave(value); // Call the debounced save function
          }}
          style={{ fontSize: '14px' }}
          theme={atomone}
        />
        {isSaving && (
          <div className="absolute top-2 right-2 text-gray-500 text-sm">
            Saving...
          </div>
        )}
      </div>
    </div>
  );
}
