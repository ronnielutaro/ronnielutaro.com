import type React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LatexProps {
  math: string;
  block?: boolean;
  size?: 'small' | 'medium' | 'large' | 'x-large';
}

export const Latex: React.FC<LatexProps> = ({
  math,
  block = false,
  size = 'medium',
}) => {
  // Map size names to scale values
  const sizeMap = {
    small: 1,
    medium: 1.2,
    large: 1.5,
    'x-large': 2,
  };

  const scale = sizeMap[size];

  const style = {
    fontSize: `${scale}em`,
  };

  return block ? (
    <div style={style}>
      <BlockMath math={math} />
    </div>
  ) : (
    <span style={style}>
      <InlineMath math={math} />
    </span>
  );
};

// Enhanced versions with preset sizes
export const LargeInlineMath: React.FC<{ math: string }> = ({ math }) => (
  <span style={{ fontSize: '1.5em' }}>
    <InlineMath math={math} />
  </span>
);

export const LargeBlockMath: React.FC<{ math: string }> = ({ math }) => (
  <div style={{ fontSize: '1.5em' }}>
    <BlockMath math={math} />
  </div>
);
