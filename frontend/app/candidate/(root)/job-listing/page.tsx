import { JobList } from "@/components/candidate/job-list"

export default function jobList() {
    return (
        <div className="max-w-7xl mx-auto bg-red-50 py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
            <JobList />
        </div>
    )
}

