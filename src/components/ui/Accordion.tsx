'use client'

import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

type AccordionItem = {
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className="border border-neutral-200 rounded-soft overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-tikaram-off-white transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <h4 className="font-serif text-lg lg:text-2xl font-semibold text-tikaram-charcoal">
                {item.title}
              </h4>
              <ChevronDown
                className={clsx(
                  'w-5 h-5 text-tikaram-charcoal transition-transform duration-300 flex-shrink-0 ml-4',
                  isOpen && 'transform rotate-180'
                )}
              />
            </button>
            <div
              className={clsx(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="p-6 pt-0">
                <div className="font-sans text-base lg:text-lg text-tikaram-charcoal/80 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

