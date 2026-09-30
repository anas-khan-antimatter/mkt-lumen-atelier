export interface MaterialSwatch {
  name: string
  hex: string
  role: string
}

export interface BeforeAfter {
  label: string
  beforeDesc: string
  afterDesc: string
}

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
  borough: string
  year: number
  scope: string[]
  palette: MaterialSwatch[]
  beforeAfter: BeforeAfter[]
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
    borough: "Brooklyn Heights",
    year: 2024,
    scope: ["Full interior design", "Custom millwork design", "Furnishing & styling", "Art curation"],
    palette: [
      { name: "Clay", hex: "#C4A882", role: "Wall finish" },
      { name: "Oat", hex: "#E8DEC1", role: "Upholstery" },
      { name: "Sage", hex: "#8A9A83", role: "Accent" },
      { name: "Warm Charcoal", hex: "#3A3532", role: "Millwork" },
      { name: "Brass", hex: "#C5A55A", role: "Hardware" },
    ],
    beforeAfter: [
      { label: "Parlor Floor Layout", beforeDesc: "Closed-off rooms with narrow doorways and a dark hallway. Original plaster in disrepair, outdated radiators exposed.", afterDesc: "Full-width opening connects front and back parlors. Restored moldings, new custom millwork conceals radiators. Light flows through." },
      { label: "Fireplace Wall", beforeDesc: "Painted brick surround, non-functional hearth, asymmetrical mantel.", afterDesc: "Original marble restored, new limestone hearth, simple oak mantel with concealed media alcove." },
    ],
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
    borough: "Carroll Gardens",
    year: 2024,
    scope: ["Kitchen design & layout", "Custom cabinetry", "Stone & tile selection", "Stool & lighting specification"],
    palette: [
      { name: "Pietra Cardosa", hex: "#B5B0A2", role: "Countertops" },
      { name: "Ribbon Oak", hex: "#C4A46C", role: "Cabinetry" },
      { name: "Brushed Brass", hex: "#B8964E", role: "Hardware / rail" },
      { name: "Matte White", hex: "#F0EDE6", role: "Tile" },
      { name: "Warm Black", hex: "#2D2A28", role: "Window frames" },
    ],
    beforeAfter: [
      { label: "Kitchen Layout", beforeDesc: "Closed galley with low ceilings, no natural connection to dining area.", afterDesc: "Steel beam removed, full-open plan. Island anchors the space with seating on two sides." },
      { label: "Window Wall", beforeDesc: "Single small window, bulkhead dropped ceiling.", afterDesc: "Steel-framed casement windows full height. Banquette tucked beneath." },
    ],
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
    borough: "Fort Greene",
    year: 2023,
    scope: ["Bedroom design", "Custom furniture", "Limewash finish specification", "Dressing room design"],
    palette: [
      { name: "Limewash Putty", hex: "#D6CEBD", role: "Wall finish" },
      { name: "Belgian Linen", hex: "#E5DDD0", role: "Bed upholstery" },
      { name: "Smoked Oak", hex: "#6B5D4F", role: "Vanity + rail" },
      { name: "Dusk Blue", hex: "#5A6B70", role: "Bed linens" },
      { name: "Warm White", hex: "#F5F0E8", role: "Ceiling / trim" },
    ],
    beforeAfter: [
      { label: "Bedroom Volume", beforeDesc: "Standard drywall box with recessed can lights. Off-white paint throughout.", afterDesc: "Limewash finish on all walls. Custom bed platform anchors the room. Dimmable sconces replace overheads." },
      { label: "Closet Area", beforeDesc: "Bi-fold doors, wire shelving, cramped feel.", afterDesc: "Open hanging rail, custom oak vanity, full-length mirror. Feels like a dressing room, not a closet." },
    ],
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
    borough: "Williamsburg",
    year: 2024,
    scope: ["Commercial interior design", "Custom furniture system", "Lighting design", "Art rail & partition system"],
    palette: [
      { name: "Poured Resin", hex: "#D4D0C8", role: "Floor" },
      { name: "Terrazzo", hex: "#B8B0A0", role: "Reception desk" },
      { name: "Felt Charcoal", hex: "#4A4542", role: "Moveable partitions" },
      { name: "Gallery White", hex: "#F2EFE8", role: "Wall" },
      { name: "Warm Aluminum", hex: "#A09888", role: "Track / hardware" },
    ],
    beforeAfter: [
      { label: "Main Room", beforeDesc: "Divided warren of private offices, low drop ceiling, carpet tiles.", afterDesc: "Full-height volume, exposed structure, polished resin floor. Track lighting on grid." },
      { label: "Reception", beforeDesc: "Small desk in a dark corner.", afterDesc: "Monolithic terrazzo reception desk on axis with entry. Art wall behind." },
    ],
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
    borough: "Park Slope",
    year: 2023,
    scope: ["Living room design", "Custom banquette", "Window treatment design", "Art & object sourcing"],
    palette: [
      { name: "Chocolate Velvet", hex: "#4A3428", role: "Curtains" },
      { name: "Textured Wool", hex: "#C8BEB0", role: "Banquette" },
      { name: "Bronze", hex: "#7A6B5A", role: "Lamp / accents" },
      { name: "Carrara Marble", hex: "#E0DBD0", role: "Coffee table" },
      { name: "Cream", hex: "#F0EBE0", role: "Trim / ceiling" },
    ],
    beforeAfter: [
      { label: "Sitting Area", beforeDesc: "Furniture pushed against walls, no focal point. Single overhead light.", afterDesc: "Banquette wraps the far wall, centered on a marble coffee table. Floor lamp creates reading zone." },
      { label: "Window Wall", beforeDesc: "Bare windows, radiator cover damaged.", afterDesc: "Floor-to-ceiling chocolate velvet curtains frame the windows. Custom radiator cover with marble top." },
    ],
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
    borough: "Clinton Hill",
    year: 2024,
    scope: ["Kitchen & dining design", "Custom island & cabinetry", "Brass & lighting specification", "Space planning"],
    palette: [
      { name: "Honed Calacatta", hex: "#E8E2D4", role: "Island counter" },
      { name: "Ribbon Oak", hex: "#B89860", role: "Floor-to-ceiling cabinetry" },
      { name: "Brushed Brass", hex: "#C8A85A", role: "Rail / hardware" },
      { name: "Matte Black", hex: "#2A2826", role: "Faucet / fixtures" },
      { name: "Warm White", hex: "#F2EEE6", role: "Wall" },
    ],
    beforeAfter: [
      { label: "Kitchen-Dining Connection", beforeDesc: "Wall separated kitchen from dining. Small peninsula, no sightlines.", afterDesc: "Load-bearing wall replaced with steel beam. Continuous oak cabinetry runs both sides." },
      { label: "Island", beforeDesc: "No island — small base cabinets only.", afterDesc: "Large island in honed Calacatta with brass rail detail. Seats four." },
    ],
  },
]

export const categories = ["All", "Living", "Kitchen", "Bedroom", "Commercial"] as const
export const boroughs = ["All", "Brooklyn Heights", "Carroll Gardens", "Fort Greene", "Williamsburg", "Park Slope", "Clinton Hill"] as const

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "All") return projectsData
  return projectsData.filter((p) => p.category === category)
}

export function getProjectsByBorough(borough: string): Project[] {
  if (borough === "All") return projectsData
  return projectsData.filter((p) => p.borough === borough)
}

export function getFilteredProjects(category: string, borough: string): Project[] {
  let result = projectsData
  if (category !== "All") result = result.filter((p) => p.category === category)
  if (borough !== "All") result = result.filter((p) => p.borough === borough)
  return result
}