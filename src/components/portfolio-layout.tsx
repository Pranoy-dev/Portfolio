"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

function MobileNavTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={cn(
        "size-11 rounded-full border border-border/70 bg-background/95 shadow-md backdrop-blur-md",
        "hover:bg-muted/80 active:scale-95 transition-transform"
      )}
      aria-label="Open menu"
    >
      <Menu className="size-5" />
    </Button>
  )
}

/**
 * Pinterest-style shell on shadcn Sidebar:
 * - Desktop: fixed narrow icon rail (always collapsed)
 * - Mobile: full sidebar sheet via menu button
 */
export function PortfolioLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const isMobile = useIsMobile()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <SidebarProvider
      open={isMobile ? mobileOpen : false}
      onOpenChange={(open) => {
        if (isMobile) setMobileOpen(open)
      }}
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className={cn("min-h-svh overflow-x-hidden bg-background", className)}>
        <div className="fixed left-4 top-4 z-50 md:hidden">
          <MobileNavTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
