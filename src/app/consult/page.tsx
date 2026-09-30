"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Calendar, Palette, Home, DollarSign, Clock } from "lucide-react"
import { useState } from "react"

interface FormState {
  spaceType: string
  budgetBand: string
  preferredTimes: string
  name: string
  email: string
}

const SPACE_TYPES = [
  { id: "living-room", label: "Living Room" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bedroom", label: "Bedroom" },
  { id: "bathroom", label: "Bathroom" },
  { id: "home-office", label: "Home Office" },
  { id: "dining", label: "Dining Room" },
  { id: "full-floor", label: "Full Floor / Apartment" },
  { id: "commercial", label: "Commercial" },
  { id: "other", label: "Other" },
]

const BUDGET_BANDS = [
  { id: "under-10k", label: "Under $10K", desc: "Refinishing, styling, or a single room refresh" },
  { id: "10k-25k", label: "$10K – $25K", desc: "Single room with furniture & finishes" },
  { id: "25k-50k", label: "$25K – $50K", desc: "Full room with minor construction" },
  { id: "50k-100k", label: "$50K – $100K", desc: "Kitchen / bathroom or multi-room scope" },
  { id: "100k-250k", label: "$100K – $250K", desc: "Full floor or significant renovation" },
  { id: "250k-plus", label: "$250K+", desc: "Whole home or large-scale project" },
  { id: "not-sure", label: "Not Sure Yet", desc: "We can help you scope it" },
]

const TIME_OPTIONS = [
  { id: "asap", label: "ASAP — I'm ready to start" },
  { id: "1-3-months", label: "1–3 months from now" },
  { id: "3-6-months", label: "3–6 months" },
  { id: "6-plus", label: "6+ months / just exploring" },
  { id: "flexible", label: "Flexible — no rush" },
]

const STEPS = ["Space Type", "Budget", "Timeline", "Details"]

export default function ConsultPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>({
    spaceType: "",
    budgetBand: "",
    preferredTimes: "",
    name: "",
    email: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const canProceed = step === 0
    ? form.spaceType !== ""
    : step === 1
    ? form.budgetBand !== ""
    : step === 2
    ? form.preferredTimes !== ""
    : true

  function nextStep() {
    if (!canProceed) return
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  function prevStep() {
    if (step > 0) setStep(step - 1)
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError(false)
    setSubmitMessage("")

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) {
        setSubmitted(true)
        setSubmitMessage(data.message)
      } else {
        setSubmitError(true)
        setSubmitMessage(data.error || "Something went wrong.")
      }
    } catch {
      setSubmitError(true)
      setSubmitMessage("Could not reach our booking service. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="min-h-dvh flex items-center justify-center px-6 lg:px-8 pt-40 pb-24">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A67C52]/20 text-[#A67C52] text-3xl mb-6">
              <Check className="h-8 w-8" />
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground tracking-tight">
              Thank you
            </h1>
            <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-md mx-auto leading-relaxed">
              {submitMessage}
            </p>
            <div className="mt-10" />
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground text-background px-8 text-sm font-medium tracking-wide uppercase transition-all hover:bg-foreground/90"
            >
              Return Home
            </a>
          </motion.div>
        </div>
      </section>
    )
  }

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
              Book a Consultation
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Let&rsquo;s talk
            </h1>
            <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl leading-relaxed">
              Tell us about your space and we&rsquo;ll reach out within two business days
              to schedule a complimentary discovery call.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress bar */}
      <section className="px-6 lg:px-8 py-6 bg-muted/5 border-b border-foreground/5 sticky top-20 z-30">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-mono font-medium transition-all ${
                    i < step
                      ? "bg-[#A67C52] text-white"
                      : i === step
                      ? "bg-[#A67C52]/20 text-[#A67C52] border-2 border-[#A67C52]"
                      : "bg-foreground/10 text-foreground/30 border border-foreground/10"
                  }`}
                >
                  {i < step ? "✓" : String(i + 1)}
                </span>
                <span className={`text-[9px] uppercase tracking-widest transition-all ${
                  i <= step ? "text-foreground/60" : "text-foreground/20"
                }`}>
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-6 transition-all ${
                    i < step ? "bg-[#A67C52]/40" : "bg-foreground/10"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wizard form */}
      <section className="px-6 lg:px-8 py-12 pb-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Step 0: Space Type */}
            {step === 0 && (
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
                  What space are we working on?
                </h2>
                <p className="text-sm text-foreground/50 mb-8">
                  Select the primary area you&rsquo;d like us to help with.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SPACE_TYPES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setForm({ ...form, spaceType: st.id })}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-sm border-2 transition-all text-left ${
                        form.spaceType === st.id
                          ? "border-[#A67C52] bg-[#A67C52]/10 text-foreground"
                          : "border-foreground/10 hover:border-foreground/30 text-foreground/70"
                      }`}
                    >
                      <Home className="h-4 w-4" />
                      <span className="text-sm font-medium">{st.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Budget */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
                  What&rsquo;s your budget range?
                </h2>
                <p className="text-sm text-foreground/50 mb-8">
                  Don&rsquo;t worry — we&rsquo;ll refine this together. Pick a rough band.
                </p>
                <div className="space-y-2.5">
                  {BUDGET_BANDS.map((bb) => (
                    <button
                      key={bb.id}
                      onClick={() => setForm({ ...form, budgetBand: bb.id })}
                      className={`flex items-start gap-4 w-full px-5 py-4 rounded-sm border-2 transition-all text-left ${
                        form.budgetBand === bb.id
                          ? "border-[#A67C52] bg-[#A67C52]/10 text-foreground"
                          : "border-foreground/10 hover:border-foreground/30 text-foreground/70"
                      }`}
                    >
                      <DollarSign className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-medium">{bb.label}</span>
                        <span className="block text-xs text-foreground/40 mt-1">{bb.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Timeline */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
                  When are you thinking?
                </h2>
                <p className="text-sm text-foreground/50 mb-8">
                  No commitment — this helps us understand your timeline.
                </p>
                <div className="space-y-2.5">
                  {TIME_OPTIONS.map((to) => (
                    <button
                      key={to.id}
                      onClick={() => setForm({ ...form, preferredTimes: to.id })}
                      className={`flex items-center gap-4 w-full px-5 py-4 rounded-sm border-2 transition-all text-left ${
                        form.preferredTimes === to.id
                          ? "border-[#A67C52] bg-[#A67C52]/10 text-foreground"
                          : "border-foreground/10 hover:border-foreground/30 text-foreground/70"
                      }`}
                    >
                      <Clock className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{to.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
                  Almost there — who are you?
                </h2>
                <p className="text-sm text-foreground/50 mb-8">
                  Optional, but we&rsquo;ll follow up faster with your details.
                </p>
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/40 mb-1.5">
                      Your Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border-b-2 border-foreground/20 pb-2 text-sm text-foreground outline-none placeholder:text-foreground/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/40 mb-1.5">
                      Email Address
                    </label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      type="email"
                      className="w-full bg-transparent border-b-2 border-foreground/20 pb-2 text-sm text-foreground outline-none placeholder:text-foreground/30"
                    />
                  </div>
                  <p className="text-xs text-foreground/30 mt-4">
                    You can also skip — we&rsquo;ll follow up based on your selections.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-12 flex items-center justify-between gap-4 max-w-md mx-auto"
          >
            {step > 0 ? (
              <button
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-foreground/10 text-sm font-medium text-foreground/60 hover:bg-muted/10 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={nextStep}
              disabled={!canProceed || submitting}
              className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide uppercase transition-all ${
                canProceed && !submitting
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-foreground/10 text-foreground/30"
              }`}
            >
              {submitting ? (
                "Sending…"
              ) : step < STEPS.length - 1 ? (
                <>
                  Next Step
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </motion.div>

          {submitError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-sm text-red-400/80 text-center"
            >
              {submitMessage}
            </motion.p>
          )}
        </div>
      </section>
    </>
  )
}