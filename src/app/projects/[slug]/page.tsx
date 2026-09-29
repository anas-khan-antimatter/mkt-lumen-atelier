"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, MapPin, Calendar } from "lucide-react"
import { getProjectBySlug } from "@/lib/projects"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-[#e8e0d8] dark:bg-[#1a1714]">
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-2xl text-foreground/20">{project.title}</span>
          </div>
        </div>
        <div className="relative z-10 w-full bg-gradient-to-t from-background via-background/80 to-transparent pt-32 pb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Projects
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] uppercase tracking-widest text-foreground/50 bg-foreground/5 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground max-w-3xl">
                {project.title}
              </h1>
              <p className="mt-3 text-lg text-foreground/60 max-w-xl">{project.subtitle}</p>
              <div className="flex flex-wrap gap-6 mt-6 text-sm text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.year}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project intro */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">About This Project</p>
              <p className="text-lg leading-relaxed text-foreground/80">
                {project.detail}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Scope of Work
              </p>
              <ul className="space-y-2.5">
                {project.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/30 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl space-y-6">
          {project.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`aspect-[${i === 1 ? "2/1" : "16/9"}] bg-muted rounded-sm overflow-hidden`}
            >
              <div className={`w-full h-full bg-[#e8e0d8] dark:bg-[#1a1714] flex items-center justify-center`}>
                <div className="text-center">
                  <span className="font-serif text-foreground/20 text-sm block">
                    Photo {i + 1}
                  </span>
                  <span className="text-xs text-foreground/10 mt-1 block">
                    {project.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-muted/30 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-4">
              Inspired by this project?
            </h2>
            <p className="text-base text-foreground/60 max-w-md mx-auto leading-relaxed mb-8">
              Let&apos;s explore what we can create together. Book a complimentary design
              consult to discuss your space.
            </p>
            <Link
              href="/contact#consult"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground text-background px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90"
            >
              Book a Complimentary Consult
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}