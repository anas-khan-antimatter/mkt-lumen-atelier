"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projectsData, categories, getCategoryCounts } from "@/lib/projects"

const counts = getCategoryCounts()

function ProjectFilters({
  active,
  onChange,
}: {
  active: string
  onChange: (cat: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative px-5 py-2.5 text-xs uppercase tracking-widest font-medium rounded-full border transition-all duration-300 ${
            active === cat
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-foreground/60 border-border hover:border-foreground/30 hover:text-foreground"
          }`}
        >
          {cat}
          <span className="ml-1.5 text-[10px] opacity-60">({counts[cat] || 0})</span>
        </button>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Portfolio
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Our Projects
            </h1>
            <p className="mt-4 text-base text-foreground/60 max-w-xl leading-relaxed">
              Every space tells a story. Browse our work by room type or explore
              each project in detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProjectFilters active={activeCategory} onChange={setActiveCategory} />
          </motion.div>
        </div>
      </section>

      {/* Project grid */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block">
                    <div className="aspect-[4/5] overflow-hidden bg-muted rounded-sm relative">
                      <div className="w-full h-full bg-[#e8e0d8] dark:bg-[#1a1714] flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-700">
                        <span className="font-serif text-lg text-foreground/30">{project.title}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          View
                          <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-serif text-lg tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                          {project.title}
                        </h2>
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
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}