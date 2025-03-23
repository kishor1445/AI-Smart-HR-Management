"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CtaSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
      <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-50/50 dark:to-violet-950/10 -z-10" />

        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-violet-200/30 dark:bg-violet-900/10 blur-3xl" />
          <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-violet-300/20 dark:bg-violet-800/10 blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
              className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-800/20 p-8 md:p-12 lg:p-16 shadow-xl max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-transparent dark:from-violet-950/20 dark:to-transparent -z-10" />

            <div className="flex flex-col items-center justify-center gap-8 text-center">
              <motion.div
                  className="space-y-4 max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-gradient-to-r from-violet-700 via-violet-600 to-violet-500 bg-clip-text text-transparent">
                  Ready to transform your HR operations?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of companies that trust HRFlow to manage their most valuable asset—their people.
                </p>
              </motion.div>
              <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                    size="lg"
                    className="bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-violet-500/30 hover:translate-y-[-2px]"
                >
                  Start Your Free Trial
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/30 transition-all duration-300"
                >
                  Schedule a Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
  )
}

