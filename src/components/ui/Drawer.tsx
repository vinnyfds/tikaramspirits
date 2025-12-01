'use client'

import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  side?: 'left' | 'right'
}

export function Drawer({ isOpen, onClose, children, side = 'right' }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 ${side === 'right' ? 'right-0' : 'left-0'} h-full w-80 max-w-[85vw] bg-[#004225] z-50 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20">
                <h2 className="font-serif text-xl font-bold text-[#D4AF37]">Menu</h2>
                <button
                  onClick={onClose}
                  className="text-[#D4AF37]/90 hover:text-[#D4AF37] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
