import type { ReactNode } from "react"
import {DashboardShell} from "@/components/dashboard/dashboard-shell";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>

            <main>
                <DashboardShell userType="candidate">
                    {children}
                </DashboardShell>
            </main>
        </div>
    )
}

export default AuthLayout

