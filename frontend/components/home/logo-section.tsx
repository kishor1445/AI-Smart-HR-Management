"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function LogoSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="border-y bg-muted/40 py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          className="flex flex-col items-center justify-center gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-medium text-muted-foreground">Trusted by companies worldwide</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center w-full max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-full max-w-[140px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image 
                  src="/placeholder.svg?height=40&width=120" 
                  alt={`Company logo ${i}`} 
                  width={120} 
                  height={40} 
                  className="w-full h-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
