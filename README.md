<p align="center">
  <img src="./public/conflux.png" alt="Conflux Logo" width="220" />
</p>

<h1 align="center">Conflux — Cross-Channel Identity & Journey Resolution Engine</h1>

<p align="center">
  <b>American Express CodeStreet Hackathon Solution</b><br />
  <i>Team: <b>Fliq Odd</b> | Theme: <b>Cross-Channel Journey Stitching</b></i>
</p>
<p align="center">
  <b>Note : This is just a Concept and MVP solution</b><br />

</p>

<p align="center">
  <a href="https://conflux-k70q.onrender.com"><img src="https://img.shields.io/badge/Live_Demo-Render-006FCF?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/Amansingh0807/Conflux"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" /></a>
  <a href="https://tinyurl.com/ywupnet7"><img src="https://img.shields.io/badge/Summary-PPT_Slide-D97706?style=for-the-badge&logo=microsoftpowerpoint&logoColor=white" alt="PPT Presentation" /></a>
  <a href="https://www.loom.com/share/6c412ffdc2814ebfab4b8939f313dda4"><img src="https://img.shields.io/badge/Video-Loom_Walkthrough-625DF5?style=for-the-badge&logo=loom&logoColor=white" alt="Loom Demo" /></a>
</p>

---

## Table of Contents

