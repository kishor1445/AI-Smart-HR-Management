"use client"

import { useState } from "react"
import { CheckCircle, ChevronDown, Clock, Download, FileText, Filter, Plus, Search, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for employees in onboarding
const onboardingEmployees = [
    {
        id: "EMP-1234",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        position: "UX Designer",
        department: "Design",
        startDate: "2023-03-15",
        status: "in-progress",
        progress: 75,
        avatar: "/placeholder.svg?height=40&width=40",
        tasks: [
            { id: 1, name: "Complete personal information", status: "completed", dueDate: "2023-03-10" },
            { id: 2, name: "Sign employment contract", status: "completed", dueDate: "2023-03-12" },
            { id: 3, name: "Complete tax forms", status: "completed", dueDate: "2023-03-13" },
            { id: 4, name: "Setup workstation", status: "in-progress", dueDate: "2023-03-16" },
            { id: 5, name: "Team introduction meeting", status: "pending", dueDate: "2023-03-17" },
            { id: 6, name: "Complete training modules", status: "pending", dueDate: "2023-03-20" },
        ],
    },
    {
        id: "EMP-2345",
        name: "Michael Brown",
        email: "michael.brown@example.com",
        position: "Software Engineer",
        department: "Engineering",
        startDate: "2023-03-10",
        status: "in-progress",
        progress: 50,
        avatar: "/placeholder.svg?height=40&width=40",
        tasks: [
            { id: 1, name: "Complete personal information", status: "completed", dueDate: "2023-03-05" },
            { id: 2, name: "Sign employment contract", status: "completed", dueDate: "2023-03-07" },
            { id: 3, name: "Complete tax forms", status: "in-progress", dueDate: "2023-03-12" },
            { id: 4, name: "Setup workstation", status: "in-progress", dueDate: "2023-03-14" },
            { id: 5, name: "Team introduction meeting", status: "pending", dueDate: "2023-03-15" },
            { id: 6, name: "Complete training modules", status: "pending", dueDate: "2023-03-18" },
        ],
    },
    {
        id: "EMP-3456",
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        position: "Product Manager",
        department: "Product",
        startDate: "2023-03-05",
        status: "completed",
        progress: 100,
        avatar: "/placeholder.svg?height=40&width=40",
        tasks: [
            { id: 1, name: "Complete personal information", status: "completed", dueDate: "2023-02-28" },
            { id: 2, name: "Sign employment contract", status: "completed", dueDate: "2023-03-01" },
            { id: 3, name: "Complete tax forms", status: "completed", dueDate: "2023-03-02" },
            { id: 4, name: "Setup workstation", status: "completed", dueDate: "2023-03-03" },
            { id: 5, name: "Team introduction meeting", status: "completed", dueDate: "2023-03-06" },
            { id: 6, name: "Complete training modules", status: "completed", dueDate: "2023-03-10" },
        ],
    },
    {
        id: "EMP-4567",
        name: "James Taylor",
        email: "james.taylor@example.com",
        position: "Marketing Specialist",
        department: "Marketing",
        startDate: "2023-03-20",
        status: "pending",
        progress: 0,
        avatar: "/placeholder.svg?height=40&width=40",
        tasks: [
            { id: 1, name: "Complete personal information", status: "pending", dueDate: "2023-03-15" },
            { id: 2, name: "Sign employment contract", status: "pending", dueDate: "2023-03-17" },
            { id: 3, name: "Complete tax forms", status: "pending", dueDate: "2023-03-18" },
            { id: 4, name: "Setup workstation", status: "pending", dueDate: "2023-03-21" },
            { id: 5, name: "Team introduction meeting", status: "pending", dueDate: "2023-03-22" },
            { id: 6, name: "Complete training modules", status: "pending", dueDate: "2023-03-25" },
        ],
    },
    {
        id: "EMP-5678",
        name: "Olivia Davis",
        email: "olivia.davis@example.com",
        position: "HR Coordinator",
        department: "Human Resources",
        startDate: "2023-03-12",
        status: "in-progress",
        progress: 33,
        avatar: "/placeholder.svg?height=40&width=40",
        tasks: [
            { id: 1, name: "Complete personal information", status: "completed", dueDate: "2023-03-07" },
            { id: 2, name: "Sign employment contract", status: "completed", dueDate: "2023-03-09" },
            { id: 3, name: "Complete tax forms", status: "in-progress", dueDate: "2023-03-14" },
            { id: 4, name: "Setup workstation", status: "pending", dueDate: "2023-03-15" },
            { id: 5, name: "Team introduction meeting", status: "pending", dueDate: "2023-03-16" },
            { id: 6, name: "Complete training modules", status: "pending", dueDate: "2023-03-19" },
        ],
    },
]

// Sample onboarding templates
const onboardingTemplates = [
    { id: 1, name: "Standard Employee", department: "All", tasks: 12 },
    { id: 2, name: "Engineering", department: "Engineering", tasks: 15 },
    { id: 3, name: "Design", department: "Design", tasks: 10 },
    { id: 4, name: "Marketing", department: "Marketing", tasks: 8 },
    { id: 5, name: "Executive", department: "Leadership", tasks: 14 },
]

export default function OnboardingPage() {
    const [selectedEmployee, setSelectedEmployee] = useState(onboardingEmployees[0])
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter employees based on search query and status filter
    const filteredEmployees = onboardingEmployees.filter((employee) => {
        const matchesSearch =
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || employee.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold tracking-tight">Employee Onboarding</h1>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            New Employee
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[525px]">
                                        <DialogHeader>
                                            <DialogTitle>Add New Employee</DialogTitle>
                                            <DialogDescription>
                                                Enter the details of the new employee to start the onboarding process.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="name" className="text-right text-sm font-medium">
                                                    Name
                                                </label>
                                                <Input id="name" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="email" className="text-right text-sm font-medium">
                                                    Email
                                                </label>
                                                <Input id="email" type="email" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="position" className="text-right text-sm font-medium">
                                                    Position
                                                </label>
                                                <Input id="position" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="department" className="text-right text-sm font-medium">
                                                    Department
                                                </label>
                                                <Select>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="engineering">Engineering</SelectItem>
                                                        <SelectItem value="design">Design</SelectItem>
                                                        <SelectItem value="product">Product</SelectItem>
                                                        <SelectItem value="marketing">Marketing</SelectItem>
                                                        <SelectItem value="hr">Human Resources</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="startDate" className="text-right text-sm font-medium">
                                                    Start Date
                                                </label>
                                                <Input id="startDate" type="date" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="template" className="text-right text-sm font-medium">
                                                    Template
                                                </label>
                                                <Select>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Select onboarding template" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {onboardingTemplates.map((template) => (
                                                            <SelectItem key={template.id} value={template.id.toString()}>
                                                                {template.name} ({template.department})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Start Onboarding</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="text-muted-foreground">Manage and track the onboarding process for new employees.</div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input
                                    placeholder="Search employees..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full"
                                    startIcon={<Search className="h-4 w-4" />}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Filter className="h-4 w-4" />
                                            Status: {statusFilter === "all" ? "All" : statusFilter}
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>In Progress</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-12">
                            {/* Employee List */}
                            <Card className="md:col-span-4">
                                <CardHeader>
                                    <CardTitle>Employees</CardTitle>
                                    <CardDescription>{filteredEmployees.length} employees in onboarding</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {filteredEmployees.map((employee) => (
                                            <div
                                                key={employee.id}
                                                className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground ${selectedEmployee.id === employee.id ? "bg-accent text-accent-foreground" : ""}`}
                                                onClick={() => setSelectedEmployee(employee)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={employee.avatar} alt={employee.name} />
                                                        <AvatarFallback>
                                                            {employee.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{employee.name}</div>
                                                        <div className="text-sm text-muted-foreground">{employee.position}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <Badge variant={getStatusVariant(employee.status)}>{employee.status}</Badge>
                                                    <div className="text-xs text-muted-foreground">{formatDate(employee.startDate)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Employee Details */}
                            <Card className="md:col-span-8">
                                <CardHeader className="flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle>{selectedEmployee.name}</CardTitle>
                                        <CardDescription>
                                            {selectedEmployee.position} • {selectedEmployee.department}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Documents
                                        </Button>
                                        <Button size="sm">Edit</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="tasks">
                                        <TabsList className="mb-4">
                                            <TabsTrigger value="tasks">Tasks</TabsTrigger>
                                            <TabsTrigger value="details">Details</TabsTrigger>
                                            <TabsTrigger value="documents">Documents</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="tasks">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-medium">Onboarding Progress</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {getCompletedTasksCount(selectedEmployee)} of {selectedEmployee.tasks.length} tasks
                                                            completed
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium">{selectedEmployee.progress}%</span>
                                                    </div>
                                                </div>

                                                <Progress value={selectedEmployee.progress} className="h-2" />

                                                <div className="mt-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-lg font-medium">Task List</h3>
                                                        <Button variant="outline" size="sm">
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Task
                                                        </Button>
                                                    </div>

                                                    <div className="space-y-3">
                                                        {selectedEmployee.tasks.map((task) => (
                                                            <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`rounded-full p-1 ${getTaskStatusColor(task.status)}`}>
                                                                        {task.status === "completed" ? (
                                                                            <CheckCircle className="h-5 w-5" />
                                                                        ) : (
                                                                            <Circle className="h-5 w-5" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <div
                                                                            className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                                                                        >
                                                                            {task.name}
                                                                        </div>
                                                                        <div className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</div>
                                                                    </div>
                                                                </div>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="sm">
                                                                            <ChevronDown className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                                                                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                                                        <DropdownMenuItem>Delete Task</DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="details">
                                            <div className="space-y-6">
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div>
                                                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Full Name</span>
                                                                <span className="text-sm font-medium">{selectedEmployee.name}</span>
                                                            </div>
                                                            <Separator />
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Email</span>
                                                                <span className="text-sm font-medium">{selectedEmployee.email}</span>
                                                            </div>
                                                            <Separator />
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Phone</span>
                                                                <span className="text-sm font-medium">+1 (555) 123-4567</span>
                                                            </div>
                                                            <Separator />
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Address</span>
                                                                <span className="text-sm font-medium">123 Main St, Anytown, CA 12345</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-medium mb-4">Employment Details</h3>
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Employee ID</span>
                                                                <span className="text-sm font-medium">{selectedEmployee.id}</span>
                                                            </div>
                                                            <Separator />
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Position</span>
                                                                <span className="text-sm font-medium">{selectedEmployee.position}</span>
                                                            </div>
                                                            <Separator />
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Department</span>
                                                                <span className="text-sm font-medium">{selectedEmployee.department}</span>
                                                            </div>
                                                            <Separator />
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-muted-foreground">Start Date</span>
                                                                <span className="text-sm font-medium">{formatDate(selectedEmployee.startDate)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-medium mb-4">Onboarding Timeline</h3>
                                                    <div className="relative pl-6 border-l">
                                                        <div className="mb-6 relative">
                                                            <div className="absolute -left-[25px] rounded-full bg-primary p-1">
                                                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                                                            </div>
                                                            <div className="mb-1">
                                                                <span className="text-sm font-medium">Offer Accepted</span>
                                                                <span className="text-xs text-muted-foreground ml-2">
                                  {formatDate(
                                      new Date(
                                          new Date(selectedEmployee.startDate).setDate(
                                              new Date(selectedEmployee.startDate).getDate() - 14,
                                          ),
                                      )
                                          .toISOString()
                                          .split("T")[0],
                                  )}
                                </span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">
                                                                {selectedEmployee.name} accepted the job offer for the {selectedEmployee.position}{" "}
                                                                position.
                                                            </p>
                                                        </div>

                                                        <div className="mb-6 relative">
                                                            <div className="absolute -left-[25px] rounded-full bg-primary p-1">
                                                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                                                            </div>
                                                            <div className="mb-1">
                                                                <span className="text-sm font-medium">Onboarding Started</span>
                                                                <span className="text-xs text-muted-foreground ml-2">
                                  {formatDate(
                                      new Date(
                                          new Date(selectedEmployee.startDate).setDate(
                                              new Date(selectedEmployee.startDate).getDate() - 7,
                                          ),
                                      )
                                          .toISOString()
                                          .split("T")[0],
                                  )}
                                </span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">
                                                                Onboarding process initiated. Welcome email sent with initial instructions.
                                                            </p>
                                                        </div>

                                                        <div className="mb-6 relative">
                                                            <div
                                                                className={`absolute -left-[25px] rounded-full p-1 ${selectedEmployee.status === "pending" ? "bg-muted" : "bg-primary"}`}
                                                            >
                                                                {selectedEmployee.status !== "pending" ? (
                                                                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                                                                ) : (
                                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                                )}
                                                            </div>
                                                            <div className="mb-1">
                                                                <span className="text-sm font-medium">First Day</span>
                                                                <span className="text-xs text-muted-foreground ml-2">
                                  {formatDate(selectedEmployee.startDate)}
                                </span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">
                                                                First day at the company. Orientation and team introduction.
                                                            </p>
                                                        </div>

                                                        <div className="relative">
                                                            <div
                                                                className={`absolute -left-[25px] rounded-full p-1 ${selectedEmployee.status === "completed" ? "bg-primary" : "bg-muted"}`}
                                                            >
                                                                {selectedEmployee.status === "completed" ? (
                                                                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                                                                ) : (
                                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                                )}
                                                            </div>
                                                            <div className="mb-1">
                                                                <span className="text-sm font-medium">Onboarding Completed</span>
                                                                <span className="text-xs text-muted-foreground ml-2">
                                  {formatDate(
                                      new Date(
                                          new Date(selectedEmployee.startDate).setDate(
                                              new Date(selectedEmployee.startDate).getDate() + 30,
                                          ),
                                      )
                                          .toISOString()
                                          .split("T")[0],
                                  )}
                                </span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">
                                                                All onboarding tasks completed. Employee fully integrated into the team.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="documents">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-medium">Required Documents</h3>
                                                    <Button variant="outline" size="sm">
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        Upload
                                                    </Button>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <div className="font-medium">Employment Contract</div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    Signed:{" "}
                                                                    {formatDate(
                                                                        new Date(
                                                                            new Date(selectedEmployee.startDate).setDate(
                                                                                new Date(selectedEmployee.startDate).getDate() - 5,
                                                                            ),
                                                                        )
                                                                            .toISOString()
                                                                            .split("T")[0],
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline">Completed</Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <div className="font-medium">Tax Forms</div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    Uploaded:{" "}
                                                                    {formatDate(
                                                                        new Date(
                                                                            new Date(selectedEmployee.startDate).setDate(
                                                                                new Date(selectedEmployee.startDate).getDate() - 3,
                                                                            ),
                                                                        )
                                                                            .toISOString()
                                                                            .split("T")[0],
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline">Completed</Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <div className="font-medium">ID Verification</div>
                                                                <div className="text-xs text-muted-foreground">Required for compliance</div>
                                                            </div>
                                                        </div>
                                                        {selectedEmployee.status === "completed" ? (
                                                            <Badge variant="outline">Completed</Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                                                Pending
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <div className="font-medium">Direct Deposit Form</div>
                                                                <div className="text-xs text-muted-foreground">For payroll setup</div>
                                                            </div>
                                                        </div>
                                                        {selectedEmployee.status === "completed" ? (
                                                            <Badge variant="outline">Completed</Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                                                Pending
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <div className="font-medium">Emergency Contact Information</div>
                                                                <div className="text-xs text-muted-foreground">Required for HR records</div>
                                                            </div>
                                                        </div>
                                                        {selectedEmployee.status === "completed" ? (
                                                            <Badge variant="outline">Completed</Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                                                Pending
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
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

function getTaskStatusColor(status: string) {
    switch (status) {
        case "completed":
            return "text-green-500"
        case "in-progress":
            return "text-blue-500"
        case "pending":
            return "text-muted-foreground"
        default:
            return "text-muted-foreground"
    }
}

function getCompletedTasksCount(employee) {
    return employee.tasks.filter((task) => task.status === "completed").length
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

function Circle({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
}

