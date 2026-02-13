# ClinicShield Launch Plan

## Automated NHS DSPT Self-Assessment for Small Healthcare Providers

**Created: 9 February 2026 | Target: First paying customer by 6 April 2026**

---

## Executive Summary

ClinicShield is a guided SaaS tool that walks small UK healthcare providers (GP practices, dental clinics, pharmacies, opticians, physio clinics) through their annual NHS DSPT submission. The DSPT v8 deadline is **30 June 2026** — meaning you have a **4-month window** of peak urgency where ~60,000+ organisations are scrambling to complete their assessments.

**The pitch:** "Complete your DSPT in hours, not weeks. No consultant needed. £49/year."

**Why this wins:** Consultants charge £2,000-5,000. The official DSPT portal is bureaucratic and confusing. Practice managers are time-poor and non-technical. ClinicShield sits alongside the official toolkit as a preparation/guidance layer — it doesn't replace the DSPT, it makes completing it painless.

---

## 1. DSPT v8 Structure — What You're Building Against

### Organisation Categories (v8)

GP practices fall under **NDG-aligned** assessments (not CAF). CAF is for Category 1 orgs (NHS Trusts, ICBs). Your target market — GPs, dentists, pharmacies, opticians, small providers — use the **10 NDG Data Security Standards**:

| # | Standard | Key Focus |
|---|----------|-----------|
| 1 | **Personal Confidential Data** | Confidentiality, Caldicott principles, lawful basis for processing |
| 2 | **Staff Responsibilities** | Contracts, confidentiality agreements, role-based responsibilities |
| 3 | **Training** | Annual IG/data security training, completion records |
| 4 | **Managing Data Access** | Role-based access, authentication, least privilege |
| 5 | **Process Reviews** | Data flow mapping, DPIA, lawful basis register |
| 6 | **Responding to Incidents** | Breach reporting, incident response plan, ICO notification |
| 7 | **Continuity Planning** | Business continuity, disaster recovery, backup testing |
| 8 | **Unsupported Systems** | Patch management, end-of-life systems, upgrade plans |
| 9 | **IT Protection** | Firewalls, encryption, anti-malware, network security |
| 10 | **Accountable Suppliers** | Supplier contracts, DPAs, third-party assurance |

Each standard has **Assertions** (statements you must agree to) and **Evidence items** (some mandatory, some optional). For GP practices, the v8 toolkit has roughly **30-40 mandatory evidence items** across the 10 standards.

**Key v8 changes from v7:**

- Updated assertions and evidence items across all org types
- Higher-confidentiality staff must sign formal agreements (Standard 2)
- IT suppliers advised to follow Software Security Code of Practice
- Aligned with CAF v3.4 (but GPs still NDG-based)
- More emphasis on proportionality for smaller orgs

### What ClinicShield Actually Does

It does NOT submit to the DSPT portal — that's NHS England's system. ClinicShield:

1. **Guides** users through each standard with plain-English questions
2. **Translates** jargon into clinic-relevant language ("Do you lock your computer when you leave your desk?" not "Do you enforce session timeout policies?")
3. **Identifies gaps** before they start the official submission
4. **Generates evidence** — policy templates, training logs, checklists
5. **Tracks progress** — dashboard showing completion % per standard
6. **Exports a report** that maps to the official DSPT structure

---

## 2. MVP Feature Set (v1)

### In v1 (8-week build)

**Core flow:**

1. **Onboarding wizard** (2 min): Org type (GP/dental/pharmacy/optician/other), practice size, existing IT setup
2. **Guided questionnaire**: 10 sections matching NDG standards. Each section has:
   - Plain-English questions (not DSPT jargon)
   - Contextual help tooltips ("What does this mean for a GP practice?")
   - Yes/No/Partial/Not Sure answers
   - Evidence upload slots (PDF, images)
   - Pre-populated answers where possible based on org type
