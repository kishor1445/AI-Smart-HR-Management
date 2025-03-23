"use client"

import type { LucideIcon } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavMainProps {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
    groupTitle: string
    currentPath: string
}

export function NavMain({ items, groupTitle, currentPath }: NavMainProps) {
    const { isMobile, setOpenMobile } = useSidebar()

    const handleNavClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    return (
        <SidebarGroup>
            {/*<SidebarGroupLabel>{groupTitle}</SidebarGroupLabel>*/}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className={cn(
                                    currentPath === item.url && "bg-blue-500/20 text-sidebar-accent-foreground"
                                )}
                                tooltip={item.title}
                            >
                                <Link href={item.url} onClick={handleNavClick}>
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

