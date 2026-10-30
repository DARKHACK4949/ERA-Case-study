type Props = { height?: number };

/**
 * The ERA lockup: the mark and the wordmark together. Used in the site chrome.
 * The app icon uses the mark on its own, without the word.
 *
 * The wordmark is drawn, not typeset. The page takes its typeface from the
 * active brand token, so a text wordmark changed face every time somebody
 * switched brand, which made the system's own identity a function of the
 * brands it serves. In a branded house the parent stays put. A drawn wordmark
 * also cannot be hit by a font that failed to load.
 *
 * The mark is three plates in oblique projection: ERA is three token layers,
 * and the plate on top is the one a component is allowed to read. The two edge
 * pairs run in different directions on purpose. Sheared one way only, a plate
 * reads as a slanted bar; the second direction is the thickness, and that is
 * what makes it lie flat.
 *
 * Clear space between mark and word is 0.571 of the mark's height, the same
 * ratio the first lockup used for two module sides. Keeping the ratio rather
 * than the pixel keeps the two optically the same.
 *
 * Below 32px the reduced cut is used: the full mark's plates land on under two
 * pixels each at that size and smear into one grey block.
 */
export default function Lockup({ height = 24 }: Props) {
  return height < 32 ? (
    <svg height={height} viewBox="0 -5.40 308.92 82.80" fill="currentColor" role="img" aria-label="ERA" focusable="false">
      <g transform="translate(0,-5.40) scale(0.7738)">
        <path d="M3.38 22.14 Q0.00 20.00 3.79 18.74 L56.21 1.26 Q60.00 0.00 63.38 2.14 L86.62 16.86 Q90.00 19.00 86.21 20.26 L33.79 37.74 Q30.00 39.00 26.62 36.86 Z" />
        <path d="M3.38 56.14 Q0.00 54.00 3.79 52.74 L56.21 35.26 Q60.00 34.00 63.38 36.14 L86.62 50.86 Q90.00 53.00 86.21 54.26 L33.79 71.74 Q30.00 73.00 26.62 70.86 Z" />
        <path d="M3.38 90.14 Q0.00 88.00 3.79 86.74 L56.21 69.26 Q60.00 68.00 63.38 70.14 L86.62 84.86 Q90.00 87.00 86.21 88.26 L33.79 105.74 Q30.00 107.00 26.62 104.86 Z" />
      </g>
      <g transform="translate(116.92,0)">
        <g fill="currentColor">
          <path fill="none" stroke="currentColor" strokeWidth="10" d="M43.0 5.0 H5.0 V67.0 H43.0" />
          <path fill="none" stroke="currentColor" strokeWidth="10" d="M5.0 36.0 H39.0" />
          <g transform="translate(74,0)">
            <path fill="none" stroke="currentColor" strokeWidth="10" d="M5.0 72 V5.0 H28 A15 15 0 0 1 28 35 H5.0" />
            <path d="M20 35 H32.54 L48 72 H35.46 Z" />
          </g>
          <g transform="translate(140,0)"><path d="M0 72 L26.0 -2 L52 72 H42.00 L26.0 26.45 L10.00 72 Z" /></g>
        </g>
      </g>
    </svg>
  ) : (
    <svg height={height} viewBox="0 -5.40 314.84 82.80" fill="currentColor" role="img" aria-label="ERA" focusable="false">
      <g transform="translate(0,-5.40) scale(0.8039)">
        <path d="M2.84 30.98 Q0.00 30.00 2.70 28.69 L59.30 1.31 Q62.00 0.00 64.84 0.98 L91.16 10.02 Q94.00 11.00 91.30 12.31 L34.70 39.69 Q32.00 41.00 29.16 40.02 Z" />
        <path d="M2.84 61.98 Q0.00 61.00 2.70 59.69 L59.30 32.31 Q62.00 31.00 64.84 31.98 L91.16 41.02 Q94.00 42.00 91.30 43.31 L34.70 70.69 Q32.00 72.00 29.16 71.02 Z" />
        <path d="M2.84 92.98 Q0.00 92.00 2.70 90.69 L59.30 63.31 Q62.00 62.00 64.84 62.98 L91.16 72.02 Q94.00 73.00 91.30 74.31 L34.70 101.69 Q32.00 103.00 29.16 102.02 Z" />
      </g>
      <g transform="translate(122.84,0)">
        <g fill="currentColor">
          <path fill="none" stroke="currentColor" strokeWidth="10" d="M43.0 5.0 H5.0 V67.0 H43.0" />
          <path fill="none" stroke="currentColor" strokeWidth="10" d="M5.0 36.0 H39.0" />
          <g transform="translate(74,0)">
            <path fill="none" stroke="currentColor" strokeWidth="10" d="M5.0 72 V5.0 H28 A15 15 0 0 1 28 35 H5.0" />
            <path d="M20 35 H32.54 L48 72 H35.46 Z" />
          </g>
          <g transform="translate(140,0)"><path d="M0 72 L26.0 -2 L52 72 H42.00 L26.0 26.45 L10.00 72 Z" /></g>
        </g>
      </g>
    </svg>
  );
}
