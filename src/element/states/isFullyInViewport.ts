import { Offsets } from '../../boundingBox';
import { DocumentContext } from '../../page';

/**
 * Checks if element is fully in viewport.
 * Helps when element.isIntersectingViewport() doesn't return correct value (example - for animations).
 * Supports getting element from array by index and offsets from borders of viewport.
 * @param context Page or Frame
 * @param selector Element or selector
 * @param index Element index (default - 0)
 * @param offsets Offsets from bottom and right border of viewport
 *
 * @category Element States
 */
export async function isFullyInViewport(
  context: DocumentContext,
  selector: string,
  index = 0,
  offsets: Offsets = { offsetX: 0, offsetY: 0 },
) {
  return context.evaluate(
    (locator, elementIndex, offset) => {
      const el =
        elementIndex === 0
          ? document.querySelector(locator)
          : document.querySelectorAll(locator)[elementIndex];

      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom - offset.offsetY <= window.innerHeight &&
        rect.right - offset.offsetX <= window.innerWidth
      );
    },
    selector,
    index,
    JSON.parse(JSON.stringify(offsets)),
  );
}
