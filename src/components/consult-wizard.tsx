"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, Sofa, UtensilsCrossed, Bed, Shapes, Building2 } from "lucide-react"

export type RoomType = "living" | "kitchen" | "bedroom" | "dining" | "commercial"
export type BudgetBand = "economy" | "moderate" | "premium" | "luxury"
export type Timeline = "soon" | "flexible" | "planning"

export interface ConsultData {
  roomType: RoomType | null
  budgetBand: BudgetBand | null
  timeline: Timeline | null
  name: string
  email: string
  phone: string
  notes: string
}

const roomTypes: { id: RoomType; label: string; Icon: typeof Sofa }[] = [
  { id: "living", label: "Living Room", Icon: Sofa },
  { id: "kitchen", label: "Kitchen", Icon: UtensilsCrossed },
  { id: "bedroom", label: "Bedroom", Icon: Bed },
  { id: "dining", label: "Dining Room", Icon: Shapes },
  { id: "commercial", label: "Commercial", Icon: Building2 },
]

const budgetBands: { id: BudgetBand; label: string; range: string; desc: string }[] = [
  { id: "economy", label: "Economy", range: "$5K–$15K", desc: "Focused updates, key pieces, light styling" },
  { id: "moderate", label: "Moderate", range: "$15K–$40K", desc: "Full room design, some custom pieces" },
  { id: "premium", label: "Premium", range: "$40K–$100K", desc: "Comprehensive design, custom millwork and furniture" },
  { id: "luxury", label: "Luxury", range: "$100K+", desc: "Full-service, bespoke everything" },
]

const timelines: { id: Timeline; label: string; detail: string }[] = [
  { id: "soon", label: "Soon", detail: "I want to start within a month" },
  { id: "flexible", label: "Flexible", detail: "Open to starting in 1-3 months" },
  { id: "planning", label: "Just Planning", detail: "Exploring for a future project" },
]

