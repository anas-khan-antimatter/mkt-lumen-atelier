"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sofa, Tv, Lamp, Table, Square, Circle, Trash2, Save, Undo2, RotateCcw, Shirt, BookOpen } from "lucide-react"

/* ---------- Types ---------- */
export interface PlacedItem {
  id: string
  type: string
  label: string
  x: number
  y: number
  rotation: number
  color: string
}

interface FurnitureOption {
  type: string
  label: string
  icon: typeof Sofa
  width: number
  height: number
  color: string
}

const FURNITURE_ITEMS: FurnitureOption[] = [
  { type: "sofa", label: "Sofa", icon: Sofa, width: 120, height: 40, color: "#c2b9ae" },
  { type: "armchair", label: "Armchair", icon: Sofa, width: 50, height: 40, color: "#d4cdc4" },
  { type: "coffee-table", label: "Coffee Table", icon: Table, width: 60, height: 40, color: "#b8a896" },
  { type: "floor-lamp", label: "Floor Lamp", icon: Lamp, width: 16, height: 16, color: "#a8927a" },
  { type: "tv", label: "TV Unit", icon: Tv, width: 80, height: 10, color: "#2a2724" },
  { type: "rug", label: "Rug", icon: Square, width: 100, height: 70, color: "#e0d5ca" },
  { type: "plant", label: "Plant", icon: Circle, width: 24, height: 24, color: "#7a8a6e" },
  { type: "bookshelf", label: "Bookshelf", icon: BookOpen, width: 30, height: 60, color: "#8a7a6e" },
  { type: "ottoman", label: "Ottoman", icon: Square, width: 40, height: 40, color: "#c9b9a8" },
]

const ROOM_PRESETS = [
  { name: "Living Room 12x16", width: 384, height: 512 },
  { name: "Living Room 14x18", width: 448, height: 576 },
  { name: "Bedroom 12x14", width: 384, height: 448 },
  { name: "Bedroom 14x16", width: 448, height: 512 },
  { name: "Studio 16x20", width: 512, height: 640 },
]

const STORAGE_KEY = "lumen-moodboard"

/* ---------- Grid helper ---------- */
function GridPattern({ width, height }: { width: number; height: number }) {
  const gridSize = 16
  const lines: JSX.Element[] = []
  for (let x = 0; x <= width; x += gridSize) {
    lines.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke="#00000008" strokeWidth={1} />
    )
  }
  for (let y = 0; y <= height; y += gridSize) {
    lines.push(
      <line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#00000008" strokeWidth={1} />
    )
  }
  return <g>{lines}</g>
}

