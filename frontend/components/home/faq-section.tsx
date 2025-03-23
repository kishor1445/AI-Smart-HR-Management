"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const faqs = [
    {
      question: "How long does implementation take?",
      answer:
          "Implementation typically takes 2-4 weeks depending on your organization's size and specific requirements. Our dedicated onboarding team will guide you through every step of the process.",
    },
    {
      question: "Can I import data from my current HR system?",
      answer:
          "Yes, HRFlow supports data migration from most popular HR systems. We provide tools and assistance to ensure a smooth transition without data loss.",
    },
    {
      question: "Is my data secure?",
      answer:
          "Absolutely. We use industry-leading security measures including encryption, regular security audits, and compliance with GDPR, HIPAA, and other regulations to keep your data safe.",
    },
    {
      question: "Do you offer customization options?",
      answer:
          "Yes, HRFlow is highly customizable. You can configure workflows, forms, reports, and more to match your specific HR processes and requirements.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
          "We offer multiple support channels including email, live chat, and phone support. Professional and Enterprise plans include priority support with faster response times.",
    },
  ]

  return (
      <section id="faq" className="border-t bg-muted/40 py-20 md:py-28 lg:py-32 relative overflow-hidden">
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
                FAQ
              </motion.div>
              <motion.h2
                  className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-violet-700 via-violet-600 to-violet-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
              >
                Frequently asked questions
              </motion.h2>
              <motion.p
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                Find answers to common questions about HRFlow.
              </motion.p>
            </div>

            <motion.div
                className="mx-auto w-full max-w-3xl backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-800/20 rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                    >
                      <AccordionItem
                          value={`item-${i}`}
                          className="border-b border-violet-100/50 dark:border-violet-800/50"
                      >
                        <AccordionTrigger className="text-left font-medium hover:text-violet-600 transition-colors py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>
  )
}

