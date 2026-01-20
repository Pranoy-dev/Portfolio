"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface HeroImageScrollProps {
  imageSrc: string
  imageAlt: string
  initialHeight?: string
  finalHeight?: string
}

export function HeroImageScroll({ 
  imageSrc, 
  imageAlt, 
  initialHeight = "100vh",
  finalHeight = "200px"
}: HeroImageScrollProps) {
  const [imageHeight, setImageHeight] = useState(initialHeight)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      // Calculate height based on scroll position
      const maxScroll = 1000 // Pixels to scroll before image reaches final size
      const scrollProgress = Math.min(scrollTop / maxScroll, 1)
      
      // Convert initial and final heights to pixels for calculation
      const initialPx = window.innerHeight // 100vh
      const finalPx = parseInt(finalHeight) || 200
      
      // Ease out cubic for smooth animation
      const easedProgress = 1 - Math.pow(1 - scrollProgress, 3)
      
      // Interpolate between initial and final height
      const currentHeight = initialPx - (initialPx - finalPx) * easedProgress
      
      setImageHeight(`${Math.max(currentHeight, finalPx)}px`)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [finalHeight])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 md:left-[var(--sidebar-width)] left-0 right-0 z-[5] overflow-hidden group-data-[collapsible=icon]:md:left-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:md:left-0"
      style={{
        height: imageHeight,
        transition: 'height 0.1s ease-out',
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
    </div>
  )
}
