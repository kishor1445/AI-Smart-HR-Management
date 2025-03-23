"use client"

import type React from "react"
import { TopNavigation } from "./top-navigation"

interface DashboardShellProps {
    children: React.ReactNode
    userType: "candidate" | "admin"
}

export function DashboardShell({ children, userType }: DashboardShellProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <TopNavigation userType={userType} />
            <main className="flex-1 max-w-7xl mx-auto py-6">{children}</main>
        </div>
    )
}

