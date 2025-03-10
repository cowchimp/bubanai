import { Browser, Page } from 'puppeteer-core';
import { StringOrRegExp } from '../../types';

/**
 * Method waits for tab with url part or url is opened and brings it to front.
 * If tab does not exist - throws an exception.
 *
 * @category Page Actions
 */
export async function waitForTab(
  browser: Browser,
  partialUrlOrUrlPattern: StringOrRegExp,
): Promise<Page> {
  const targetMatch = await browser.waitForTarget(
    (target: { url: () => string }) =>
      typeof partialUrlOrUrlPattern === 'string'
        ? target.url().includes(partialUrlOrUrlPattern)
        : !!target.url().match(partialUrlOrUrlPattern),
  );

  if (!targetMatch) {
    throw new Error(`Could not find tab with url: ${partialUrlOrUrlPattern}`);
  }
  const result = await targetMatch.page();
  if (!result) {
    throw new Error(
      `Failed to initialize Page instance for tab with url: ${partialUrlOrUrlPattern}`,
    );
  }
  await result.bringToFront();
  return result;
}
