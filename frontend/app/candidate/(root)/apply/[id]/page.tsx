import JobApplicationForm from "@/components/candidate/job-application-form"


export default function Home({ params }: { params: { id: string } }) {
    return (
        <main className="max-w-3xl mx-auto py-14 px-4">
            <h1 className="text-3xl font-bold mb-3">Job Application</h1>
            <p className="text-ms text-muted-foreground mb-6">
                Fill out the form below to apply for a position. All fields marked with * are required.
            </p>
            <JobApplicationForm jobId={params.id} />
        </main>
    )
}

