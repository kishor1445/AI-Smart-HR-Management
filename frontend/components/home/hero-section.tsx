"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from 'lucide-react'
import { motion } from "framer-motion"
import {DashboardHero} from "@/public/images";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/50 to-transparent dark:from-violet-950/10 dark:to-transparent -z-10" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-violet-200/30 dark:bg-violet-900/10 blur-3xl" />
        <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] rounded-full bg-violet-300/20 dark:bg-violet-800/10 blur-3xl" />
        <div className="absolute -bottom-[10%] left-[30%] w-[50%] h-[50%] rounded-full bg-violet-100/30 dark:bg-violet-900/10 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px] items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <motion.div 
                className="inline-block rounded-lg bg-violet-100 dark:bg-violet-900/30 px-3 py-1 text-sm text-violet-800 dark:text-violet-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Streamline Your HR Operations
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-violet-700 via-violet-600 to-violet-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Modern HR Management for Growing Teams
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Simplify recruitment, onboarding, performance reviews, and employee management with our all-in-one HR platform.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-violet-500/30 hover:translate-y-[-2px]">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/30 transition-all duration-300">
                Book a Demo
              </Button>
            </motion.div>
            <motion.div 
              className="flex items-center gap-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-1">
                <CheckCircle2 className="size-4 text-violet-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="size-4 text-violet-600" />
                <span>14-day free trial</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute -z-10 size-full rounded-full bg-violet-100/50 dark:bg-violet-900/20 blur-3xl"></div>
            <div className="relative w-full overflow-hidden rounded-xl border shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-transparent pointer-events-none"></div>
              <Image
                src={DashboardHero}
                width={800}
                height={550}
                alt="HR Dashboard"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
