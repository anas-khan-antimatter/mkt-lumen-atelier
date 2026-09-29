"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate a brief submission delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    setFormState("success")
  }

  const isFormValid = formData.name && formData.email && formData.message

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Connect
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Get in touch
            </h1>
            <p className="mt-4 text-base text-foreground/60 max-w-xl leading-relaxed">
              Tell us about your space. Whether you&apos;re ready to start or just
              exploring possibilities, we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle className="h-12 w-12 text-foreground mb-6" />
                    <h3 className="font-serif text-2xl tracking-tight text-foreground mb-2">
                      Thank you, {formData.name.split(" ")[0]}!
                    </h3>
                    <p className="text-sm text-foreground/60 max-w-sm">
                      Your message has been received. We&apos;ll review it and be in
                      touch within 2&ndash;3 business days.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-8 rounded-full"
                      onClick={() => {
                        setFormState("idle")
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          projectType: "",
                          message: "",
                        })
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-xs uppercase tracking-widest text-foreground/60"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="rounded-sm border-border/60 bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-xs uppercase tracking-widest text-foreground/60"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="rounded-sm border-border/60 bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-xs uppercase tracking-widest text-foreground/60"
                        >
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="rounded-sm border-border/60 bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="projectType"
                          className="text-xs uppercase tracking-widest text-foreground/60"
                        >
                          Project Type
                        </label>
                        <Input
                          id="projectType"
                          name="projectType"
                          placeholder="Living / Kitchen / Commercial"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="rounded-sm border-border/60 bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-xs uppercase tracking-widest text-foreground/60"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your space, vision, and how we can help..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="rounded-sm border-border/60 bg-transparent focus-visible:ring-0 focus-visible:border-foreground resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid || formState === "submitting"}
                      className="h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 text-sm font-medium tracking-wide uppercase transition-all"
                    >
                      {formState === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                          Sending
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Send Message
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-10"
            >
              <div>
                <h3 className="font-serif text-lg tracking-tight text-foreground mb-3">
                  Studio
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  123 Bergen Street, Suite 4B
                  <br />
                  Brooklyn, NY 11217
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg tracking-tight text-foreground mb-3">
                  Contact
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="mailto:hello@lumenatelier.com"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      hello@lumenatelier.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+17185551234"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      +1 (718) 555-1234
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-lg tracking-tight text-foreground mb-3">
                  Hours
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Monday&ndash;Friday: 10am&ndash;6pm
                  <br />
                  Saturday: By appointment
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consult CTA */}
      <section className="py-20 lg:py-28 bg-muted/30 px-6 lg:px-8" id="consult">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4">
              Complimentary Consult
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-4">
              Not sure where to start?
            </h2>
            <p className="text-base text-foreground/60 max-w-lg mx-auto leading-relaxed mb-8">
              We offer a complimentary 30-minute design consult — no commitment, just a
              conversation about your space and what&apos;s possible.
            </p>
            {/* Second inline form for the consult booking */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setFormState("success")
                const nameInput = (e.target as HTMLFormElement).elements.namedItem("consultName") as HTMLInputElement
                if (nameInput?.value) {
                  setFormData((prev) => ({ ...prev, name: nameInput.value }))
                }
              }}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <Input
                name="consultName"
                placeholder="Your name"
                required
                className="flex-1 rounded-full border-border/60 bg-background focus-visible:ring-0 focus-visible:border-foreground h-12 px-6"
              />
              <Button
                type="submit"
                className="h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 text-sm font-medium tracking-wide uppercase whitespace-nowrap"
              >
                Book Consult
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}