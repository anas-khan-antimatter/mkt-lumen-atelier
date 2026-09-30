"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, MapPin, Palette } from "lucide-react"
import { getFilteredProjects, categories, boroughs, projectsData } from "@/lib/projects"

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeBorough, setActiveBorough] = useState("All")

  const filtered = getFilteredProjects(activeCategory, activeBorough)

  return (
    <>
      {/* Page header — editorial */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 px-6 lg:px-8 bg-background border-b border-foreground/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-[#A67C52] mb-4">
              Portfolio
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Our Projects
            </h1>
            <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl leading-relaxed">
              Every space tells a story. Browse our work by room type, borough,
              or explore each case study in full.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dual filter bar */}
      <section className="px-6 lg:px-8 pt-10 pb-8 sticky top-0 bg-background/90 backdrop-blur-md z-30 border-b border-foreground/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-start gap-6"
          >
            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/30 self-center mr-1">
                Room
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-medium rounded-full border transition-all ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Borough pills */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/30 self-center mr-1">
                Borough
              </span>
              {boroughs.map((b) => (
                <button
                  key={b}
                  onClick={() => setActiveBorough(b)}
                  className={`px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-medium rounded-full border transition-all ${
                    activeBorough === b
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project grid */}
      <section className="px-6 lg:px-8 py-16 pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block">
                    {/* Hero image placeholder */}
                    <div className="aspect-[4/3] relative overflow-hidden rounded-sm bg-gradient-to-br from-[#D6CEBD] via-[#C4A882] to-[#A67C52] mb-4">
                      {/* Palette corners */}
                      <div className="absolute top-3 right-3 flex gap-1 z-10">
                        {project.palette.slice(0, 3).map((s) => (
                          <div
                            key={s.hex}
                            className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                            style={{ backgroundColor: s.hex }}
                            title={s.name}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-white/25 text-lg group-hover:text-white/40 transition-colors">
                          {project.category}
                        </span>
                      </div>
                      {/* Paper texture */}
                      <div
                        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                    </div>

                    {/* Project info */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] uppercase tracking-widest text-[#A67C52] font-medium">
                          {project.category}
                        </span>
                        <span className="text-[9px] text-foreground/30">—</span>
                        <span className="text-[9px] text-foreground/40 flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5" />
                          {project.borough}
                        </span>
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl tracking-tight text-foreground group-hover:text-[#A67C52] transition-colors">
                        {project.title}
                      </h2>
                      <p className="mt-1.5 text-sm text-foreground/60 leading-relaxed line-clamp-2">
                        {project.subtitle}
                      </p>

                      {/* Mini palette strip */}
                      <div className="flex items-center gap-1.5 mt-3">
                        <Palette className="h-3 w-3 text-foreground/30" />
                        {project.palette.map((s) => (
                          <div
                            key={s.hex}
                            className="w-3.5 h-3.5 rounded-sm border border-foreground/10"
                            style={{ backgroundColor: s.hex }}
                            title={`${s.name} — ${s.role}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="mt-4 flex items-center gap-1 text-[10px] uppercase tracking-widest text-foreground/30 group-hover:text-[#A67C52] transition-colors">
                      View Case Study
                      <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <p className="text-foreground/40 font-serif text-xl">
                No projects match those filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All")
                  setActiveBorough("All")
                }}
                className="mt-4 text-xs uppercase tracking-widest text-[#A67C52] hover:text-foreground transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}