"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {jobPostingSchema, jobPostingType} from "@/lib/zodSchema";


export default function NewJobPosting() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    // Initialize form with react-hook-form and zod validation
    const form = useForm<jobPostingType>({
        resolver: zodResolver(jobPostingSchema),
        defaultValues: {
            title: "",
            company: "",
            location: "",
            skills: "",
            description: "",
        },
    })

    const onSubmit = async (data: jobPostingType) => {
        setIsSubmitting(true)

        try {

            let skill_arr = data.skills.split(',')
            skill_arr = skill_arr.map(str => str.trim())


            // Extract the required fields for the API
            const apiData = {
                title: data.title,
                company: data.company,
                location: data.location,
                description: data.description,
                skills_required: skill_arr,
            }

            console.log(apiData)

            // Send data to FastAPI backend
            const response = await fetch('/api/job-post/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            })

            if (!response.ok) {
                throw new Error('Failed to create job posting')
            }

            toast({
                title: "Job post created!",
                description: "Your job post has been created successfully.",
            })

            router.push("/job-posting")
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create job posting. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* Header */}
            <div className="flex h-16 items-center gap-4 border-b px-6 shadow-sm">
                <Link href="/job-posting">
                    <Button variant="ghost">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        <span>Back to Dashboard</span>
                    </Button>
                </Link>
            </div>

            {/* Main content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="max-w-3xl mx-auto">
                    <Card className="border border-border shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Create Job Posting</CardTitle>
                            <CardDescription>Fill in the details below to create a new job posting.</CardDescription>
                        </CardHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Job Title <span className="text-destructive">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. Senior Frontend Developer"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Company <span className="text-destructive">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g. Acme Inc."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Location <span className="text-destructive">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g. Remote, New York, NY"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>


                                    <FormField
                                        control={form.control}
                                        name="skills"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Required Skills <span className="text-destructive">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. JavaScript, React, Node.js"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs">
                                                    Separate skills with commas
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Job Description <span className="text-destructive">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter a detailed job description..."
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>

                                <CardFooter className="flex justify-between border-t p-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push("/job-posting-dashboard")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-1">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                <span>Creating...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Create Job Post
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </main>
        </div>
    )
}
