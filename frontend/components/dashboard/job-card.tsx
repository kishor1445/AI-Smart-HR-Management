import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Clock, MapPin, Star } from "lucide-react"

interface JobCardProps {
    job: {
        id: string
        title: string
        company: string
        location: string
        type: "Full-time" | "Part-time" | "Contract" | "Remote"
        salary?: string
        posted: string
        isRecommended?: boolean
        skills: string[]
    }
}

export function JobCard({ job }: JobCardProps) {
    return (
        <Card className="overflow-hidden hover-card animate-in">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <p className="text-muted-foreground mt-1">{job.company}</p>
                    </div>
                    {job.isRecommended && (
                        <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>Recommended</span>
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Posted {job.posted}</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-secondary text-secondary-foreground">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                {job.salary && (
                    <div className="text-sm">
                        <span className="font-medium">Salary: </span>
                        <span className="text-muted-foreground">{job.salary}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex gap-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1">
                    Save
                </Button>
                <Button size="sm" className="flex-1">
                    Apply Now
                </Button>
            </CardFooter>
        </Card>
    )
}
