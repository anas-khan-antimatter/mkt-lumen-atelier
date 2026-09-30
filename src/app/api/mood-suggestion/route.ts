import { NextRequest, NextResponse } from "next/server"

/* ---------- Deterministic fallback palette data ---------- */

interface PaletteSuggestion {
  name: string
  hexes: string[]
  description: string
  vibe: string
  tags: string[]
}

const PALETTE_LIBRARY: PaletteSuggestion[] = [
  {
    name: "Clay & Oat",
    hexes: ["#c2b9ae", "#f0ebe3", "#d4cdc4", "#e8dfd4", "#8a7a6e"],
    description: "Warm neutrals with a soft, grounded feel — ideal for living spaces that need to feel both refined and inviting.",
    vibe: "Warm Minimalist",
    tags: ["living", "living-room", "bedroom", "neutral", "warm"],
  },
  {
    name: "Sage & Linen",
    hexes: ["#7a8a6e", "#d4d8c8", "#e8ebe0", "#b8c0a8", "#4a5a40"],
    description: "Muted greens paired with natural off-whites. Calm, organic, and quietly sophisticated.",
    vibe: "Organic Calm",
    tags: ["bedroom", "living", "kitchen", "green", "natural"],
  },
  {
    name: "Slate & Flax",
    hexes: ["#6a6a6a", "#b8b0a8", "#e0d8d0", "#888080", "#404040"],
    description: "Cool greys balanced by warm flax tones. A contemporary palette that retains softness.",
    vibe: "Modern Refined",
    tags: ["kitchen", "commercial", "office", "grey", "contemporary"],
  },
  {
    name: "Terracotta & Ivory",
    hexes: ["#c86a4a", "#f5ece4", "#e8d4c0", "#a87050", "#e0b898"],
    description: "Earthy terracotta anchors this palette while ivory and clay keep it airy. Full of character without overwhelming.",
    vibe: "Earthy Warmth",
    tags: ["living", "dining", "entryway", "terracotta", "bold"],
  },
  {
    name: "Deep Navy & Natural",
    hexes: ["#1a2a3a", "#c8c0b8", "#e8e0d8", "#f0ece6", "#2a4048"],
    description: "A dramatic, cocooning palette. Navy walls or upholstery grounded by natural linen and oak tones.",
    vibe: "Bold Cocoon",
    tags: ["bedroom", "study", "dining", "dark", "dramatic"],
  },
  {
    name: "Rose & Putty",
    hexes: ["#d4a090", "#c8b8b0", "#e8dcd8", "#f0e8e4", "#b09890"],
    description: "Blush rose softened by putty and sand. Romantic without being sweet — lovely for bedrooms and powder rooms.",
    vibe: "Soft Romance",
    tags: ["bedroom", "bathroom", "powder", "pink", "soft"],
  },
  {
    name: "Ochre & Charcoal",
    hexes: ["#c89040", "#303030", "#d8c8b0", "#e8e0d0", "#686050"],
    description: "A confident, collected palette. Warm ochre pops against charcoal and natural canvas.",
    vibe: "Collected Confidence",
    tags: ["living", "dining", "study", "bold", "contrast"],
  },
  {
    name: "Pale Sky & Sand",
    hexes: ["#a8b8c8", "#d8d0c0", "#e8e4dc", "#c0c0b8", "#889098"],
    description: "Cool blues and warm sands meet in a palette that feels expansive and calm — like a room open to the coast.",
    vibe: "Coastal Serenity",
    tags: ["living", "bedroom", "bathroom", "blue", "coastal"],
  },
  {
    name: "Espresso & Cream",
    hexes: ["#2a1e14", "#f0ece4", "#d0c8bc", "#8a7a6a", "#b8a898"],
    description: "Deep espresso brown with rich cream and caramel notes. Classic, grounded, luxurious.",
    vibe: "Classic Luxury",
    tags: ["living", "study", "commercial", "dark", "brown"],
  },
  {
    name: "Olive & Terra",
    hexes: ["#68784a", "#d0c0a8", "#b0a088", "#e0d8cc", "#8a7858"],
    description: "An earthy, Mediterranean-inspired palette where olive green meets warm terracotta and limestone.",
    vibe: "Mediterranean Calm",
    tags: ["kitchen", "dining", "outdoor", "green", "mediterranean"],
  },
  {
    name: "Blush & Pebble",
    hexes: ["#d4b8b0", "#c8c0b8", "#e8e0dc", "#b0a8a0", "#f0e8e8"],
    description: "Subtle warmth without overt color. Blush-adjacent tones on a bed of pebble grey — barely there but deeply felt.",
    vibe: "Subtle Warmth",
    tags: ["bedroom", "living", "bathroom", "neutral", "soft"],
  },
  {
    name: "Wheat & Indigo",
    hexes: ["#3a4a6a", "#d8c8a8", "#e8dcc8", "#b8a888", "#6a7a8a"],
    description: "Indigo blue anchor pieces set against warm wheat and natural linen. Timeless, honest, quietly beautiful.",
    vibe: "Timeless Honest",
    tags: ["living", "bedroom", "dining", "blue", "warm"],
  },
  {
    name: "Ash & Umber",
    hexes: ["#6a6058", "#d0c8c0", "#e8e0d8", "#b0a89c", "#3a3028"],
    description: "A study in browns — from pale ash to deep umber. Monochromatic but far from flat. Private, enveloping.",
    vibe: "Monochromatic Depth",
    tags: ["bedroom", "study", "living", "brown", "dark"],
  },
  {
    name: "Cinnamon & Cream",
    hexes: ["#b87050", "#f0e8dc", "#e0d0c0", "#c8a888", "#d8c0a8"],
    description: "Warm spice tones balanced by creamy off-whites. Inviting, appetite-stimulating, great for kitchens and dining.",
    vibe: "Warm Inviting",
    tags: ["kitchen", "dining", "living", "warm", "spice"],
  },
]

