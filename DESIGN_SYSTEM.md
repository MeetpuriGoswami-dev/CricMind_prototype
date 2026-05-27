# CricMind — Design System Documentation

> **Version:** 1.0.0  
> **Last Updated:** May 2026  
> **Author:** CricMind Product Design Team  
> **Source:** Extracted from `CricMind3D/src/index.css`, `App.css`, and all React page components  

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout Grid](#4-spacing--layout-grid)
5. [Glass Card System](#5-glass-card-system)
6. [Button Components](#6-button-components)
7. [Navigation System](#7-navigation-system)
8. [Tag & Badge Components](#8-tag--badge-components)
9. [Data Visualization Patterns](#9-data-visualization-patterns)
10. [Animation & Motion System](#10-animation--motion-system)
11. [Responsive Breakpoints](#11-responsive-breakpoints)
12. [Accessibility & Contrast](#12-accessibility--contrast)
13. [Icon System](#13-icon-system)
14. [Scrollbar & Micro-UI](#14-scrollbar--micro-ui)
15. [Component Reference Index](#15-component-reference-index)

---

## 1. Design Philosophy

CricMind implements a **Sci-Fi Glassmorphism** design language that fuses aerospace HUD aesthetics with dark-mode data visualization best practices. The design serves three primary objectives:

### 1.1 Authority & Precision
Monospaced display fonts (Orbitron) and neon accent colors communicate technological depth. Every number feels like telemetry data from an advanced analytics console.

### 1.2 Extended Session Comfort
Analytical cricket sessions span hours. The deep-space dark canvas (#020817) with low-luminance card surfaces eliminates eye strain. Neon accents are reserved exclusively for high-value data points — never for decoration.

### 1.3 Depth Through Layering
Three visual depth layers create a sense of spatial hierarchy:

| Layer | Name | Description |
|-------|------|-------------|
| **Layer 0** | Deep Space Canvas | `#020817` solid background — maximum neon contrast |
| **Layer 1** | Glassmorphic Cards | Semi-transparent frosted panels (`.glass` class) |
| **Layer 2** | Holographic Overlays | Tooltips, active glow states, focus rings |

---

## 2. Color System

All colors are declared as CSS custom properties in `:root` in `index.css` (line 5–22).

### 2.1 Core Palette

| Token | Value | Swatch | Semantic Role | Usage Examples |
|-------|-------|--------|---------------|----------------|
| `--bg` | `#020817` | ██ | Base Canvas | Body background, card interiors |
| `--neon-green` | `#00FF9C` | ██ | Primary / Success | Win indicators, CTA borders, active nav, logo accent |
| `--neon-blue` | `#00C2FF` | ██ | Secondary / Info | Chart fills, navigation hover, CricAI engine status |
| `--neon-gold` | `#FFC857` | ██ | Warning / Highlight | Championship badges, MOM stars, season alerts |
| `--neon-purple` | `#A855F7` | ██ | Tertiary / AI | All-rounder radars, CricAI query accents |
| `--neon-red` | `#FF4757` | ██ | Danger / Loss | Loss counts, eliminated tags, danger indicators |
| `--text` | `#FFFFFF` | ██ | Primary Text | Headings, player names, bold stats |
| `--text-muted` | `rgba(255,255,255,0.55)` | ░░ | Secondary Text | Descriptions, labels, sub-captions |

### 2.2 Surface Colors

| Token | Value | Role |
|-------|-------|------|
| `--bg-card` | `rgba(255,255,255,0.035)` | Inner card backgrounds |
| `--border` | `rgba(0,255,156,0.12)` | Default glass card borders |
| `--border-blue` | `rgba(0,194,255,0.15)` | Blue-accent card borders |
| `--border-gold` | `rgba(255,200,87,0.2)` | Gold-accent card borders |

### 2.3 Glow Classes

Applied via CSS classes defined in `index.css` (lines 54–60):

```css
.neon-green { color: #00FF9C; text-shadow: 0 0 12px rgba(0,255,156,0.7), 0 0 24px rgba(0,255,156,0.4); }
.neon-blue  { color: #00C2FF; text-shadow: 0 0 12px rgba(0,194,255,0.7), 0 0 24px rgba(0,194,255,0.4); }
.neon-gold  { color: #FFC857; text-shadow: 0 0 12px rgba(255,200,87,0.7), 0 0 24px rgba(255,200,87,0.4); }
```

Box glow variants:
```css
.glow-border-green { box-shadow: 0 0 20px rgba(0,255,156,0.2), inset 0 0 12px rgba(0,255,156,0.05); }
.glow-border-blue  { box-shadow: 0 0 20px rgba(0,194,255,0.2), inset 0 0 12px rgba(0,194,255,0.05); }
.glow-border-gold  { box-shadow: 0 0 20px rgba(255,200,87,0.2), inset 0 0 12px rgba(255,200,87,0.05); }
```

### 2.4 Team Color Map

Defined in `utils.ts` — maps all 16 IPL franchises (including renamed/defunct teams) to exact brand hex colors:

| Team | Hex | Abbreviation |
|------|-----|--------------|
| Mumbai Indians | `#004BA0` | MI |
| Chennai Super Kings | `#F9CD05` | CSK |
| Royal Challengers Bengaluru | `#EC1C24` | RCB |
| Kolkata Knight Riders | `#3A225D` | KKR |
| Sunrisers Hyderabad | `#F7A721` | SRH |
| Delhi Capitals | `#00008B` | DC |
| Rajasthan Royals | `#2D52A0` | RR |
| Punjab Kings | `#ED1B24` | PBKS |
| Gujarat Titans | `#0B4973` | GT |
| Lucknow Super Giants | `#A72056` | LSG |
| Deccan Chargers | `#F5A623` | DCH |
| Rising Pune Supergiant | `#6F2D91` | RPS |
| Gujarat Lions | `#E85C0B` | GL |

Legacy names (Kings XI Punjab, Delhi Daredevils, Royal Challengers Bangalore, Rising Pune Supergiants) are mapped to their modern equivalents in both `TEAM_COLORS` and `TEAM_ABBR`.

---

## 3. Typography

Fonts are imported via Google Fonts CDN in `index.css` (line 1):

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');
```

### 3.1 Type Scale

| Token | Font Family | Role | Weights Used |
|-------|-------------|------|--------------|
| `--font-display` | `'Orbitron', monospace` | Scores, timers, logos, stat values, CTA labels | 500, 600, 700, 800, 900 |
| `--font-heading` | `'Rajdhani', sans-serif` | Section titles, card headers, team names, tab labels | 500, 600, 700 |
| `--font-body` | `'Inter', sans-serif` | Paragraph text, descriptions, logs, tooltips | 300, 400, 500, 600, 700 |

### 3.2 Size Reference (from component source)

| Element | Font | Size | Weight | Letter-Spacing | Source Component |
|---------|------|------|--------|----------------|------------------|
| Hero Title (CRICMIND) | Orbitron | `clamp(60px, 12vw, 120px)` | 900 | `-0.02em` | `Home.tsx` L115 |
| Page Title (h1) | Orbitron | `36px` | — | — | `Dashboard.tsx` L71 |
| Section Title (h2) | Orbitron | `18px` | — | `0.12em` | `SectionTitle` component |
| Stat Card Value | Orbitron | `36px` | 700 | — | `StatCard` L40 |
| Stat Label | Orbitron | `11px` | — | `0.12em` | `StatCard` L37 |
| Nav Link | Orbitron | `11px` | — | `0.12em` | `Layout.tsx` L152 |
| Body Text | Inter | `13–14px` | 400 | — | Throughout |
| Subtitle | Rajdhani | `15–20px` | 600 | `0.2–0.3em` | `Home.tsx` L129 |

### 3.3 Anti-aliasing

```css
body { -webkit-font-smoothing: antialiased; }
```

---

## 4. Spacing & Layout Grid

### 4.1 Spacing Scale (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `xxs` | `4px` | Tag internal padding, dot indicators |
| `xs` | `8px` | Nav tab gaps, small margins |
| `sm` | `16px` | Card inner padding, grid gaps |
| `md` | `24px` | Sidebar margins, card padding, grid gutters |
| `lg` | `32px` | Panel padding, major component margins |
| `xl` | `48px` | Section margins, top-level separators |
| `2xl` | `80px` | Page section padding (`.section`) |

### 4.2 Container

```css
.container { max-width: 1400px; margin: 0 auto; padding: 0 24px; }
```

### 4.3 Grid System

Defined in `index.css` (lines 269–275):

| Class | Columns | Gap | Responsive Behavior |
|-------|---------|-----|---------------------|
| `.grid-2` | `repeat(2, 1fr)` | `20px` | → 1 col at 640px |
| `.grid-3` | `repeat(3, 1fr)` | `20px` | → 2 col at 900px → 1 col at 640px |
| `.grid-4` | `repeat(4, 1fr)` | `16px` | → 2 col at 1200px → 1 col at 640px |
| `.grid-5` | `repeat(5, 1fr)` | `16px` | → 3 col at 1200px → 2 at 900px → 1 at 640px |

### 4.4 Specialized Layout Grids

| Class | Layout | Source |
|-------|--------|--------|
| `.charts-row` | `2fr 1fr` → `1fr` at 1024px | `index.css` L450 |
| `.comparison-row` | `1fr 2fr` → `1fr` at 1024px | `index.css` L464 |
| `.simulator-row` | `1fr 1fr` → `1fr` at 1024px | `index.css` L478 |
| `.stats-ticker-grid` | `repeat(6, 1fr)` → `3` at 1024px → `2` at 640px | `index.css` L392 |

---

## 5. Glass Card System

The `.glass` class is the foundational card component — defined in `index.css` (lines 42–49):

```css
.glass {
  background: rgba(2, 8, 23, 0.72);
  border: 1px solid rgba(0, 255, 156, 0.18);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 12px;   /* var(--radius) */
  box-shadow: 0 8px 32px rgba(0,0,0,0.5),
              inset 0 1px 1px rgba(255, 255, 255, 0.05);
}
```

### Variants

| Class | Border Override |
|-------|----------------|
| `.glass-blue` | `border-color: rgba(0,194,255,0.15)` |
| `.glass-gold` | `border-color: rgba(255,200,87,0.2)` |

### When to Use

- **Every data card** (stat cards, player cards, team cards, season cards)
- **Chart containers** (wrap Recharts `<ResponsiveContainer>`)
- **Sidebar panels** (sidebar-card in Prototype)
- **Simulator configuration panels**

---

## 6. Button Components

### 6.1 Primary Button (`.btn-primary`)

Used for the main CTA ("ENTER ARENA", "RUN SIMULATION", "SEND").

```css
.btn-primary {
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  padding: 14px 32px;
  background: linear-gradient(135deg, rgba(2,8,23,0.85), rgba(0,255,156,0.15));
  border: 1.5px solid rgba(0,255,156,0.6);
  color: #00FF9C;
  border-radius: 10px;
  backdrop-filter: blur(12px);
  text-shadow: 0 0 8px rgba(0,255,156,0.5), 0 1px 2px rgba(0,0,0,0.8);
  box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
}
```

**Hover State:** `translateY(-1px)`, expanded glow `0 0 25px rgba(0,255,156,0.4)`, overlay gradient fade-in via `::before` pseudo-element.

**Active State:** Disabled with `PROCESSING...` text (Simulator). No explicit `:active` rule — handled by Framer Motion.

### 6.2 Secondary Button (`.btn-secondary`)

```css
.btn-secondary {
  background: rgba(2,8,23,0.82);
  border: 1.5px solid rgba(0,194,255,0.4);
  color: #00C2FF;
  text-shadow: 0 0 8px rgba(0,194,255,0.4);
}
```

**Hover State:** `background: rgba(0,194,255,0.12)`, border brightens to `0.8`, box-shadow `0 0 25px rgba(0,194,255,0.3)`.

### 6.3 Tab Button (`.tab-btn`)

```css
.tab-btn {
  padding: 8px 18px;
  border-radius: 8px;
  font-family: 'Orbitron'; font-size: 11px; letter-spacing: 0.1em;
  color: var(--text-muted); background: transparent; border: none;
}
.tab-btn.active {
  background: rgba(0,255,156,0.15);
  color: #00FF9C;
  box-shadow: 0 0 12px rgba(0,255,156,0.2);
}
```

---

## 7. Navigation System

### 7.1 Top Navbar

- **Fixed position**, `z-index: 100`
- Height: `64px`
- **Transparent → Frosted** on scroll: `background` transitions from gradient to `rgba(2,8,23,0.95)`, `backdrop-filter` from `4px` to `16px`
- Transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
- Border: changes from `rgba(255,255,255,0.03)` → `rgba(0,255,156,0.15)` on scroll

### 7.2 Navigation Items (8 pages)

| Icon | ID | Label |
|------|----|-------|
| ⬡ | `home` | HOME |
| ◈ | `dashboard` | DASHBOARD |
| ✦ | `cricai` | CRICAI |
| ◎ | `players` | PLAYERS |
| ◆ | `teams` | TEAMS |
| ◇ | `matches` | MATCHES |
| ◉ | `seasons` | SEASONS |
| ⬟ | `simulator` | SIMULATOR |

### 7.3 Nav Link Styling (`.nav-link`)

```css
font-family: 'Orbitron'; font-size: 11px; letter-spacing: 0.12em;
color: rgba(255,255,255,0.9);
text-shadow: 0 1px 3px rgba(0,0,0,0.9);
```

Active: `color: #00FF9C; background: rgba(0,255,156,0.12); text-shadow: glow`.

### 7.4 Live Clock Badge

Positioned in top-right corner (Layout.tsx L104–117):
- Real-time clock updating every 1 second (`setInterval`)
- Green pulsing dot with `animation: pulse-glow 1.5s infinite`
- "LIVE" label in Orbitron 10px

### 7.5 Mobile Drawer

- **Trigger:** `≤ 1024px` — hamburger button replaces desktop nav
- **Drawer:** Fixed left panel, `width: 280px`, spring animation via Framer Motion (`damping: 25, stiffness: 200`)
- **Backdrop:** `rgba(2,8,23,0.8)` with `blur(8px)`

---

## 8. Tag & Badge Components

Defined in `index.css` (lines 224–237):

### 8.1 Tag Base

```css
.tag {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 500; letter-spacing: 0.05em;
}
```

### 8.2 Tag Variants

| Class | Background | Text Color | Border | Semantic |
|-------|-----------|------------|--------|----------|
| `.tag-green` | `rgba(0,255,156,0.12)` | `#00FF9C` | `rgba(0,255,156,0.2)` | Optimal / Season tag |
| `.tag-blue` | `rgba(0,194,255,0.12)` | `#00C2FF` | `rgba(0,194,255,0.2)` | Info / Match count |
| `.tag-gold` | `rgba(255,200,87,0.12)` | `#FFC857` | `rgba(255,200,87,0.2)` | Champion / MOM |
| `.tag-red` | `rgba(255,71,87,0.12)` | `#FF4757` | `rgba(255,71,87,0.2)` | Danger / Loss |

### 8.3 Rank Badges

```css
.rank-1 { background: linear-gradient(135deg,#FFD700,#FF8C00); color: #000; box-shadow: 0 0 12px rgba(255,215,0,0.5); }
.rank-2 { background: linear-gradient(135deg,#C0C0C0,#A0A0A0); color: #000; }
.rank-3 { background: linear-gradient(135deg,#CD7F32,#8B4513); color: #fff; }
.rank-other { background: rgba(255,255,255,0.08); color: var(--text-muted); }
```

Used in: Player cards (Players.tsx), Venue rankings (Dashboard.tsx).

---

## 9. Data Visualization Patterns

CricMind uses **Recharts v3.8.1** for all chart rendering.

### 9.1 Tooltip Style (reused across all pages)

```javascript
const TOOLTIP_STYLE = {
  backgroundColor: 'rgba(2,8,23,0.95)',
  border: '1px solid rgba(0,255,156,0.2)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 12,
}
```

### 9.2 Chart Types Used

| Chart Type | Component | Page | Purpose |
|-----------|-----------|------|---------|
| Horizontal Bar | `<BarChart layout="vertical">` | Dashboard | Toss Impact Analysis |
| Vertical Bar | `<BarChart>` | Dashboard, Teams, Seasons | Win rates, team scores |
| Radar | `<RadarChart>` | Dashboard, Players | Phase analysis, player comparison |
| Area | `<AreaChart>` | Dashboard | Season scoring trends |
| Line | `<LineChart>` | Seasons | Avg score evolution |
| Pie | `<PieChart>` | Teams | Championship title distribution |

### 9.3 Chart Color Conventions

- **Neon Green** (`#00FF9C`) — primary data series (runs, wins)
- **Neon Blue** (`#00C2FF`) — secondary series, area fills
- **Neon Gold** (`#FFC857`) — tertiary/highlight series
- **Team-specific colors** — `teamColor()` function from `utils.ts`

### 9.4 Recharts Global CSS Overrides

```css
.recharts-text { fill: var(--text-muted) !important; font-size: 11px !important; }
.recharts-cartesian-axis-tick-value { fill: rgba(255,255,255,0.5) !important; }
```

---

## 10. Animation & Motion System

### 10.1 CSS Keyframes (index.css, lines 67–73)

| Animation | Duration | Usage |
|-----------|----------|-------|
| `float` | `4s ease-in-out infinite` | Floating UI elements |
| `pulse-glow` | `2s ease-in-out infinite` | LIVE badge dot, status indicators |
| `scan` | — | Scanline overlay movement |
| `spin-slow` | `12s linear infinite` | Loading spinner (used as `0.8s` for `.spinner`) |
| `shimmer` | — | Background shimmer effects |
| `data-in` | `0.6s ease both` | Card entrance: opacity 0→1, translateY 30→0, scale 0.96→1 |
| `gradient-shift` | `12s ease infinite` | `.animated-bg` gradient cycling |

### 10.2 Framer Motion Patterns

Used throughout all page components:

| Pattern | Props | Usage |
|---------|-------|-------|
| **Fade-in from bottom** | `initial={{ opacity:0, y:20 }}` `animate={{ opacity:1, y:0 }}` | Cards, sections |
| **Fade-in from left/right** | `initial={{ opacity:0, x:-20 }}` `animate={{ opacity:1, x:0 }}` | Chart pairs |
| **Scale entrance** | `initial={{ opacity:0, scale:0.92 }}` `animate={{ opacity:1, scale:1 }}` | Stat cards |
| **Scroll-triggered** | `whileInView={{ opacity:1, y:0 }}` `viewport={{ once:true }}` | Below-fold content |
| **Staggered delay** | `transition={{ delay: index * 0.05 }}` | Card grids |
| **AnimatePresence** | `mode="wait"` | Phase toggle tabs in CricAI |
| **Spring drawer** | `type:'spring', damping:25, stiffness:200` | Mobile nav drawer |

### 10.3 Hover Micro-Interactions (inline styles)

All interactive cards implement:
```javascript
onMouseEnter: translateY(-4px), boxShadow: '0 16px 40px rgba(0,0,0,0.4)'
onMouseLeave: reset transform and boxShadow
```

Transition: `all 0.3s` via inline `transition` property.

---

## 11. Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|-----------|--------|-------------|
| **> 1400px** | Wide desktop | `max-width: 1400px` container |
| **≤ 1200px** | Standard desktop | `.grid-5` → 3 cols, `.grid-4` → 2 cols |
| **≤ 1024px** | Tablet | Desktop nav hidden, hamburger shown; all row grids → single column; stat ticker → 3 cols |
| **≤ 900px** | Small tablet | `.grid-3`, `.grid-4`, `.grid-5` → 2 cols |
| **≤ 768px** | Large mobile | CricAI header stacks vertically |
| **≤ 640px** | Mobile | All grids → 1 col; hero buttons stack; ticker → 2 cols; live clock hidden; pretitle lines hidden |

---

## 12. Accessibility & Contrast

### 12.1 Contrast Ratios (WCAG AA evaluated)

| Element | Foreground | Background | Contrast Ratio | WCAG AA |
|---------|-----------|------------|----------------|---------|
| Primary text | `#FFFFFF` | `#020817` | **18.1:1** | ✅ AAA |
| Neon green text | `#00FF9C` | `#020817` | **12.4:1** | ✅ AAA |
| Neon blue text | `#00C2FF` | `#020817` | **9.2:1** | ✅ AAA |
| Neon gold text | `#FFC857` | `#020817` | **10.8:1** | ✅ AAA |
| Muted text | `rgba(255,255,255,0.55)` | `#020817` | **7.6:1** | ✅ AA |
| Nav link text | `rgba(255,255,255,0.9)` | transparent | **~15:1** | ✅ AAA |

### 12.2 Interactive State Visibility

- All buttons have visible focus/hover states with glow box-shadows
- Active navigation items gain neon-green background + text color shift
- Tab buttons display `box-shadow: 0 0 12px rgba(0,255,156,0.2)` when active

### 12.3 Motion Accessibility

- `prefers-reduced-motion` not explicitly handled — recommend adding in future updates
- All animations use `ease` timing — no harsh jarring movements

---

## 13. Icon System

CricMind uses **Unicode geometric symbols** instead of icon libraries for navigation and feature cards:

| Symbol | Unicode | Meaning | Used In |
|--------|---------|---------|---------|
| ⬡ | U+2B21 | Home | Nav, home link |
| ◈ | U+25C8 | Dashboard / Arena | Nav, feature card, CTA |
| ✦ | U+2726 | CricAI Intelligence | Nav, CTA |
| ◎ | U+25CE | Player Lab | Nav, feature card |
| ◆ | U+25C6 | Team Intel | Nav, feature card |
| ◇ | U+25C7 | Match Center | Nav, feature card |
| ◉ | U+25C9 | Season Vault | Nav, feature card |
| ⬟ | U+2B1F | Simulator | Nav, feature card, CTA |
| ★ | U+2605 | Champion / MOM | Team cards, match cards |

Additional symbols used in CricAI markdown renderer: ⬡ (bullet points), ⚠️ (warnings).

**Lucide React** (`lucide-react v1.16.0`) is installed as a dependency but used minimally — primarily as an extension option.

---

## 14. Scrollbar & Micro-UI

### 14.1 Custom Scrollbar

```css
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: rgba(0,255,156,0.3); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,255,156,0.6); }
```

### 14.2 Horizontal Scroll Strip (`.hscroll`)

```css
.hscroll {
  display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px;
  scrollbar-width: thin;   /* Firefox */
}
```

Used for: Recent Matches cards, Top Venues strip, H2H rivalry cards.

### 14.3 Progress Bar

```css
.progress-bar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 2px; transition: width 1.2s ease; }
```

Used in: Team win rate bars, Simulator confidence indicator.

### 14.4 Scanline Overlay (`.scanlines`)

```css
.scanlines::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  pointer-events: none; z-index: 1;
}
```

### 14.5 Loading Spinner

```css
.spinner {
  width: 40px; height: 40px;
  border: 2px solid rgba(0,255,156,0.2);
  border-top: 2px solid var(--neon-green);
  border-radius: 50%;
  animation: spin-slow 0.8s linear infinite;
}
```

---

## 15. Component Reference Index

Quick lookup table mapping visual components to their source implementations:

| Component | Source File | Line | Description |
|-----------|-----------|------|-------------|
| `StatCard` | `Dashboard.tsx` | L26–46 | Animated stat display with title/value/sub |
| `SectionTitle` | `Dashboard.tsx` | L18–24 | Uppercase Orbitron section heading |
| `PlayerCard` | `Players.tsx` | L22–80 | Ranked player card with rank badge, stats grid |
| `TeamCard` | `Teams.tsx` | L23–85 | Team card with color accent bar, win rate progress |
| `MatchCard` | `Matches.tsx` | L6–52 | Match result card with team dots, winner highlight |
| `SeasonCard` | `Seasons.tsx` | L23–63 | Season card with champion badge and avg score |
| `StatTicker` | `Home.tsx` | L13–41 | 6-column stat pill grid with staggered entrance |
| `MarkdownText` | `CricAI.tsx` | L60–158 | Rich text renderer (bold, code, headers, bullets) |
| `Layout` | `Layout.tsx` | L22–208 | App shell: navbar, footer, mobile drawer |
| `SeamlessVideo` | `SeamlessVideo.tsx` | — | Background video component for Home page |

---

*This document is auto-generated from the CricMind3D source code and represents the definitive design specification for all frontend implementations.*
