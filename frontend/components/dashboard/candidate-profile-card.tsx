import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"

interface CandidateProfileCardProps {
    candidate: {
        name: string
        role: string
        status: "applied" | "review" | "interview" | "offer" | "rejected"
        progress: number
        avatar?: string
        email: string
        phone: string
        location: string
        interviewDate?: string
    }
}

export function CandidateProfileCard({ candidate }: CandidateProfileCardProps) {
    const statusLabels = {
        applied: "Applied",
        review: "In Review",
        interview: "Interview Scheduled",
        offer: "Offer Extended",
        rejected: "Rejected",
    }

    const statusClasses = {
        applied: "status-applied",
        review: "status-review",
        interview: "status-interview",
        offer: "status-offer",
        rejected: "status-rejected",
    }

    return (
        <Card className="overflow-hidden hover-card animate-in">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/10">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                            {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">{candidate.name}</h2>
                            <Badge className={statusClasses[candidate.status]}>{statusLabels[candidate.status]}</Badge>
                        </div>
                        <p className="text-muted-foreground">{candidate.role}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Application Progress</span>
                        <span className="font-medium">{candidate.progress}%</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${candidate.progress}%` }}></div>
                    </div>
                </div>

                <div className="grid gap-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{candidate.location}</span>
                    </div>
                    {candidate.interviewDate && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{candidate.interviewDate}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

