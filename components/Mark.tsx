type Props = { size?: number };

/**
 * The mark on its own, no wordmark. This is what the app icon uses.
 *
 * Three squares stepping along a diagonal, resolving from an open outline to
 * half filled to solid: a primitive, then the brand layer pointing at it, then
 * the semantic value a component actually reads.
 *
 * Below 32px the reduced form is used. A hole inside a four pixel square
 * cannot be drawn, so the three states collapse into grey mush; all three go
 * solid instead and the diagonal does the work.
 */
export default function Mark({ size = 20 }: Props) {
  return size < 32 ? (
    <svg width={size} height={size} viewBox="0 0 126 126" fill="currentColor"
         role="img" aria-label="ERA" focusable="false">
      <rect x="0"  y="90" width="36" height="36" rx="9"/>
      <rect x="45" y="45" width="36" height="36" rx="9"/>
      <rect x="90" y="0"  width="36" height="36" rx="9"/>
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 126 126" fill="currentColor"
         role="img" aria-label="ERA" focusable="false">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 90C4.02944 90 0 94.0294 0 99V117C0 121.971 4.02944 126 9 126H27C31.9706 126 36 121.971 36 117V99C36 94.0294 31.9706 90 27 90H9ZM9 99H27V117H9V99Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M54 45C49.0294 45 45 49.0294 45 54V72C45 76.9706 49.0294 81 54 81H72C76.9706 81 81 76.9706 81 72V54C81 49.0294 76.9706 45 72 45H54ZM54 54H63V72H54V54Z"/>
      <rect x="90" y="0" width="36" height="36" rx="9"/>
    </svg>
  );
}
