import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { CandidateProfileCard } from "@/components/dashboard/candidate-profile-card"
import { InterviewCard } from "@/components/dashboard/interview-card"
import { DocumentUpload } from "@/components/dashboard/document-upload"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, FileText } from "lucide-react"
import Link from "next/link";

const candidateData = {
    name: "John Smith",
    role: "Frontend Developer",
    status: "interview" as const,
    progress: 75,
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    interviewDate: "July 15, 2023 - 10:00 AM",
}


const upcomingInterviews = [
    {
        id: "1",
        role: "Frontend Developer",
        company: "TechCorp Inc.",
        type: "Video" as const,
        date: "July 15, 2023",
        time: "10:00 AM",
        duration: "45 minutes",
        meetingLink: "https://meet.google.com/abc-defg-hij",
        status: "scheduled" as const,
    },
]

export default function CandidateDashboardPage() {
    return (
        <div>
            <DashboardHeader heading="Welcome, John" text="Track your job applications and upcoming interviews">
                <Link href="/candidate/job-listing">
                    <Button>Browse Jobs</Button>
                </Link>
            </DashboardHeader>

            <div className="grid gap-6 mt-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Applications" value="5" description="Active job applications" icon={FileText} />
                    <StatsCard title="Interviews" value="1" description="Upcoming interviews" icon={Calendar} />
                    <StatsCard title="In Review" value="3" description="Applications under review" icon={Clock} />
                    <StatsCard title="Completed" value="2" description="Completed applications" icon={CheckCircle} />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <CandidateProfileCard candidate={candidateData} />
                    </div>

                    <div className="md:col-span-2">
                        <Tabs defaultValue="documents" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="interviews">Applied Jobs</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>

                            <TabsContent value="documents" className="mt-6 space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <DocumentUpload title="Resume" description="Upload your latest resume (PDF, DOC, DOCX)" />
                                    <DocumentUpload title="Cover Letter" description="Upload a cover letter for your applications" />
                                </div>
                            </TabsContent>

                            <TabsContent value="interviews" className="mt-6">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium">Upcoming Interviews</h3>
                                    {upcomingInterviews.length > 0 ? (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {upcomingInterviews.map((interview) => (
                                                <InterviewCard key={interview.id} interview={interview} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border py-6 text-center">
                                            <p className="text-muted-foreground">No upcoming interviews scheduled</p>
                                        </div>
                                    )}

                                    <h3 className="text-lg font-medium mt-8">Past Interviews</h3>
                                    <div className="rounded-lg border py-6 text-center">
                                        <p className="text-muted-foreground">No past interviews</p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