/* ---------- Main Component ---------- */
export function MoodboardPicker() {
  const [roomWidth, setRoomWidth] = useState(384)
  const [roomHeight, setRoomHeight] = useState(512)
  const [items, setItems] = useState<PlacedItem[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [history, setHistory] = useState<PlacedItem[][]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [savedMoodboards, setSavedMoodboards] = useState<string[]>([])
  const [boardName, setBoardName] = useState("")
  const [showSave, setShowSave] = useState(false)

  /* Load from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.items) setItems(parsed.items)
        if (parsed.roomWidth) setRoomWidth(parsed.roomWidth)
        if (parsed.roomHeight) setRoomHeight(parsed.roomHeight)
        if (parsed.savedMoodboards) setSavedMoodboards(parsed.savedMoodboards)
      }
    } catch {
      /* ignore corrupt data */
    }
  }, [])

  /* Save to localStorage */
  const persist = useCallback(
    (newItems: PlacedItem[], w?: number, h?: number) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: newItems,
          roomWidth: w ?? roomWidth,
          roomHeight: h ?? roomHeight,
          savedMoodboards,
        })
      )
    },
    [roomWidth, roomHeight, savedMoodboards]
  )

  /* Add item */
  const addItem = (furniture: FurnitureOption) => {
    const newItem: PlacedItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      type: furniture.type,
      label: furniture.label,
      x: roomWidth / 2 - furniture.width / 2,
      y: roomHeight / 2 - furniture.height / 2,
      rotation: 0,
      color: furniture.color,
    }
    setHistory((h) => [...h, items])
    const updated = [...items, newItem]
    setItems(updated)
    setSelectedItemId(newItem.id)
    persist(updated)
  }

  /* Remove item */
  const removeItem = (id: string) => {
    setHistory((h) => [...h, items])
    const updated = items.filter((i) => i.id !== id)
    setItems(updated)
    setSelectedItemId(null)
    persist(updated)
  }

  /* Clear all */
  const clearAll = () => {
    setHistory((h) => [...h, items])
    setItems([])
    setSelectedItemId(null)
    persist([])
  }

  /* Undo */
  const undo = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setItems(prev)
    setSelectedItemId(null)
    persist(prev)
  }

  /* Drag start on floor plan */
  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation()
    const item = items.find((i) => i.id === itemId)
    if (!item) return
    setSelectedItemId(itemId)
    setIsDragging(true)
    setDragOffset({ x: e.clientX - item.x, y: e.clientY - item.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedItemId) return
    const svgEl = e.currentTarget as SVGSVGElement
    const rect = svgEl.getBoundingClientRect()
    let newX = e.clientX - dragOffset.x
    let newY = e.clientY - dragOffset.y
    newX = Math.max(0, Math.min(roomWidth - 20, newX))
    newY = Math.max(0, Math.min(roomHeight - 20, newY))
    const updated = items.map((i) =>
      i.id === selectedItemId ? { ...i, x: newX, y: newY } : i
    )
    setItems(updated)
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      setHistory((h) => [...h, items])
      persist(items)
    }
  }

  /* Rotate selected */
  const rotateSelected = () => {
    if (!selectedItemId) return
    setHistory((h) => [...h, items])
    const updated = items.map((i) =>
      i.id === selectedItemId ? { ...i, rotation: i.rotation + 90 } : i
    )
    setItems(updated)
    persist(updated)
  }

  /* Canvas click — deselect */
  const handleCanvasClick = () => {
    setSelectedItemId(null)
    setActiveTool(null)
  }

  /* Save named moodboard */
  const saveMoodboard = () => {
    const name = boardName.trim() || `Moodboard ${savedMoodboards.length + 1}`
    const key = `lumen-moodboard-${name}`
    localStorage.setItem(key, JSON.stringify({ items, roomWidth, roomHeight }))
    const updated = [...savedMoodboards, name]
    setSavedMoodboards(updated)
    setBoardName("")
    setShowSave(false)
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
    storage.savedMoodboards = updated
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
  }

  /* Load saved moodboard */
  const loadMoodboard = (name: string) => {
    const key = `lumen-moodboard-${name}`
    const raw = localStorage.getItem(key)
    if (!raw) return
    const data = JSON.parse(raw)
    setHistory((h) => [...h, items])
    setItems(data.items || [])
    if (data.roomWidth) setRoomWidth(data.roomWidth)
    if (data.roomHeight) setRoomHeight(data.roomHeight)
    setSelectedItemId(null)
    persist(data.items || [], data.roomWidth, data.roomHeight)
  }

  const selectedItem = items.find((i) => i.id === selectedItemId)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Toolbar */}
      <div className="lg:col-span-1 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Room Size
          </p>
          <div className="flex gap-2 flex-wrap">
            {ROOM_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setHistory((h) => [...h, items])
                  setRoomWidth(p.width)
                  setRoomHeight(p.height)
                  persist(items, p.width, p.height)
                }}
                className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-sm border transition-all ${
                  roomWidth === p.width && roomHeight === p.height
                    ? "border-foreground bg-foreground/5 text-foreground"
                    : "border-border/40 text-foreground/60 hover:border-foreground/30"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Furniture
          </p>
          <div className="grid grid-cols-3 gap-2">
            {FURNITURE_ITEMS.map((f) => {
              const Icon = f.icon
              return (
                <button
                  key={f.type}
                  onClick={() => addItem(f)}
                  className="flex flex-col items-center gap-1 p-2 rounded-sm border border-border/40 hover:border-foreground/30 hover:bg-muted/20 transition-all cursor-pointer"
                  title={f.label}
                >
                  <Icon className="h-5 w-5 text-foreground/60" />
                  <span className="text-[9px] uppercase tracking-wider text-foreground/50">
                    {f.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected item controls */}
        {selectedItem && (
          <div className="p-4 rounded-sm bg-muted/20 border border-border/40 space-y-3">
            <p className="text-xs uppercase tracking-widest text-foreground/60">
              {selectedItem.label}
            </p>
            <div className="flex gap-2">
              <button
                onClick={rotateSelected}
                className="flex-1 inline-flex items-center justify-center gap-1 h-8 rounded-sm border border-border/40 text-xs uppercase tracking-wider text-foreground/70 hover:bg-foreground/5 transition-all"
              >
                <RotateCcw className="h-3 w-3" />
                Rotate
              </button>
              <button
                onClick={() => removeItem(selectedItem.id)}
                className="flex-1 inline-flex items-center justify-center gap-1 h-8 rounded-sm border border-border/40 text-xs uppercase tracking-wider text-red-400/70 hover:bg-red-400/5 transition-all"
              >
                <Trash2 className="h-3 w-3" />
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full border border-border/40 text-xs uppercase tracking-wider text-foreground/70 hover:bg-foreground/5 transition-all disabled:opacity-30"
          >
            <Undo2 className="h-3.5 w-3.5" />
            Undo
          </button>
          <button
            onClick={clearAll}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full border border-border/40 text-xs uppercase tracking-wider text-foreground/70 hover:bg-foreground/5 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
          <button
            onClick={() => setShowSave(!showSave)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full bg-foreground text-background text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all"
          >
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
        </div>

        {showSave && (
          <div className="flex gap-2">
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Moodboard name..."
              className="flex-1 h-10 px-3 rounded-sm border border-border/60 bg-transparent text-foreground text-xs outline-none focus-visible:border-foreground transition-colors"
            />
            <button
              onClick={saveMoodboard}
              className="h-10 px-4 rounded-sm bg-foreground text-background text-xs uppercase tracking-wider hover:bg-foreground/90 transition-all"
            >
              Save
            </button>
          </div>
        )}

        {/* Saved moodboards */}
        {savedMoodboards.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Saved Moodboards
            </p>
            <div className="space-y-1">
              {savedMoodboards.map((name) => (
                <button
                  key={name}
                  onClick={() => loadMoodboard(name)}
                  className="block w-full text-left text-xs tracking-wider text-foreground/60 hover:text-foreground px-3 py-2 rounded-sm hover:bg-muted/20 transition-all"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floor plan canvas */}
      <div className="lg:col-span-3">
        <div className="bg-[#f5f0eb] dark:bg-[#1c1916] rounded-sm overflow-hidden relative">
          <svg
            width={roomWidth}
            height={roomHeight}
            viewBox={`0 0 ${roomWidth} ${roomHeight}`}
            className="w-full h-auto cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleCanvasClick}
          >
            {/* Grid */}
            <GridPattern width={roomWidth} height={roomHeight} />

            {/* Walls outline */}
            <rect
              x={1}
              y={1}
              width={roomWidth - 2}
              height={roomHeight - 2}
              fill="none"
              stroke="#00000015"
              strokeWidth={2}
              rx={2}
            />

            {/* Items */}
            {items.map((item) => {
              const furn = FURNITURE_ITEMS.find((f) => f.type === item.type)
              const w = furn?.width || 40
              const h = furn?.height || 40
              const isSelected = item.id === selectedItemId
              return (
                <g
                  key={item.id}
                  transform={`translate(${item.x},${item.y}) rotate(${item.rotation})`}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    handleMouseDown(e, item.id)
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedItemId(item.id)
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {/* Shadow */}
                  <rect
                    x={-w / 2 + 3}
                    y={-h / 2 + 3}
                    width={w}
                    height={h}
                    rx={4}
                    fill="rgba(0,0,0,0.08)"
                  />
                  {/* Shape */}
                  <rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    rx={4}
                    fill={item.color}
                    stroke={isSelected ? "#000" : "#00000020"}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  {/* Label */}
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[7px] fill-foreground/60 font-medium pointer-events-none"
                  >
                    {item.label}
                  </text>
                  {/* Selection handles */}
                  {isSelected && (
                    <>
                      <circle cx={-w / 2} cy={-h / 2} r={4} fill="white" stroke="black" strokeWidth={1.5} />
                      <circle cx={w / 2} cy={-h / 2} r={4} fill="white" stroke="black" strokeWidth={1.5} />
                      <circle cx={-w / 2} cy={h / 2} r={4} fill="white" stroke="black" strokeWidth={1.5} />
                      <circle cx={w / 2} cy={h / 2} r={4} fill="white" stroke="black" strokeWidth={1.5} />
                    </>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          Drag items to arrange. Click a piece to select, then rotate or remove.
        </p>
      </div>
    </div>
  )
}