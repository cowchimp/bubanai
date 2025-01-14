import { Point } from 'puppeteer-core';
import { DocumentContext } from '../page';

/**
 * Gets scroll for current window.
 * @param context
 *
 * @category Scroll
 */
export async function getScroll(context: DocumentContext): Promise<Point> {
  return context.evaluate(() => ({
    y: window.scrollY,
    x: window.scrollX,
  }));
}