3. **Gap analysis dashboard**: Traffic-light view per standard (Green/Amber/Red)
4. **Action plan**: Auto-generated list of "what you need to do" with priority ordering
5. **Policy template library**: ~15 downloadable/editable policy templates covering the most common gaps:
   - Data Protection Policy
   - Acceptable Use Policy
   - Information Security Policy
   - Business Continuity Plan (template)
   - Incident Response Plan
   - Confidentiality Agreement (staff)
   - Data Flow Map (template)
   - DPIA template
   - Training Record Log
   - Supplier Register template
6. **Progress tracker**: Save/resume, percentage complete per standard
7. **Export**: PDF report summarising readiness + gap analysis, printable for the Caldicott Guardian/IG Lead
8. **DSPT mapping guide**: Side-by-side view showing "Your ClinicShield answer → What to enter in the official DSPT"
9. **Auth + multi-user**: Practice manager + IG lead can both access

**Not in v1 (deferred):**

- ❌ Direct DSPT portal integration/API submission (NHS doesn't offer this)
- ❌ Automated staff training module (link to free NHS eLearning instead)
- ❌ Cyber Essentials assessment
- ❌ CQC compliance modules
- ❌ DTAC assessment
- ❌ White-label/MSP portal
- ❌ Mobile app
- ❌ AI-powered gap analysis (v2 feature)
- ❌ Multi-practice/PCN management dashboard

---

## 3. Week-by-Week Timeline

### Week 1 (10-16 Feb): Foundation + Research

- [x] Download DSPT v8 GP practice spreadsheet from NHS Digital
- [x] Map every assertion and mandatory evidence item for GP org type
- [x] Create question bank: translate each evidence item into plain-English questions
- [x] Set up Next.js 14+ project with App Router + TypeScript
- [x] Set up Convex: schema design, connect to Next.js
- [x] Domain: clinicshield.co.uk (£5-10/year)
- [x] Deploy to Vercel (connected to GitHub repo)
- [x] Set up Stripe in test mode

### Week 2 (17-23 Feb): Core Data Model + Auth

- [x] Convex schema: organisations, users, assessments, questions, answers, evidenceFiles, standards, assertions
- [x] Auth: Clerk (email/password + magic link + SSO-ready)
- [x] Onboarding wizard (org type selection, practice details)
- [x] Seed script: load all 10 standards, assertions, questions into Convex
- [x] Basic layout/navigation shell (Tailwind + shadcn/ui)

### Week 3 (24 Feb - 2 Mar): Questionnaire Engine

- [ ] Build guided questionnaire UI (step-by-step, one standard at a time)
- [ ] Question types: yes/no, multiple choice, text, file upload, date
- [ ] Auto-save via Convex mutations (every answer change persists instantly — real-time by default)
- [ ] Progress bar per standard and overall (Convex reactive queries)
- [ ] Contextual help system (tooltips, info panels)
- [ ] Navigation: jump between standards, mark sections complete
- [ ] Multi-user sync: practice manager + IG lead see live updates (free with Convex reactivity)

### Week 4 (3-9 Mar): Gap Analysis + Dashboard

- [ ] Scoring engine: Convex query that calculates compliance per standard based on answers
- [ ] Traffic-light dashboard (Red/Amber/Green per standard)
- [ ] Auto-generated action plan: list of gaps with remediation steps
- [ ] Priority ordering (mandatory evidence items first)
- [ ] "What to do next" recommendations per gap

### Week 5 (10-16 Mar): Policy Templates + Evidence

- [ ] Write/curate 15 policy templates (Markdown → editable in-app)
- [ ] Template customisation: org name, date, responsible person auto-filled
- [ ] Evidence upload via Convex File Storage: drag-and-drop, linked to specific questions
- [ ] Evidence checklist per standard
- [ ] DSPT mapping guide: "here's what to copy into the official toolkit"

### Week 6 (17-23 Mar): Reports + Export

- [ ] PDF report generation (`@react-pdf/renderer` client-side, or Convex action for server-side)
- [ ] Report includes: executive summary, per-standard breakdown, gap list, action plan
- [ ] Printable format suitable for GP partners meeting
- [ ] Email report to stakeholders via Resend (triggered from Convex action)
- [ ] Final questionnaire polish: review all questions for clarity

### Week 7 (24-30 Mar): Payments + Landing Page

- [ ] Stripe Checkout integration via Convex HTTP actions (webhook handler for payment confirmation)
- [ ] Free tier: complete assessment, see traffic-light summary. Pay to unlock full report + templates + action plan
- [ ] Landing page: clinicshield.co.uk
  - Hero: "Complete your DSPT in hours, not weeks"
  - Social proof placeholder (testimonials from beta users)
  - Pricing table
  - FAQ section
  - "Built by an NHS clinical insider" trust signal
- [ ] Legal pages: Terms, Privacy Policy, Disclaimers
- [ ] Cookie consent
- [ ] Convex scheduled functions: DSPT deadline reminder emails, trial expiry nudges

### Week 8 (31 Mar - 6 Apr): Beta + First Customers

- [ ] Recruit 5-10 beta users (see GTM below)
- [ ] Fix bugs from beta feedback
- [ ] Refine question wording based on real user confusion
- [ ] Soft launch: announce on LinkedIn, Practice Index forum
- [ ] **Target: first paying customer by end of week 8**

---

## 4. Tech Stack

### Recommended: Next.js + Convex

Fully serverless, real-time by default, zero infrastructure management. Convex handles database, file storage, auth, and background jobs in one platform — massively reduces boilerplate.

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14+ (App Router) | Already used for ashnewmanjones.com. TypeScript everywhere, Vercel deploys |
| **Backend/Database** | Convex | Real-time reactive database, server functions, file storage, scheduled jobs — all in one. No SQL, no migrations, no ORM |
| **Auth** | Clerk | SSO-ready from day one (valuable for NHS orgs/MSPs), clean DX, free up to 1M MAUs |
| **Hosting** | Vercel | Free tier generous. Push to GitHub → live. Edge functions, serverless |
| **File Storage** | Convex File Storage | Built-in, no separate S3/R2 needed. Evidence uploads handled natively |
| **Email** | Resend | Free tier, excellent Next.js DX, triggered from Convex actions |
| **Payments** | Stripe Checkout + webhooks | Webhook handler as a Convex HTTP action |
| **DNS/CDN** | Cloudflare | Free tier |
| **PDF Generation** | `@react-pdf/renderer` (client-side) or Convex action + Puppeteer on serverless | For gap analysis reports |
| **CI/CD** | Vercel (auto) + GitHub Actions if needed | Zero-config deploys |

### Why Convex over traditional DB

- **Real-time by default** — questionnaire progress syncs instantly across tabs/devices (practice manager + IG lead see same state)
- **No API layer to build** — Convex queries/mutations are called directly from React, type-safe end-to-end
- **Built-in file storage** — evidence uploads without configuring S3
- **Scheduled functions** — DSPT deadline reminders, email sequences, without external cron
- **Schema validation** — TypeScript-first, schema defined in code
- **Auto-save is trivial** — reactive mutations mean every answer change persists immediately

### Monthly infrastructure cost: £0-5

- Vercel: free tier (hobby)
- Convex: free tier (generous — 1M function calls, 1GB storage, 256MB file storage)
- Domain: £10/year
- Stripe: no fixed cost, just transaction fees
- Resend: free tier (100 emails/day)

### Scaling cost (when revenue justifies it)

- Convex Pro: $25/mo (when you exceed free tier)
- Vercel Pro: $20/mo (if needed)
- Still dramatically cheaper than running your own servers

---

## 5. Go-to-Market Strategy

### The Urgency Window

DSPT v8 deadline is **30 June 2026**. Practice managers typically panic-start in March-May. You're launching in early April — right in the sweet spot.

### Channel Strategy (ranked by expected ROI)

#### Tier 1: Direct to Practice Managers (Weeks 7-12)

**1. Practice Index Forum (practiceindex.co.uk)**

- THE community for UK practice managers. Free forum + paid resources
- Create an account, provide genuinely helpful DSPT guidance in forum threads
- Don't spam — answer questions, then mention ClinicShield naturally
- Write a guest blog post: "DSPT v8: What's Changed and How to Prepare"
- **Action:** Join forum Week 6, start contributing Week 7

**2. LinkedIn — targeted content**

- Connect with practice managers, IG leads, Caldicott guardians
- Post 2-3x/week: DSPT tips, deadline reminders, common mistakes
- Use hashtags: #DSPT #NHSDigital #PracticeManager #GPPractice #DataSecurity
- Your unique angle: "Medical student + fintech security founder" is a compelling story
- **Action:** Start posting Week 6, build audience before launch

**3. IGPM (Institute of General Practice Management)**

- Professional body for practice managers, founded 2020
- Explore partnership: "ClinicShield as a member benefit" or sponsored webinar
- Contact via their website/LinkedIn
- **Action:** Reach out Week 6-7

**4. Practice Managers Association (PMA)**

- ILM-recognised provider, runs workshops nationwide
- Offer to run a free webinar: "DSPT v8 Demystified"
- **Action:** Pitch webinar Week 7

**5. Local Medical Committees (LMCs)**

- Every region has an LMC that supports GP practices
- Many LMCs actively push DSPT compliance (see Lincs LMC, Avon LMC examples)
- Offer LMCs a bulk discount for their member practices
- **Action:** Email 10 LMCs Week 8 with partnership proposal

#### Tier 2: Content Marketing (Weeks 6-12)

**6. SEO-optimised blog content**

- Target keywords: "DSPT 2026", "DSPT help GP practice", "DSPT v8 guide", "DSPT deadline 2026", "how to complete DSPT"
- Write 5-8 long-form articles:
  - "Complete Guide to DSPT v8 for GP Practices (2025-26)"
  - "DSPT v8: What's New and What Changed from v7"
  - "10 Common DSPT Mistakes and How to Avoid Them"
  - "Free DSPT Readiness Checklist for Small Practices"
  - "DSPT Evidence Requirements: What You Actually Need to Upload"
- These take 3-6 months to rank, but capture long-tail traffic for next year's cycle too
- **Action:** Write first 2 articles Week 6-7, publish on launch

**7. Free DSPT Readiness Checklist (lead magnet)**

- Downloadable PDF checklist covering all 10 standards
- Gate behind email signup
- Nurture sequence: 5 emails over 2 weeks leading to paid conversion
- **Action:** Create checklist Week 6, set up email sequence Week 7

#### Tier 3: Partnerships (Weeks 8-16)

**8. Healthcare IT MSPs (Managed Service Providers)**

- Companies like EMIS, TPP (SystmOne), Redcentric, etc. serve GP practices
- Smaller MSPs handle IT for clusters of practices
- White-label or referral partnership: MSP recommends ClinicShield, gets rev share
- **This is the scale play** but slower to close — start conversations now, aim for Q3
- **Action:** Identify top 20 NHS IT MSPs, begin outreach Week 10

**9. ICB (Integrated Care Board) IG Teams**

- ICBs replaced CCGs. Each ICB has an IG team that supports practices
- Some ICBs run DSPT workshops — offer ClinicShield as their recommended tool
- **Action:** Research local ICBs (start with NW London given Imperial connection), reach out Week 10

**10. AMSPAR (Association of Medical Secretaries, Practice Managers, Administrators and Receptionists)**

- Another professional body with training courses
- Potential conference/event sponsor or partnership

### Personal Network Leverage

- **Imperial College contacts**: Fellow medical students, NHS placement contacts, academic supervisors with clinical connections
- **Ask 3 GP practices** you have access to (through placements/rotations) to be beta testers
- **Action:** Recruit beta users from personal network Week 7

---

## 6. Pricing Strategy

### Pricing Tiers

| Tier | Price | What's Included |
|------|-------|-----------------|
| **Free** | £0 | Full guided questionnaire, traffic-light gap summary, 1 standard's detailed report |
| **Essential** | £49/year | Full gap analysis, all 10 standard reports, action plan, DSPT mapping guide |
| **Professional** | £99/year | Everything in Essential + 15 policy templates, evidence tracker, PDF export, email support |

### Pricing Rationale

- £49 is **1-2.5% of consultant cost** (£2,000-5,000) — absurdly easy to justify
- Annual pricing aligns with DSPT annual cycle
- No monthly option in v1 (avoids churn after June deadline)
- Practices that pay £49 in April for June deadline will auto-renew next year

### Launch Pricing

- **Early Bird: £29/year** (first 50 customers) — creates urgency and testimonials
- Raise to £49 after 50 customers
- All early bird customers locked at £29 for life (loyalty)

### Free Trial vs Freemium

**Freemium, not free trial.** Rationale:

- Practice managers need to try before buying (risk-averse NHS culture)
- Let them complete the full questionnaire for free — they've invested time
- Paywall hits when they want the *useful output* (reports, templates, action plan)
- This is the "give the diagnostic for free, charge for the cure" model
- **Conversion target:** 10-15% free → paid

### Payment

- Stripe Checkout — simple, trusted, card or bank debit
- Annual billing only (simplifies everything)
- VAT: charge 20% VAT (you'll need to VAT register once you exceed £90k threshold, but handle it properly from day 1)

---

## 7. Legal & Compliance Considerations

### Disclaimers (Critical)

Your landing page, terms of service, and in-app must clearly state:

- ClinicShield is a **guidance and preparation tool** — it does NOT constitute professional advice
- ClinicShield does NOT submit to the official DSPT portal on your behalf
- ClinicShield does NOT guarantee a "Standards Met" result
- Organisations remain solely responsible for their DSPT submission
- ClinicShield is not affiliated with, endorsed by, or approved by NHS England or NHS Digital
- The tool provides general guidance — organisations should seek professional advice for complex situations

### NHS Approval

- **You do NOT need NHS approval** to operate ClinicShield
- You are not processing patient data — you're processing practice managers' assessment answers
- You are not a medical device or clinical system
- You don't need to be on the NHS Digital Technology Assessment Criteria (DTAC) — that's for patient-facing digital health tools
- However: completing your OWN DSPT submission would be a strong trust signal (and you'd be eating your own dog food)

### Data Handling

- You ARE processing personal data (user accounts, potentially some org data)
- You need a proper Privacy Policy
- Data stored in UK/EEA only (use UK-based hosting or confirm EU data residency)
- You need a lawful basis: legitimate interests or contract performance
- If users upload evidence files, these may contain personal data — encrypt at rest, clear data retention policy
- **Recommend: auto-delete evidence files 90 days after DSPT deadline unless user opts to retain**

### Professional Indemnity Insurance

- **Strongly recommended** once you have paying customers
- If a practice relies on your guidance and fails their DSPT, they could argue negligence
- PI insurance for a small SaaS: ~£200-500/year from providers like Hiscox or PolicyBee
- **Action:** Get a quote in Week 8, purchase when revenue covers it

### Business Structure

- Sole trader is fine to start
- Consider Ltd company once revenue is meaningful (tax efficiency, limited liability)
- **Action:** Register as sole trader via HMRC immediately (free)

### Trade Mark

- Consider filing a UK trade mark for "ClinicShield" (£170 via IPO)
- Not urgent but worth doing before competitors notice you

---

## 8. Competitor Analysis

### Direct Competitors

**1. DSPT Consultants (manual services)**

- Dozens of consultancies: DLP Assured, DPO Centre, Evalian, 8fold Governance, CyberCrowd
- **Pricing:** £1,500-5,000 per assessment
- **Model:** Human consultant reviews your setup, fills in the DSPT, writes policies
- **Weakness:** Expensive, slow, not scalable, overkill for small practices
- **Your edge:** 97% cheaper, instant, self-service, always available

**2. DSPT View (on Digital Marketplace)**

- Some kind of proprietary DSPT viewing/management software
- Listed on G-Cloud but unclear pricing and traction
- Appears enterprise-focused (ISO27001 certified)
- **Your edge:** Built specifically for small practices, consumer-grade UX, much cheaper

**3. NHS England's own DSPT portal**

- Free, but confusing, bureaucratic, no guidance
- Users complain it's hard to understand what's being asked
- No gap analysis, no action plans, no templates
- **Your edge:** ClinicShield is the "TurboTax for DSPT" — wraps the official process in usability

**4. Generic compliance platforms (Vanta, Drata, OneTrust)**

- Focused on SOC 2, ISO 27001, GDPR
- None target NHS DSPT specifically
- Priced at $10,000+/year — wrong market
- **Your edge:** NHS-specific, UK-specific, affordable

### Indirect Competitors

**5. ICB/LMC free support**

- Some ICBs offer free DSPT support webinars/workshops
- Patchy, not available everywhere, limited 1:1 support
- **Your edge:** Available 24/7, systematic, complete

**6. Free DSPT guides/checklists online**

- Various consultancies publish free guides as lead magnets
- Static, not interactive, no progress tracking
- **Your edge:** Interactive, personalised, saves answers, generates reports

### Differentiation Summary

| Factor | Consultants | DSPT Portal | ClinicShield |
|--------|-------------|-------------|--------------|
| Price | £2,000-5,000 | Free | £49-99 |
| Ease of use | High (they do it) | Low | High |
| Speed | Weeks | Weeks | Hours |
| Templates | Sometimes included | None | 15+ included |
| Gap analysis | Yes (manual) | None | Automated |
| Available 24/7 | No | Yes | Yes |
| Personalised to org type | Yes | Somewhat | Yes |

---

## 9. Key Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **DSPT v8 structure changes mid-year** | Low | High | Monitor NHS Digital release notes weekly. Build question bank as config, not code — can update in hours |
| **NHS makes their portal much better** | Low | High | Unlikely given NHS Digital's track record. Stay differentiated on UX and templates |
| **Low conversion from free to paid** | Medium | High | Test paywall positioning. A/B test what's gated. Ensure free tier delivers enough value to hook users |
| **Practice managers don't trust a student/startup** | Medium | Medium | Lead with credentials: "Built by an FCA-regulated fintech founder with GDPR expertise." Get testimonials from beta users. Complete your own DSPT |
| **Scaling customer support with 20hrs/week** | Medium | Medium | Build comprehensive FAQ/help docs. Email-only support. Hire a VA if needed at scale |
| **Legal action from practice that fails DSPT** | Low | High | Strong disclaimers. PI insurance. Never guarantee outcomes |
| **Someone clones the idea** | Medium | Low | First-mover advantage in niche. Relationships with LMCs/PMA. Iterate faster |
| **Miss the June 2026 deadline window** | Low | Critical | MVP by Week 8. Even if rough, ship it. The deadline creates urgency that forgives imperfection |
| **Burnout (med school + startup)** | High | High | Scope ruthlessly. Don't build features nobody asked for. 20hrs/week is enough for MVP if focused |

---

## 10. Metrics & Milestones

### 30 Days (by ~9 March)

- ✅ Core questionnaire engine built and functional
- ✅ All 10 standards loaded with questions
- ✅ Database schema and auth complete
- ✅ 3+ practice managers lined up for beta
- **Target:** Working prototype you can demo

### 60 Days (by ~9 April)

- ✅ MVP launched with payments live
- ✅ Landing page live with SEO content
- ✅ 5-10 beta users completed assessments
- ✅ **First 5 paying customers**
- ✅ 50+ email signups from lead magnet
- ✅ 3+ LinkedIn posts published
- ✅ Active in Practice Index forum
- **Revenue target:** £150-250 (5x £29 early bird)

### 90 Days (by ~9 May)

- ✅ **25-50 paying customers**
- ✅ Net Promoter Score from beta users
- ✅ 3+ testimonials on landing page
- ✅ 2+ LMC partnership conversations
- ✅ 500+ website visitors/month
- ✅ 10%+ free-to-paid conversion rate
- ✅ Content ranking for long-tail DSPT keywords
- **Revenue target:** £1,000-2,500 MRR equivalent

### June 2026 (deadline month)

- **Stretch target:** 100-200 paying customers
- **Revenue:** £5,000-10,000 (annualised)
- First renewal cycle planning
- Post-deadline: shift messaging to "prepare early for 2026-27"

### Key Metrics to Track

- **Signups** (free accounts created)
- **Activation** (completed at least 1 standard)
- **Completion** (finished all 10 standards)
- **Conversion** (free → paid)
- **Revenue** (MRR/ARR)
- **NPS** (survey after report download)
- **CAC** (cost to acquire, should be near £0 initially)
- **Churn** (annual, measure after first renewal cycle)

---

## 11. Growth Path (Beyond MVP)

### Phase 2: July-December 2026

- **Expand org types:** Dental-specific, pharmacy-specific, optician-specific question sets
- **CQC compliance module:** Many of the same practices need CQC registration compliance
- **Cyber Essentials self-assessment:** Adjacent certification, same audience
- **AI gap analysis:** Use LLM to analyse uploaded evidence documents and suggest improvements
- **Staff training tracking:** Integrate with or replace links to NHS eLearning

### Phase 3: 2027

- **DTAC (Digital Technology Assessment Criteria):** For digital health companies
- **White-label for MSPs:** Healthcare IT managed service providers brand ClinicShield as their own tool, charge their clients, you take a platform fee
- **PCN (Primary Care Network) dashboard:** Multi-practice management for PCN managers
- **Automated evidence generation:** Generate policies dynamically based on practice details
- **Annual compliance calendar:** Year-round reminders, not just DSPT deadline panic

### Phase 4: Scale

- **API for IT MSPs:** Programmatic access for bulk management
- **ISO 27001 light:** Simplified ISO compliance for healthcare
- **International:** Adapt framework for other countries' healthcare data standards
- **Acquisition target:** Healthcare compliance is hot. Companies like Vanta, OneTrust, or NHS-focused acquirers (EMIS, Cegedim) could be interested

### Revenue Projections (Conservative)

| Period | Customers | ARPU | ARR |
|--------|-----------|------|-----|
| June 2026 | 100 | £45 | £4,500 |
| Dec 2026 | 400 | £60 | £24,000 |
| June 2027 | 1,000 | £75 | £75,000 |
| Dec 2027 | 2,500 | £85 | £212,000 |

Capturing just 1% of 60,000 target organisations = 600 customers = £30,000-60,000 ARR. Capturing 5% = £150,000-300,000 ARR.

---

## 12. Immediate Next Actions (This Week)

1. **Download DSPT v8 GP spreadsheet** from <https://www.dsptoolkit.nhs.uk/StaticContent/Attachment/901>
2. **Register domain:** clinicshield.co.uk
3. **Set up Laravel project** with Inertia.js + React
4. **Map all mandatory evidence items** for GP practice org type into a structured JSON/spreadsheet
5. **Start writing plain-English question translations** for each evidence item
6. **Create LinkedIn profile** focused on NHS data security / practice management
7. **Join Practice Index forum** (practiceindex.co.uk)
8. **Identify 3 GP practices** from your Imperial network for beta testing

---

## Appendix: Useful Links

- **DSPT Portal:** <https://www.dsptoolkit.nhs.uk/>
- **DSPT v8 Release Notes:** <https://www.dsptoolkit.nhs.uk/News/release-notes>
- **NDG 10 Standards Guides:** <https://digital.nhs.uk/cyber-and-data-security/guidance-and-assurance/data-security-and-protection-toolkit-assessment-guides>
- **DSPT v8 GP Spreadsheet:** <https://www.dsptoolkit.nhs.uk/StaticContent/Attachment/901>
- **Practice Index Forum:** <https://practiceindex.co.uk>
- **IGPM:** <https://igpm.org.uk>
- **PMA:** <https://practicemanagersuk.org>
- **AMSPAR:** <https://www.amspar.com>
- **NHS eLearning (Data Security Awareness):** <https://www.e-lfh.org.uk/programmes/data-security-awareness/>
- **ICB Directory:** <https://www.england.nhs.uk/integratedcare/integrated-care-in-your-area/>

---

*This plan was researched and written on 9 Feb 2026. DSPT v8 deadline: 30 June 2026. Time is your most valuable asset — ship fast, iterate based on real user feedback, and ride the deadline urgency wave.*
