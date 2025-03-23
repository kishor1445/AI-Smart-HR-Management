"use client"

import type * as React from "react"
import {
  LayoutDashboard,
  LaptopMinimalIcon as LaptopMinimalCheck,
  Users,
  CreditCard, Package, PieChart, ShoppingCart, Inbox, Settings, BriefcaseBusiness,
} from "lucide-react"
import { NavMain } from "./nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Onboarding",
      url: "/onboarding",
      icon: Users,
    },
    {
      title: "Job Posting",
      url: "/job-posting",
      icon: BriefcaseBusiness,
    },
    {
      title: "Analytics",
      url: "/admin/events",
      icon: PieChart,
    },
    {
      title: "Orders",
      url: "/admin/users",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      url: "/admin/scan-history",
      icon: Package,
    },
    {
      title: "Invoices",
      url: "/admin/scan-history",
      icon: CreditCard,
    },
    {
      title: "Messages",
      url: "/admin/scan-history",
      icon: Inbox,
    },
    {
      title: "Settings",
      url: "/admin/scan-history",
      icon: Settings,
    },
  ],
}

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({ ...props }) => {
  const pathname = usePathname()

  return (
      <Sidebar collapsible="icon" variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LaptopMinimalCheck className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">HR Flow</span>
                  <span className="truncate text-xs">HR</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} groupTitle="Admin" currentPath={pathname} />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
  )
}

export default AppSidebar

