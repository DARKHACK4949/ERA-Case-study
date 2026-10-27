# ERA case study

A case study for ERA, a branded house design system where three brands and two
colour modes come out of one component set.

The page runs on ERA's own tokens. `app/era.css` is the generated token file
from the design system repo, so the brand switcher in the header re-themes the
case study itself rather than swapping a stylesheet.

## What is live rather than written down

- The resolution chain (semantics to brand to primitive) reads the page's
  computed styles, so switching brand or mode moves every value.
- The neutral ramp rows render real text in real token colours and compute
  their own contrast ratios in the browser.
- The three brand fill cards are real nested `[data-brand]` scopes. White and
  `--colors-grey-950` are measured against each brand's own fill.

Those numbers match the audit published in the design system docs: 5.37 and
3.04 for Brand 1, 2.32 and 7.01 for Brand 2, 3.15 and 5.17 for Brand 3.

## How it is built

Next on the App Router, deployed to Vercel. React is here for two things and
renders none of the page:

- `next/image` serves the screenshots as AVIF at the width each one is actually
  displayed at. That took the image payload from about 940KB of JPEG to roughly
  135KB.
- The markup is a server component. `components/Interactive.tsx` mounts once and
  renders `null`; all behaviour lives in `components/behaviour.js`, which walks
  the rendered DOM rather than owning it. Hydration costs one empty component
  instead of a tree the height of this page.

Motion deliberately stays off the scroll path. Entrance is one shot per element
via `IntersectionObserver`, and each element unobserves itself and drops
`will-change` once its transition ends. There is no scroll-driven animation on
the sections, because a `view()` timeline across eight full-height sections
keeps them and every image inside them composited for their whole entry range.
Measured: 16.7ms median scroll frame, nothing over 33ms.

## Running it

```bash
npm install
npm run dev     # localhost:3000
npm run build
```

## Deploying

Import the repository on Vercel. No configuration needed: it detects Next and
the image optimizer runs on their CDN.

## Source

Design system: https://github.com/DARKHACK4949/Era-Design-Foundation-Story-book
