import React, { HTMLAttributes } from 'react';

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {}

export default function FeatureCard({ children, className = '', ...props }: FeatureCardProps) {
  return (
    <div
      className={`card-feature ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
