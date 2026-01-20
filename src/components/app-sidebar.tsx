import * as React from "react"
import Link from "next/link"
import { Code, User, Briefcase, Mail, Home, FileText, FlaskConical, Settings, BookOpen, ChevronRight } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Portfolio navigation data
const data = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: Home,
      items: [],
    },
    {
      title: "Case Studies",
      url: "#case-studies",
      icon: Briefcase,
      badge: 3,
      items: [
        {
          title: "Case Study 1",
          url: "#case-study-1",
        },
        {
          title: "Case Study 2",
          url: "#case-study-2",
        },
        {
          title: "Case Study 3",
          url: "#case-study-3",
        },
      ],
    },
    {
      title: "Experiments",
      url: "#experiments",
      icon: FlaskConical,
      badge: 3,
      items: [
        {
          title: "Experiment 1",
          url: "#experiment-1",
        },
        {
          title: "Experiment 2",
          url: "#experiment-2",
        },
        {
          title: "Experiment 3",
          url: "#experiment-3",
        },
      ],
    },
    {
      title: "Systems",
      url: "#systems",
      icon: Settings,
      badge: 3,
      items: [
        {
          title: "Design System",
          url: "#design-system",
        },
        {
          title: "IA",
          url: "#ia",
        },
        {
          title: "Research Ops",
          url: "#research-ops",
        },
      ],
    },
    {
      title: "Writing",
      url: "#writing",
      icon: BookOpen,
      badge: 4,
      items: [
        {
          title: "Essay 1",
          url: "#essay-1",
        },
        {
          title: "Essay 2",
          url: "#essay-2",
        },
        {
          title: "Essay 3",
          url: "#essay-3",
        },
        {
          title: "Essay 4",
          url: "#essay-4",
        },
      ],
    },
    {
      title: "About",
      url: "#about",
      icon: User,
      items: [],
    },
    {
      title: "Contact",
      url: "#contact",
      icon: Mail,
      items: [],
    },
  ],
}

export function AppSidebar({ collapsible = "icon", ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible={collapsible} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Code className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Portfolio</span>
                  <span className="text-xs">Developer</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => {
              const Icon = item.icon
              const hasItems = item.items && item.items.length > 0
              
              if (hasItems) {
                return (
                  <Collapsible key={item.title} asChild defaultOpen={false} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="font-medium !gap-2">
                          <Icon className="size-4 shrink-0" />
                          <span className="text-left flex-1 min-w-0 truncate pr-1">{item.title}</span>
                          {item.badge !== undefined && (
                            <Badge variant="secondary" className="h-5 min-w-5 rounded-full px-1.5 text-xs font-semibold shrink-0 w-[22px] flex items-center justify-center">
                              {item.badge}
                            </Badge>
                          )}
                          {!item.badge && <span className="w-[22px] shrink-0"></span>}
                          <ChevronRight className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              }
              
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="font-medium">
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
