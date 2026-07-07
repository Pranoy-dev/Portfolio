"use client"

import { Check, Copy, X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { contactDetails } from "@/data/contact"
import { cn } from "@/lib/utils"

function CopyableField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex items-start justify-between gap-4 border-b border-zinc-200/70 py-4 last:border-b-0 dark:border-zinc-800/70">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        <p className="mt-1 text-[15px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors",
          "border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
        )}
        aria-label={`Copy ${label.toLowerCase()}`}
      >
        {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}

export function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl" />
      <div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-2xl shadow-black/20 sm:rounded-3xl dark:border-zinc-800/70 dark:bg-[#161617]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200/70 px-6 py-5 dark:border-zinc-800/70">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
              Get in touch
            </p>
            <h2
              id="contact-modal-title"
              className="mt-1 font-sans text-xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]"
            >
              Contact
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Close contact modal"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-6 py-2">
          <CopyableField label="Name" value={contactDetails.name} />
          <CopyableField label="Email" value={contactDetails.email} />
          <CopyableField label="Phone" value={contactDetails.phone} />
          <div className="border-b border-zinc-200/70 py-4 last:border-b-0 dark:border-zinc-800/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
              Location
            </p>
            <p className="mt-1 text-[15px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
              {contactDetails.location}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
