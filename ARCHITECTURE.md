# CricMind — System Architecture Documentation

> **Version:** 1.0.0  
> **Last Updated:** May 2026  
> **Author:** CricMind Engineering Team  
> **Repository:** `CricMind3D/`  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack & Versions](#2-tech-stack--versions)
3. [Project File Structure](#3-project-file-structure)
4. [Architecture Overview](#4-architecture-overview)
5. [Data Preprocessing Pipeline](#5-data-preprocessing-pipeline)
6. [Frontend Application Architecture](#6-frontend-application-architecture)
7. [CricAI Offline Query Engine](#7-cricai-offline-query-engine)
8. [Match Simulator Algorithm](#8-match-simulator-algorithm)
9. [State Management](#9-state-management)
10. [Data Schema & Type System](#10-data-schema--type-system)
11. [Utility Functions](#11-utility-functions)
12. [Performance & Bundle Analysis](#12-performance--bundle-analysis)
13. [Build & Deployment](#13-build--deployment)
14. [Security Model](#14-security-model)
15. [Future Roadmap](#15-future-roadmap)

---

## 1. Executive Summary

CricMind is a **zero-backend, client-side IPL analytics platform** that processes 1,226 historical IPL matches (2008–2026) entirely in the browser. The architecture eliminates API latency, cloud database costs, and credential exposure by shifting all data aggregation to a one-time Node.js preprocessing step. The resulting application delivers:

- **Sub-5ms query resolution** — Pre-indexed JSON scanned in-memory
- **Zero network roundtrips** — All data shipped as a static JSON asset
- **Complete offline capability** — Works without internet after initial load
- **8 interactive pages** — Home, Dashboard, CricAI, Players, Teams, Matches, Seasons, Simulator

### Key Metrics

| Metric | Value |
|--------|-------|
| Matches Processed | 1,226 |
| IPL Seasons Covered | 19 (2008–2026) |
| Ball-by-Ball Deliveries Parsed | ~395,011 |
| Players Tracked | 680+ |
| Venues Tracked | 32 |
| Head-to-Head Rivalries | 50+ pairs |
| Output JSON Size | ~1.4 MB |

---

## 2. Tech Stack & Versions

### 2.1 Runtime Dependencies

| Package | Version | Role |
|---------|---------|------|
| **React** | `^19.2.6` | UI component library |
| **React DOM** | `^19.2.6` | DOM rendering |
| **Recharts** | `^3.8.1` | Data visualization (Bar, Radar, Area, Line, Pie charts) |
| **Framer Motion** | `^12.38.0` | Page transitions, entrance animations, AnimatePresence |
| **Three.js** | `^0.184.0` | 3D rendering capability (installed, currently using video bg) |
| **@react-three/fiber** | `^9.6.1` | React renderer for Three.js |
| **@react-three/drei** | `^10.7.7` | Three.js helper components |
| **Lucide React** | `^1.16.0` | Icon library (available as extension) |

### 2.2 Development Dependencies

| Package | Version | Role |
|---------|---------|------|
| **Vite** | `^8.0.12` | Build tool & dev server |
| **TypeScript** | `~6.0.2` | Static type checking |
| **@vitejs/plugin-react** | `^6.0.1` | React Fast Refresh for Vite |
| **ESLint** | `^10.3.0` | Code linting |
| **eslint-plugin-react-hooks** | `^7.1.1` | React Hooks rules |
| **eslint-plugin-react-refresh** | `^0.5.2` | HMR boundary validation |

### 2.3 External Resources (CDN)

| Resource | Provider | URL |
|----------|----------|-----|
| Orbitron Font | Google Fonts | `fonts.googleapis.com` |
| Inter Font | Google Fonts | `fonts.googleapis.com` |
| Rajdhani Font | Google Fonts | `fonts.googleapis.com` |

---

## 3. Project File Structure

```
CricMind3D/
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
├── README.md                      # Project readme
├── package.json                   # NPM configuration
├── package-lock.json              # Dependency lock file
├── vite.config.ts                 # Vite build configuration
├── tsconfig.json                  # TypeScript root config
├── tsconfig.app.json              # App-specific TS config
├── tsconfig.node.json             # Node-specific TS config
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML entry point (985 bytes)
│
├── preprocess-data.cjs            # Data preprocessing pipeline (444 lines)
│                                    Parses raw Cricsheet JSON → ipl_analytics.json
│
├── public/
│   ├── logo.jpg                   # CricMind logo image
│   └── bg_video.mp4               # Home page background video
│
├── dist/                          # Production build output
│
└── src/
    ├── main.tsx                   # React entry point (232 bytes)
    ├── App.tsx                    # Root component + page router (1,244 bytes)
    ├── App.css                    # App-specific overrides (2,891 bytes)
    ├── index.css                  # Global design system CSS (14,039 bytes / 510 lines)
    ├── types.ts                   # TypeScript interfaces (2,408 bytes / 129 lines)
    ├── utils.ts                   # Utility functions (1,829 bytes / 61 lines)
    │
    ├── assets/                    # Static asset imports
    │
    ├── components/
    │   ├── Layout.tsx             # App shell: navbar, footer, mobile drawer (209 lines)
    │   └── SeamlessVideo.tsx      # Background video player component
    │
    ├── data/
    │   └── ipl_analytics.json     # Preprocessed analytics dataset (~1.4 MB)
    │
    └── pages/
        ├── Home.tsx               # Landing page with video bg (345 lines)
        ├── Dashboard.tsx          # Command Center analytics (241 lines)
        ├── CricAI.tsx             # AI chat engine + dashboards (1,027 lines)
        ├── Players.tsx            # Player Lab rankings (164 lines)
        ├── Teams.tsx              # Franchise Intelligence (203 lines)
        ├── Matches.tsx            # Match Center grid (103 lines)
        ├── Seasons.tsx            # Season Vault timeline (129 lines)
        └── Simulator.tsx          # Match Simulator (216 lines)
```

**Total Source Lines:** ~2,947 lines (TypeScript/TSX) + 510 lines (CSS)

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    BUILD TIME (One-time preprocessing)                   │
│                                                                         │
│  [Cricsheet.org]                                                        │
│  Raw YAML/JSON archives ──► preprocess-data.cjs ──► ipl_analytics.json  │
│  (~1,226 match files)        (Node.js script)        (~1.4 MB output)   │
│                                                                         │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │
                                   │  Bundled as static import
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    RUNTIME (Client Browser)                              │
│                                                                         │
│  ┌──────────────┐   ┌───────────────┐   ┌────────────────────────────┐ │
│  │   App.tsx     │   │ React State   │   │  ipl_analytics.json        │ │
│  │  Page Router  │◄─►│ useState()    │◄──│  (loaded into memory)      │ │
│  │  8 pages      │   │ page, filters │   │                            │ │
│  └──────┬───────┘   └───────────────┘   └─────────┬──────────────────┘ │
│         │                                          │                    │
│         ▼                                          ▼                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Page Components                                │  │
│  │                                                                    │  │
│  │  Home ─── Dashboard ─── CricAI ─── Players ─── Teams              │  │
│  │                │              │                                     │  │
│  │           Recharts       CricAI Engine     Simulator               │  │
│  │         (6 chart types)  (Regex NLP)    (Weighted Probability)     │  │
│  │                                                                    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Layout.tsx — Persistent Shell                                     │  │
│  │  Fixed Navbar │ Live Clock │ Mobile Drawer │ Footer                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Data Preprocessing Pipeline

**File:** `preprocess-data.cjs` (444 lines)

### 5.1 Input

- **Source:** Cricsheet.org raw ball-by-ball JSON archives
- **Location:** `../ipl_json/` directory (sibling to project root)
- **Format:** One JSON file per match, each containing `info` (metadata) and `innings` (ball-by-ball data)
- **Scale:** 1,226 JSON files

### 5.2 Processing Steps

```
Step 1: Read all .json files from ipl_json/ directory
           │
Step 2: For each match file, extract:
           ├── Match metadata (date, venue, city, season, teams, winner, toss)
           ├── Player rosters and Man of the Match
           ├── Toss decision and outcome
           └── Head-to-Head team pairing
           │
Step 3: Parse ball-by-ball innings data:
           ├── For each delivery:
           │     ├── Classify phase: Powerplay (0-5) / Middle (6-14) / Death (15-19)
           │     ├── Accumulate: runs, dots, fours, sixes, wickets per phase
           │     ├── Track batter stats: runs, balls_faced, fours, sixes
           │     ├── Track bowler stats: balls_bowled, runs_conceded, wickets
           │     └── Track fielder catches
           │
           ├── Per-innings aggregation:
           │     ├── Calculate highest team score
           │     ├── Count player fifties/hundreds
           │     └── Add team runs total
           │
Step 4: Apply IPL title records (hardcoded 2008-2025 champion map)
           │
Step 5: Compute derived metrics:
           ├── Player strike_rate = (runs / balls_faced) × 100
           ├── Player average = runs / innings
           ├── Player economy = (runs_conceded / balls_bowled) × 6
           ├── Player bowling_avg = runs_conceded / wickets
           ├── Team win_pct = (wins / matches) × 100
           ├── Venue avg_score = total_runs / (matches × 2)
           ├── Phase run_rate = (runs / balls) × 6
           ├── Phase boundary_% = ((fours + sixes) / balls) × 100
           ├── Phase dot_ball_% = (dots / balls) × 100
           └── Toss analysis percentages
           │
Step 6: Build ranked lists:
           ├── top_batters (top 50 by runs, min 3 matches)
           ├── top_bowlers (top 50 by wickets)
           ├── top_allrounders (top 20 by runs + wickets×20, min 100 runs & 20 wkts)
           ├── sixes_kings (top 20 by sixes)
           ├── h2h (top 50 rivalries by match count)
           └── venues (top 20 by match count)
           │
Step 7: Write ipl_analytics.json to src/data/
```

### 5.3 Team Name Normalization

The script handles franchise renames:

```javascript
'Royal Challengers Bangalore' → 'Royal Challengers Bengaluru'
'Rising Pune Supergiants'     → 'Rising Pune Supergiant'
'Kings XI Punjab'             → 'Punjab Kings'
'Delhi Daredevils'            → 'Delhi Capitals'
```

### 5.4 Output

- **File:** `src/data/ipl_analytics.json`
- **Size:** ~1.4 MB
- **Format:** Single JSON object with 13 top-level keys
- **Import Method:** Static import in `App.tsx` via `import rawData from './data/ipl_analytics.json'`

### 5.5 How to Run

```bash
# From the CricMind3D directory:
node preprocess-data.cjs

# Output:
# ✅ Analytics written to: src/data/ipl_analytics.json
# 📈 Summary:
#    Total matches: 1226
#    Total runs: 389,011
#    ...
```

---

## 6. Frontend Application Architecture

### 6.1 Entry Point

```
index.html → src/main.tsx → src/App.tsx → Layout + Pages
```

`main.tsx` renders `<App />` into `#root`.

### 6.2 Page Router (App.tsx)

CricMind uses a **simple `useState`-based page router** — no React Router dependency:

```typescript
export type Page = 'home' | 'dashboard' | 'players' | 'teams' | 'matches' | 'seasons' | 'simulator' | 'cricai'

function App() {
  const data = rawData as unknown as IPLData
  const [page, setPage] = useState<Page>('home')

  return (
    <Layout page={page} setPage={setPage}>
      {page === 'home'      && <Home data={data} setPage={setPage} />}
      {page === 'dashboard' && <Dashboard data={data} />}
      {page === 'cricai'    && <CricAI data={data} />}
      {page === 'players'   && <Players data={data} />}
      {page === 'teams'     && <Teams data={data} />}
      {page === 'matches'   && <Matches data={data} />}
      {page === 'seasons'   && <Seasons data={data} />}
      {page === 'simulator' && <Simulator data={data} />}
    </Layout>
  )
}
```

**Design Decision:** We chose `useState` over React Router because:
1. Single-page analytics dashboard — no URL bookmarking needed
2. Zero additional dependency
3. Simpler state flow — `setPage` is passed as a prop

### 6.3 Page Component Summary

| Page | File | Lines | Key Features |
|------|------|-------|--------------|
| **Home** | `Home.tsx` | 345 | Video background, hero section, stat ticker, feature cards grid, recent matches scroll |
| **Dashboard** | `Dashboard.tsx` | 241 | 4 stat cards, toss analysis bar chart, all-time leaders, 3 phase radar charts, season trend area chart, franchise win rates bar chart, top venues scroll |
| **CricAI** | `CricAI.tsx` | 1,027 | Two-column layout: chat interface + toss/phase dashboards. Regex NLP engine, markdown renderer, quick prompt chips |
| **Players** | `Players.tsx` | 164 | Radar comparison chart, top scorers bar chart, tabbed grid (Batters/Bowlers/Sixes Kings), ranked player cards |
| **Teams** | `Teams.tsx` | 203 | Win % bar chart, titles pie chart, H2H scroll strip, all franchises grid with color-accent cards |
| **Matches** | `Matches.tsx` | 103 | Season filter tabs, match result cards grid with team color dots and MOM highlighting |
| **Seasons** | `Seasons.tsx` | 129 | Scoring trend line chart, total runs bar chart, reverse-chronological season cards with champion badges |
| **Simulator** | `Simulator.tsx` | 216 | Team selector dropdowns, H2H preview, weighted probability simulation with 2s loading state, confidence bar |

### 6.4 Layout Component (Layout.tsx, 209 lines)

The `Layout` component provides the persistent app shell:

1. **Fixed Navbar** — scroll-reactive blur + border transition
2. **8 Navigation Links** — with Unicode icons and active state
3. **Live Clock** — updates every second, green pulsing "LIVE" badge
4. **Mobile Hamburger** — at ≤1024px, opens animated left drawer
5. **Footer** — shown on all pages except Home

---

## 7. CricAI Offline Query Engine

**File:** `CricAI.tsx`, function `generateLocalResponse()` (lines 220–433)

### 7.1 Architecture

CricAI is a **client-side pattern-matching NLP** engine that resolves user questions against the in-memory IPL dataset. It uses no external APIs, no machine learning models, and no network requests.

```
User Input (text string)
    │
    ▼
toLowerCase() + trim()
    │
    ▼
┌─────────────────────────────────────────┐
│         Priority-Ordered Matchers       │
│                                         │
│  1. Head-to-Head (2 team keywords)      │
│  2. Player Name Match                   │
│  3. "Most Runs" / "Orange Cap"          │
│  4. "Most Wickets" / "Purple Cap"       │
│  5. Year-specific season (regex: 20XX)  │
│  6. "Champion" / "Who Won" / "Titles"   │
│  7. "Toss" / "Chasing" / "Bat First"   │
│  8. "Phase" / "Powerplay" / "Death"     │
│  9. Single Team Name Lookup             │
│  10. "Venue" / "Stadium" / "Pitch"      │
│  11. Default Fallback                   │
└─────────────────────────────────────────┘
    │
    ▼
Markdown-formatted response string
    │
    ▼
MarkdownText renderer (custom React component)
```

### 7.2 Team Keyword Dictionary

```javascript
const teamKeywords = {
  'csk': 'Chennai Super Kings', 'chennai': 'Chennai Super Kings',
  'mi': 'Mumbai Indians', 'mumbai': 'Mumbai Indians',
  'rcb': 'Royal Challengers Bengaluru', 'bengaluru': 'Royal Challengers Bengaluru',
  'srh': 'Sunrisers Hyderabad', 'hyderabad': 'Sunrisers Hyderabad',
  'kkr': 'Kolkata Knight Riders', 'kolkata': 'Kolkata Knight Riders',
  'rr': 'Rajasthan Royals', 'rajasthan': 'Rajasthan Royals',
  'dc': 'Delhi Capitals', 'delhi': 'Delhi Capitals',
  'pbks': 'Punjab Kings', 'punjab': 'Punjab Kings',
  'gt': 'Gujarat Titans', 'gujarat': 'Gujarat Titans',
  'lsg': 'Lucknow Super Giants', 'lucknow': 'Lucknow Super Giants'
}
```

### 7.3 Markdown Renderer

CricAI responses are rendered through a custom `MarkdownText` component (lines 60–158) that parses:
- `### Headers` → styled h3 with neon-blue
- `## Headers` → styled h2 with neon-green
- `**bold**` → white bold text
- `` `code` `` → inline code with blue tint
- `* bullets` → hexagonal bullet markers (⬡)
- `1. numbered` → ordered list with blue numbering
- `⚠️ warnings` → red-bordered alert cards
- Empty lines → 4px spacers

### 7.4 Chat Flow

```
1. User types query or clicks quick-prompt chip
2. handleSend() adds user message to state
3. setIsTyping(true) — shows "Analyzing dataset..." animation
4. 800ms artificial delay (simulates scanning)
5. generateLocalResponse() runs synchronously
6. AI message added to state
7. Chat container auto-scrolls to bottom
```

---

## 8. Match Simulator Algorithm

**File:** `Simulator.tsx`, function `handleSimulate()` (lines 30–73)

### 8.1 Algorithm Description

The Match Simulator uses a **weighted probability model** combining historical win percentages and head-to-head records:

```
PSEUDOCODE:

INPUT: team1, team2 (selected franchises)

STEP 1 — Base Probability (from all-time win percentages):
   t1Stats = teams.find(team1).win_pct
   t2Stats = teams.find(team2).win_pct
   totalPct = t1Stats + t2Stats
   winProb1 = t1Stats / totalPct      // Normalized
   winProb2 = t2Stats / totalPct

STEP 2 — H2H Adjustment (if historical record exists):
   h2hRecord = h2h.find(team1 vs team2)
   IF h2hRecord exists:
      h2hWin1 = wins for team1 in H2H / total H2H matches
      h2hWin2 = wins for team2 in H2H / total H2H matches
      winProb1 = (winProb1 + h2hWin1) / 2    // Average with H2H
      winProb2 = (winProb2 + h2hWin2) / 2

STEP 3 — Normalization:
   sum = winProb1 + winProb2
   winProb1 = winProb1 / sum
   winProb2 = winProb2 / sum

STEP 4 — Monte Carlo Selection:
   random = Math.random()
   IF random < winProb1:
      winner = team1, confidence = winProb1
   ELSE:
      winner = team2, confidence = winProb2

OUTPUT: { winner, probability }
```

### 8.2 Weight Distribution

| Factor | Weight | Source |
|--------|--------|--------|
| All-time win percentage | ~50% | `teams[].win_pct` |
| Head-to-head record | ~50% | `h2h[].wins_t1 / matches` |

### 8.3 UI States

```
State 1: IDLE
  ├── Shows empty state ("Select teams and run simulation")
  └── If H2H data exists, shows historical win counts

State 2: SIMULATING (2 seconds)
  ├── Green spinner animation
  ├── "CALCULATING PROBABILITIES..." text
  └── "Querying historical records and venue stats" subtitle

State 3: RESULT
  ├── Winner name in large neon-green text
  ├── Confidence percentage in gold
  └── Progress bar showing win probability
```

### 8.4 Validation

- **Same team guard:** If `team1 === team2`, simulation is disabled with red error message
- **Minimum matches filter:** Team dropdown only shows teams with `≥ 20` matches

---

## 9. State Management

CricMind uses **React's built-in `useState` hook exclusively** — no external state management library (Redux, Zustand, etc.).

### 9.1 Global State (App.tsx)

| State | Type | Purpose |
|-------|------|---------|
| `page` | `Page` (union type) | Current active page |

### 9.2 Page-Level State

| Page | State Variables | Purpose |
|------|-----------------|---------|
| **CricAI** | `query`, `messages[]`, `isTyping`, `activePhase`, `activeTitan` | Chat history, input, loading, panel toggles |
| **Players** | `tab` (batters/bowlers/sixes) | Active tab filter |
| **Matches** | `seasonFilter` | Season dropdown filter |
| **Simulator** | `team1`, `team2`, `simulating`, `result` | Team selection, simulation state |
| **Layout** | `scrolled`, `time`, `drawerOpen` | Scroll detection, live clock, mobile menu |

### 9.3 Data Flow

```
ipl_analytics.json
       │
       ▼ (static import)
   App.tsx: const data = rawData as IPLData
       │
       ▼ (prop drilling)
   <PageComponent data={data} />
       │
       ▼ (destructuring)
   const { summary, teams, h2h, ... } = data
```

Data is **read-only** — no mutations, no updates, no API calls.

---

## 10. Data Schema & Type System

**File:** `types.ts` (129 lines)

### 10.1 Root Interface

```typescript
interface IPLData {
  generated: string           // ISO timestamp of preprocessing
  summary: Summary            // Dashboard headline stats
  teams: TeamStat[]           // All franchise records
  venues: VenueStat[]         // Top 20 venues
  seasons: SeasonStat[]       // All 19 seasons
  top_batters: PlayerStat[]   // Top 50 by runs
  top_bowlers: PlayerStat[]   // Top 50 by wickets
  top_allrounders: PlayerStat[] // Top 20 balanced performers
  sixes_kings: PlayerStat[]   // Top 20 by sixes
  toss_analysis: TossAnalysis // Toss correlation data
  phase_analysis: {           // Powerplay/Middle/Death breakdown
    powerplay: PhaseStats
    middle: PhaseStats
    death: PhaseStats
  }
  h2h: H2HRecord[]           // Top 50 head-to-head rivalries
  recent_matches: RecentMatch[] // All matches (sorted by date desc)
}
```

### 10.2 Key Interfaces

**Summary** — 12 fields including `total_matches`, `most_runs_player`, `highest_team_score`, `recent_matches[10]`

**PlayerStat** — 20 fields per player: `runs`, `wickets`, `matches`, `innings`, `balls_faced`, `balls_bowled`, `runs_conceded`, `fours`, `sixes`, `catches`, `mom`, `fifties`, `hundreds`, `teams[]`, `strike_rate`, `average`, `economy`, `bowling_avg`

**TeamStat** — 8 fields: `name`, `wins`, `losses`, `matches`, `win_pct`, `titles`, `toss_wins`, `runs`

**PhaseStats** — 10 fields: `run_rate`, `avg_runs`, `boundary_percent`, `dot_ball_percent`, `avg_wickets`, `total_runs`, `total_wickets`, `total_balls`, `fours`, `sixes`

**RecentMatch** — 11 fields including optional `win_by_runs`, `win_by_wickets`, `mom`

**H2HRecord** — 5 fields: `t1`, `t2`, `wins_t1`, `wins_t2`, `matches`

---

## 11. Utility Functions

**File:** `utils.ts` (61 lines)

| Function | Signature | Purpose |
|----------|-----------|---------|
| `teamColor(name)` | `string → string` | Returns hex brand color for any IPL franchise (fallback: `#444444`) |
| `teamAbbr(name)` | `string → string` | Returns 2–4 letter abbreviation (fallback: first 3 chars uppercase) |
| `fmt(n)` | `number → string` | Formats large numbers: `389011 → "389.0K"`, `1000000 → "1.0M"` |
| `pct(a, b)` | `(number, number) → number` | Returns rounded percentage: `(a/b) × 100` |

Both `TEAM_COLORS` and `TEAM_ABBR` dictionaries map 16 franchise names (including legacy names) to their values.

---

## 12. Performance & Bundle Analysis

### 12.1 Load Performance

| Metric | Value | Notes |
|--------|-------|-------|
| Static JSON payload | ~1.4 MB | Loaded once via static import; cached by browser |
| Time to Interactive | < 2s | Vite dev server with HMR |
| JSON parse time | < 50ms | Single `JSON.parse` by Vite import system |
| Query resolution | < 5ms | In-memory regex tokenizer + array scanning |
| Chart render time | < 200ms | Recharts SVG with `<ResponsiveContainer>` |

### 12.2 Bundle Composition (estimated)

| Component | Size (approx.) |
|-----------|---------------|
| React + ReactDOM | ~45 KB gzipped |
| Recharts | ~80 KB gzipped |
| Framer Motion | ~35 KB gzipped |
| Three.js + R3F + Drei | ~150 KB gzipped (loaded but lightly used) |
| Application code | ~25 KB gzipped |
| ipl_analytics.json | ~350 KB gzipped |
| **Total** | **~685 KB gzipped** |

### 12.3 Optimization Strategies

1. **Static JSON import** — No runtime fetching, no loading states for data
2. **Conditional rendering** — Only active page is rendered (no React Router lazy loading needed)
3. **Framer Motion viewport-once** — Below-fold animations trigger once and stop
4. **Recharts ResponsiveContainer** — SVGs resize without JavaScript recalculation
5. **CSS backdrop-filter** — GPU-accelerated glass blur effects

---

## 13. Build & Deployment

### 13.1 Development

```bash
# Install dependencies
npm install

# Start dev server (Vite with HMR)
npm run dev
# → http://localhost:5173

# Lint check
npm run lint
```

### 13.2 Production Build

```bash
# TypeScript check + Vite production build
npm run build
# Output: dist/

# Preview production build locally
npm run preview
# → http://localhost:4173
```

### 13.3 Deployment Options

CricMind is a **static site** — the `dist/` folder can be deployed to:

| Platform | Command |
|----------|---------|
| **Vercel** | `vercel --prod` (auto-detected as Vite) |
| **Netlify** | Drag-and-drop `dist/` or connect Git repo |
| **GitHub Pages** | Set base in `vite.config.ts`, push `dist/` to `gh-pages` branch |
| **Firebase Hosting** | `firebase deploy` with `dist` as public directory |
| **Any Static Host** | Upload `dist/` contents |

### 13.4 Data Refresh Workflow

To update with new IPL match data:

```bash
# 1. Download new match JSON files from Cricsheet.org
# 2. Place them in ../ipl_json/ directory
# 3. Run preprocessing
node preprocess-data.cjs
# 4. Rebuild the app
npm run build
```

---

## 14. Security Model

### 14.1 Zero-Backend Guarantees

| Threat Vector | Mitigation |
|--------------|------------|
| API key exposure | No APIs, no keys stored in client bundle |
| Database injection | No database — data is read-only static JSON |
| XSS via user input | CricAI input is pattern-matched only (never `eval`'d or injected into DOM as raw HTML) |
| CSRF attacks | No authenticated endpoints to attack |
| Data exfiltration | All queries processed locally — nothing leaves the browser |

### 14.2 Client Isolation

- **No cookies or localStorage** — Zero persistent browser state
- **No tracking or telemetry** — No analytics SDKs installed
- **No external API calls** — Only Google Fonts CDN (for typography)
- **No service workers** — No background execution

### 14.3 Sandbox Boundary

All JavaScript execution is confined to the browser's V8/SpiderMonkey sandbox. The application:
- Does not request file system access
- Does not request camera/microphone/location
- Does not use WebSockets or Server-Sent Events
- Does not load third-party scripts (no ads, no tracking pixels)

---

## 15. Future Roadmap

### 15.1 Planned Enhancements

| Feature | Status | Impact |
|---------|--------|--------|
| Venue-specific form in Simulator | Planned | Higher prediction accuracy |
| Player matchup analysis in Simulator | Planned | Bowling vs batting head-to-head |
| Gemini API integration for CricAI | Research | Natural language understanding upgrade |
| PWA offline support (Service Worker) | Planned | Full offline-first capability |
| `prefers-reduced-motion` support | Planned | Accessibility improvement |
| URL-based routing (React Router) | Evaluating | Deep-linking & bookmarking |
| Real-time IPL score integration | Evaluating | Live match tracking during season |

### 15.2 Three.js 3D Features (Installed, Partially Used)

Three.js, R3F, and Drei are installed as dependencies for future 3D visualizations:
- 3D cricket stadium model for venue analysis
- Animated ball trajectory replays
- 3D radar charts for player comparisons

Currently, the Home page uses a video background (`bg_video.mp4`) instead of a 3D scene.

---

*This document represents the complete technical architecture of CricMind as of May 2026. For design specifications, refer to DESIGN_SYSTEM.md. For the live interactive prototype, open index.html in a browser.*
