"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebar } from "@/components/ui/sidebar"
import { type NavId, navRoutes } from "@/hooks/use-nav-hash"

export function useSidebarNavigation() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { setOpen } = useSidebar()

  const navigate = useCallback(
    (id: NavId) => {
      if (isMobile) setOpen(false)
      router.push(navRoutes[id])
    },
    [isMobile, router, setOpen]
  )

  return { navigate }
}
