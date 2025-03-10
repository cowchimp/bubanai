import { Page } from 'puppeteer-core';
import { TYPE_ACTION_DELAY } from '../../settings';
import { getElement } from '../getElement';
import { clearInput } from './clearInput';
import { click } from './click';
import { DocumentContext } from '../../page';
import { SearchElementOptions, SelectorOrElement } from '../types';

export interface TypeOptions {
  delayMs?: number;
  clearInput?: boolean;
}

/**
 * Types a text to the provided element.
 * Before typing the value in the input field it's cleared if not specified otherwise.
 * In order to clear the input a page object is needed, so if the context is `Frame` then an additional `page` argument should be passed.
 *
 * @category Element Actions
 */
export async function type(
  text: string,
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
  typeOptions?: TypeOptions,
  page?: Page,
): Promise<void> {
  const defaultOptions = {
    delayMs: TYPE_ACTION_DELAY,
    clearInput: true,
  };
  const mergedTypeOptions = {
    ...defaultOptions,
    ...typeOptions,
  };
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );
  await click(context, element);

  if (mergedTypeOptions.clearInput) {
    await clearInput(context, element, {}, page);
  }
  await element.type(text, { delay: mergedTypeOptions.delayMs });
}
