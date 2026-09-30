"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, Palette, Columns2, Check } from "lucide-react"

function MaterialPalette({
  palette,
}: {
  palette: { name: string; hex: string; role: string }[]
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4 text-[#A67C52]" />
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Material Palette
        </p>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {palette.map((swatch) => (
          <div key={swatch.name} className="group relative">
            <div
              className="aspect-square rounded-sm shadow-sm border border-foreground/10 transition-transform group-hover:scale-105"
              style={{ backgroundColor: swatch.hex }}
            />
            <div className="mt-2 text-center">
              <p className="text-[11px] font-medium text-foreground/80 leading-tight">
                {swatch.name}
              </p>
              <p className="text-[9px] text-foreground/40 uppercase tracking-wider">
                {swatch.role}
              </p>
              <p className="text-[8px] text-foreground/30 font-mono">{swatch.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BeforeAfterCard({
  item,
  index,
}: {
  item: { label: string; beforeDesc: string; afterDesc: string }
  index: number
}) {
  const [view, setView] = useState<"before" | "after">("after")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="border border-foreground/10 rounded-sm overflow-hidden bg-muted/20"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-foreground/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Columns2 className="h-4 w-4 text-[#A67C52]" />
          <span className="text-xs uppercase tracking-widest font-medium text-foreground/60">
            {item.label}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-foreground/5 rounded-full p-0.5">
          <button
            onClick={() => setView("before")}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full transition-colors ${
              view === "before"
                ? "bg-foreground text-background"
                : "text-foreground/50 hover:text-foreground/80"
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setView("after")}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full transition-colors ${
              view === "after"
                ? "bg-foreground text-background"
                : "text-foreground/50 hover:text-foreground/80"
            }`}
          >
            After
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Visual indicator */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg ${
              view === "after"
                ? "bg-[#A67C52]/20 text-[#A67C52]"
                : "bg-foreground/10 text-foreground/40"
            }`}
          >
            {view === "after" ? "✓" : "✗"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1.5">
              {view === "before" ? "The Challenge" : "The Resolution"}
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {view === "before" ? item.beforeDesc : item.afterDesc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      {/* Hero — full-bleed magazine spread */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end">
        {/* Photo backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D6CEBD] via-[#C4A882] to-[#A67C52] dark:from-[#2D2A28] dark:via-[#1a1714] dark:to-[#0d0b0a]">
          {/* Subtle paper texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Title area */}
        <div className="relative z-10 w-full pt-40 pb-14 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors mb-8 backdrop-blur-sm bg-black/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Projects
              </Link>

              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50">
                    {project.year}
                  </span>
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.1] text-balance">
                  {project.title}
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-xl font-light leading-relaxed">
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-6 mt-6 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Magazine spread: intro + palette side-by-side */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 border-b border-foreground/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main editorial column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[#A67C52] mb-4 font-medium">
                The Brief
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80 font-serif italic">
                &ldquo;{project.description}&rdquo;
              </p>
              <div className="mt-8 h-px w-12 bg-[#A67C52]/40" />
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground/70">
                {project.detail}
              </p>
            </motion.div>

            {/* Sidebar: palette + scope */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-10"
            >
              <MaterialPalette palette={project.palette} />

              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                  Scope of Work
                </p>
                <ul className="space-y-3">
                  {project.scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-foreground/70"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#A67C52] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery — full-bleed magazine layout */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#A67C52] mb-8 font-medium text-center"
          >
            Project Photography
          </motion.p>

          <div className="space-y-8">
            {project.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-sm bg-gradient-to-br from-[#D6CEBD] to-[#A67C52] ${
                    i === 1 ? "aspect-[2.4/1]" : "aspect-[16/9]"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="font-serif text-white/30 text-xl sm:text-2xl block">
                        {project.title}
                      </span>
                      <span className="text-white/15 text-sm mt-2 block">
                        Photo {i + 1} &mdash; {project.category}
                      </span>
                    </div>
                  </div>
                  {/* Paper texture overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-foreground/30">
                    View {i + 1} of {project.images.length}
                  </span>
                  <span className="text-[10px] text-foreground/20 font-mono">
                    {'—'} {project.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After section — editorial case study */}
      <section className="py-20 lg:py-28 bg-muted/20 border-t border-foreground/5 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#A67C52] mb-4 font-medium">
              Case Study
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
              Before &amp; After
            </h2>
            <p className="mt-3 text-sm text-foreground/50 max-w-md mx-auto">
              Tap each card to toggle between the original condition and our intervention.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.beforeAfter.map((item, i) => (
              <BeforeAfterCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-foreground text-background">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4 font-medium">
              Let&apos;s Work Together
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-background">
              Have a project in mind?
            </h2>
            <p className="mt-6 text-base sm:text-lg text-background/60 max-w-lg mx-auto leading-relaxed">
              Every space has a story waiting to be told. We&apos;d love to hear yours.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/consult"
                className="inline-flex h-12 items-center justify-center rounded-full bg-background text-foreground px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-background/90"
              >
                Book a Consult
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
              <Link
                href="/moodboard"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-background/20 text-background px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-background hover:text-foreground"
              >
                Build a Moodboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}