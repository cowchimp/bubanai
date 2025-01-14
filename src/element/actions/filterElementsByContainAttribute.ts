import { DocumentContext } from '../../page';
import { ElementHandle } from 'puppeteer-core';
import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import { filterAsync } from '../../collection';
import { getElements } from '../getElements';
import { SelectorOrElements } from '../types';

/**
 * Returns filtered array of elements that contain defined attribute value part.
 * @param context Page or Frame
 * @param elements Element or selector
 * @param attributeType Attribute name
 * @param attrValue Attribute value part
 *
 * @category Element Actions
 */
export async function filterElementsByContainAttribute(
  context: DocumentContext,
  elements: SelectorOrElements,
  attributeType: AttributeType,
  attrValue: string,
) {
  const targetElements = await getElements(context, elements);
  const filterFunc = async (element: ElementHandle) =>
    (await getAttribute(attributeType, context, element)).indexOf(attrValue) !==
    -1;
  return filterAsync(targetElements, filterFunc);
}
