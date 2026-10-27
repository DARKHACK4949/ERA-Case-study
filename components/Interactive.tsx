'use client';

import { useEffect } from 'react';
import init from './behaviour.js';

/**
 * Mounts the page's behaviour once and renders nothing.
 *
 * The markup itself is a server component, so hydration costs one empty
 * component rather than a tree the height of this page.
 */
export default function Interactive() {
  useEffect(() => init(), []);
  return null;
}
