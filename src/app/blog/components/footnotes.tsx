'use client';

import { A } from './a';
import { P } from './p';
import { ReactNode, useCallback } from 'react';

interface FootNotesProps {
  children: ReactNode;
}

export const FootNotes = ({ children }: FootNotesProps) => (
  <div className="text-sm before:w-[200px] before:m-auto before:content[''] before:border-t before:border-gray-300 dark:before:border-[#444] before:block before:my-10">
    {children}
  </div>
);

interface RefProps {
  id: string | number;
}

export const Ref = ({ id }: RefProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      const element = document.getElementById(`f${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [id],
  );

  return (
    <a
      href={`#f${id}`}
      id={`s${id}`}
      className="relative text-xs top-[-5px] no-underline"
      onClick={handleClick}
    >
      [{id}]
    </a>
  );
};

interface FootNoteProps {
  id: string | number;
  children: ReactNode;
}

export const FootNote = ({ id, children }: FootNoteProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      const element = document.getElementById(`s${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [id],
  );

  return (
    <div>
      {id}.{' '}
      <A
        href={`#s${id}`}
        id={`f${id}`}
        className="no-underline"
        onClick={handleClick}
      >
        ^
      </A>{' '}
      {children}
    </div>
  );
};
