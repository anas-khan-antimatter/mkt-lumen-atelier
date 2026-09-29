import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-serif tracking-tight text-foreground">Lumen</span>
              <span className="text-2xl font-serif tracking-tight text-foreground/60">Atelier</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              A Brooklyn-based boutique interior design studio crafting refined, livable spaces that balance beauty, craft, and quiet intention.
            </p>
          </div>

          {/* Studio */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-4">Studio</h4>
            <ul className="space-y-3">
              <li><Link href="/projects" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>Brooklyn, NY</li>
              <li><a href="mailto:hello@lumenatelier.com" className="hover:text-foreground transition-colors">hello@lumenatelier.com</a></li>
              <li><a href="tel:+17185551234" className="hover:text-foreground transition-colors">+1 (718) 555-1234</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Lumen Atelier. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed with intent in Brooklyn.
          </p>
        </div>
      </div>
    </footer>
  )
}