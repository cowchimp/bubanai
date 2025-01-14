import { Page } from 'puppeteer-core';
import { getBoundingBox, Offsets } from '../../boundingBox';
import { getElement } from '../getElement';
import { SelectorOrElement } from '../types';

/**
 * This method performs hover by offsets from element.
 * @param page Page or Frame
 * @param element Element or selector
 * @param offsets Offset coordinates
 * @param options Number of mouse moves during hover
 *
 * @category Element Actions
 */
export async function hoverAtOffset(
  page: Page,
  element: SelectorOrElement,
  offsets?: Offsets,
  options?: { steps: number },
) {
  const targetElement = await getElement(page, element);
  const boundingBox = await getBoundingBox(targetElement);

  const offsetX = offsets ? offsets.offsetX : 0;
  const offsetY = offsets ? offsets.offsetY : 0;

  const hoverPoint = {
    x: boundingBox.x + offsetX,
    y: boundingBox.y + offsetY,
  };
  await page.mouse.move(hoverPoint.x, hoverPoint.y, options);
}
