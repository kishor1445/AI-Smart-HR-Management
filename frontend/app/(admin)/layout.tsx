import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AdminNavBar, AppSidebar } from "@/components/navigation"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="dark:bg-bg_black min-h-screen">
            <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <SidebarInset>
                    <AdminNavBar />
                    <main className="dark:bg-bg_black rounded-b-xl h-full">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

