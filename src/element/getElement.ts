import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../page';
import { SearchElementOptions, SelectorOrElement } from './types';

/**
 * Wrapper for waitForSelector.
 * Used only for elements that exist.
 * Throws exception on null, so don't pass {hidden: true} prop inside it.
 * @param context Page or Frame
 * @param selectorOrElement Element or selector
 * @param options SearchElementOptions
 *
 * @category Element General
 */
export async function getElement(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  options?: SearchElementOptions,
): Promise<ElementHandle> {
  // TDB
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  const element = await context.waitForSelector(selectorOrElement, options);
  if (element === null) {
    throw new Error(
      `The element by selector ${selectorOrElement} wasn't found.`,
    );
  }

  return element;
}
