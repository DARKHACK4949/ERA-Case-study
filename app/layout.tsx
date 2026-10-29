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
    // layer under [data-brand] and [data-theme].
    <html lang="en" data-brand="brand-1" data-theme="light">
      <head>
        {/* The entrance styles start every section at opacity 0 and the
            observer in behaviour.js is what brings them back. `js` is what
            arms them, so it is set here rather than in the server markup: if
            this script never runs the class never lands and the page renders
            plainly instead of staying blank. Setting it in <head> means it is
            in place before first paint, so nothing flashes in and back out.

            The timer covers the other half of the same failure. The class can
            be set and the module can still never arrive, which left the page
            permanently hidden. init() stamps data-entrance when it takes over;
            if that has not happened in a second and a half, the entrance is
            dropped and the content is shown as it is. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');" +
              "setTimeout(function(){if(!d.hasAttribute('data-entrance'))d.classList.remove('js')},1500);",
          }}
        />
        {/* Self hosted and preloaded. A case study whose first bug is "the fonts
            never loaded" should not depend on a font CDN. */}
        <link rel="preload" href="/font/plex.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
