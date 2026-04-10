# Three Pin Properties - Luxury Design System

## Overview
A premium, high-end real estate aesthetic inspired by luxury property brands. The design emphasizes elegance, spaciousness, and refined typography to convey exclusivity and trust.

---

## Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Charcoal | `#0F1419` | Primary text, headings, buttons |
| Charcoal 900 | `#1A1F26` | Hover states, secondary backgrounds |
| Charcoal 800 | `#252B33` | Cards, elevated surfaces |
| Charcoal 700 | `#303740` | Borders, dividers |

### Secondary Colors (Warm Neutrals)
| Color | Hex | Usage |
|-------|-----|-------|
| Cream | `#F5F3EF` | Section backgrounds |
| Cream 100 | `#FAF9F7` | Input backgrounds, subtle fills |
| Cream 200 | `#E8E5E0` | Borders, dividers |
| Cream 300 | `#D9D5CE` | Disabled states |

### Accent Colors (Gold/Bronze)
| Color | Hex | Usage |
|-------|-----|-------|
| Gold | `#C9A96E` | Links, highlights, CTAs |
| Gold Light | `#D9BC8E` | Hover states |
| Gold Dark | `#B08C4F` | Active states |

### Neutral Scale
| Color | Hex | Usage |
|-------|-----|-------|
| Neutral 50 | `#FDFCFA` | Page background |
| Neutral 100 | `#F7F6F4` | Subtle backgrounds |
| Neutral 200 | `#EAE8E5` | Borders |
| Neutral 300 | `#D5D2CD` | Disabled borders |
| Neutral 400 | `#A8A5A0` | Placeholder text |
| Neutral 500 | `#7A7772` | Secondary text |
| Neutral 600 | `#5A5752` | Body text |
| Neutral 700 | `#3D3A36` | Primary body text |
| Neutral 800 | `#2A2724` | Dark elements |
| Neutral 900 | `#1A1815` | Darkest elements |

---

## Typography

### Font Families

**Headings:** Cormorant Garamond (Serif)
- Elegant, editorial feel
- Weights: 400, 500, 600
- Used for all headings and display text

**Body:** Inter (Sans-serif)
- Clean, modern readability
- Weights: 300, 400, 500, 600
- Used for body text, labels, buttons

### Type Scale
| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 | Cormorant | 56px / 3.5rem | 400 | 1.1 |
| H2 | Cormorant | 40px / 2.5rem | 500 | 1.15 |
| H3 | Cormorant | 28px / 1.75rem | 500 | 1.2 |
| H4 | Cormorant | 22px / 1.375rem | 500 | 1.25 |
| Body | Inter | 15px / 0.9375rem | 400 | 1.6 |
| Small | Inter | 13px / 0.8125rem | 400 | 1.5 |
| Caption | Inter | 11px / 0.6875rem | 500 | 1.4 |

### Typography Patterns
- **Labels/Tags:** Uppercase, letter-spacing: 0.15em, font-weight: 500
- **Buttons:** Uppercase, letter-spacing: 0.03em, font-weight: 500
- **Headings:** Letter-spacing: -0.02em

---

## Component Styles

### Buttons

**Primary Button**
```
Background: #0F1419
Text: White
Padding: 14px 28px
Border-radius: 2px
Font: Inter 13px uppercase, letter-spacing 0.03em
Hover: Background #252B33
Transition: 150ms ease
```

**Secondary Button**
```
Background: Transparent
Border: 1px solid #D5D2CD
Text: #0F1419
Padding: 14px 28px
Border-radius: 2px
Hover: Background #F5F3EF, Border #0F1419
```

**Ghost Button**
```
Background: Transparent
Text: #0F1419
Padding: 14px 0
Hover: Text #C9A96E
Underline animation on hover
```

### Cards

**Property Card**
```
Background: White
Border: 1px solid #EAE8E5
Border-radius: 4px
Shadow: none (flat design)
Hover: translateY(-2px), shadow-lg
Image: aspect-ratio 16/10, scale on hover
Transition: 250ms ease
```

### Form Inputs

**Text Input**
```
Background: #FAF9F7
Border: 1px solid transparent
Border-radius: 2px
Padding: 14px 16px
Font: Inter 15px
Focus: Border #D5D2CD
Transition: 150ms ease
```

### Badges

**Featured Badge**
```
Background: #0F1419
Text: White
Padding: 6px 12px
Font: Inter 11px uppercase, letter-spacing 0.08em
```

**New Development Badge**
```
Background: #C9A96E
Text: White
Padding: 6px 12px
Font: Inter 11px uppercase, letter-spacing 0.08em
```

