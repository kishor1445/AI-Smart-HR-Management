"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { isAuthenticated, getToken, logout } from '@/auth'

type User = {
    id?: string
    name?: string
    email: string
} | null

type SessionContextType = {
    isLoggedIn: boolean
    user: User
    checkAuth: () => void
    logout: () => void
}

const SessionContext = createContext<SessionContextType>({
    isLoggedIn: false,
    user: null,
    checkAuth: () => {},
    logout: () => {},
})

export const useSession = () => useContext(SessionContext)

export function SessionProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<User>(null)

    const checkAuth = () => {
        const authenticated = isAuthenticated()
        setIsLoggedIn(authenticated)

        if (authenticated && typeof window !== 'undefined') {
            try {
                const userData = localStorage.getItem('user')
                if (userData) {
                    setUser(JSON.parse(userData))
                }
            } catch (error) {
                console.error('Failed to parse user data:', error)
            }
        } else {
            setUser(null)
        }
    }

    const handleLogout = () => {
        logout()
        setIsLoggedIn(false)
        setUser(null)
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <SessionContext.Provider
            value={{
                isLoggedIn,
                user,
                checkAuth,
                logout: handleLogout,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
