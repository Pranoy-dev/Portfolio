"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Globe, Home, Sparkles, User } from "lucide-react"

import { PortfolioLogo } from "@/components/portfolio-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useNavHash, type NavId } from "@/hooks/use-nav-hash"
import { useSidebarNavigation } from "@/hooks/use-sidebar-navigation"
import { cn } from "@/lib/utils"

const navItems: Array<{
  id: NavId
  title: string
  icon: typeof Home
}> = [
  { id: "home", title: "Home", icon: Home },
  { id: "bio", title: "Bio", icon: User },
  { id: "interest", title: "Case studies", icon: Sparkles },
  { id: "worldview", title: "World view", icon: Globe },
]

const selectionSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.85,
}

const iconSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 28,
}

const NAV_SELECTION_LAYOUT_ID = "sidebar-nav-selection"

function NavItem({
  id,
  title,
  icon: Icon,
  isActive,
  showLabels,
  onNavigate,
}: {
  id: NavId
  title: string
  icon: typeof Home
  isActive: boolean
  showLabels: boolean
  onNavigate: (id: NavId) => void
}) {
  const reduceMotion = useReducedMotion()

  return (
    <SidebarMenuItem
      className={cn(
        "flex justify-center",
        !showLabels && "group-data-[collapsible=icon]:w-full"
      )}
    >
      <SidebarMenuButton
        isActive={isActive}
        tooltip={showLabels ? undefined : { children: title, sideOffset: 12 }}
        type="button"
        onClick={() => onNavigate(id)}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-xl bg-transparent!",
          "data-[active=true]:bg-transparent! data-[active=true]:shadow-none",
          "transition-[color] duration-200",
          showLabels
            ? "h-11 w-full justify-start gap-3 px-3"
            : cn(
                "h-9 w-9 justify-center p-0",
                "group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!p-0"
              )
        )}
      >
        {isActive && (
          <motion.span
            layoutId={reduceMotion ? undefined : NAV_SELECTION_LAYOUT_ID}
            className={cn(
              "pointer-events-none absolute inset-0 rounded-xl bg-sidebar-accent",
              "shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]",
              "dark:shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]"
            )}
            transition={reduceMotion ? { duration: 0 } : selectionSpring}
            aria-hidden
          />
        )}

        {!isActive && (
          <span
            className={cn(
              "pointer-events-none absolute inset-0 rounded-xl",
              "transition-colors duration-200 ease-out",
              "group-hover/menu-item:bg-sidebar-accent/50"
            )}
            aria-hidden
          />
        )}

        <motion.span
          className="relative z-10 flex shrink-0 items-center justify-center"
          initial={false}
          animate={{
            scale: isActive ? (reduceMotion ? 1 : 1.12) : 1,
            y: isActive && !reduceMotion ? -1 : 0,
          }}
          transition={reduceMotion ? { duration: 0 } : iconSpring}
        >
          <Icon
            className={cn(
              "shrink-0",
              showLabels ? "size-5" : "size-5",
              isActive
                ? "text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70"
            )}
            strokeWidth={isActive ? 2.5 : 1.75}
            fill={isActive ? "currentColor" : "none"}
          />
        </motion.span>

        {showLabels ? (
          <motion.span
            className={cn(
              "relative z-10 text-sm",
              isActive
                ? "font-semibold text-sidebar-accent-foreground"
                : "font-medium text-sidebar-foreground/80"
            )}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0.85,
              x: isActive && !reduceMotion ? 2 : 0,
            }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            {title}
          </motion.span>
        ) : (
          <span className="sr-only">{title}</span>
        )}

      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeNav } = useNavHash()
  const { navigate } = useSidebarNavigation()
  const isMobile = useIsMobile()
  const { state } = useSidebar()
  const showLabels = isMobile || state === "expanded"
  const isHomeActive = activeNav === "home"

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-sidebar-border bg-sidebar"
      {...props}
    >
      <SidebarHeader className="px-1.5 pt-3 pb-1.5 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem className="group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
            <SidebarMenuButton
              size="lg"
              type="button"
              tooltip={{ children: "Pranoy Mathew — Home", sideOffset: 12 }}
              onClick={() => navigate("home")}
              isActive={false}
              className={cn(
                "h-auto min-h-9 cursor-pointer rounded-xl bg-transparent! p-0 hover:bg-transparent!",
                "data-[active=true]:bg-transparent!",
                "group-data-[collapsible=icon]:!size-auto group-data-[collapsible=icon]:!p-0",
                showLabels ? "w-full justify-start gap-3 px-2 py-1" : "justify-center",
              )}
            >
              <PortfolioLogo
                variant={showLabels ? "stacked" : "mark"}
                active={isHomeActive}
              />
              <span className="sr-only">Pranoy Mathew — Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="mx-auto w-6 group-data-[collapsible=icon]:w-5" />

      <SidebarContent className="flex flex-col px-1 py-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0">
        <SidebarGroup className="p-0 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:items-center">
          <SidebarMenu className="gap-0.5 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-1.5">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                title={item.title}
                icon={item.icon}
                isActive={activeNav === item.id}
                showLabels={showLabels}
                onNavigate={navigate}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn("pb-4 pt-2", !showLabels && "hidden")}>
        <p className="px-3 text-center text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/40">
          Portfolio
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
