import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video } from "lucide-react"

interface InterviewCardProps {
    interview: {
        id: string
        role: string
        company: string
        type: "Video" | "In-person" | "Phone"
        date: string
        time: string
        duration: string
        location?: string
        meetingLink?: string
        status: "scheduled" | "completed" | "cancelled"
    }
}

export function InterviewCard({ interview }: InterviewCardProps) {
    const statusLabels = {
        scheduled: "Scheduled",
        completed: "Completed",
        cancelled: "Cancelled",
    }

    const statusClasses = {
        scheduled: "bg-purple-100 text-purple-800",
        completed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    }

    return (
        <Card className="overflow-hidden hover-card animate-in">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{interview.role}</CardTitle>
                        <p className="text-muted-foreground mt-1">{interview.company}</p>
                    </div>
                    <Badge className={statusClasses[interview.status]}>{statusLabels[interview.status]}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{interview.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
              {interview.time} ({interview.duration})
            </span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm">
                    {interview.type === "Video" ? (
                        <Video className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>
            {interview.type === "Video"
                ? "Video Interview"
                : interview.type === "Phone"
                    ? "Phone Interview"
                    : interview.location}
          </span>
                </div>

                {interview.status === "scheduled" && (
                    <div className="bg-secondary/50 p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Preparation Tips:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Research the company</li>
                            <li>Prepare questions to ask</li>
                            <li>Review your resume and the job description</li>
                        </ul>
                    </div>
                )}
            </CardContent>
            {interview.status === "scheduled" && (
                <CardFooter className="flex gap-2 pt-3">
                    {interview.type === "Video" && interview.meetingLink && <Button className="flex-1">Join Meeting</Button>}
                    <Button variant="outline" className="flex-1">
                        Reschedule
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}