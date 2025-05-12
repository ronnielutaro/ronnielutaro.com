import React from 'react';
import Link from 'next/link';

type ArrowButtonProps = {
  url: string;
  label: string;
};

const LinkButton: React.FC<ArrowButtonProps> = ({ url, label }) => {
  return (
    <Link
      href={url}
      className={`
        flex items-center justify-center w-12 h-12 text-white
        bg-[#222222] dark:bg-white dark:text-black
        transition-[border-radius] duration-300 ease-out
        rounded-[0.8rem] hover:rounded-[1.1rem]
      `}
    >
      <span className="sr-only">{label}</span>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35 32"
        width="26"
        height="26"
        className="text-current"
        aria-label={label}
        role="img"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="m18.564 1.257 14.523 14.524-14.524 14.524M.475 15.784h31.747"
        />
      </svg>
    </Link>
  );
};

export default LinkButton;
