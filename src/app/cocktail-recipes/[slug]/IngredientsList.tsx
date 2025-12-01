'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export function IngredientsList({ ingredients }: { ingredients: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checked)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setChecked(newChecked)
  }

  return (
    <ul className="space-y-4">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="flex items-start gap-4">
          <button
            onClick={() => toggleCheck(index)}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-soft border-2 flex items-center justify-center transition-all duration-200 ${
              checked.has(index)
                ? 'bg-[#D4AF37] border-[#D4AF37]'
                : 'bg-white border-[#36454F]/30 hover:border-[#D4AF37]'
            }`}
            aria-label={`Toggle ${ingredient}`}
          >
            {checked.has(index) && (
              <Check className="w-4 h-4 text-[#004225] stroke-[3]" />
            )}
          </button>
          <span
            className={`font-sans text-base lg:text-lg text-[#36454F] flex-1 ${
              checked.has(index) ? 'line-through opacity-60' : ''
            }`}
          >
            {ingredient}
          </span>
        </li>
      ))}
    </ul>
  )
}

