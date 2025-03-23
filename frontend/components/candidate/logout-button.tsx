"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout } from "@/auth"
import { useSession } from "@/app/auth/session-provider"

interface LogoutButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
}

export default function LogoutButton({ variant = "ghost", size = "icon", className = "" }: LogoutButtonProps) {
    const router = useRouter()
    const { checkAuth } = useSession()

    const handleLogout = () => {
        logout()
        checkAuth()
        router.push("/candidate/login")
    }

    return (
        <Button variant={variant} size={size} onClick={handleLogout} className={className}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
        </Button>
    )
}

