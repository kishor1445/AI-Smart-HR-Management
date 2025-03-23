"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash2, Users, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Define types for job post data
interface JobPost {
    id: string
    title: string
    company: string
    location: string
    posted_at?: string
    description: string
    skills_required: string[]
    status?: "published" // Adding status field
    applicants?: number // Adding applicants field with optional flag
}

export default function JobPostingDashboard() {
    const [isPublishing, setIsPublishing] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [jobPosts, setJobPosts] = useState<JobPost[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const { toast } = useToast()

    // Fetch job posts from FastAPI backend
    useEffect(() => {
        const fetchJobPosts = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await fetch("http://192.168.120.28:8000/application/jobs")
                console.log(response.body)

                if (!response.ok) {
                    throw new Error("Failed to fetch job posts")
                }

                const data = await response.json()
                setJobPosts(data)
            } catch (err) {
                console.error("Error fetching job posts:", err)
                setError("Failed to load job posts. Please try again later.")
                toast({
                    title: "Error",
                    description: "Failed to load job posts. Please try again later.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchJobPosts()
    }, [toast])

    // Filter jobs based on search query
    const searchedJobs = searchQuery
        ? jobPosts.filter(
            (job) =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        : jobPosts

    const handlePublish = async (jobId: string) => {
        setIsPublishing(true)
        try {
            const response = await fetch(`http://192.168.120.28:8000/application/jobs/${jobId}/publish`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error("Failed to publish job post")
            }

            // Update the job post status in the local state
            setJobPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === jobId ? { ...post, status: "published", posted_at: new Date().toISOString() } : post,
                ),
            )

            toast({
                title: "Success",
                description: "Job post published successfully.",
            })
        } catch (err) {
            console.error("Error publishing job post:", err)
            toast({
                title: "Error",
                description: "Failed to publish job post. Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsPublishing(false)
        }
    }

    const handleDelete = async (jobId: string) => {
        try {
            const response = await fetch(`http://192.168.120.28:8000/application/jobs/${jobId}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete job post")
            }

            // Remove the job post from the local state
            setJobPosts((prevPosts) => prevPosts.filter((post) => post.id !== jobId))

            toast({
                title: "Success",
                description: "Job post deleted successfully.",
            })
        } catch (err) {
            console.error("Error deleting job post:", err)
            toast({
                title: "Error",
                description: "Failed to delete job post. Please try again later.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* Main content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="grid gap-6 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-primary">Job Posts</h1>
                            <p className="text-muted-foreground">
                                Create, manage, and publish job openings across your organization.
                            </p>
                        </div>
                        <Link href="/job-posting/new">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                <Plus className="mr-2 h-4 w-4" />
                                Create New Job
                            </Button>
                        </Link>
                    </div>

                    {/* Search bar */}
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by title, company, or location..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </div>

                    <JobPostingsTable
                        jobs={searchedJobs}
                        onPublish={handlePublish}
                        onDelete={handleDelete}
                        isPublishing={isPublishing}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </main>
        </div>
    )
}

interface JobPostingsTableProps {
    jobs: JobPost[]
    onPublish: (jobId: string) => void
    onDelete: (jobId: string) => void
    isPublishing: boolean
    isLoading: boolean
    error: string | null
}

function JobPostingsTable({ jobs, onPublish, onDelete, isPublishing, isLoading, error }: JobPostingsTableProps) {
    const { toast } = useToast()
    const [retrying, setRetrying] = useState(false)

    const handleRetry = async () => {
        setRetrying(true)
        try {
            const response = await fetch("http://192.168.120.28:8000/application/jobs")

            if (!response.ok) {
                throw new Error("Failed to fetch job posts")
            }

            // This is just to trigger a re-render, the actual data will be fetched in the parent component
            toast({
                title: "Success",
                description: "Refreshing job posts...",
            })

            // Force reload the page
            window.location.reload()
        } catch (err) {
            console.error("Error retrying fetch:", err)
            toast({
                title: "Error",
                description: "Failed to refresh job posts. Please try again later.",
                variant: "destructive",
            })
        } finally {
            setRetrying(false)
        }
    }

    if (isLoading) {
        return (
            <Card className="rounded-xl shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Loading job posts...</p>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="rounded-xl shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-destructive">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={handleRetry} disabled={retrying}>
                        {retrying ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Retrying...
                            </>
                        ) : (
                            "Retry"
                        )}
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="rounded-xl shadow-sm hover:shadow transition-shadow duration-200">
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b text-muted-foreground">
                            <th className="text-left font-medium p-3">Job ID</th>
                            <th className="text-left font-medium p-3">Title</th>
                            <th className="text-left font-medium p-3">Company</th>
                            <th className="text-left font-medium p-3">Location</th>
                            <th className="text-left font-medium p-3">Status</th>
                            <th className="text-left font-medium p-3">Applicants</th>
                            <th className="text-left font-medium p-3">Posted Date</th>
                            <th className="text-right font-medium p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="p-4 text-center text-muted-foreground">
                                    No job posts found. Create a new job post to get started.
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job) => (
                                <tr key={job.id} className="border-b hover:bg-muted/50 transition-colors">
                                    <td className="p-3">{job.id}</td>
                                    <td className="p-3 font-medium">{job.title}</td>
                                    <td className="p-3">{job.company}</td>
                                    <td className="p-3">{job.location}</td>
                                    <td className="p-3">
                                        <Badge
                                            variant={'success'}
                                            className={"bg-green-100 text-green-800 hover:bg-green-100"}
                                        >
                                            <Check className="mr-1 h-3 w-3" />
                                            {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : "Published"}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center">
                                            <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                                            {job.applicants || 0}
                                        </div>
                                    </td>
                                    <td className="p-3">{job.posted_at ? format(new Date(job.posted_at), "MMM d, yyyy") : "-"}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="flex items-center" asChild>
                                                        <Link href={`/job-posting/${job.id}`}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center" asChild>
                                                        <Link href={`/job-posting/edit/${job.id}`}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="flex items-center text-destructive"
                                                        onClick={() => onDelete(job.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="text-xs text-muted-foreground">Showing {jobs.length} job posts</div>
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
    )
}

