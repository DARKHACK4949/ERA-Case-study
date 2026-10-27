# ERA case study

A case study for ERA, a branded house design system where three brands and two
colour modes come out of one component set.

The page runs on ERA's own tokens. `era.css` is the generated token file from the
design system repo, so the brand switcher in the header re-themes the case study
itself rather than swapping a stylesheet.

## What is live rather than written down

- The resolution chain (semantics to brand to primitive) reads this page's
  computed styles, so switching brand or mode moves every value.
- The neutral ramp rows render real text in real token colours and compute their
  own contrast ratios in the browser.
- The three brand fill cards are real nested `[data-brand]` scopes. White and
  `--colors-grey-950` are measured against each brand's own fill.

Those numbers match the audit published in the design system docs: 5.37 and 3.04
for Brand 1, 2.32 and 7.01 for Brand 2, 3.15 and 5.17 for Brand 3.

## Running it

It is one HTML file with no build step.

```bash
python3 -m http.server 8000
```

## Deploying

Vercel serves it as a static site from the repository root. `vercel.json` sets
immutable caching on the fonts and images and a week on the token file.

## Source

Design system: https://github.com/DARKHACK4949/Era-Design-Foundation-Story-book
