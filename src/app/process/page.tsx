"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check, Palette, MapPin, Clock } from "lucide-react"
import { useState } from "react"

const chapters = [
  {
    id: "discovery",
    label: "Discovery",
    icon: "🔍",
    title: "We begin by listening",
    description:
      "Every project starts with a conversation. We visit your space, understand how you live, and uncover what matters most — the morning light in the kitchen, the quiet corner you crave, the way you entertain.",
    duration: "1–2 weeks",
    deliverables: [
      "On-site walkthrough & photography",
      "Client questionnaire & lifestyle audit",
      "Existing conditions drawings",
      "Preliminary budget scoping",
    ],
  },
  {
    id: "concept",
    label: "Concept",
    icon: "✏️",
    title: "The first sketches",
    description:
      "Armed with insight, we develop two to three spatial concepts. These are not polished renderings — they are charged sketches, material collages, and massing studies that test ideas before we commit.",
    duration: "2–3 weeks",
    deliverables: [
      "Space planning options (2–3 layouts)",
      "Preliminary material palette",
      "Furniture & finish concepts",
      "Client review & direction",
    ],
  },
  {
    id: "design-development",
    label: "Design Development",
    icon: "📐",
    title: "Refining the vision",
    description:
      "We take the chosen concept and resolve every detail — millwork elevations, tile layouts, lighting plans, hardware selections. This phase produces the full set of drawings needed for pricing and permitting.",
    duration: "4–8 weeks",
    deliverables: [
      "Detailed construction drawings",
      "Final material & finish schedule",
      "Millwork & custom furniture designs",
      "Lighting & electrical plans",
      "Specifications for bidding",
    ],
  },
  {
    id: "procurement",
    label: "Procurement",
    icon: "📦",
    title: "Sourcing with intent",
    description:
      "We source every element — from the stone slab to the door pull — with a focus on craft, durability, and character. Our relationships with vendors and artisans mean we access pieces you won't find in a showroom.",
    duration: "4–10 weeks",
    deliverables: [
      "Ordering & vendor management",
      "Custom furniture fabrication oversight",
      "Antique & vintage sourcing",
      "Expediting & delivery coordination",
    ],
  },
  {
    id: "construction",
    label: "Construction",
    icon: "🔨",
    title: "Building in partnership",
    description:
      "We work alongside your contractor as the client's advocate. Weekly site visits, punch-list walks, and real-time problem-solving keep the project on track and on budget.",
    duration: "6–20 weeks",
    deliverables: [
      "Weekly site visits & reporting",
      "Submittal review & approvals",
      "Field coordination with trades",
      "Quality control & punch lists",
    ],
  },
  {
    id: "styling",
    label: "Styling & Staging",
    icon: "🪴",
    title: "The final layer",
    description:
      "The space is built — now we bring it to life. Art placement, styling, linens, layering. This is the phase where a house becomes a home.",
    duration: "1–2 weeks",
    deliverables: [
      "Art curation & framing",
      "Accessory & object styling",
      "Linen & soft goods installation",
      "Final walk-through with client",
    ],
  },
]

export default function ProcessPage() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id)
  const [scrolledTo, setScrolledTo] = useState<string | null>(null)

  return (
    <>
      {/* Hero — editorial header */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-28 px-6 lg:px-8 bg-background border-b border-foreground/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-[#A67C52] mb-4">
              Our Approach
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              The Process
            </h1>
            <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl leading-relaxed">
              Every project follows the same arc — from the first conversation to
              the final styling. Each phase is designed to build confidence, not
              complexity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky chapter nav */}
      <nav className="sticky top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-foreground/5">
        <div className="px-6 lg:px-8 mx-auto max-w-7xl py-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
          {chapters.map((ch, i) => (
            <motion.a
              key={ch.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              href={`#${ch.id}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveChapter(ch.id)
                const el = document.getElementById(ch.id)
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className={`flex-shrink-0 text-[10px] uppercase tracking-widest font-medium transition-all px-3 py-1.5 rounded-full border ${
                activeChapter === ch.id
                  ? "bg-[#A67C52] text-white border-[#A67C52]"
                  : "text-foreground/50 border-foreground/10 hover:border-foreground/30 hover:text-foreground/80"
              }`}
            >
              {ch.label}
            </motion.a>
          ))}
          <div className="flex-1 min-w-0" />
          <Link
            href="/consult"
            className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-medium text-[#A67C52] hover:text-[#A67C52]/80 transition-colors"
          >
            Book a Consult
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </nav>

      {/* Chapters */}
      <section className="px-6 lg:px-8 py-16 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-28">
            {chapters.map((ch, ci) => (
              <motion.div
                key={ch.id}
                id={ch.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(ci * 0.08, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                onViewportEnter={() => {
                  setActiveChapter(ch.id)
                  setScrolledTo(ch.id)
                }}
                className="scroll-mt-44"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                  {/* Chapter number + icon column */}
                  <div className="lg:col-span-3 order-2 lg:order-1">
                    <div className="flex items-center gap-3 mb-4 lg:mb-0">
                      <span className="text-[10px] font-mono text-[#A67C52]">
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                      <span className="text-2xl">{ch.icon}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-foreground/40">
                      <Clock className="h-3 w-3" />
                      {ch.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-6 order-1 lg:order-2">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground">
                      {ch.title}
                    </h2>
                    <p className="mt-4 sm:text-base lg:text-lg leading-relaxed text-foreground/60 max-w-xl">
                      {ch.description}
                    </p>
                  </div>

                  {/* Deliverables sidebar */}
                  <div className="lg:col-span-3 order-3 bg-muted/20 rounded-sm p-6 lg:p-8 border border-foreground/5">
                    <p className="text-[10px] uppercase tracking-widest text-[#A67C52] font-medium mb-4">
                      Deliverables
                    </p>
                    <ul className="space-y-2.5">
                      {ch.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-xs text-foreground/70 leading-relaxed"
                        >
                          <Check className="h-3 w-3 text-[#A67C52] flex-shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Divider */}
                {ci < chapters.length - 1 && (
                  <div className="mt-20 h-px w-full bg-gradient-to-r from-[#A67C52]/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-muted/20 border-t border-foreground/5 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] font-medium text-[#A67C52] mb-4"
          >
            Ready to Begin?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground"
          >
            Let&rsquo;s start a conversation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-base sm:text-lg text-foreground/60 max-w-lg mx-auto leading-relaxed"
          >
            Book a complimentary discovery call and tell us about your space.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Link
              href="/consult"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground text-background px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90"
            >
              Book a Consult
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}