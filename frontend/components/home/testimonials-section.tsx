"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const testimonials = [
    {
      quote:
          "HRFlow has completely transformed how we manage our HR processes. The intuitive interface and powerful features have saved us countless hours.",
      name: "Sarah Johnson",
      title: "HR Director, TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
          "The recruitment and onboarding modules are game-changers. We've reduced our time-to-hire by 40% since implementing HRFlow.",
      name: "Michael Chen",
      title: "Talent Acquisition Manager, GrowthCo",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
          "The analytics and reporting capabilities give us insights we never had before. Now we can make truly data-driven HR decisions.",
      name: "Jessica Williams",
      title: "CHRO, InnovateInc",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
      <section id="testimonials" className="border-t bg-muted/40 py-20 md:py-28 lg:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[5%] w-[20%] h-[20%] rounded-full bg-violet-200/30 dark:bg-violet-900/10 blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-[20%] h-[20%] rounded-full bg-violet-300/20 dark:bg-violet-800/10 blur-3xl" />
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
                Testimonials
              </motion.div>
              <motion.h2
                  className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-violet-700 via-violet-600 to-violet-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
              >
                Loved by HR professionals
              </motion.h2>
              <motion.p
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                See what our customers have to say about how HRFlow has transformed their HR operations.
              </motion.p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
              {testimonials.map((testimonial, i) => (
                  <motion.div
                      key={i}
                      className="rounded-xl backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-800/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      whileHover={{ y: -5 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-violet-600" />
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="size-5 fill-violet-500 text-violet-500" />
                        ))}
                      </div>
                      <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                      <div className="flex items-center gap-4 mt-auto pt-4">
                        <div className="size-12 rounded-full overflow-hidden border-2 border-violet-100 dark:border-violet-800">
                          <Image
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
  )
}

