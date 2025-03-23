import React, { ReactNode } from "react";
import SetTheme from "@/components/shared/setTheme";


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <SetTheme theme="dark" />
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default Layout;

