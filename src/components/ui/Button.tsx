import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles =
    'font-sans text-sm uppercase tracking-widest font-semibold px-6 py-3 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-[#D4AF37] text-[#004225] hover:bg-[#B8941F] hover:translate-y-[-2px] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] active:scale-95',
    secondary:
      'bg-[#004225] text-[#FFFDD0] border-2 border-[#D4AF37] hover:bg-[#004225]/90 hover:translate-y-[-2px] active:scale-95',
    outline:
      'bg-transparent text-white border-2 border-white/20 hover:border-white hover:bg-white/10 hover:translate-y-[-2px] active:scale-95',
  }

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