- [The Story Behind the Problem](#-the-story-behind-the-problem)
- [The Core Problem Statement](#-the-core-problem-statement)
- [Our Solution: Conflux](#-our-solution-conflux)
- [Key Features & Innovations](#-key-features--innovations)
- [Technical Architecture](#-technical-architecture)
  - [1. Identity Resolution Engine (Waterfall Matching)](#1-identity-resolution-engine-waterfall-matching)
  - [2. Event Ingestion Data Pipeline](#2-event-ingestion-data-pipeline)
  - [3. Analyst Dashboard & Rule Engine](#3-analyst-dashboard--rule-engine)
- [Real-World Scenario: How It Works in Practice](#-real-world-scenario-how-it-works-in-practice)
- [Technology Stack](#-technology-stack)
- [Technical Feasibility & Scalability](#-technical-feasibility--scalability)
- [Business Impact & Success Metrics](#-business-impact--success-metrics)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started Locally](#-getting-started-locally)
- [References & Resources](#-references--resources)

---

## 📖 The Story Behind the Problem

Imagine a Card Member, **Aman**, who is trying to dispute a **₹50,000** charge. 

1. He opens the **American Express mobile app**, taps through to the dispute section, and gets an **HTTP 503 Gateway Timeout** error.
2. Annoyed, he switches to his laptop, pulls up the AmEx website, searches *"dispute charge error"*, and finds nothing but a generic FAQ page that doesn't answer his question.
3. Fifteen minutes into this frustrating process, he calls American Express Customer Care.

The call center agent picks up and says:
> *"Welcome to American Express, how can I help you today?"*

To Aman, that line lands completely wrong. He has already fought the app, fought the website, and now he has to explain the entire ordeal from scratch. 

From the agent's side, however, **none of this is their fault**. They have zero visibility into what Aman did five minutes ago because the mobile app, the website, and the telephony systems operate in completely isolated silos that were never built to communicate with one another. 

The result? **Average Handle Time (AHT) increases**, agent stress rises, and a premium cardholder walks away from the call closer to churning.

---

## ⚡ The Core Problem Statement

This is not a data logging problem — American Express already tracks vast amounts of telemetry:
- **Mobile App Team**: Logs Device IDs, biometric tokens, and app auth tokens.
- **Web Portal Team**: Logs IP addresses, session cookies, and URL paths.
- **Telephony / CTI Team**: Logs Caller ID (ANI) and IVR selections.

The fundamental issue is a **stitching problem**:
> Three distinct teams $\rightarrow$ Three separate databases $\rightarrow$ Three completely disconnected pictures of the same customer having the exact same bad day.

Without a system that unifies these identifiers in real time, the bank only discovers a customer was struggling **after** they call in angry — never while it is actually happening, when proactive intervention could still save the account.

---

## 💡 Our Solution: Conflux

**Conflux** does not replace or modify American Express's core banking databases. Instead, it operates alongside existing event infrastructure, listens to live event streams generated across app, web, and call center channels, and stitches them into a **single, unified chronological timeline** before the support agent picks up the call.

<p align="center">
  <img src="public/conflux.png" alt="Conflux Architecture Banner" width="700" />
</p>

### How Conflux Solves The Problem:

1. **Two-Tier Identity Resolution Engine**: A waterfall matching algorithm combining deterministic $O(1)$ lookups with probabilistic multi-signal scoring.
2. **Call Center CTI Trigger & Zero-Trust Gate**: Telephony system automatically passes Caller ID to pre-load customer history in the background, which unlocks only after a quick identity verification (OTP / Last 4 digits of Card).
3. **Add-On Cardholder Disambiguation**: Resolves shared family/add-on phone numbers by prompting the agent to select the relevant cardholder profile.
4. **The Friction Index**: A transparent, rule-based algorithm that assigns weights to negative signals (API 503 timeouts, repeated FAQ refreshes, cart drop-offs) and flags high-risk accounts for immediate proactive resolution.

---

## 🚀 Key Features & Innovations

- 🌐 **Cross-Channel Journey Stitching**: Unifies Web, iOS/Android App, and PSTN Voice Call events into a continuous vertical timeline.
- ⚡ **Real-Time Telemetry Stream**: Event ingestion to dashboard rendering in **< 5 seconds**.
- 🚨 **Rule-Based System Intelligence**: Transparently flags:
  - 🔴 **Cart Drop-off Detected**: Customer abandoned checkout within the last 30 minutes.
  - ⚠️ **Escalation Warning**: 2+ complaints logged within the past 7 days.
  - 🔴 **Unresolved Issue**: Open ticket exceeding 7-day SLA.
- 🎯 **Suggested Next Best Action**: Recommends instant agent scripts and triggers automated dispute workflows (e.g., auto-reversing failed ₹50,000 transaction holds).
- 🔍 **Payload Telemetry Inspector**: Allows support analysts to inspect raw HTTP status codes, device engines, endpoint URIs, and trace IDs.

---

## 🏗️ Technical Architecture

### 1. Identity Resolution Engine (Waterfall Matching)

Rather than treating identity matching as a black box ML model, Conflux utilizes a **Tiered Matching Waterfall**:

```
                          [ Incoming Customer Event ]
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │   Tier 1: Deterministic   │ ──(Match Found)──► [ Auto-Confirmed 100% Match ]
                        │ (Card # / Phone / Email) │
                        └──────────────────────────┘
                                      │
                                (No Match)
                                      ▼
                        ┌──────────────────────────┐
                        │  Tier 2: Probabilistic   │
                        │     Scoring Engine       │
                        └──────────────────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             ▼                        ▼                        ▼
     Score ≥ 70               Score 40 - 69             Score < 40
┌──────────────────┐    ┌──────────────────────┐   ┌──────────────────┐
│   Auto-Merge     │    │ Manual Review Queue  │   │  Treat as        │
│ High Confidence  │    │  (RabbitMQ Broker)   │   │  Separate Person │
└──────────────────┘    └──────────────────────┘   └──────────────────┘
```

#### Matching Scoring Breakdown:
- **Tier 1 (Deterministic)**: 100% confidence match based on hard identifiers (Auth Tokens, Account ID, Verified Phone, Email).
- **Tier 2 (Probabilistic Weighting)**:
  - Device ID match: **+40 points**
  - IP Address + Timeframe proximity: **+20 points**
  - Name Similarity: **+15 points**
  - Location Proximity: **+15 points**
  - Session Timing Proximity: **+10 points**

---

### 2. Event Ingestion Data Pipeline

Different channels log the exact same user action using completely different nomenclature (e.g., Web logs `clicked_product`, App logs `tap_product`, POS logs `Product Viewed`).

```
[ Web Portal ]    [ Mobile App ]    [ Call Center ]    [ In-Store POS ]
      │                 │                  │                  │
      ▼                 ▼                  ▼                  ▼
┌───────────┐     ┌───────────┐      ┌───────────┐      ┌───────────┐
│ Web       │     │ App       │      │ Call      │      │ Store     │
│ Adapter   │     │ Adapter   │      │ Adapter   │      │ Adapter   │
└───────────┘     └───────────┘      └───────────┘      └───────────┘
      │                 │                  │                  │
      └─────────────────┴────────┬─────────┴──────────────────┘
                                 ▼
                     ┌──────────────────────┐
                     │    Apache Kafka      │
                     │ (hash(customer_id))  │
                     └──────────────────────┘
                                 │
                                 ▼
                     ┌──────────────────────┐
                     │ Normalization Layer  │
                     └──────────────────────┘
                                 │
                                 ▼
                     ┌──────────────────────┐
                     │ Unified Timeline DB  │
                     │  (PostgreSQL/Prisma) │
                     └──────────────────────┘
```

- **Channel Adapters**: Translates raw events into a standardized schema (`timestamp`, `channel`, `action`, `description`, `metadata`). Adding a new channel (e.g., WhatsApp bot) only requires adding one adapter.
- **Kafka Partitioning**: Partitioned strictly by `hash(customer_id)` to eliminate race conditions and guarantee strict chronological ordering per customer.

---

### 3. Analyst Dashboard & Rule Engine

Sitting on top of the stitched customer timeline is a **transparent Rule Engine** that monitors behavioral events in real time:

- **Drop-off Rule**: Cart abandoned $> 30$ mins without completed payment.
- **Escalation Rule**: $\ge 2$ complaints within 7 days.
- **Unresolved Rule**: Open support ticket $> 7$ days without SLA resolution.

---

## 📱 Real-World Scenario: How It Works in Practice

1. **Call Connects**: Customer calls support $\rightarrow$ Telephony CTI captures Caller ID.
2. **Background Pre-Fetch**: Conflux triggers identity resolution and pre-loads the customer's stitched journey in the background.
3. **Zero-Trust Verification Gate**: Full dispute timeline remains masked until the agent verifies the customer (e.g., OTP or Last 4 digits of card).
4. **Add-On Cardholder Selection**: If multiple accounts share a family number, a prompt asks the agent to confirm the cardholder profile.
5. **Instant Resolution**: Agent sees the exact API 503 timeout that occurred at 09:17 AM and launches the **Assisted Dispute Workflow** with one click.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling & UI** | Tailwind CSS v4, Lucide React Icons |
| **Database & ORM** | PostgreSQL, Prisma ORM |
| **Backend & Routing** | Node.js (App Router API Routes), Python (FastAPI Engine) |
| **Event Pipeline** | Apache Kafka (Partitioned Ingestion) |
| **Caching & Indexing** | Redis (Hash Index & Hot Telemetry Cache) |
| **Deployment** | Vercel / Render |

---

## 📈 Technical Feasibility & Scalability

At enterprise volume (**10M+ transactions/minute**, **100K+ requests/second**):

- **Partitioned Ingestion**: Kafka topics partitioned by `hash(customer_id)` ensure identity resolution scales horizontally across worker nodes without bottlenecking.
- **O(1) Lookups**: Distributed Redis hash index enables $O(1)$ identity resolution lookups instead of expensive database scans across millions of rows.
- **CQRS & Append-Only Storage**: Timeline writes are append-only. Chronological sorting happens strictly once during ingestion rather than on every dashboard read query.
- **Idempotent Execution**: Utilizes `event_id` deduplication to handle Kafka's at-least-once delivery guarantees without double-counting friction events.

---

## 🎯 Business Impact & Success Metrics

- ⏱️ **20–25% Reduction in Average Handle Time (AHT)**: Agents skip repetitive discovery questions ("Can you explain what happened?") and jump straight to solving the issue.
- 🛠️ **Actionable Product Insights**: Converts support interactions into engineering tasks by pin-pointing broken UI flows and API timeouts.
- 🛡️ **Proactive Churn Mitigation**: Friction Index identifies flight-risk premium cardholders before they reach a breaking point.
- 🎯 **Target Metrics**: **98%+ Accuracy** on deterministic matches, **< 5s** end-to-end timeline latency.

---

## 📁 Project Directory Structure

```
conflux/
├── app/
│   ├── api/
│   │   └── customer/
│   │       └── [id]/
│   │           └── route.ts          # Next.js API Route for Customer Telemetry
│   ├── globals.css                   # Custom Light Mode Design System
│   ├── layout.tsx                    # Root Layout & Typography Setup
│   └── page.tsx                      # Main Analyst Dashboard Orchestrator
├── components/
│   ├── Navbar.tsx                    # Header with Conflux Branding & Telemetry Sync
│   ├── CustomerProfileSidebar.tsx    # Customer Profile, Friction Score & Risk Badges
│   ├── TimelineSection.tsx           # Stitched Vertical Event Timeline & Payload Drawer
│   ├── SystemIntelligenceSidebar.tsx # Rule Engine Flags & Suggested Action Card
│   ├── WorkflowModal.tsx             # Assisted Dispute Workflow Modal
│   └── Footer.tsx                    # Analyst Dashboard Footer
├── data/
│   └── mockData.ts                   # Fallback Mock Telemetry Dataset
├── lib/
│   ├── apiMapper.ts                  # Database to UI Prop Transformation Mappers
│   └── prisma.ts                     # Prisma Client Singleton Instance
├── prisma/
│   ├── schema.prisma                 # PostgreSQL Schema (Customer, JourneyEvent, SystemFlag)
│   └── seed.ts                       # Database Seed Script
├── public/
│   └── conflux.png                   # Official Conflux Branding Logo
├── types/
│   └── dashboard.ts                  # TypeScript Interface Definitions
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.x or higher)
- PostgreSQL Database
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amansingh0807/Conflux.git
   cd Conflux
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/conflux_db?schema=public"
   ```

4. **Initialize Database & Prisma Client**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed Test Telemetry Data**:
   ```bash
   npm run db:seed
   ```

6. **Start Development Server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the **Conflux Analyst Dashboard**.

---

## 🔗 References & Resources

- 🌐 **Live Demo**: [https://conflux-k70q.onrender.com](https://conflux-k70q.onrender.com)
- 📦 **GitHub Repository**: [https://github.com/Amansingh0807/Conflux](https://github.com/Amansingh0807/Conflux)
- 📊 **Presentation Summary PPT**: [https://tinyurl.com/ywupnet7](https://tinyurl.com/ywupnet7)

---

## 📝 Hackathon Outcome

> **Note:** Conflux was developed as a **prototype solution for the American Express CodeStreet Hackathon** under the *Cross-Channel Journey Stitching* theme. While the idea was **not selected in the final evaluation**, this repository represents our complete prototype, technical exploration, and implementation of the proposed solution.

---

<p align="center">
  Built with ❤️ for the <b>American Express CodeStreet Hackathon</b> by Team <b>Fliq Odd</b>
</p>
