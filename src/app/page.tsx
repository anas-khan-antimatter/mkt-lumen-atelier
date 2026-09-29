"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { projectsData } from "@/lib/projects"

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-background z-10" />
        <div className="w-full h-full bg-[#e8e0d8] dark:bg-[#1a1714]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 p-8 opacity-30 w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-foreground/5 rounded-sm"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, rgba(0,0,0,0.03) 0%, transparent 50%)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 lg:px-8 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/60 mb-6"
        >
          Brooklyn Interior Design Studio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight text-foreground max-w-4xl mx-auto text-balance"
        >
          Spaces that
          <br />
          <span className="italic text-foreground/70">feel like</span>
          <br />
          <span className="relative">
            home
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-foreground/20" />
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-base sm:text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed"
        >
          Refined interiors for living, working, and gathering&mdash;crafted with intent by
          our Brooklyn studio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground text-background px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90"
          >
            View Projects
            <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
          <Link
            href="/contact#consult"
            className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground hover:text-background"
          >
            Book a Consult
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-foreground/20"
        />
      </motion.div>
    </section>
  )
}

function FeaturedProjects() {
  const featured = projectsData.slice(0, 3)

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Selected Work
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium tracking-wide uppercase text-foreground/70 hover:text-foreground transition-colors group"
          >
            All Projects
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-muted rounded-sm relative">
                  <div className="w-full h-full bg-[#e8e0d8] dark:bg-[#1a1714] flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-700">
                    <span className="font-serif text-lg text-foreground/30">{project.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StudioPhilosophy() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Philosophy
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight mb-6">
              Design that
              <br />
              <span className="italic text-foreground/60">quiets the noise</span>
            </h2>
            <div className="space-y-4 text-base text-foreground/70 leading-relaxed max-w-md">
              <p>
                We believe the best interiors don&apos;t shout. They create a sense of ease&mdash;an
                atmosphere you feel when you walk in, before you notice any single thing.
              </p>
              <p>
                Every project begins with listening: to the space, to the light, to how you
                actually live. From there, we layer material, proportion, and intention until
                the room feels inevitable.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide uppercase text-foreground/70 hover:text-foreground transition-colors group"
            >
              About the Studio
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 -translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[3/4] bg-[#d4cdc4] dark:bg-[#1a1714] rounded-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-background/10 flex items-center justify-center">
                  <span className="font-serif text-foreground/30 text-5xl">LA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ConsultCTA() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8" id="consult">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
            Get Started
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight mb-6">
            Ready to transform
            <br />
            <span className="italic text-foreground/60">your space?</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 max-w-lg mx-auto leading-relaxed mb-8">
            Book a complimentary design consult. We&apos;ll discuss your vision, the space,
            and how we might work together.
          </p>
          <Link
            href="/contact#consult"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground text-background px-10 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90 shadow-sm"
          >
            Book Your Complimentary Consult
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            No commitment. Just conversation.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <StudioPhilosophy />
      <ConsultCTA />
    </>
  )
}