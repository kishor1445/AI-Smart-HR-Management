"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Calendar, BarChart3, FileText, MessageSquare, ChevronRight } from "lucide-react"

export default function FeaturesSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const features = [
    {
      icon: <Users className="size-10 text-violet-600" />,
      title: "Recruitment & Onboarding",
      description:
          "Streamline your hiring process from job posting to employee onboarding with customizable workflows.",
    },
    {
      icon: <Calendar className="size-10 text-violet-600" />,
      title: "Time & Attendance",
      description: "Track employee attendance, manage time-off requests, and monitor work hours with ease.",
    },
    {
      icon: <BarChart3 className="size-10 text-violet-600" />,
      title: "Performance Management",
      description: "Set goals, conduct reviews, and provide continuous feedback to help employees grow.",
    },
    {
      icon: <FileText className="size-10 text-violet-600" />,
      title: "Document Management",
      description: "Securely store and manage employee documents, contracts, and company policies.",
    },
    {
      icon: <MessageSquare className="size-10 text-violet-600" />,
      title: "Employee Engagement",
      description: "Conduct surveys, gather feedback, and boost employee satisfaction and retention.",
    },
    {
      icon: <BarChart3 className="size-10 text-violet-600" />,
      title: "Analytics & Reporting",
      description: "Access powerful insights and custom reports to make data-driven HR decisions.",
    },
  ]

  return (
      <section id="features" className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-[10%] right-[5%] w-[20%] h-[20%] rounded-full bg-violet-200/30 dark:bg-violet-900/10 blur-3xl" />
          <div className="absolute bottom-[10%] left-[5%] w-[20%] h-[20%] rounded-full bg-violet-300/20 dark:bg-violet-800/10 blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
              className="flex flex-col items-center justify-center gap-12 md:gap-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
          >
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <motion.div
                  className="inline-block rounded-lg bg-violet-100 dark:bg-violet-900/30 px-3 py-1 text-sm text-violet-800 dark:text-violet-300"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                Features
              </motion.div>
              <motion.h2
                  className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-gradient-to-r from-violet-700 via-violet-600 to-violet-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
              >
                Everything you need to manage your workforce
              </motion.h2>
              <motion.p
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our comprehensive HR platform helps you streamline operations, improve employee experience, and make
                data-driven decisions.
              </motion.p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
              {features.map((feature, i) => (
                  <motion.div
                      key={i}
                      className="group relative overflow-hidden rounded-xl backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-800/20 p-6 shadow-xl transition-all hover:shadow-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-violet-950/20 dark:to-transparent -z-10" />
                    <div className="flex flex-col gap-4">
                      <div className="flex size-16 items-center justify-center rounded-xl bg-violet-100/80 dark:bg-violet-900/30 backdrop-blur-sm transition-transform duration-300 group-hover:rotate-3">
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                      <Link
                          href="#"
                          className="flex items-center text-sm font-medium text-violet-600 group-hover:text-violet-700 transition-all duration-300"
                      >
                        Learn more
                        <ChevronRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
  )
}

