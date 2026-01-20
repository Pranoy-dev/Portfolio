"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createPortal } from "react-dom"

interface ImageExpansionProps {
  imageSrc: string
  imageAlt: string
  targetUrl: string
  children: React.ReactNode
}

export function ImageExpansion({ imageSrc, imageAlt, targetUrl, children }: ImageExpansionProps) {
  const [isExpanding, setIsExpanding] = useState(false)
  const [imageRect, setImageRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const [mounted, setMounted] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (imageRef.current) {
      // Find the image container (the div with the image)
      const imageContainer = imageRef.current.querySelector('[class*="relative"]') as HTMLElement
      
      if (imageContainer) {
        const rect = imageContainer.getBoundingClientRect()
        setImageRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
        setIsExpanding(true)
        
        // Navigate after expansion animation completes
        setTimeout(() => {
          router.push(targetUrl)
        }, 600)
      }
    }
  }

  return (
    <>
      <div ref={imageRef} onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      
      {mounted && isExpanding && imageRect && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black"
          style={{
            clipPath: `inset(${imageRect.top}px ${window.innerWidth - imageRect.left - imageRect.width}px ${window.innerHeight - imageRect.top - imageRect.height}px ${imageRect.left}px)`,
            transition: 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onTransitionEnd={(e) => {
            // After expansion, show full image
            if (e.currentTarget) {
              e.currentTarget.style.clipPath = 'inset(0)'
            }
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
