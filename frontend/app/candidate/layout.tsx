"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { isAuthenticated } from "@/auth"
import { useSession } from "@/app/auth/session-provider"

export default function CandidateLayout({children,}: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { checkAuth } = useSession()
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthorized, setIsAuthorized] = useState(false)

    // Pages that don't require authentication
    const publicPages = [
        "/candidate/login",
        "/candidate/register",
        "/candidate/forgot-password",
        "/candidate/reset-password",
    ]

    const isPublicPage = publicPages.includes(pathname)

    useEffect(() => {
        const checkAuthentication = async () => {
            // Always refresh auth state when layout mounts
            checkAuth()

            if (isPublicPage) {
                setIsAuthorized(true)
            } else {
                // Check if user is authenticated for protected pages
                const authenticated = isAuthenticated()
                setIsAuthorized(authenticated)

                // If not authenticated, redirect to login
                if (!authenticated) {
                    window.location.href = `/candidate/login?returnUrl=${encodeURIComponent(pathname)}`
                    return
                }
            }

            setIsLoading(false)
        }

        checkAuthentication()
    }, [pathname, checkAuth, isPublicPage])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-medium mb-2">Loading...</h2>
                </div>
            </div>
        )
    }

    // Only render children if authorized or on a public page
    return isAuthorized ? children : null
}

