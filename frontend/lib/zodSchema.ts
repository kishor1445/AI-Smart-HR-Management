import { z } from "zod"

export const applicationSchema = z.object({
    name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    gender: z.enum(["male", "female", "other"]).optional(),
    resume: z
        .instanceof(File)
        .refine((file) => file.size <= 5000000, { message: "File size must be less than 5MB." })
        .refine((file) => file.type === "application/pdf", { message: "File must be a PDF." }),
})

export const signupSchema = z
    .object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        email: z.string().email({ message: "Please enter a valid email address." }),
        password: z.string().min(8, { message: "Password must be at least 8 characters." }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const loginSchema = z.object({
    username: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
})

export const jobPostingSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    skills: z.string().min(1, "Required skills are required"),
    description: z.string().min(1, "Job description is required"),
})

export type signupSchemaType = z.infer<typeof signupSchema>
export type loginSchemaType = z.infer<typeof loginSchema>
export type applicationSchemaType = z.infer<typeof applicationSchema>
export type jobPostingType = z.infer<typeof jobPostingSchema>

