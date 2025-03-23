import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate required fields
        const { title, company, location, description, skills_required } = body

        if (!title || !company || !location || !description || !skills_required) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Send data to FastAPI backend
        const response = await fetch("http://192.168.120.28:8000/hr/job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                company,
                location,
                description,
                skills_required,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(
                { error: errorData.detail || "Failed to create job posting" },
                { status: response.status },
            )
        }

        console.log(response)

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error creating job posting:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

