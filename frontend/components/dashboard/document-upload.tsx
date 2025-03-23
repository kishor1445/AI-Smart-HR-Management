"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, X } from "lucide-react"

interface DocumentUploadProps {
    title: string
    description: string
    acceptedFileTypes?: string
}

export function DocumentUpload({ title, description, acceptedFileTypes = ".pdf,.doc,.docx" }: DocumentUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const removeFile = () => {
        setFile(null)
    }

    return (
        <Card className="hover-card">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {!file ? (
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${
                            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="mx-auto flex flex-col items-center gap-3">
                            <Upload className="h-10 w-10 text-muted-foreground" />
                            <div className="flex flex-col space-y-1 text-center">
                                <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                                <p className="text-xs text-muted-foreground">
                                    Supports {acceptedFileTypes.replace(/\./g, "").replace(/,/g, ", ")} files
                                </p>
                            </div>
                            <Button size="sm" className="mt-2">
                                <label className="cursor-pointer">
                                    Browse Files
                                    <input type="file" className="hidden" accept={acceptedFileTypes} onChange={handleFileChange} />
                                </label>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={removeFile}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

