import React, { InputHTMLAttributes } from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextInput({ label, id, className = '', ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      {label && (
        <label htmlFor={id} className="text-eyebrow text-ink-muted uppercase">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`input-text w-full transition-shadow disabled:bg-canvas-soft disabled:text-ink-muted disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    </div>
  );
}
