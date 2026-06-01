# Design Brief

## Direction

KCK Group Corporate Platform — Premium blue-and-white showcase site with glassmorphism effects conveying corporate stability, innovation, and global reach.

## Tone

Refined, futuristic, and professional. A balance between corporate gravitas (deep blues) and forward-thinking minimalism (clean whites and glass effects).

## Differentiation

Glassmorphism + gradient effects with smooth animations create a premium tech-forward aesthetic distinct from traditional corporate sites.

## Color Palette

| Token         | OKLCH            | Role                           |
| ------------- | ---------------- | ------------------------------ |
| background    | 0.99 0 0         | Pure white surfaces            |
| foreground    | 0.10 0.01 264    | Dark text for contrast         |
| primary       | 0.38 0.18 264    | Deep corporate blue (hero, buttons) |
| secondary     | 0.45 0.15 257    | Brighter blue (accents, hover) |
| accent        | 0.75 0.18 71     | Energetic orange (highlights)  |
| card          | 0.97 0.01 264    | Subtle blue-tinted white       |
| muted         | 0.93 0.02 264    | Light gray-blue backgrounds    |

## Typography

- Display: Space Grotesk — Modern, geometric display for headings and hero
- Body: General Sans — Clean, professional body text and UI labels
- Mono: JetBrains Mono — Code and technical details
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold tracking-widest`, body `text-base md:text-lg`

## Elevation & Depth

Layered surface hierarchy using subtle shadow-elevated and glassmorphism (backdrop blur) on cards. Blue-tinted backgrounds create depth without heavy shadows.

## Structural Zones

| Zone    | Background              | Border                | Notes                              |
| ------- | ----------------------- | --------------------- | ---------------------------------- |
| Header  | bg-white border-b       | border-muted          | Sticky, clean white with shadow    |
| Hero    | gradient-primary        | —                     | Dark blue gradient with animations |
| Content | bg-background (white)   | —                     | Alternating card/white sections    |
| Cards   | bg-card (glass effect)  | border-border         | Rounded 12px, subtle blue tint     |
| Footer  | bg-muted/20 border-t    | border-muted          | Light blue-tinted background       |

## Spacing & Rhythm

Large vertical rhythm (4rem gaps between sections) with internal padding matching Tailwind scale (gap-6/8 between elements). Loose spacing conveys premium, unhurried design.

## Component Patterns

- Buttons: Primary (bg-primary text-white) + secondary (bg-secondary text-white) with hover elevation and smooth transitions
- Cards: Rounded 12px, bg-card with subtle shadow-glow on hover, border-border for definition
- Badges: Uppercase, tracking-widest, text-sm, bg-accent text-accent-foreground or outline style
- Stats: Large number (text-4xl font-bold primary), small label (text-sm muted-foreground)

## Motion

- Entrance: fadeIn (0.5s), slideInUp/Down/Left/Right (0.6s) for staggered hero animations
- Hover: Smooth transition (0.3s), elevation increase on cards, primary color shift on buttons
- Decorative: float (3s infinite) for stat cards, pulse-glow (2s infinite) for glowing borders, shimmer for glass effects

## Constraints

- No dark mode toggle (light theme only)
- Avoid gradients on text; use only for backgrounds and button fills
- Glassmorphism on cards via backdrop-blur and semi-transparent backgrounds only
- Orange accent used sparingly (highlights, hover states, badges only)
- Mobile-first responsive: sm (640px), md (768px), lg (1024px), xl (1280px)

## Signature Detail

Glassmorphism cards with animated glow on hero section creates a distinctive premium tech aesthetic that balances corporate credibility with forward-thinking design.
