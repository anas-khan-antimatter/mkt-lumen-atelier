"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const teamMembers = [
  {
    name: "Amara Chen",
    role: "Founder & Principal Designer",
    bio: "With over a decade of experience in residential and commercial design, Amara founded Lumen Atelier to create spaces that balance warmth with precision. Trained at RISD and Parsons, she has worked with studios in New York, London, and Tokyo.",
  },
  {
    name: "Sofia Reyes",
    role: "Senior Designer",
    bio: "Sofia brings a background in architecture and furniture design to every project. She leads material research and custom furniture development, ensuring every piece feels both original and essential.",
  },
  {
    name: "James Park",
    role: "Project Manager",
    bio: "James keeps every project moving with clarity and care. With a background in construction management, he bridges studio vision with on-site reality, ensuring timelines and budgets honor the design intent.",
  },
  {
    name: "Elena Voss",
    role: "Design Associate",
    bio: "Elena supports the design team across research, sourcing, and presentation. Her eye for detail and passion for tactile materials make her an essential part of the studio process.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              About
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl tracking-tight text-foreground max-w-4xl leading-tight">
              A Brooklyn studio
              <br />
              <span className="italic text-foreground/60">crafting atmosphere</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Studio story */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[4/5] bg-[#d4cdc4] dark:bg-[#1a1714] rounded-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-background/10 flex items-center justify-center mb-4">
                    <span className="font-serif text-foreground/30 text-3xl">LA</span>
                  </div>
                  <p className="text-xs text-foreground/30 font-serif">Since 2019</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
                  Our Story
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground mb-6 leading-tight">
                  Design is not about filling a room.
                </h2>
              </div>
              <div className="space-y-4 text-base text-foreground/70 leading-relaxed">
                <p>
                  Lumen Atelier was founded in 2019 with a quiet ambition: to create spaces that
                  feel immediately right — where material, light, and proportion converge into
                  something that looks effortless because it was carefully considered.
                </p>
                <p>
                  We work across residential and commercial projects in New York City and beyond.
                  Our approach is hands-on, collaborative, and rooted in craft. We spec custom pieces
                  when we can&apos;t find what we need. We layer textures where others layer color.
                  We edit more than we add.
                </p>
                <p>
                  The result is not a &ldquo;style.&ldquo; It&apos;s a feeling — a quiet confidence
                  in the way a room holds itself.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <p className="text-3xl font-serif text-foreground">50+</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Projects Completed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-foreground">4</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Studio Team
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Team
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground mb-16">
              The people behind the work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="aspect-[3/4] bg-[#e8e0d8] dark:bg-[#1a1714] rounded-sm mb-5 flex items-center justify-center">
                  <span className="font-serif text-foreground/20 text-lg">{member.name.split(" ")[0]}</span>
                </div>
                <h3 className="font-serif text-lg tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
                Services
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-6">
                What we offer
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {[
                {
                  title: "Full-Service Interior Design",
                  desc: "From concept to installation — space planning, finishes, furnishing, styling, and project management for residential and commercial spaces.",
                },
                {
                  title: "Custom Furniture & Millwork",
                  desc: "Designed and fabricated to your space and needs — from built-in shelving to custom sofas and dining tables.",
                },
                {
                  title: "Kitchen & Bathroom Design",
                  desc: "Comprehensive design for these essential rooms — layout, cabinetry, stone, fixtures, and hardware, down to the last detail.",
                },
                {
                  title: "Design Consultations",
                  desc: "A single session or ongoing guidance for clients who want expert eyes on their space without a full-service engagement.",
                },
              ].map((service) => (
                <div key={service.title}>
                  <h3 className="font-serif text-lg text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-base text-foreground/60 max-w-md mx-auto leading-relaxed mb-8">
              We&apos;d love to hear about your project. Reach out and we&apos;ll start a
              conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground text-background px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90"
            >
              Get in Touch
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}