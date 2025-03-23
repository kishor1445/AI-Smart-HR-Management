"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/auth"

interface AuthGuardProps {
    children: React.ReactNode
    redirectTo?: string
}

export default function AuthGuard({ children, redirectTo = "/candidate/login" }: AuthGuardProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated()

            if (!authenticated) {
                router.push(`${redirectTo}?returnUrl=${encodeURIComponent(pathname)}`)
                return
            }

            setIsAuthorized(true)
            setIsLoading(false)
        }

        checkAuth()
    }, [pathname, redirectTo, router])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <p>Checking authentication...</p>
                </div>
            </div>
        )
    }

    return isAuthorized ? <>{children}</> : null
}

