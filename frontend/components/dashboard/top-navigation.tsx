"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Bell,
    Calendar,
    ClipboardList,
    FileText,
    Home,
    LogOut,
    Menu,
    Settings,
    User,
    Users,
    X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {ThemeToggle} from "@/components/ui/theme-toggle";

interface TopNavigationProps {
    userType: "candidate" | "admin"
}

export function TopNavigation({ userType }: TopNavigationProps) {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    const candidateNavItems = [
        {
            title: "Dashboard",
            href: "/candidate/dashboard",
            icon: Home,
        },
        {
            title: "My Applications",
            href: "/candidate/applications",
            icon: FileText,
        },
        {
            title: "Job Listings",
            href: "/candidate/job-listing",
            icon: ClipboardList,
        },
        {
            title: "Interviews",
            href: "/candidate/interviews",
            icon: Calendar,
        },
    ]

    const adminNavItems = [
        {
            title: "Dashboard",
            href: "/admin",
            icon: Home,
        },
        {
            title: "Candidates",
            href: "/admin/candidates",
            icon: Users,
        },
        {
            title: "Leave Management",
            href: "/admin/leave",
            icon: Calendar,
        },
        {
            title: "Performance",
            href: "/admin/performance",
            icon: ClipboardList,
        },
    ]

    const navItems = userType === "candidate" ? candidateNavItems : adminNavItems
    const userName = userType === "candidate" ? "John Smith" : "Jessica Davis"
    const userRole = userType === "candidate" ? "Candidate" : "HR Manager"

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href={userType === "candidate" ? "/candidate" : "/admin"} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold">
                            HR
                        </div>
                        <span className="hidden font-bold sm:inline-block">SmartHR</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 ml-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                {/*<Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">0</Badge>*/}
                                <span className="sr-only">Notifications</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-80 overflow-auto">
                                <DropdownMenuItem className="cursor-pointer p-4 flex flex-col items-start gap-1">
                                    <div className="text-sm text-center text-muted-foreground">
                                        No New Notifications
                                    </div>
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <ThemeToggle />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Messages</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-80 overflow-auto">
                                {userType === "candidate" ? (
                                    <DropdownMenuItem className="cursor-pointer p-4 flex flex-col items-start gap-1">
                                        <div className="font-medium">HR Department</div>
                                        <div className="text-sm text-muted-foreground">Please submit your portfolio for review</div>
                                        <div className="text-xs text-muted-foreground">2 hours ago</div>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem className="cursor-pointer p-4 flex flex-col items-start gap-1">
                                        <div className="font-medium">Sarah Johnson</div>
                                        <div className="text-sm text-muted-foreground">Can we schedule an interview for tomorrow?</div>
                                        <div className="text-xs text-muted-foreground">1 hour ago</div>
                                    </DropdownMenuItem>
                                )}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {userName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{userName}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{userRole}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-xs">
                            <div className="flex items-center justify-between">
                                <Link
                                    href={userType === "candidate" ? "/candidate" : "/admin"}
                                    className="flex items-center gap-2"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold">
                                        HR
                                    </div>
                                    <span className="font-bold">SmartHR</span>
                                </Link>
                                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close menu</span>
                                </Button>
                            </div>
                            <nav className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                                        }`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

