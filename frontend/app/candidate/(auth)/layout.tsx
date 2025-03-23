import type { ReactNode } from "react"
import SetTheme from "@/components/shared/setTheme"

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <SetTheme theme="light" />
            <main>{children}</main>
        </div>
    )
}

export default AuthLayout

