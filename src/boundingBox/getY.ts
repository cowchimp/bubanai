import { ElementHandle } from 'puppeteer-core';
import { getBoundingBox } from './getBoundingBox';

/**
 * Returns top border coordinates of bounding box
 * @param element
 *
 * @category Bounding Box
 */
export async function getY(element: ElementHandle) {
  return getBoundingBox(element).then((box) => box.y);
}
