"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema, type loginSchemaType } from "@/lib/zodSchema"
import { setToken, isAuthenticated } from "@/auth"
import { useSession } from "@/app/auth/session-provider"

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { checkAuth } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(
        searchParams.get("registered") === "true" ? "Registration successful! Please log in." : null,
    )

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            router.push("/candidate/apply")
        }
    }, [router])

    const form = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (values: loginSchemaType) => {
        setIsLoading(true)
        setError(null)

        try {
            // Send login request to FastAPI backend
            const formData = new FormData()
            formData.append("username", values.username)
            formData.append("password", values.password)

            const response = await fetch("http://192.168.120.28:8000/application/login", {
                method: "POST",
                // credentials: "include", // Important: This sends cookies with the request
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Invalid email or password")
            }

            const data = await response.json()
            console.log(data)
            localStorage.setItem("auth_token", data.access_token)

            // Store token if it's returned from the backend
            if (data.token) {
                setToken(data.token)
            }

            // Store user info if available
            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        id: data.user.id || "",
                        name: data.user.name || "",
                        email: data.user.email || values.username,
                    }),
                )
            } else {
                // If no user data is returned, at least store the email
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        email: values.username,
                    }),
                )
            }

            // Update auth context
            checkAuth()

            // Redirect to dashboard on successful login
            router.push("/candidate/dashboard")
        } catch (error) {
            console.error(error)
            setError(error instanceof Error ? error.message : "An error occurred during sign in")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                </div>

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md mb-6">{successMessage}</div>
                )}

                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-6">{error}</div>}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-gray-700">Password</FormLabel>
                                        <Link href="/candidate/forgot-password" className="text-xs text-violet-600 hover:underline">
                                            Forgot password?
                                        </Link>
                                    </div>
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
                            {isLoading ? "Signing in..." : "Login with Email"}
                        </Button>
                    </form>
                </Form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Don&#39;t have an account?{" "}
                    <Link href="/candidate/register" className="text-violet-600 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

