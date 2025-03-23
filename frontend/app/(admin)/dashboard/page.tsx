"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CheckCircle, Clock, Download, Users, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for onboarding metrics
const onboardingTrendsData = [
    { name: "Jan", total: 12 },
    { name: "Feb", total: 18 },
    { name: "Mar", total: 15 },
    { name: "Apr", total: 22 },
    { name: "May", total: 27 },
    { name: "Jun", total: 24 },
    { name: "Jul", total: 29 },
    { name: "Aug", total: 35 },
    { name: "Sep", total: 32 },
    { name: "Oct", total: 30 },
    { name: "Nov", total: 38 },
    { name: "Dec", total: 41 },
]

const timeToHireData = [
    { name: "Jan", total: 24 },
    { name: "Feb", total: 22 },
    { name: "Mar", total: 25 },
    { name: "Apr", total: 21 },
    { name: "May", total: 18 },
    { name: "Jun", total: 19 },
    { name: "Jul", total: 17 },
    { name: "Aug", total: 15 },
    { name: "Sep", total: 16 },
    { name: "Oct", total: 14 },
    { name: "Nov", total: 13 },
    { name: "Dec", total: 12 },
]

// Sample recent onboarding data
const recentOnboarding = [
    {
        id: "EMP-1234",
        name: "Sarah Johnson",
        position: "UX Designer",
        status: "completed",
        department: "Design",
        startDate: "Today",
    },
    {
        id: "EMP-2345",
        name: "Michael Brown",
        position: "Software Engineer",
        status: "in-progress",
        department: "Engineering",
        startDate: "Yesterday",
    },
    {
        id: "EMP-3456",
        name: "Emma Wilson",
        position: "Product Manager",
        status: "completed",
        department: "Product",
        startDate: "Yesterday",
    },
    {
        id: "EMP-4567",
        name: "James Taylor",
        position: "Marketing Specialist",
        status: "pending",
        department: "Marketing",
        startDate: "Mar 12, 2023",
    },
    {
        id: "EMP-5678",
        name: "Olivia Davis",
        position: "HR Coordinator",
        status: "in-progress",
        department: "Human Resources",
        startDate: "Mar 10, 2023",
    },
]

export default function HRDashboard() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                {/* Main content */}
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
                            <div className="text-muted-foreground">
                                Welcome back! Here&#39;s an overview of your onboarding metrics and employee data.
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                                    <UserPlus className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">289</div>
                                    <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">New Hires</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">42</div>
                                    <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Onboarding Completion</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">87%</div>
                                    <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Time to Hire (Days)</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">18</div>
                                    <p className="text-xs text-muted-foreground mt-1">-3 days from last month</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts section */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Onboarding Trends</CardTitle>
                                    <CardDescription>New employees onboarded over the past year</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[240px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={onboardingTrendsData}
                                                margin={{
                                                    top: 5,
                                                    right: 10,
                                                    left: 10,
                                                    bottom: 0,
                                                }}
                                            >
                                                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                                                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="total"
                                                    stroke="hsl(var(--primary))"
                                                    strokeWidth={2}
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Time to Hire</CardTitle>
                                    <CardDescription>Average days to hire by month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[240px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={timeToHireData}
                                                margin={{
                                                    top: 5,
                                                    right: 10,
                                                    left: 10,
                                                    bottom: 0,
                                                }}
                                            >
                                                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                                                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                                                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tables section */}
                        <div className="grid gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Recent Onboarding</CardTitle>
                                        <CardDescription>Showing the latest 5 employees in onboarding</CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                            <tr className="border-b text-muted-foreground">
                                                <th className="text-left font-medium p-3">Employee ID</th>
                                                <th className="text-left font-medium p-3">Name</th>
                                                <th className="text-left font-medium p-3">Position</th>
                                                <th className="text-left font-medium p-3">Department</th>
                                                <th className="text-left font-medium p-3">Status</th>
                                                <th className="text-left font-medium p-3">Start Date</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {recentOnboarding.map((employee) => (
                                                <tr key={employee.id} className="border-b">
                                                    <td className="p-3">{employee.id}</td>
                                                    <td className="p-3">{employee.name}</td>
                                                    <td className="p-3">{employee.position}</td>
                                                    <td className="p-3">{employee.department}</td>
                                                    <td className="p-3">
                                                        <Badge variant={getStatusVariant(employee.status)}>{employee.status}</Badge>
                                                    </td>
                                                    <td className="p-3">{employee.startDate}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t px-6 py-4">
                                    <div className="text-xs text-muted-foreground">Showing 5 of 42 entries</div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" disabled>
                                            Previous
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

// Helper functions
function getStatusVariant(status: string) {
    switch (status) {
        case "completed":
            return "success"
        case "in-progress":
            return "default"
        case "pending":
            return "outline"
        default:
            return "default"
    }
}