function findPalette(roomType: string, vibe?: string): PaletteSuggestion {
  const query = roomType.toLowerCase().replace(/\s+/g, "")

  // Find exact tag match first
  const exact = PALETTE_LIBRARY.find(
    (p) => p.tags.includes(query) || p.tags.some((t) => query.includes(t))
  )
  if (exact) return exact

  // Fall back by keyword
  if (query.includes("kitchen")) {
    return PALETTE_LIBRARY.find((p) => p.tags.includes("kitchen")) || PALETTE_LIBRARY[0]
  }
  if (query.includes("bedroom")) {
    return PALETTE_LIBRARY.find((p) => p.tags.includes("bedroom")) || PALETTE_LIBRARY[1]
  }
  if (query.includes("living") || query.includes("family")) {
    return PALETTE_LIBRARY.find((p) => p.tags.includes("living") && p.tags.includes("warm")) || PALETTE_LIBRARY[0]
  }

  return PALETTE_LIBRARY[Math.floor(Math.random() * PALETTE_LIBRARY.length)]
}

/* ---------- Route Handler ---------- */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomType, vibe, preferences } = body

    if (!roomType) {
      return NextResponse.json({ error: "roomType is required" }, { status: 400 })
    }

    // If an AI model API key is present, call it. Otherwise fall through.
    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || ""

    if (apiKey && apiKey.length > 10) {
      try {
        const provider = process.env.OPENAI_API_KEY ? "openai" : "anthropic"
        let aiResult: { name: string; hexes: string[]; description: string; vibe: string }

        if (provider === "openai") {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content:
                    "You are an interior design color consultant. Return a JSON object with a `name` (string), `hexes` (array of 5 hex strings), `description` (1-2 sentences), and `vibe` (short phrase). Be specific, nuanced, and avoid generic palettes.",
                },
                {
                  role: "user",
                  content: `Suggest a color palette for a ${roomType}${vibe ? ` with a "${vibe}" vibe` : ""}.${preferences ? ` Preferences: ${preferences}` : ""}`,
                },
              ],
              temperature: 0.8,
              max_tokens: 300,
            }),
          })

          if (response.ok) {
            const json = await response.json()
            const parsed = JSON.parse(json.choices[0].message.content)
            aiResult = parsed
            return NextResponse.json({
              palette: aiResult,
              source: "ai",
              alternatives: PALETTE_LIBRARY.filter(
                (p) => p.name !== aiResult.name
              ).slice(0, 2),
            })
          }
        } else if (provider === "anthropic") {
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-3-haiku-20240307",
              max_tokens: 300,
              messages: [
                {
                  role: "user",
                  content: `Suggest a color palette for a ${roomType}${vibe ? ` with a "${vibe}" vibe` : ""}.${preferences ? ` Preferences: ${preferences}` : ""}\n\nRespond only with a JSON object with keys: name (string), hexes (array of 5 hex strings), description (1-2 sentences), vibe (short phrase).`,
                },
              ],
            }),
          })

          if (response.ok) {
            const json = await response.json()
            const text = json.content?.[0]?.text || "{}"
            const cleaned = text.replace(/```json\s*|\s*```/g, "").trim()
            const parsed = JSON.parse(cleaned)
            return NextResponse.json({
              palette: parsed,
              source: "ai",
              alternatives: PALETTE_LIBRARY.filter(
                (p) => p.name !== parsed.name
              ).slice(0, 2),
            })
          }
        }
      } catch {
        // Fall through to deterministic fallback
      }
    }

    // Deterministic fallback
    const palette = findPalette(roomType, vibe)
    const alternatives = PALETTE_LIBRARY.filter((p) => p.name !== palette.name).slice(0, 3)

    return NextResponse.json({
      palette,
      source: "deterministic",
      alternatives,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}