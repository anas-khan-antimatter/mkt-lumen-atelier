"use client"

import { motion } from "framer-motion"
import { Palette, Heart, Trash2, Download } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

interface MaterialTile {
  id: string
  name: string
  hex: string
  type: "finish" | "fabric" | "surface" | "accent"
  description: string
}

const allTiles: MaterialTile[] = [
  { id: "clay", name: "Clay", hex: "#C4A882", type: "finish", description: "Warm earth-toned wall finish" },
  { id: "oat", name: "Oat", hex: "#E8DEC1", type: "fabric", description: "Soft neutral upholstery" },
  { id: "sage", name: "Sage", hex: "#8A9A83", type: "finish", description: "Muted green accent" },
  { id: "warm-charcoal", name: "Warm Charcoal", hex: "#3A3532", type: "surface", description: "Deep millwork tone" },
  { id: "brass", name: "Brass", hex: "#C5A55A", type: "accent", description: "Warm metallic hardware" },
  { id: "pietra", name: "Pietra Cardosa", hex: "#B5B0A2", type: "surface", description: "Honed natural stone" },
  { id: "ribbon-oak", name: "Ribbon Oak", hex: "#C4A46C", type: "surface", description: "Ribbon-cut oak cabinetry" },
  { id: "brushed-brass", name: "Brushed Brass", hex: "#B8964E", type: "accent", description: "Satin brass hardware" },
  { id: "matte-white", name: "Matte White", hex: "#F0EDE6", type: "finish", description: "Clean white tile" },
  { id: "warm-black", name: "Warm Black", hex: "#2D2A28", type: "surface", description: "Deep window frames" },
  { id: "limewash", name: "Limewash Putty", hex: "#D6CEBD", type: "finish", description: "Textural limewash wall" },
  { id: "belgian-linen", name: "Belgian Linen", hex: "#E5DDD0", type: "fabric", description: "Natural linen upholstery" },
  { id: "smoked-oak", name: "Smoked Oak", hex: "#6B5D4F", type: "surface", description: "Smoked oak vanity" },
  { id: "dusk-blue", name: "Dusk Blue", hex: "#5A6B70", type: "fabric", description: "Muted blue bed linens" },
  { id: "white-terrazzo", name: "White Terrazzo", hex: "#E8E2D4", type: "surface", description: "Honed terrazzo counter" },
  { id: "sage-green", name: "Sage Green", hex: "#7A8B7A", type: "finish", description: "Sage green tile" },
  { id: "raw-linen", name: "Raw Linen", hex: "#D8D0C0", type: "fabric", description: "Unbleached linen drape" },
  { id: "antique-brass", name: "Antique Brass", hex: "#C8A85A", type: "accent", description: "Aged brass pull" },
]

const tileTypes = ["all", "finish", "fabric", "surface", "accent"] as const

