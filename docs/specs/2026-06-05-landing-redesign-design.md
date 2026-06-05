# Landing Page Redesign — Design Spec

**Date:** 2026-06-05  
**Status:** Approved  

## Overview

Redesign the Cheng Lab website home page by removing the full-screen landing overlay and replacing the hero section with a visually impactful full-screen hero image + research highlight cards. Existing components (UMAP atlas, computational method panel, navigation, other sections) remain unchanged.

## Scope

### In scope
- Remove the landing/splash page (HTML, CSS, JS)
- Redesign the home page hero area as a full-screen hero image
- Add 3 research highlight cards below the hero
- Responsive design for mobile devices

### Out of scope
- Changes to Research, Team, Publications, or Join Us sections
- Changes to the UMAP atlas embed or computational method panel
- Navigation bar or footer changes
- New pages or routing changes

## Changes

### 1. Remove Landing Page

**Files affected:** `index.html`, `style.css`, `scripts.js`

- Delete the `#landing` div from `index.html` (lines 16-32)
- Remove all landing-related CSS rules from `style.css` (`/* ── Landing ──` block, approximately 100 lines covering `.landing-card`, `.landing-title`, `.landing-enter`, `.landing-dream`, `.landing-blob`, `is-hidden`, `is-gone` states, dark/light theme variants, and `prefers-reduced-motion` overrides)
- Remove all landing-related JavaScript from `scripts.js`:
  - `dismissLanding()` function
  - Event listeners for Enter button, overlay click, and keyboard (Enter/Space/Escape)
  - The `mountLanding()` call if present

### 2. Full-screen Hero

**Files affected:** `index.html`, `style.css`

Replace the existing `.home-hero` section with a full-viewport hero:

**Structure:**
```
<section id="home">
  <div class="home-hero-full">
    <div class="hero-overlay"></div>
    <div class="hero-content container">
      <p class="hero-kicker">Cheng Lab · Westlake University</p>
      <h1 class="hero-title">Epigenetic Regulation in Development</h1>
      <p class="hero-lead">Decoding the epigenetic mechanisms that orchestrate cell fate during gastrulation</p>
    </div>
    <div class="hero-scroll-indicator">↓</div>
  </div>
  <!-- existing home-workbench content unchanged -->
</section>
```

**Styling:**
- `.home-hero-full`: `min-height: 100vh`, `position: relative`, `display: flex`, `align-items: center`, `background: url('./img/Home.jpg') center/cover no-repeat`
- `.hero-overlay`: `position: absolute; inset: 0`, dark gradient from `rgba(0,0,0,0.3)` at top to `rgba(0,0,0,0.65)` at bottom
- `.hero-kicker`: uppercase, letter-spacing 0.15em, 14px, white/80% opacity, margin-bottom 16px
- `.hero-title`: 56-72px, weight 800, white, line-height 1.1, margin-bottom 20px
- `.hero-lead`: 18px, white/85% opacity, max-width 600px, line-height 1.6
- `.hero-scroll-indicator`: absolute bottom 32px, centered, white, 24px, bounce animation (2s infinite)
- All text content positioned left-aligned within the container

**Responsive:**
- Tablet (max-width 768px): title 40px, lead 16px
- Mobile (max-width 480px): title 32px, kicker 12px, hero min-height 80vh
- Background image crops via `object-position: center` on all sizes

**Dark/Light theme:**
- Hero text is always white (on dark overlay), so no theme-specific overrides needed for the hero itself

### 3. Research Highlight Cards

**Files affected:** `index.html`, `style.css`

Add a 3-column card grid between the hero and the existing `.home-workbench` section.

**Structure:**
```
<div class="home-highlights container">
  <div class="highlight-card" data-reveal>
    <div class="highlight-icon">🔬</div>
    <h3>Single-Cell Embryo Atlas</h3>
    <p>Mapping cell fate decisions during gastrulation at single-cell resolution</p>
  </div>
  <div class="highlight-card" data-reveal>
    <div class="highlight-icon">🧬</div>
    <h3>Epigenetic Regulation</h3>
    <p>Decoding how chromatin accessibility and histone modifications control gene expression</p>
  </div>
  <div class="highlight-card" data-reveal>
    <div class="highlight-icon">💻</div>
    <h3>Computational Methods</h3>
    <p>Developing tools for metacell projection and multi-omics integration</p>
  </div>
</div>
```

**Note on icons:** Use simple Unicode/emoji characters or CSS-drawn shapes to avoid adding external icon library dependencies. The user can replace these with actual icons or images later.

**Styling:**
- `.home-highlights`: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px`, padding-top 64px, padding-bottom 64px
- `.highlight-card`: `padding: 32px`, `border-radius: 12px`, `border: 1px solid var(--border)`, `background: var(--card-bg)`, subtle `box-shadow`, `transition: transform 0.2s, box-shadow 0.2s`
- `.highlight-card:hover`: slight `transform: translateY(-4px)` and increased shadow
- `.highlight-icon`: 40px, margin-bottom 16px
- Card title: 20px, weight 700, margin-bottom 8px
- Card paragraph: 15px, `color: var(--text-muted)`, line-height 1.6

**Responsive:**
- Tablet (max-width 768px): 2 columns, cards 1-2 on first row, card 3 spanning full width below
- Mobile (max-width 480px): single column stack

**Theme support:**
- Uses existing CSS custom properties (`--card-bg`, `--border`, `--text-muted`) so dark/light themes work automatically

**Animation:**
- Cards use existing `data-reveal` attribute with the IntersectionObserver-based reveal animation already implemented in `scripts.js`

### 4. Preserve Existing Components

The following remain completely unchanged:
- `.home-workbench` section (UMAP atlas + computational method panel)
- Header navigation and theme toggle
- Research, Team, Publications, Join Us sections
- Footer
- All JavaScript section-switching logic
- UMAP iframe lazy-loading logic

## File Change Summary

| File | Change |
|------|--------|
| `index.html` | Remove `#landing` div, rewrite `.home-hero` to full-screen hero, add highlight cards |
| `style.css` | Remove landing CSS block, add full-screen hero styles, add highlight card styles |
| `scripts.js` | Remove `dismissLanding()` and related event listeners |

## Testing

- Verify page loads directly to home section with no landing overlay
- Verify hero image displays correctly and text is readable on all screen sizes
- Verify highlight cards render in 3 columns on desktop, stack on mobile
- Verify UMAP atlas and method panel still function correctly below the new content
- Verify dark/light theme toggle works for the new cards
- Verify scroll reveal animations trigger on the highlight cards
- Verify all navigation links still work correctly
