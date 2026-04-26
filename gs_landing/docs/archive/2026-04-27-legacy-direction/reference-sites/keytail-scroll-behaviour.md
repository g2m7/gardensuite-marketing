# Keytail.ai - Scroll Behaviour Reference

Extracted from https://www.keytail.ai/

## 1. Smooth Scroll Library: Lenis

- **Library:** Lenis (detected via `class="lenis"` on `<html>`)
- **html scroll-behavior:** `smooth`
- **html/body overflow:** `visible` (Lenis manages scroll virtually)
- **Page height:** ~8213px

## 2. Hero Parallax (Scroll-Linked)

**Image wrapper** (`.absolute.inset-0.scale-110`):
- Starts at `transform: scale(1.1)` - image is 10% larger than container
- On scroll, gets `translate3d(0px, Ypx, 0px)` applied via Framer Motion `useScroll` + `useTransform`
- Image translates **downward** as user scrolls (parallax depth effect)
- At scroll 0: `translate3d(0, 0, 0)`
- At scroll 1500: `translate3d(0, 22.8px, 0)`
- At scroll 3000: `translate3d(0, 32.1px, 0)`
- At scroll 5000: `translate3d(0, 40.2px, 0)`
- At scroll 8000: `translate3d(0, 68.1px, 0)`
- **Scale stays constant at 1.1** - only Y translation changes
- Parent section has `overflow: hidden` to clip the scaled image

**Hero mockup/product screenshot** (`.relative.w-full.max-w-5xl`):
- Moves in **opposite direction** to the hero image (upward as user scrolls)
- At scroll 0: `translate3d(0, 0, 0)`
- At scroll 1500: `translate3d(0, -22.8px, 0)`
- At scroll 5000: `translate3d(0, -40.2px, 0)`
- **Translation is inverted** from the image parallax (negative Y)

**Pattern:** Two elements parallax in opposite directions. Speed ratio is ~1:1 (same magnitude, opposite sign). Likely implemented as:
```
scrollYProgress = useScroll().scrollYProgress
imageY = useTransform(scrollYProgress, [0, 1], [0, ~70])
mockupY = useTransform(scrollYProgress, [0, 1], [0, ~-70])
```

## 3. Navbar Scroll Behaviour

- **Position:** `fixed top-0 left-0 right-0 z-50`
- **Height:** 58px
- **Transition:** `background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **No backdrop-filter** (no blur effect)

**Background transitions on scroll:**
| Scroll Position | Background | State |
|----------------|------------|-------|
| 0 - 1500 | `transparent` (rgba(0,0,0,0)) | Transparent on hero |
| 1500 - 2000 | `rgba(255,255,255,0.84)` | Semi-transparent white |
| 2000 - 3000 | `rgba(255,255,255,0.92)` | More opaque |
| 3000+ | `rgb(255,255,255)` | Fully opaque white |

**Implementation:** Likely a scroll listener that adds/removes a class or uses Framer Motion `useMotionValueEvent` to toggle bg opacity.

## 4. Framer Motion `whileInView` Reveals

All below-fire animations use Framer Motion's `whileInView` with `once: true` (fire once, stay revealed).

### 4a. Perspective + 3D Tilt Sections

**Element:** Section with `perspective: 1200px`

Two elements use this:
1. **Heading container** (docTop ~3781) - `perspective:1200px` on parent, `opacity: 1; transform: none;` on child
2. **Video/product iframe** (docTop ~4079) - `perspective: 1200px; opacity: 1; transform: none;`

**Initial state (before view):** Likely `opacity: 0` and slight `rotateX` tilt
**Revealed state:** `opacity: 1; transform: none;`

**Implementation pattern:**
```jsx
<motion.div
  initial={{ opacity: 0, rotateX: 10 }}
  whileInView={{ opacity: 1, rotateX: 0 }}
  transition={{ duration: 0.8, ease: [0.625, 0.05, 0, 1] }}
  viewport={{ once: true }}
  style={{ perspective: 1200 }}
