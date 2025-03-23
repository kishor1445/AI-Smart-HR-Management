import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  posted_at: string
  description: string
  skills_required: string[]
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  // Format the posted_at date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="text-base">
              {job.company} • {job.location}
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">Posted: {formatDate(job.posted_at)}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Description</p>
            <p>{job.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {job.skills_required.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/candidate/apply/${job.id}`} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Apply Now</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

