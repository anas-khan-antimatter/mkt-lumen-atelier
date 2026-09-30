"use client"

import { motion } from "framer-motion"
import { ConsultWizard } from "@/components/consult-wizard"

export default function ConsultPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-12 lg:pt-48 lg:pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Get Started
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Book a Complimentary Consult
            </h1>
            <p className="mt-4 text-base text-foreground/60 max-w-xl leading-relaxed">
              Tell us a bit about your project, and we will schedule a free hour to
              explore your space and vision — no commitment, just conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wizard */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="mx-auto max-w-2xl">
          <ConsultWizard />
        </div>
      </section>
    </>
  )
}