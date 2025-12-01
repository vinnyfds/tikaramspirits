import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
