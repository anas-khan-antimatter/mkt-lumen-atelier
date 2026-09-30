"use client"

import { motion } from "framer-motion"
import { MoodboardPicker } from "@/components/moodboard-picker"

export default function MoodboardPage() {
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
              Interactive Tool
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Floor Plan Moodboard
            </h1>
            <p className="mt-4 text-base text-foreground/60 max-w-xl leading-relaxed">
              Drag furniture onto a scaled room layout to experiment with layouts and
              compositions. Your arrangement is saved locally — come back anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Moodboard picker */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="mx-auto max-w-7xl">
          <MoodboardPicker />
        </div>
      </section>
    </>
  )
}