**Outline Badge**
```
Background: White
Border: 1px solid #EAE8E5
Text: #0F1419
Padding: 6px 12px
```

---

## Layout Principles

### Container
- Max-width: 1440px
- Padding: 24px (mobile) / 32px (tablet) / 48px (desktop)

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| xs | 8px | Tight spacing |
| sm | 12px | Button padding, small gaps |
| md | 16px | Component padding |
| lg | 24px | Section gaps |
| xl | 32px | Large spacing |
| 2xl | 48px | Section padding |
| 3xl | 64px | Major sections |
| 4xl | 96px | Hero sections |

### Grid
- Property cards: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 24px
- Consistent alignment using CSS Grid

---

## Shadows
| Token | Value | Usage |
|-------|-------|-------|
| sm | 0 1px 2px rgba(15,20,25,0.04) | Subtle elevation |
| md | 0 4px 12px rgba(15,20,25,0.06) | Cards on hover |
| lg | 0 8px 24px rgba(15,20,25,0.08) | Elevated cards |
| xl | 0 16px 48px rgba(15,20,25,0.12) | Modals, popovers |

---

## Transitions
| Token | Value | Usage |
|-------|-------|-------|
| fast | 150ms ease | Buttons, small interactions |
| base | 250ms ease | Cards, standard transitions |
| slow | 400ms ease | Images, major transitions |

---

## Page Layouts

### Home Page
1. **Hero Section**
   - Full-width background image (85vh)
   - Dark gradient overlay
   - Centered typography (serif, italic)
   - Embedded search bar
   - Scroll indicator at bottom

2. **Featured Properties**
   - Section header with label, title, CTA
   - 3-column grid of property cards
   - Subtle hover effects

3. **Why Choose Us**
   - 2-column layout (text + image)
   - Statistics grid
   - Testimonial card

4. **CTA Section**
   - Dark background
   - Centered content
   - Two-button layout

### Property Detail Page
1. **Navigation Bar**
   - Back link
   - Sticky on scroll

2. **Property Header**
   - Title, location, badges
   - Price display
   - Quick stats row

3. **Image Gallery**
   - Full-width carousel
   - Thumbnail strip
   - Navigation arrows

4. **Two-Column Layout**
   - Left: Description, amenities, floor plans, video, map
   - Right: Contact forms (sticky)

### Listings Page
1. **Page Header**
   - Dark background
   - Page title and description

2. **Filter Bar**
   - Search input
   - Filter toggle
   - Sort dropdown
   - Results count

3. **Property Grid**
   - Optional sidebar filters
   - 3-column responsive grid
   - Empty state design

---

## Micro-interactions

### Hover States
- Cards: translateY(-2px) + shadow-lg
- Buttons: Background color shift
- Images: scale(1.03)
- Links: Color change to gold + underline animation

### Focus States
- Outline: 2px solid #C9A96E
- Offset: 2px

### Active States
- Buttons: Background darkens
- Cards: Subtle scale(0.98)

---

## Responsive Breakpoints
| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 640px | Single column, stacked layout |
| Tablet | 640-1024px | 2-column grid |
| Desktop | > 1024px | Full 3-column grid, sidebars |

---

## Design Principles

1. **Whitespace is Premium**
   - Generous padding and margins
   - Let content breathe

2. **Typography Creates Hierarchy**
   - Large serif headings
   - Small uppercase labels
   - Clear visual distinction

3. **Color is Restrained**
   - Neutral palette with gold accents
   - No bright, distracting colors

4. **Images are Hero**
   - Full-width photography
   - Minimal UI overlay
   - High-quality visuals

5. **Interactions are Subtle**
   - Smooth, refined animations
   - No flashy effects
   - Quality over quantity

---

## CSS Variables

```css
:root {
  /* Colors */
  --color-primary: #0F1419;
  --color-secondary: #F5F3EF;
  --color-accent: #C9A96E;

  /* Typography */
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', -apple-system, sans-serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(15, 20, 25, 0.04);
  --shadow-md: 0 4px 12px rgba(15, 20, 25, 0.06);
  --shadow-lg: 0 8px 24px rgba(15, 20, 25, 0.08);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

---

## Asset Requirements

### Fonts (Google Fonts)
- Cormorant Garamond: 400, 400i, 500, 600
- Inter: 300, 400, 500, 600

### Images
- Hero: High-quality architectural/property photography
- Property images: 16:10 aspect ratio, high resolution
- Thumbnails: 4:3 aspect ratio

### Icons
- Heroicons (24px outline)
- Consistent stroke width
- Neutral color matching text
