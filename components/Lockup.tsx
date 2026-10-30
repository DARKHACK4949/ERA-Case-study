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
 * Clear space between mark and word is 0.571 of the mark's height, the ratio
 * the first lockup used for two module sides. Keeping the ratio rather than
 * the pixel keeps every version of this lockup optically the same.
 *
 * The mark's own notes are in Mark.tsx.
 */
export default function Lockup({ height = 24 }: Props) {
  return (
    <svg height={height} viewBox="0 -5.40 314.10 82.80" fill="currentColor" role="img" aria-label="ERA" focusable="false">
      <g transform="translate(-32.4598,-34.8339) scale(0.5502)">
        <path d="M97 136.5L59 117V141.5L97 161.5L195 112.5V88L97 136.5Z" />
        <path d="M97 179L59 159.5V184L97 204L195 155V130.5L97 179Z" />
        <path d="M96.5 119L59 100L155 53.5L194.5 69L96.5 119Z" />
      </g>
      <g transform="translate(122.10,0)">
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
