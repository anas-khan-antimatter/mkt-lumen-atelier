export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  category: "Living" | "Kitchen" | "Bedroom" | "Commercial"
  heroImage: string
  images: string[]
  description: string
  detail: string
  location: string
  year: number
  scope: string[]
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "heights-haven",
    title: "Heights Haven",
    subtitle: "A warm Brooklyn Heights living room reborn",
    category: "Living",
    heroImage: "/images/placeholder-state.svg",
    images: ["/images/placeholder-state.svg", "/images/placeholder-state.svg", "/images/placeholder-state.svg"],
    description:
      "A spacious parlor floor in a Brooklyn Heights brownstone, reimagined as a serene gathering space that bridges classic prewar bones with modern warmth.",
    detail:
      "We preserved the original plaster moldings and marble fireplace while introducing a muted palette of clay, oat, and sage. Custom millwork wraps the seating area, and hand-tufted wool anchors the room. The result feels both curated and deeply livable — a space that exhales.",
    location: "Brooklyn Heights, NY",
    year: 2024,
    scope: ["Full interior design", "Custom millwork design", "Furnishing & styling", "Art curation"],
  },
  {
    id: "2",
    slug: "west-light-kitchen",
    title: "West Light",
    subtitle: "A sun-drenched kitchen in Carroll Gardens",
    category: "Kitchen",
    heroImage: "/images/placeholder-state.svg",
    images: ["/images/placeholder-state.svg", "/images/placeholder-state.svg", "/images/placeholder-state.svg"],
    description:
      "A narrow but luminous Brooklyn kitchen opened up with custom cabinetry, marble, and warm oak — designed for both cooking and gathering.",
    detail:
      "Western light pours through steel-framed windows across Pietra Cardosa countertops. Ribbon-cut oak cabinetry keeps the space feeling calm and continuous. We added a banquette at the window for morning light and evening conversation — a kitchen that works as hard as it lives.",
    location: "Carroll Gardens, NY",
    year: 2024,
    scope: ["Kitchen design & layout", "Custom cabinetry", "Stone & tile selection", "Stool & lighting specification"],
  },
  {
    id: "3",
    slug: "primary-suite",
    title: "The Primary Suite",
    subtitle: "A tranquil bedroom retreat in Fort Greene",
    category: "Bedroom",
    heroImage: "/images/placeholder-state.svg",
    images: ["/images/placeholder-state.svg", "/images/placeholder-state.svg", "/images/placeholder-state.svg"],
    description:
      "A primary bedroom and dressing room designed as a private sanctuary — calm, tactile, and deeply personal.",
    detail:
      "We began with the bed — a low, upholstered platform in Belgian linen — and built outward. Walls are finished in a limewash that shifts with the day's light. A custom oak vanity and open hanging rail replace the traditional closet. Every surface rewards touch.",
    location: "Fort Greene, NY",
    year: 2023,
    scope: ["Bedroom design", "Custom furniture", "Limewash finish specification", "Dressing room design"],
  },
  {
    id: "4",
    slug: "gallery-coworking",
    title: "Gallery + Workspace",
    subtitle: "A creative commercial interior in Williamsburg",
    category: "Commercial",
    heroImage: "/images/placeholder-state.svg",
    images: ["/images/placeholder-state.svg", "/images/placeholder-state.svg", "/images/placeholder-state.svg"],
    description:
      "A hybrid gallery and coworking space in Williamsburg — fluid, minimal, and adaptable for rotating art and daily work.",
    detail:
      "A poured resin floor, movable felt partitions, and a monolithic reception desk in terrazzo define the space. Track lighting and gallery rails allow the art to change. We designed furniture to be reconfigurable, so the room can shift from opening night to quiet workday in hours.",
    location: "Williamsburg, NY",
    year: 2024,
    scope: ["Commercial interior design", "Custom furniture system", "Lighting design", "Art rail & partition system"],
  },
  {
    id: "5",
    slug: "parlor-sitting",
    title: "Parlor Sitting Room",
    subtitle: "An intimate living room for quiet entertaining",
    category: "Living",
    heroImage: "/images/placeholder-state.svg",
    images: ["/images/placeholder-state.svg", "/images/placeholder-state.svg", "/images/placeholder-state.svg"],
    description:
      "A compact parlor floor living room designed for intimate dinner parties and quiet evenings — every piece purposeful.",
    detail:
      "Rich chocolate velvet curtains frame original tall windows. A custom banquette in textured wool wraps the far wall, paired with a marble coffee table and sculptural floor lamp. The palette stays low-contrast — bronze, cream, charcoal — letting texture and proportion carry the room.",
    location: "Park Slope, NY",
    year: 2023,
    scope: ["Living room design", "Custom banquette", "Window treatment design", "Art & object sourcing"],
  },
  {
    id: "6",
    slug: "clinton-hill-kitchen",
    title: "Clinton Hill Kitchen",
    subtitle: "Open-plan kitchen with warm minimalism",
    category: "Kitchen",
    heroImage: "/images/placeholder-state.svg",
    images: ["/images/placeholder-state.svg", "/images/placeholder-state.svg", "/images/placeholder-state.svg"],
    description:
      "A ground-floor kitchen in Clinton Hill opened to the adjacent dining area — warm oak, brushed brass, and honed marble.",
    detail:
      "The challenge was creating distinct zones in an open plan without breaking sightlines. We anchored the kitchen with a large island in honed Calacatta, backed by floor-to-ceiling oak cabinetry. A brass rail and open shelving add warmth. The dining area uses a custom pendant to define the table without walls.",
    location: "Clinton Hill, NY",
    year: 2024,
    scope: ["Kitchen & dining design", "Custom island & cabinetry", "Brass & lighting specification", "Space planning"],
  },
]

export const categories = ["All", "Living", "Kitchen", "Bedroom", "Commercial"] as const

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug)
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: projectsData.length }
  for (const p of projectsData) {
    counts[p.category] = (counts[p.category] || 0) + 1
  }
  return counts
}