import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string
    description?: string
    icon: LucideIcon
    trend?: {
        value: string
        positive: boolean
    }
}

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
    return (
        <Card className="overflow-hidden hover-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">
                    <Icon className="h-full w-full" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
                {trend && (
                    <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-600"}`}>
              {trend.positive ? "+" : "-"}
                {trend.value}
            </span>
                        <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

