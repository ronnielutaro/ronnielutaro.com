import { ReactNode, Children } from 'react';

export function withHeadingId(children: ReactNode): ReactNode {
  return Children.map(children, (el) => {
    // Check if `el` is a string
    if (typeof el === 'string') {
      const re = /\[#([^\]]+)\]\s*$/m;
      const match = el.match(re);

      if (match && match[1]?.length) {
        return (
          <span className="relative">
            <a
              className={`
                absolute
                px-3
                -left-[2rem]
                invisible
                [span:hover_&]:visible
                font-mono
                font-normal
                text-gray-400
                hover:text-gray-600
                dark:text-gray-500
                dark:hover:text-gray-400
              `}
              href={`#${match[1]}`}
            >
              #
            </a>
            <a
              id={match[1]}
              className={`
              absolute
              -top-[20px]
            `}
            />
            {el.substring(0, match.index)} {/* Remove matched part */}
          </span>
        );
      }
    }

    // Return the element as-is if it's not a string or doesn't match the pattern
    return el;
  });
}