>
```

### 4b. Line-by-Line Text Reveal

**Structure:**
```html
<div style="overflow: hidden; height: 22px;">  <!-- each line's parent clips -->
  <div class="line" style="transform: translateY(0%); transition: transform 0.9s cubic-bezier(0.625, 0.05, 0, 1);">
    Text line here
  </div>
</div>
```

**Animation:**
- Each line is wrapped in an `overflow: hidden` parent with fixed height (22px per line)
- Line slides from `translateY(100%)` to `translateY(0%)`
- **Duration:** 0.9s
- **Easing:** `cubic-bezier(0.625, 0.05, 0, 1)` (custom ease-out with fast start, slow end)
- **Stagger delay:** 0.05s per line
  - Line 0: no delay
  - Line 1: `0.05s` delay
  - Line 2: `0.1s` delay
  - Line 3: `0.15s` delay

**Implementation pattern:**
```jsx
lines.map((line, i) => (
  <div style={{ overflow: 'hidden', height: '22px' }}>
    <motion.div
      initial={{ translateY: '100%' }}
      whileInView={{ translateY: '0%' }}
      transition={{ 
        duration: 0.9, 
        ease: [0.625, 0.05, 0, 1],
        delay: i * 0.05 
      }}
      viewport={{ once: true }}
    >
      {line}
    </motion.div>
  </div>
))
```

### 4c. Fade-In-Up Reveals

**Used for:** Chart section, stat numbers (584K, 581K), content sections

**Pattern:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

Final rendered state: `opacity: 1; transform: none;` or `opacity: 1;`

## 5. Tab/Accordion Interaction

**Location:** "Use Cases" section with tabs (Startups, Marketing & SEO Teams, Agencies, etc.)

**Behavior:**
- **Active tab:** `color: #111` (dark), font-medium, tracking-tight
- **Inactive tabs:** `color: #BDBDBD` (light gray)
- **Transition:** `color 0.3s ease`
- Clicking a tab swaps active state and reveals corresponding content below

## 6. CSS Keyframe Animations

### `fade-in` (scroll-triggered entrance)
```css
@keyframes fade-in {
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

### `slideUp` (rotating text/counter)
```css
@keyframes slideUp {
  0%   { opacity: 0; transform: translateY(100%); }
  20%  { opacity: 1; transform: translateY(0px); }
  53%  { opacity: 1; transform: translateY(0px); }
  73%  { opacity: 0; transform: translateY(-100%); }
  100% { opacity: 0; transform: translateY(-100%); }
}
```

### `glow-pulse` (CTA button glow)
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: rgba(59, 130, 246, 0.3) 0px 0px 20px; }
  50%      { box-shadow: rgba(59, 130, 246, 0.6) 0px 0px 30px; }
}
```

### `shimmer` (loading/gradient sweep)
```css
@keyframes shimmer {
  0%   { background-position: 200% 0px; }
  100% { background-position: -200% 0px; }
}
```

### `line-fade-in`
```css
@keyframes line-fade-in {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
```

## 7. Summary: Animation Easing Functions

| Usage | Easing |
|-------|--------|
| Line reveal | `cubic-bezier(0.625, 0.05, 0, 1)` (0.9s) |
| Navbar bg | `cubic-bezier(0.4, 0, 0.2, 1)` (0.3s) |
| Tab color | `ease` (0.3s) |
| Framer Motion reveals | default Framer (likely `easeOut`) |
| CSS fade-in | linear between keyframes |
| Hover opacity | `ease` (0.2s) |

## 8. Tech Stack for Scroll

- **Lenis** - smooth scrolling
- **Framer Motion** - scroll-linked parallax (`useScroll`, `useTransform`), `whileInView` reveals
- **CSS transitions** - line-by-line text reveal, tab color swaps
- **CSS keyframes** - `slideUp`, `glow-pulse`, `shimmer`, `fade-in`
