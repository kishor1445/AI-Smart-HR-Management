"use client"

import { useEffect, useState } from "react"
import { JobCard } from "./job-card"
import { Skeleton } from "@/components/ui/skeleton"

interface Job {
  id: string
  title: string
  company: string
  location: string
  posted_at: string
  description: string
  skills_required: string[]
}

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://192.168.120.28:8000/application/jobs")

        console.log(response)

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setJobs(data)
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch jobs:", err)
        setError("Failed to load jobs. Please try again later.")
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-6 w-20" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded-md">{error}</div>
  }

  return (
    <div className="space-y-6">
      {jobs.length === 0 ? (
        <p className="text-center text-muted-foreground">No jobs found</p>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  )
}