const stepLabels = ["Room", "Budget", "Timeline", "Details"]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {stepLabels.map((label, i) => (
        <div key={i} className={`flex items-center gap-1.5 ${i > 0 ? "ml-2" : ""}`}>
          <span
            className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium transition-all duration-400 ${
              i <= current ? "bg-foreground text-background" : "bg-foreground/10 text-foreground/40"
            }`}
          >
            {i <= current ? <CheckCircle className="h-3 w-3" /> : String(i + 1)}
          </span>
          <span
            className={`text-[10px] uppercase tracking-widest transition-all duration-400 ${
              i <= current ? "text-foreground" : "text-foreground/30"
            }`}
          >
            {label}
          </span>
          {i < stepLabels.length - 1 && (
            <span
              className={`w-8 h-[1px] transition-all duration-400 ${
                i < current ? "bg-foreground/50" : "bg-foreground/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export function ConsultWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ConsultData>({
    roomType: null,
    budgetBand: null,
    timeline: null,
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const canProceed = () => {
    switch (step) {
      case 0: return data.roomType !== null
      case 1: return data.budgetBand !== null
      case 2: return data.timeline !== null
      case 3: return data.name.trim() !== "" && data.email.trim() !== ""
      default: return false
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  const reset = () => {
    setStep(0)
    setData({
      roomType: null,
      budgetBand: null,
      timeline: null,
      name: "",
      email: "",
      phone: "",
      notes: "",
    })
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CheckCircle className="h-16 w-16 text-foreground mx-auto mb-6" />
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground mb-4">
            Thank you, {data.name.split(" ")[0]}!
          </h1>
          <p className="text-base text-foreground/60 max-w-lg mx-auto leading-relaxed mb-3">
            We have received your consultation request. Here is a summary:
          </p>
          <div className="mx-auto max-w-lg bg-muted/30 rounded-sm p-6 text-left text-sm space-y-2">
            <p>
              <span className="text-foreground/50">Room:</span>{" "}
              {roomTypes.find((r) => r.id === data.roomType)?.label || data.roomType}
            </p>
            <p>
              <span className="text-foreground/50">Budget:</span>{" "}
              {budgetBands.find((b) => b.id === data.budgetBand)?.label} (
              {budgetBands.find((b) => b.id === data.budgetBand)?.range})
            </p>
            <p>
              <span className="text-foreground/50">Timeline:</span>{" "}
              {timelines.find((t) => t.id === data.timeline)?.label}
            </p>
            <p>
              <span className="text-foreground/50">Email:</span> {data.email}
            </p>
          </div>
          <p className="text-sm text-foreground/60 mt-6 max-w-md mx-auto">
            We will review your details and reach out within 2-3 business days to
            schedule your complimentary consult.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <StepIndicator current={step} />

      <AnimatePresence mode="wait">
        {/* Step 1: Room type */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Step 1 of 4
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground mb-2">
              What type of space?
            </h2>
            <p className="text-sm text-foreground/60 mb-8">
              Select the room or space you would like to work on.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roomTypes.map((rt) => {
                const Icon = rt.Icon
                return (
                  <button
                    key={rt.id}
                    onClick={() => setData((p) => ({ ...p, roomType: rt.id }))}
                    className={`flex flex-col items-center gap-3 p-6 rounded-sm border-2 transition-all duration-300 cursor-pointer ${
                      data.roomType === rt.id
                        ? "border-foreground bg-foreground/5 shadow-sm"
                        : "border-border/40 bg-background hover:border-foreground/30 hover:bg-muted/20"
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        data.roomType === rt.id ? "text-foreground" : "text-foreground/50"
                      }`}
                    />
                    <span
                      className={`font-serif text-base ${
                        data.roomType === rt.id ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {rt.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Budget band */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Step 2 of 4
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground mb-2">
              What is your budget range?
            </h2>
            <p className="text-sm text-foreground/60 mb-8">
              Do not worry — this helps us tailor the right approach. Ranges are
              estimates and flexible.
            </p>
            <div className="space-y-3">
              {budgetBands.map((band) => (
                <button
                  key={band.id}
                  onClick={() => setData((p) => ({ ...p, budgetBand: band.id }))}
                  className={`w-full flex items-center justify-between p-5 rounded-sm border-2 transition-all duration-300 cursor-pointer text-left ${
                    data.budgetBand === band.id
                      ? "border-foreground bg-foreground/5 shadow-sm"
                      : "border-border/40 bg-background hover:border-foreground/30 hover:bg-muted/20"
                  }`}
                >
                  <div>
                    <span
                      className={`font-serif text-base block mb-0.5 ${
                        data.budgetBand === band.id
                          ? "text-foreground"
                          : "text-foreground/70"
                      }`}
                    >
                      {band.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{band.desc}</span>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      data.budgetBand === band.id
                        ? "text-foreground"
                        : "text-foreground/50"
                    }`}
                  >
                    {band.range}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Timeline */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Step 3 of 4
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground mb-2">
              What is your timeline?
            </h2>
            <p className="text-sm text-foreground/60 mb-8">
              Let us know your sense of timing so we can plan accordingly.
            </p>
            <div className="space-y-3">
              {timelines.map((tl) => (
                <button
                  key={tl.id}
                  onClick={() => setData((p) => ({ ...p, timeline: tl.id }))}
                  className={`w-full flex items-center justify-between p-5 rounded-sm border-2 transition-all duration-300 cursor-pointer text-left ${
                    data.timeline === tl.id
                      ? "border-foreground bg-foreground/5 shadow-sm"
                      : "border-border/40 bg-background hover:border-foreground/30 hover:bg-muted/20"
                  }`}
                >
                  <div>
                    <span
                      className={`font-serif text-base block mb-0.5 ${
                        data.timeline === tl.id
                          ? "text-foreground"
                          : "text-foreground/70"
                      }`}
                    >
                      {tl.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{tl.detail}</span>
                  </div>
                  {data.timeline === tl.id && (
                    <CheckCircle className="h-4 w-4 text-foreground" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Contact details */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Step 4 of 4
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground mb-2">
              How can we reach you?
            </h2>
            <p className="text-sm text-foreground/60 mb-8">
              Leave your details and we will be in touch within 2-3 business days.
            </p>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="wiz-name"
                  className="text-xs uppercase tracking-widest text-foreground/60 block mb-1"
                >
                  Name *
                </label>
                <input
                  id="wiz-name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  required
                  className="w-full h-12 px-4 rounded-sm border border-border/60 bg-transparent text-foreground text-sm outline-none focus-visible:border-foreground transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="wiz-email"
                  className="text-xs uppercase tracking-widest text-foreground/60 block mb-1"
                >
                  Email *
                </label>
                <input
                  id="wiz-email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  className="w-full h-12 px-4 rounded-sm border border-border/60 bg-transparent text-foreground text-sm outline-none focus-visible:border-foreground transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="wiz-phone"
                  className="text-xs uppercase tracking-widest text-foreground/60 block mb-1"
                >
                  Phone <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="wiz-phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-12 px-4 rounded-sm border border-border/60 bg-transparent text-foreground text-sm outline-none focus-visible:border-foreground transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="wiz-notes"
                  className="text-xs uppercase tracking-widest text-foreground/60 block mb-1"
                >
                  Notes <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="wiz-notes"
                  rows={3}
                  value={data.notes}
                  onChange={(e) => setData((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Anything else you would like us to know..."
                  className="w-full px-4 py-3 rounded-sm border border-border/60 bg-transparent text-foreground text-sm outline-none focus-visible:border-foreground transition-colors resize-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-10 flex items-center justify-between">
        <div>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide uppercase text-foreground/60 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          )}
        </div>
        <div className="flex gap-3">
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium tracking-wide uppercase transition-all ${
                canProceed()
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-foreground/10 text-foreground/30 cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || submitting}
              className={`inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium tracking-wide uppercase transition-all ${
                canProceed() && !submitting
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-foreground/10 text-foreground/30 cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  Submitting
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Submit Request
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  )
}