function getSavedPins(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem("lumen-moodboard-pins")
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function savePins(ids: string[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("lumen-moodboard-pins", JSON.stringify(ids))
}

export default function MoodboardPage() {
  const [pinnedIds, setPinnedIds] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [boardName, setBoardName] = useState("My Moodboard")
  const [editingName, setEditingName] = useState(false)

  useEffect(() => {
    setPinnedIds(getSavedPins())
  }, [])

  const togglePin = useCallback((id: string) => {
    const next = pinnedIds.includes(id)
      ? pinnedIds.filter((pid) => pid !== id)
      : [...pinnedIds, id]
    setPinnedIds(next)
    savePins(next)
  }, [pinnedIds])

  const clearBoard = useCallback(() => {
    setPinnedIds([])
    savePins([])
  }, [])

  const copyShareLink = useCallback(() => {
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 2000)
  }, [])

  const filtered = activeFilter === "all"
    ? allTiles
    : allTiles.filter((t) => t.type === activeFilter)

  const pinnedTiles = allTiles.filter((t) => pinnedIds.includes(t.id))

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 px-6 lg:px-8 bg-background border-b border-foreground/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-[#A67C52] mb-4">
              Interactive Tool
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Moodboard
            </h1>
            <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl leading-relaxed">
              Click tiles to pin materials to your board. Your selections are
              saved automatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pinned board — live counter */}
      <section className="px-6 lg:px-8 py-6 bg-muted/10 border-b border-foreground/5 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Palette className="h-4 w-4 text-[#A67C52]" />
            <span className="text-xs uppercase tracking-widest font-medium text-foreground/60">
              Your Board
            </span>
            <span className="inline-flex items-center justify-center min-w-[1.8rem] h-5 rounded-full bg-[#A67C52]/20 text-[#A67C52] text-xs font-mono font-medium">
              {pinnedIds.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {pinnedTiles.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="w-5 h-5 rounded-full border border-white/20 shadow-sm cursor-pointer"
                style={{ backgroundColor: t.hex }}
                title={t.name}
                onClick={() => togglePin(t.id)}
              />
            ))}
            {pinnedIds.length > 6 && (
              <span className="text-[10px] text-foreground/40 font-mono">
                +{pinnedIds.length - 6}
              </span>
            )}
            <button
              onClick={clearBoard}
              disabled={pinnedIds.length === 0}
              className="inline-flex items-center gap-1 px-3 py-1 text-[10px] uppercase tracking-widest rounded-full border border-foreground/10 text-foreground/50 hover:border-red-400/30 hover:text-red-400 transition-colors disabled:opacity-30"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* Tiles gallery */}
      <section className="px-6 lg:px-8 py-8 pb-24">
        <div className="mx-auto max-w-7xl">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/30 self-center mr-1">
              Type
            </span>
            {tileTypes.map((tt) => (
              <button
                key={tt}
                onClick={() => setActiveFilter(tt)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium rounded-full border transition-all ${
                  activeFilter === tt
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30"
                }`}
              >
                {tt}
              </button>
            ))}
          </div>

          {/* Tiles grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
            {filtered.map((tile) => {
              const isPinned = pinnedIds.includes(tile.id)
              return (
                <motion.button
                  key={tile.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  onClick={() => togglePin(tile.id)}
                  className={`group relative rounded-sm overflow-hidden border-2 transition-all ${
                    isPinned
                      ? "border-[#A67C52] ring-1 ring-[#A67C52]/30"
                      : "border-foreground/10 hover:border-foreground/30"
                  } ${isPinned ? "bg-[#A67C52]/10" : "bg-transparent"}`}
                >
                  {/* Swatch */}
                  <div className="aspect-square w-full" style={{ backgroundColor: tile.hex }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isPinned && (
                        <Heart className="h-5 w-5 text-white drop-shadow-lg" />
                      )}
                    </div>
                    {/* Paper texture */}
                    <div
                      className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                  {/* Label */}
                  <div className="px-3 py-2.5 text-center">
                    <p className="text-[11px] font-medium text-foreground/80 leading-tight truncate">
                      {tile.name}
                    </p>
                    <p className="text-[8px] text-foreground/40 uppercase tracking-wider truncate">
                      {tile.type}
                    </p>
                    <p className="text-[7px] text-foreground/30 font-mono truncate">
                      {tile.hex}
                    </p>
                  </div>
                  {/* Pin indicator */}
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full transition-colors bg-transparent">
                    {isPinned && (
                      <div className="w-full h-full rounded-full bg-[#A67C52]" />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pinned board detail */}
      {pinnedTiles.length > 0 && (
        <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/10 border-t border-foreground/5">
          <div className="mx-auto max-w-7xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.25em] text-[#A67C52] mb-6 font-medium text-center"
            >
              Your Selection
            </motion.p>

            {/* Editable board name */}
            <div className="max-w-lg mx-auto mb-8">
              {editingName ? (
                <input
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={(e) => { if (e.key === "Enter") setEditingName(false) }}
                  className="w-full bg-transparent border-b-2 border-[#A67C52] font-serif text-xl text-foreground outline-none pb-1"
                  autoFocus
                />
              ) : (
                <h2
                  className="font-serif text-xl sm:text-2xl text-foreground cursor-pointer hover:text-[#A67C52] transition-colors text-center"
                  onClick={() => setEditingName(true)}
                >
                  {boardName} <span className="text-[10px] text-foreground/30">(click to rename)</span>
                </h2>
              )}
            </div>

            {/* Pinned tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
              {pinnedTiles.map((tile) => (
                <div
                  key={tile.id}
                  className="group relative rounded-sm overflow-hidden border border-foreground/10 bg-muted/10"
                >
                  <div className="aspect-[4/3]" style={{ backgroundColor: tile.hex }} />
                  <div className="px-3 py-2.5 text-center">
                    <p className="text-[10px] font-medium text-foreground/80 truncate">
                      {tile.name}
                    </p>
                    <p className="text-[8px] text-foreground/40 uppercase tracking-wider">
                      {tile.type} &middot; {tile.hex}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePin(tile.id)}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-foreground/10 hover:bg-red-400/30 flex items-center justify-center"
                    title="Remove"
                  >
                    <span className="text-[8px]">✕</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={copyShareLink}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-foreground/10 text-sm font-medium text-foreground/60 hover:bg-muted/20 transition-colors"
              >
                <Download className="h-4 w-4" />
                Copy Board Link
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Toast */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background px-4 py-2 rounded-full text-xs tracking-wide shadow-lg animate-fade-in-up">
          Board link copied
        </div>
      )}
    </>
  )
}