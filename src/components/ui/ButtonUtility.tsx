import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonUtilityProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ButtonUtility({ children, className = '', disabled, ...props }: ButtonUtilityProps) {
  return (
    <button
      className={`btn-utility disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-50 transition-colors ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
