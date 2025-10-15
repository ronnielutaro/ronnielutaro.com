import React from 'react';

/**
 * Shared MDX component mappings for rendering markdown content
 * with consistent styling across the application.
 * 
 * These components map standard HTML elements to styled React components,
 * ensuring all MDX content has a consistent look and feel.
 */
export const baseMDXComponents = {
  // Headings
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-white mb-6" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold text-white mb-4 mt-8" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold text-white mb-3 mt-6" {...props} />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold text-white mb-2 mt-4" {...props} />
  ),
  
  // Paragraphs
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
     <p className="text-lg text-white/90 leading-relaxed mb-4" {...props} />
  ),
  
  // Lists
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
     <ul className="space-y-2 mb-4" {...props} />
  ),
  ol: ({ children, type: _type, ...props }: React.HTMLProps<HTMLOListElement>) => (
     <ol className="space-y-2 mb-4 list-decimal list-inside" {...props}>{children}</ol>
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
     <li className="text-lg text-white/90 flex items-start gap-3" {...props} />
  ),
  
  // Links
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a 
      className="text-blue-400 hover:text-blue-300 underline transition-colors" 
      {...props} 
    />
  ),
  
  // Emphasis
  strong: (props: React.HTMLProps<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: React.HTMLProps<HTMLElement>) => (
    <em className="italic text-white/90" {...props} />
  ),
  
  // Code
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code 
      className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono" 
      {...props} 
    />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre 
      className="bg-white/5 text-white/90 p-4 rounded-lg overflow-x-auto mb-6 font-mono text-sm" 
      {...props} 
    />
  ),
  
  // Blockquote
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-blue-400 pl-4 italic text-white/70 my-6" 
      {...props} 
    />
  ),
  
  // Horizontal Rule
  hr: (props: React.HTMLProps<HTMLHRElement>) => (
    <hr 
      className="my-8 border-t border-white/20" 
      {...props} 
    />
  ),
};

/**
 * Utility function to merge base MDX components with custom components.
 * Useful when you need to add page-specific components while keeping the base styling.
 * 
 * @param customComponents - Additional or overriding components
 * @returns Merged component object
 */
export function createMDXComponents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customComponents: Record<string, React.ComponentType<any>> = {}
) {
  return {
    ...baseMDXComponents,
    ...customComponents,
  };
}
