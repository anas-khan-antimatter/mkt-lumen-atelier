"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle, Clock, PencilRuler, Paintbrush, Sofa, Ruler } from "lucide-react"
import Link from "next/link"

const processSteps = [
  {
    id: "discovery",
    title: "Discovery & Consultation",
    subtitle: "We listen before we design",
    icon: "PencilRuler",
    duration: "1–2 weeks",
    items: [
      "Initial consultation (in-person or video)",
      "Site visit and measurement",
      "Style exploration and questionnaire",
      "Budget discussion and alignment",
      "Scope definition and proposal",
    ],
    detail:
      "Every project begins with a conversation. We visit your space, listen to how you live or work there, and explore what you're drawn to — reference images, materials, textures, moods. This phase ends with a clear scope, budget, and timeline you feel good about.",
    palette: ["#f0ebe3", "#d4cdc4", "#c2b9ae"],
  },
  {
    id: "concept",
    title: "Concept Development",
    subtitle: "Finding the direction",
    icon: "Paintbrush",
    duration: "2–4 weeks",
    items: [
      "Space planning and layout options",
      "Material and finish selection",
      "Color palette development",
      "Furniture and lighting concepts",
      "Preliminary moodboards and renderings",
    ],
    detail:
      "We develop 2–3 conceptual directions, each with a distinct material palette and spatial strategy. We present them alongside reference imagery, material samples, and rough layouts. You choose the direction — or we blend the best of each.",
    palette: ["#e8dfd4", "#c9b9a8", "#a8927a"],
  },
  {
    id: "design",
    title: "Design Development",
    subtitle: "Refining every detail",
    icon: "Ruler",
    duration: "4–8 weeks",
    items: [
      "Detailed floor plans and elevations",
      "Custom millwork and furniture design",
      "Lighting plan and specification",
      "Finish schedule and material sourcing",
      "Budget refinement and vendor quotes",
    ],
    detail:
      "This is where the vision becomes a blueprint. We produce detailed drawings, spec every finish and fixture, design custom pieces, and source materials. You'll see exactly what goes where — and what it costs — before anything is ordered.",
    palette: ["#e5dbd0", "#d0c3b4", "#b8a896"],
  },
  {
    id: "execution",
    title: "Procurement & Execution",
    subtitle: "Making it real",
    icon: "Sofa",
    duration: "8–16 weeks",
    items: [
      "Place orders and manage lead times",
      "Construction and millwork oversight",
      "Coordinate trades and installations",
      "Receive and inspect all goods",
      "Styling and final placement",
    ],
    detail:
      "We manage the entire procurement and installation process — ordering, tracking, receiving, and placing every item. We're on-site regularly, coordinating with contractors, trades, and craftspeople to ensure everything matches the design intent.",
    palette: ["#e0d5ca", "#cbbdac", "#b09a84"],
  },
  {
    id: "reveal",
    title: "The Reveal",
    subtitle: "Your space, transformed",
    icon: "CheckCircle",
    duration: "1 week",
    items: [
      "Final walkthrough and punch list",
      "Art and accessory styling",
      "Professional photography",
      "Handoff and care instructions",
      "Celebration!",
    ],
    detail:
      "The big day. We walk through every room together, making sure everything feels right. Art is hung, books are arranged, light falls where it should. We hand over a binder with care instructions, source details, and a little something to mark the occasion.",
    palette: ["#ede6dc", "#d8cdbe", "#c4b4a0"],
  },
]

const processNav = processSteps.map((s) => ({ id: s.id, title: s.title }))

function getIcon(iconName: string) {
  switch (iconName) {
    case "PencilRuler": return PencilRuler
    case "Paintbrush":  return Paintbrush
    case "Ruler":       return Ruler
    case "Sofa":        return Sofa
    case "CheckCircle": return CheckCircle
    default:            return Clock
  }
}

export default function ProcessPage() {
  const [activeChapter, setActiveChapter] = useState("discovery")

  useEffect(() => {
    const observers = processSteps.map((step) => {
      const el = document.getElementById(step.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveChapter(step.id)
          }
        },
        { rootMargin: "-40% 0px -40% 0px" }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24 px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Our Process
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl tracking-tight text-foreground max-w-4xl leading-tight">
              How we bring
              <br />
              <span className="italic text-foreground/60">a room to life</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-foreground/60 max-w-xl leading-relaxed">
              From first conversation to final walkthrough, our process is designed to
              be collaborative, transparent, and thorough. No two projects are the same,
              but the arc is always intentional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process diagram — quick overview */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-x-auto scrollbar-hide"
          >
            <div className="flex items-center gap-4 min-w-full">
              {processSteps.map((step, i) => {
                const Icon = getIcon(step.icon)
                return (
                  <a
                    key={step.id}
                    href={`#${step.id}`}
                    className={`flex-shrink-0 w-48 p-6 rounded-sm border border-border/40 bg-background hover:bg-muted/30 transition-all duration-300 ${
                      activeChapter === step.id ? "border-foreground/30 shadow-sm" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-4 w-4 text-foreground/60" />
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm text-foreground leading-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-foreground/50">{step.subtitle}</p>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky side nav */}
      <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 px-4">
        {processNav.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={`flex items-center gap-2 transition-all duration-300 ${
              activeChapter === chapter.id
                ? "text-foreground"
                : "text-foreground/30 hover:text-foreground/60"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                activeChapter === chapter.id
                  ? "bg-foreground scale-125"
                  : "bg-foreground/20 scale-75"
              }`}
            />
            <span className="text-[10px] uppercase tracking-widest font-medium">
              {chapter.title}
            </span>
          </a>
        ))}
      </nav>

      {/* Detailed steps */}
      {processSteps.map((step, i) => {
        const Icon = getIcon(step.icon)
        return (
          <section
            key={step.id}
            id={step.id}
            className={`py-24 lg:py-32 px-6 lg:px-8 ${
              i % 2 === 0 ? "bg-background" : "bg-muted/20"
            }`}
          >
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Step number chip */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-serif text-4xl text-foreground/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-foreground/60" />
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight mb-2">
                    {step.title}
                  </h2>
                  <p className="text-base italic text-foreground/50 mb-6">
                    {step.subtitle}
                  </p>

                  {/* Material palette swatches */}
                  <div className="flex gap-2 mb-6">
                    {step.palette.map((color) => (
                      <span
                        key={color}
                        className="h-8 w-8 rounded-full"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">
                      Palette
                    </span>
                  </div>

                  <p className="text-base text-foreground/70 leading-relaxed max-w-md">
                    {step.detail}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 20 : 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Visual card */}
                  <div
                    className="rounded-sm overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${step.palette[0]} 0%, ${step.palette[1]} 50%, ${step.palette[2]} 100%)`,
                    }}
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs uppercase tracking-widest text-foreground/40">
                          Key Deliverables
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {step.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-foreground/70"
                          >
                            <CheckCircle className="h-3.5 w-3.5 text-foreground/40 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Estimated effort */}
                  <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Typical duration: {step.duration}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-4">
              Ready to start the process?
            </h2>
            <p className="text-base text-foreground/60 max-w-md mx-auto leading-relaxed mb-8">
              Book a complimentary discovery consult. We&apos;ll explore your space,
              listen to what you need, and see if we&apos;re the right fit.
            </p>
            <Link
              href="/consult"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground text-background px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90"
            >
              Book a Consult
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}