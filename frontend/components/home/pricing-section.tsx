"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function PricingSection() {
  const [mounted, setMounted] = useState(false)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const plans = [
    {
      name: "Starter",
      price: billingCycle === "monthly" ? "$29" : "$290",
      description: "Perfect for small teams just getting started with HR management.",
      features: [
        "Up to 25 employees",
        "Core HR management",
        "Time & attendance tracking",
        "Basic reporting",
        "Email support",
      ],
    },
    {
      name: "Professional",
      price: billingCycle === "monthly" ? "$79" : "$790",
      description: "Ideal for growing businesses with more advanced HR needs.",
      features: [
        "Up to 100 employees",
        "Everything in Starter",
        "Advanced recruitment tools",
        "Performance management",
        "Custom workflows",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations with complex requirements.",
      features: [
        "Unlimited employees",
        "Everything in Professional",
        "Advanced analytics",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 premium support",
      ],
    },
  ]

  return (
      <section id="pricing" className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
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
                Pricing
              </motion.div>
              <motion.h2
                  className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-violet-700 via-violet-600 to-violet-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
              >
                Simple, transparent pricing
              </motion.h2>
              <motion.p
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                Choose the plan that&#39;s right for your business. All plans include a 14-day free trial.
              </motion.p>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <Button
                  variant={billingCycle === "monthly" ? "default" : "outline"}
                  className={billingCycle === "monthly" ? "bg-violet-600 hover:bg-violet-700" : ""}
                  onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </Button>
              <Button
                  variant={billingCycle === "yearly" ? "default" : "outline"}
                  className={billingCycle === "yearly" ? "bg-violet-600 hover:bg-violet-700" : ""}
                  onClick={() => setBillingCycle("yearly")}
              >
                Yearly <span className="ml-1 text-xs font-normal">Save 20%</span>
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
              {plans.map((plan, i) => (
                  <motion.div
                      key={i}
                      className={`relative flex flex-col rounded-xl backdrop-blur-md ${
                          plan.popular
                              ? "bg-white/60 dark:bg-gray-900/60 border-violet-200 dark:border-violet-800 shadow-xl"
                              : "bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-800/20 shadow-lg"
                      } p-6 hover:shadow-2xl transition-all duration-300`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      whileHover={{ y: -5 }}
                  >
                    {plan.popular && (
                        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-3 py-1 text-xs font-medium text-white">
                          Most Popular
                        </div>
                    )}
                    <div className="flex flex-col gap-4 h-full">
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          {plan.price !== "Custom" && (
                              <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                          )}
                        </div>
                        <p className="mt-2 text-muted-foreground">{plan.description}</p>
                      </div>
                      <ul className="flex flex-col gap-3 my-6 flex-grow">
                        {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center gap-2">
                              <CheckCircle2 className="size-5 text-violet-600 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                        ))}
                      </ul>
                      <Button
                          className={`mt-auto ${
                              plan.popular
                                  ? "bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30"
                                  : "bg-muted hover:bg-muted/80"
                          }`}
                      >
                        {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                      </Button>
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
  )
}

