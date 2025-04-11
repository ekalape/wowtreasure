import clsx from 'clsx';
import React, { cache, DetailedHTMLProps } from 'react';

interface BUttonPropsType
  extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ appearance, children, className, ...props }: BUttonPropsType) {
  cache;
  return (
    <button className={clsx(appearance, className)} {...props}>
      {children}
    </button>
  );
}
