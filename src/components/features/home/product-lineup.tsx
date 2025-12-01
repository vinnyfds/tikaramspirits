'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProducts, type Product } from '@/lib/data'

// Map product slugs to correct image file names
const bottleImageMap: Record<string, string> = {
  'ponce-de-leon-rum': 'bottle-ponce-rum.png',
  'florida-bourbon': 'bottle-florida-bourbon.png',
  'paan-liqueur': 'bottle-paan-liqueur.png',
  'tikaram-tequila': 'bottle-tequila.png',
  'tikaram-keylime-tequila': 'bottle-keylime.png',
}

export function ProductLineup() {
  const products = getAllProducts()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sliderBarRef = useRef<HTMLDivElement>(null)
  const sliderThumbRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSliderDragging, setIsSliderDragging] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [viewportRatio, setViewportRatio] = useState(0)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const isDraggingRef = useRef(false)
  const sliderDragStartRef = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start drag if clicking on the container background, not on a product link/image
    const target = e.target as HTMLElement
    if (target.closest('a') || target.tagName === 'IMG') {
      return
    }
    
    if (!scrollContainerRef.current) return
    
    isDraggingRef.current = true
    setIsDragging(true)
    startXRef.current = e.pageX
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
    
    // Prevent text selection while dragging
    e.preventDefault()
  }

  // Update scroll progress and viewport ratio based on scroll
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!scrollContainerRef.current) return
      
      const container = scrollContainerRef.current
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      const maxScroll = scrollWidth - clientWidth
      
      // Calculate scroll progress (0-100)
      const progress = maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
      
      // Calculate viewport ratio for dynamic thumb width
      const ratio = clientWidth / scrollWidth
      setViewportRatio(Math.min(ratio, 1))
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollProgress)
      updateScrollProgress() // Initial update
      
      // Also update on resize
      window.addEventListener('resize', updateScrollProgress)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollProgress)
      }
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [products.length])

  useEffect(() => {
    let animationFrameId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (isSliderDragging && sliderBarRef.current && scrollContainerRef.current) {
        // Slider dragging - smooth synchronous scroll
        e.preventDefault()
        const sliderBar = sliderBarRef.current
        const rect = sliderBar.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
        
        const container = scrollContainerRef.current
        const maxScroll = container.scrollWidth - container.clientWidth
        const targetScroll = (percentage / 100) * maxScroll
        
        // Use requestAnimationFrame for smooth scrolling
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
        
        animationFrameId = requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            // Direct scrollLeft assignment for smooth synchronous movement
            scrollContainerRef.current.scrollLeft = targetScroll
            setScrollProgress(percentage)
          }
        })
      } else if (isDraggingRef.current && scrollContainerRef.current) {
        // Container dragging
        e.preventDefault()
        const x = e.pageX
        const walk = (x - startXRef.current) * 1.5 // Smooth scroll multiplier
        scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      setIsDragging(false)
      setIsSliderDragging(false)
    }

    if (isDragging || isSliderDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isDragging, isSliderDragging])

  // Prevent link navigation when dragging
  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only start drag if clicking on the container background, not on a product link/image
    const target = e.target as HTMLElement
    if (target.closest('a') || target.tagName === 'IMG') {
      return
    }
    
    if (!scrollContainerRef.current) return
    isDraggingRef.current = true
    setIsDragging(true)
    startXRef.current = e.touches[0].pageX
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.touches[0].pageX
    const walk = (x - startXRef.current) * 1.5
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
    setIsDragging(false)
  }

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSliderDragging(true)
    sliderDragStartRef.current = e.clientX
  }

  const handleSliderClick = (e: React.MouseEvent) => {
    if (!sliderBarRef.current || !scrollContainerRef.current) return
    
    const sliderBar = sliderBarRef.current
    const rect = sliderBar.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    
    const container = scrollContainerRef.current
    const maxScroll = container.scrollWidth - container.clientWidth
    container.scrollTo({
      left: (percentage / 100) * maxScroll,
      behavior: 'smooth'
    })
    setScrollProgress(percentage)
  }

  return (
    <section className="bg-tikaram-off-white pt-24 pb-32">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 px-4 relative z-10">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#B7410E] uppercase tracking-wide mb-4">
            LET&apos;S GET TO KNOW EACH OTHER
          </h2>
          <p className="font-serif text-base lg:text-lg text-neutral-700 max-w-2xl mx-auto">
            We&apos;re proud to craft Florida&apos;s finest spirits, blending tradition with innovation to create exceptional flavors that honor our heritage.
          </p>
        </div>

        {/* Dynamic Title Stage */}
        <div className="h-20 flex items-center justify-center mb-2">
          <h3 className={`font-serif text-2xl lg:text-4xl font-bold text-[#8B0000] uppercase tracking-tight transition-opacity duration-300 ${
            activeProduct ? 'opacity-100' : 'opacity-0'
          }`}>
            {activeProduct?.headline || ''}
          </h3>
        </div>

        {/* Product Row */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex overflow-x-auto snap-x snap-mandatory px-4 gap-4 lg:overflow-hidden lg:pl-12 lg:pr-12 lg:gap-8 mt-24 pt-16 ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          } scrollbar-hide`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => {
            const bottleImagePath = `/assets/products/${bottleImageMap[product.slug] || `bottle-${product.slug}.png`}`
            
            return (
              <Link
                key={product.slug}
                href={`/spirits/${product.slug}`}
                onClick={handleLinkClick}
                onMouseEnter={() => setActiveProduct(product)}
                onMouseLeave={() => setActiveProduct(null)}
                className="group relative flex-shrink-0 snap-center"
              >
                {/* Bottle Image */}
                <div className="relative h-[300px] lg:h-[450px] transition-transform duration-500 ease-out group-hover:scale-110">
                  <Image
                    src={bottleImagePath}
                    alt={product.headline}
                    width={200}
                    height={450}
                    className="h-full w-auto object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))' }}
                  />
                </div>

                {/* Info Card - Appears on Hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[240px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none lg:pointer-events-auto z-20">
                  <div className="bg-[#F9F9F7] rounded-[1.5rem] shadow-xl p-5">
                    {/* Description */}
                    <p className="font-sans text-sm text-neutral-700 mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Proof/ABV Metadata */}
                    {product.subhead && (
                      <p className="font-sans text-xs text-neutral-600 mb-4">
                        {product.subhead}
                      </p>
                    )}
                    
                    {/* Learn More Button */}
                    <div className="font-sans text-sm font-bold text-[#B7410E] uppercase tracking-wide text-center">
                      LEARN MORE &gt;
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Custom Slider Bar - Desktop Only */}
        <div className="hidden lg:flex justify-center mt-6">
          <div className="w-[300px]">
            <div
              ref={sliderBarRef}
              onClick={handleSliderClick}
              className="relative h-1 bg-neutral-300 rounded-full cursor-pointer"
            >
              {/* Dynamic proportional thumb */}
              <div
                ref={sliderThumbRef}
                onMouseDown={handleSliderMouseDown}
                className={`absolute top-1/2 -translate-y-1/2 h-1 bg-[#D4AF37] rounded-full transition-all duration-200 ${
                  isSliderDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{
                  width: `${Math.max(viewportRatio * 100, 10)}%`,
                  left: `${scrollProgress * (1 - viewportRatio)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

