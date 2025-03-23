"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

interface SetThemeProps {
    theme?: "light" | "dark"
    className?: string
}

const SetTheme = ({ theme, className }: SetThemeProps) => {
    const { setTheme: setAppTheme } = useTheme()

    useEffect(() => {
        if (theme) {
            setAppTheme(theme)
        } else {
            setAppTheme("dark")
        }

        if (className) {
            document.documentElement.classList.add(className)
        }

        return () => {
            if (className) {
                document.documentElement.classList.remove(className)
            }
        }
    }, [theme, className, setAppTheme])

    return null
}

export default SetTheme
