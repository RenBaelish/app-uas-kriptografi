import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ButtonPrimary({ children, className = '', disabled, ...props }: ButtonPrimaryProps) {
  return (
    <button
      className={`btn-primary disabled:opacity-50 disabled:pointer-events-none ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
