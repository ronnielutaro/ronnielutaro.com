// utils/highlight.ts
import hljs from 'highlight.js';

/**
 * Highlights the given code using highlight.js.
 * @param code The code to highlight.
 * @param language The programming language (e.g., "javascript", "python").
 * @returns The highlighted code as an HTML string.
 */
export function getHighlightedCode(code: string, language?: string): string {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(code, { language }).value;
  }
  return hljs.highlightAuto(code).value; // Automatically detect the language
}
