import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-[var(--cb-accent)] text-white hover:bg-[var(--cb-accent-deep)]',
        variant === 'secondary' && 'border border-[var(--cb-line)] bg-white text-[var(--cb-ink)] hover:border-[var(--cb-ink)]',
        variant === 'ghost' && 'text-[var(--cb-muted)] hover:bg-white hover:text-[var(--cb-ink)]',
        className
      )}
      {...props}
    />
  );
}
