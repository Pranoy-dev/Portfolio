"use client"

import { usePathname } from "next/navigation"

export type NavId = "home" | "interest" | "bio"

export const navRoutes: Record<NavId, string> = {
  home: "/",
  interest: "/interest",
  bio: "/bio",
}

export function useNavHash() {
  const pathname = usePathname()

  const activeNav: NavId =
    pathname === "/interest" || pathname.startsWith("/case-study")
      ? "interest"
      : pathname === "/bio"
        ? "bio"
        : "home"

  return { pathname, activeNav, navRoutes }
}
