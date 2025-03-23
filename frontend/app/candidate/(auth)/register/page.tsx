"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {signupSchema, signupSchemaType} from "@/lib/zodSchema";


export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<signupSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: signupSchemaType) => {
        setIsLoading(true)
        setError(null)

        console.log(values)

        try {
            const response = await fetch("http://192.168.120.28:8000/application/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Registration failed")
            }

            router.push("/candidate/login?registered=true")
        } catch (error) {
            console.error(error)
            setError(error instanceof Error ? error.message : "An error occurred during registration")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-6">{error}</div>}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" className="bg-white text-gray-900 border-gray-300" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name@example.com"
                                            type="email"
                                            className="bg-white text-gray-900 border-gray-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="bg-white text-gray-900 border-gray-300" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="bg-white text-gray-900 border-gray-300" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full p-2.5 rounded-md transition-colors flex flex-row items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader className="animate-spin" />}
                            {isLoading ? "Creating account..." : "Register"}
                        </Button>
                    </form>
                </Form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/candidate/login" className="text-violet-600 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}

