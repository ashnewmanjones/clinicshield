"use client";

import { useState } from "react";
import {
  Shield,
  Clock,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  BarChart3,
  FileStack,
  Map,
  TrendingUp,
  AlertTriangle,
  PoundSterling,
  Calendar,
  Users,
  ArrowRight,
  Star,
  Zap,
  Lock,
  Check,
  Sparkles,
} from "lucide-react";

/* ─────────────────────── NAV ─────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        <a href="#" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Shield className="h-6 w-6 text-[oklch(0.488_0.243_264.376)]" />
          <span>ClinicShield</span>
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition">How it works</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#pricing" className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-[oklch(0.488_0.243_264.376)] text-white font-medium text-sm hover:opacity-90 transition">
            Get Started Free
          </a>
        </div>
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-border px-6 pb-4 space-y-3 text-sm">
          <a href="#how-it-works" className="block py-1" onClick={() => setOpen(false)}>How it works</a>
          <a href="#features" className="block py-1" onClick={() => setOpen(false)}>Features</a>
          <a href="#pricing" className="block py-1" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#faq" className="block py-1" onClick={() => setOpen(false)}>FAQ</a>
          <a href="#pricing" className="block mt-2 text-center py-2.5 rounded-lg bg-[oklch(0.488_0.243_264.376)] text-white font-medium">Get Started Free</a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────── HERO ─────────────────────── */

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.488_0.243_264.376)]/[0.03] via-transparent to-[oklch(0.488_0.243_264.376)]/[0.06]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-sm text-amber-800 font-medium mb-8">
          <Calendar className="h-4 w-4" />
          DSPT v8 deadline: 30 June 2026
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
          Complete your DSPT in{" "}
          <span className="text-[oklch(0.488_0.243_264.376)]">hours</span>,{" "}
          not weeks
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The guided platform that walks small healthcare providers through every DSPT question — no consultant needed, no jargon, no stress. <strong className="text-foreground">From £49/year.</strong>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-[oklch(0.488_0.243_264.376)] text-white font-semibold text-base hover:opacity-90 transition shadow-lg shadow-[oklch(0.488_0.243_264.376)]/20"
          >
            Start Free Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-border text-foreground font-medium text-base hover:bg-secondary/50 transition"
          >
            See how it works
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          No credit card required · Free tier available · Takes 5 minutes to start
        </p>

        {/* Social proof strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" /> Built for 60,000+ small providers
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4" /> NHS DSPT v8 aligned
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4" /> UK-hosted · GDPR compliant
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── PROBLEM ─────────────────────── */

function Problem() {
  const pains = [
    {
      icon: AlertTriangle,
      title: "Confusing jargon",
      desc: "The DSPT is 113 questions of technical language that wasn't written for practice managers.",
    },
    {
      icon: Clock,
      title: "It takes weeks",
      desc: "Most small practices spend 40-80 hours struggling through it — time you don't have.",
    },
    {
      icon: PoundSterling,
      title: "Consultants cost £2,000-5,000",
      desc: "Hiring help is expensive, and you still end up doing most of the work yourself.",
    },
    {
      icon: Calendar,
      title: "The deadline is real",
      desc: "Miss the 30 June 2026 deadline and you risk losing NHS contracts and data access.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[oklch(0.488_0.243_264.376)] uppercase tracking-wider mb-3">The problem</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            The DSPT is a nightmare for small practices
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You're a healthcare professional, not a data security expert. Yet the NHS expects you to complete a complex toolkit — or face the consequences.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {pains.map((p) => (
            <div key={p.title} className="flex gap-4 p-6 rounded-2xl bg-white border border-border/60 shadow-sm">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <p.icon className="h-5 w-5 text-red-500" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── HOW IT WORKS ─────────────────────── */

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Users,
      title: "Sign up in seconds",
      desc: "Create your free account — no credit card, no commitment.",
    },
    {
      num: "02",
      icon: ClipboardCheck,
      title: "Answer guided questions",
      desc: "Plain-English questions mapped to every DSPT requirement. We tell you exactly what's needed.",
    },
    {
      num: "03",
      icon: BarChart3,
      title: "Get your gap analysis",
      desc: "Instantly see where you pass, where you fall short, and exactly what to fix.",
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: "Submit with confidence",
      desc: "Download your evidence pack and submit to the DSPT knowing everything's covered.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[oklch(0.488_0.243_264.376)] uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Four steps to DSPT compliance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No consultants. No guesswork. Just a clear path from start to submission.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="relative mx-auto mb-5 h-16 w-16 rounded-2xl bg-[oklch(0.488_0.243_264.376)]/[0.08] flex items-center justify-center group-hover:bg-[oklch(0.488_0.243_264.376)]/[0.15] transition">
                <s.icon className="h-7 w-7 text-[oklch(0.488_0.243_264.376)]" />
              </div>
              <span className="text-xs font-bold text-[oklch(0.488_0.243_264.376)] tracking-widest">{s.num}</span>
              <h3 className="mt-2 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FEATURES ─────────────────────── */

function Features() {
  const features = [
    {
      icon: ClipboardCheck,
      title: "Guided Questionnaire",
      desc: "Every DSPT question translated into plain English with contextual help and examples tailored to your practice type.",
    },
    {
      icon: BarChart3,
      title: "Gap Analysis Dashboard",
      desc: "A real-time view of your compliance status — see exactly where you stand and what needs attention.",
    },
    {
      icon: FileStack,
      title: "Policy Templates",
      desc: "Ready-to-use, DSPT-aligned policy documents you can customise and download. Save dozens of hours.",
    },
    {
      icon: Map,
      title: "DSPT Mapping Guide",
      desc: "Every question mapped to the relevant NHS standard so you understand the 'why' behind each requirement.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      desc: "Pick up where you left off. Track completion across your team with automatic saves and clear milestones.",
    },
    {
      icon: Zap,
      title: "Action Plan Generator",
      desc: "Automatically generates a prioritised action plan for your gaps — complete with deadlines and assignees.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[oklch(0.488_0.243_264.376)] uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything you need to pass the DSPT
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built specifically for small healthcare providers — not enterprise IT teams.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md hover:border-[oklch(0.488_0.243_264.376)]/30 transition-all"
            >
              <div className="h-11 w-11 rounded-xl bg-[oklch(0.488_0.243_264.376)]/[0.08] flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-[oklch(0.488_0.243_264.376)]" />
              </div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── PRICING ─────────────────────── */

function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "£0",
      period: "forever",
      desc: "See where you stand — no commitment.",
      cta: "Start Free",
      featured: false,
      features: [
        "Full DSPT questionnaire",
        "Basic compliance score",
        "Practice type detection",
        "Email support",
      ],
    },
    {
      name: "Essential",
      price: "£49",
      period: "/year",
      earlyBird: "£29",
      desc: "Everything most practices need to pass.",
      cta: "Get Essential",
      featured: true,
      features: [
        "Everything in Free",
        "Detailed gap analysis report",
        "Prioritised action plan",
        "10 policy templates",
        "DSPT mapping guide",
        "Progress tracking",
        "Priority email support",
      ],
    },
    {
      name: "Professional",
      price: "£99",
      period: "/year",
      desc: "For multi-site or complex practices.",
      cta: "Get Professional",
      featured: false,
      features: [
        "Everything in Essential",
        "All 25+ policy templates",
        "Team collaboration",
        "Multi-site management",
        "Custom branding on documents",
        "Annual review reminders",
        "Phone & video support",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[oklch(0.488_0.243_264.376)] uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Save thousands vs. hiring a consultant
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple, transparent pricing. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Early bird banner */}
        <div className="mt-10 mx-auto max-w-lg p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-center">
          <p className="text-sm font-semibold text-amber-900 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Early bird: first 50 customers get Essential for just £29/year
            <Sparkles className="h-4 w-4" />
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-8 ${
                t.featured
                  ? "bg-[oklch(0.488_0.243_264.376)] text-white shadow-xl shadow-[oklch(0.488_0.243_264.376)]/20 ring-1 ring-[oklch(0.488_0.243_264.376)] md:-mt-4 md:pb-12"
                  : "bg-white border border-border/80 shadow-sm"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className={`text-lg font-bold ${t.featured ? "text-white" : "text-foreground"}`}>{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                {t.earlyBird && (
                  <span className="text-sm line-through opacity-60 mr-2">{t.price}</span>
                )}
                <span className="text-4xl font-extrabold">{t.earlyBird || t.price}</span>
                <span className={`text-sm ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.period}</span>
              </div>
              <p className={`mt-3 text-sm ${t.featured ? "text-white/80" : "text-muted-foreground"}`}>{t.desc}</p>
              <a
                href="#"
                className={`mt-6 block w-full text-center py-3 rounded-xl font-semibold text-sm transition ${
                  t.featured
                    ? "bg-white text-[oklch(0.488_0.243_264.376)] hover:bg-white/90"
                    : "bg-[oklch(0.488_0.243_264.376)] text-white hover:opacity-90"
                }`}
              >
                {t.cta}
              </a>
              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${t.featured ? "text-white/80" : "text-[oklch(0.488_0.243_264.376)]"}`} />
                    <span className={t.featured ? "text-white/90" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── TRUST ─────────────────────── */

function Trust() {
  const testimonials = [
    {
      quote: "We'd been dreading the DSPT for months. ClinicShield made it manageable — we completed it in a single afternoon.",
      name: "Dr Sarah Chen",
      role: "GP Partner, Riverside Medical Centre",
    },
    {
      quote: "The gap analysis alone saved us thousands compared to our previous consultant. Worth every penny.",
      name: "James Okafor",
      role: "Practice Manager, Bright Smile Dental",
    },
    {
      quote: "Finally, something that speaks our language instead of IT jargon. Our whole team could follow along.",
      name: "Priya Sharma",
      role: "Pharmacy Owner, HealthFirst Pharmacy",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-[oklch(0.488_0.243_264.376)] uppercase tracking-wider mb-3">Trusted by practices</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Hear from practices like yours
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-white border border-border/60 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-border/50">
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Built by section */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-border/60 shadow-sm max-w-2xl mx-auto text-center">
          <div className="h-16 w-16 rounded-full bg-[oklch(0.488_0.243_264.376)]/[0.08] flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-[oklch(0.488_0.243_264.376)]" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Built by someone who understands both worlds</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            ClinicShield is built by a medical student with a fintech security background. We understand the clinical reality of small practices <em>and</em> the technical requirements of data security compliance. This isn't a generic IT tool — it's designed specifically for healthcare.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FAQ ─────────────────────── */

function FAQ() {
  const faqs = [
    {
      q: "What is the DSPT and do I need to complete it?",
      a: "The Data Security and Protection Toolkit (DSPT) is an annual NHS requirement for any organisation that has access to NHS patient data. This includes GP practices, dental clinics, pharmacies, opticians, and physiotherapy clinics. You must complete it to maintain your NHS contracts.",
    },
    {
      q: "When is the DSPT v8 deadline?",
      a: "The deadline for DSPT v8 is 30 June 2026. We recommend starting early — most practices need 2-4 weeks to gather evidence, but with ClinicShield you can significantly reduce that.",
    },
    {
      q: "Can I really do this without a consultant?",
      a: "Yes. ClinicShield translates every DSPT question into plain English, tells you exactly what evidence is needed, and provides pre-written policy templates. You follow the guided process and we handle the complexity.",
    },
    {
      q: "How is this different from the actual DSPT website?",
      a: "The DSPT portal tells you what to submit but not how to do it. ClinicShield guides you through each question with contextual help, generates gap analyses, provides policy templates, and gives you a clear action plan — like having a consultant on your screen.",
    },
    {
      q: "Is my data safe?",
      a: "Absolutely. ClinicShield is UK-hosted, fully GDPR compliant, and built with bank-grade security practices. We don't store patient data — only your DSPT responses and compliance documents.",
    },
    {
      q: "What if I get stuck?",
      a: "Every plan includes email support. Essential and Professional customers get priority responses. We're also building a community forum and knowledge base with worked examples for every question.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[oklch(0.488_0.243_264.376)] uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Common questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition"
              >
                <span className="font-medium text-foreground pr-4">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FOOTER CTA ─────────────────────── */

function FooterCTA() {
  return (
    <section className="py-20 md:py-28 bg-[oklch(0.488_0.243_264.376)]">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white/90 font-medium mb-6">
          <AlertTriangle className="h-4 w-4" />
          Deadline: 30 June 2026
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Don't leave your DSPT to the last minute
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
          Join hundreds of small practices getting ahead of the deadline. Start your free assessment today — it takes less than 5 minutes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-[oklch(0.488_0.243_264.376)] font-semibold text-base hover:bg-white/90 transition shadow-lg"
          >
            Start Free Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <p className="mt-5 text-sm text-white/60">
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────── FOOTER ─────────────────────── */

function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <Shield className="h-5 w-5 text-[oklch(0.488_0.243_264.376)]" />
              ClinicShield
            </a>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
              NHS DSPT compliance made simple for small healthcare providers. Complete your toolkit in hours, not weeks.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-foreground transition">How it works</a></li>
              <li><a href="#features" className="hover:text-foreground transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-foreground transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ClinicShield. All rights reserved.</p>
          <p>Made in the UK 🇬🇧</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Pricing />
      <Trust />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  );
}
