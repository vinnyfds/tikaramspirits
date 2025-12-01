'use client'

import { useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'

type ToastProps = {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose?: () => void
  duration?: number
}

export function Toast({ message, type = 'info', onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const typeStyles = {
    success: {
      bg: 'bg-[#D4AF37]',
      text: 'text-[#004225]',
      icon: CheckCircle2,
    },
    error: {
      bg: 'bg-[#B7410E]',
      text: 'text-white',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-[#36454F]',
      text: 'text-white',
      icon: Info,
    },
  }

  const styles = typeStyles[type]
  const Icon = styles.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx(
        'flex items-center gap-3 px-4 py-3 rounded-soft shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)]',
        styles.bg,
        styles.text
      )}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="font-sans text-sm flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className={clsx(
            'flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-white/50'
          )}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}

