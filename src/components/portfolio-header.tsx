"use client"

import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { Menu } from "lucide-react"
import * as React from "react"
import { ContactModal } from "@/components/contact-modal"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useNavHash, type NavId, navRoutes } from "@/hooks/use-nav-hash"
import { pageContent } from "@/lib/layout-tokens"
import { cn } from "@/lib/utils"

const navItems: Array<{ id: NavId; title: string }> = [
  { id: "home", title: "Home" },
  { id: "bio", title: "Bio" },
  { id: "interest", title: "Case studies" },
  { id: "worldview", title: "World view" },
]

const selectionSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.85,
}

const NAV_PILL_LAYOUT_ID = "header-nav-pill"

const contactButtonClass = cn(
  "rounded-full px-4 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition-colors",
  "bg-white/70 backdrop-blur-2xl backdrop-saturate-150",
  "supports-[backdrop-filter]:bg-white/55",
  "text-[#1d1d1f] hover:bg-white/90",
  "ring-1 ring-black/[0.06]",
  "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18),0_2px_6px_-2px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]",
  "dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/12 dark:ring-white/12",
  "dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),0_2px_6px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]",
)

function HeaderNavLink({
  id,
  title,
  isActive,
  onNavigate,
  className,
}: {
  id: NavId
  title: string
  isActive: boolean
  onNavigate: (id: NavId) => void
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      onClick={() => onNavigate(id)}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition-colors",
        isActive
          ? "text-[#1d1d1f] dark:text-white"
          : "text-[#1d1d1f]/65 hover:text-[#1d1d1f] dark:text-white/65 dark:hover:text-white",
        className,
      )}
    >
      {isActive && (
        <motion.span
          layoutId={reduceMotion ? undefined : NAV_PILL_LAYOUT_ID}
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-white shadow-[0_2px_8px_-1px_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.1)]",
            "ring-1 ring-black/[0.06]",
            "dark:bg-white/16 dark:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.5)]",
            "dark:ring-white/14",
          )}
          transition={reduceMotion ? { duration: 0 } : selectionSpring}
          aria-hidden
        />
      )}
      <span className="relative z-10">{title}</span>
    </button>
  )
}

export function PortfolioHeader() {
  const router = useRouter()
  const { activeNav } = useNavHash()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [contactOpen, setContactOpen] = React.useState(false)

  const navigate = React.useCallback(
    (id: NavId) => {
      setMobileOpen(false)
      router.push(navRoutes[id])
    },
    [router],
  )

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[calc(1rem+env(safe-area-inset-top,0px))]">
        <div className={cn(pageContent, "pointer-events-auto relative flex h-14 items-center justify-center gap-4")}>
          <nav
            aria-label="Main"
            className={cn(
              "hidden md:flex items-center gap-0.5 rounded-full p-1.5",
              "bg-white/70 backdrop-blur-2xl backdrop-saturate-150",
              "supports-[backdrop-filter]:bg-white/55",
              "ring-1 ring-black/[0.06]",
              "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18),0_2px_6px_-2px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]",
              "dark:bg-white/[0.08] dark:ring-white/12",
              "dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),0_2px_6px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]",
            )}
          >
            {navItems.map((item) => (
              <HeaderNavLink
                key={item.id}
                id={item.id}
                title={item.title}
                isActive={activeNav === item.id}
                onNavigate={navigate}
              />
            ))}
          </nav>

          <div className="absolute right-0 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setContactOpen(true)}
              className={contactButtonClass}
            >
              Contact
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "md:hidden size-10 rounded-full",
                "border border-black/[0.08] bg-white/40 backdrop-blur-md",
                "hover:bg-white/60 dark:border-white/12 dark:bg-white/8 dark:hover:bg-white/14",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-[18px]" />
            </Button>
          </div>
        </div>
      </header>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="top"
          className={cn(
            "rounded-b-[1.25rem] border-x-0 border-t-0 p-0",
            "bg-[#fbfbfd]/92 backdrop-blur-2xl backdrop-saturate-150",
            "supports-[backdrop-filter]:bg-[#fbfbfd]/80",
            "dark:bg-[#161617]/92 dark:supports-[backdrop-filter]:bg-[#161617]/80",
          )}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav
            aria-label="Main"
            className="flex flex-col gap-1 px-4 pb-6 pt-[calc(3.5rem+env(safe-area-inset-top,0px))]"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                aria-current={activeNav === item.id ? "page" : undefined}
                className={cn(
                  "rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors",
                  activeNav === item.id
                    ? "bg-black/[0.06] text-[#1d1d1f] dark:bg-white/10 dark:text-white"
                    : "text-[#1d1d1f]/70 hover:bg-black/[0.04] dark:text-white/70 dark:hover:bg-white/6",
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
