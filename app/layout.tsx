import type { Metadata, Viewport } from 'next';
import './era.css';
import './case-study.css';

export const metadata: Metadata = {
  title: 'ERA Design System',
  description:
    'A case study for ERA, a branded house design system where three brands and two colour modes come out of one component set.',
  openGraph: {
    title: 'ERA Design System',
    description:
      'Three brands, two modes, one component set. The contrast evidence on this page is computed live from the tokens.',
    type: 'article',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The brand and mode live on <html>, because era.css declares the semantic
    // layer under [data-brand] and [data-theme]. `js` gates the entrance styles
    // so the page is never left hidden if the client bundle fails.
    <html lang="en" data-brand="brand-1" data-theme="light" className="js">
      <head>
        {/* Self hosted and preloaded. A case study whose first bug is "the fonts
            never loaded" should not depend on a font CDN. */}
        <link rel="preload" href="/font/plex.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
